const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function createAdminUser() {
  const { data, error } = await supabase.auth.admin.createUser({
    email: 'david@gnomadstudio.org',
    password: 'TestPass!1234',
    email_confirm: true
  });

  if (error) {
    if (error.message.includes("User already registered")) {
      console.log("User already exists, updating password instead...");

      // Find user by email
      const { data: users, error: searchError } = await supabase.auth.admin.listUsers();
      if (searchError) { console.error(searchError); return; }

      const existingUser = users.users.find(u => u.email === 'david@gnomadstudio.org');
      if (existingUser) {
        const { error: updateError } = await supabase.auth.admin.updateUserById(
          existingUser.id,
          { password: 'TestPass!1234' }
        );
        if (updateError) console.error("Update error:", updateError);
        else console.log("Password updated successfully.");
      }
    } else {
      console.error('Error creating user:', error);
    }
    return;
  }

  console.log('User created:', data);

  // Note: we might also need to insert a row into 'client_profiles'
  if (data?.user) {
    const { error: profileError } = await supabase.from('client_profiles').insert({
      id: data.user.id,
      first_name: 'David',
      tier: 'Flagship',
      features: {
        chatbot: true,
        socialMediaManagement: true,
        businessConsulting: true,
        websiteUpdateFrequency: "Weekly"
      }
    });
    if (profileError) console.error("Error creating profile:", profileError);
    else console.log("Profile created successfully.");
  }
}

createAdminUser();
