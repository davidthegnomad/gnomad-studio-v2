-- Create a secure schema for auth-related functions if needed, 
-- but we will use the standard public schema for profiles as instructed.

-- 1. Create client_profiles table
CREATE TABLE IF NOT EXISTS public.client_profiles (
    id UUID PRIMARY KEY, -- intentionally not a foreign key to auth.users to decouple from internal auth changes
    first_name TEXT,
    email TEXT UNIQUE,
    website_url TEXT,
    tier TEXT,
    project_status TEXT,
    monthly_price NUMERIC,
    credit_balance NUMERIC DEFAULT 0,
    spend_cap_enabled BOOLEAN DEFAULT TRUE,
    total_storage_used BIGINT DEFAULT 0,
    authorizations TEXT[],
    features JSONB,
    kpi_metrics JSONB,
    ga4_property_id TEXT,
    ga4_website_uri TEXT,
    billing_email_primary TEXT,
    billing_emails_additional TEXT[],
    billing_address JSONB,
    internal_notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Create invoices table (1:M relational table)
CREATE TABLE IF NOT EXISTS public.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    client_id UUID REFERENCES public.client_profiles(id) ON DELETE RESTRICT,
    invoice_number TEXT UNIQUE,
    amount NUMERIC,
    status TEXT,
    due_date TIMESTAMPTZ,
    issued_at TIMESTAMPTZ,
    paid_at TIMESTAMPTZ,
    pdf_url TEXT,
    summary TEXT
);

-- 3. Create documents table (Document Vault)
CREATE TABLE IF NOT EXISTS public.documents (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    owner_id UUID REFERENCES public.client_profiles(id) ON DELETE CASCADE,
    file_name TEXT,
    file_size BIGINT,
    content_type TEXT,
    storage_path TEXT,
    document_type TEXT,
    uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS on all tables
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.documents ENABLE ROW LEVEL SECURITY;

-- 4. Sync Function and Trigger for Auth Users
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
    INSERT INTO public.client_profiles (id, email)
    VALUES (NEW.id, NEW.email)
    ON CONFLICT (id) DO UPDATE SET email = EXCLUDED.email;
    RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT OR UPDATE ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Row Level Security Policies
-- client_profiles
DROP POLICY IF EXISTS "Users can view own profile" ON public.client_profiles;
CREATE POLICY "Users can view own profile" 
    ON public.client_profiles FOR SELECT 
    USING ( id = (SELECT auth.uid()) );

DROP POLICY IF EXISTS "Users can update own profile" ON public.client_profiles;
CREATE POLICY "Users can update own profile" 
    ON public.client_profiles FOR UPDATE 
    USING ( id = (SELECT auth.uid()) )
    WITH CHECK ( id = (SELECT auth.uid()) );

-- Note: Admins bypass RLS using the service_role key within API routes.

-- invoices
DROP POLICY IF EXISTS "Users can view own invoices" ON public.invoices;
CREATE POLICY "Users can view own invoices" 
    ON public.invoices FOR SELECT 
    USING ( client_id = (SELECT auth.uid()) );

-- documents
DROP POLICY IF EXISTS "Users can view own documents" ON public.documents;
CREATE POLICY "Users can view own documents" 
    ON public.documents FOR SELECT 
    USING ( owner_id = (SELECT auth.uid()) );

-- 6. Performance Optimization Indexes
CREATE INDEX IF NOT EXISTS idx_client_profiles_id ON public.client_profiles(id);
CREATE INDEX IF NOT EXISTS idx_invoices_client_id ON public.invoices(client_id);
CREATE INDEX IF NOT EXISTS idx_documents_owner_id ON public.documents(owner_id);
