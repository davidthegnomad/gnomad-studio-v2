import React, { useState } from 'react';

export default function App() {
  const [ageVerified, setAgeVerified] = useState(() => {
    try { return sessionStorage.getItem('ls_age_verified') === 'true'; } catch { return false; }
  });

  const handleVerify = () => {
    try { sessionStorage.setItem('ls_age_verified', 'true'); } catch { }
    setAgeVerified(true);
  };

  return (
    <div className="bg-background-light dark:bg-background-dark text-slate-900 dark:text-slate-100 font-display min-h-screen flex flex-col overflow-x-hidden selection:bg-primary selection:text-black">
      {/* Age Gate */}
      {!ageVerified && (
        <div className="fixed inset-0 z-[9999] bg-background-dark/95 backdrop-blur-xl flex items-center justify-center p-6">
          <div className="bg-background-light border border-primary/30 rounded-3xl p-12 max-w-md w-full text-center shadow-[0_0_60px_rgba(230,0,126,0.2)]">
            <div className="text-5xl mb-6">🌿</div>
            <h2 className="text-4xl font-black text-white mb-2 tracking-tighter">LIFTED SPIRITS</h2>
            <p className="text-primary text-xs font-bold uppercase tracking-[0.3em] mb-8">Boutique Dispensary · Muskogee, OK</p>
            <p className="text-slate-300 text-lg font-light leading-relaxed mb-10">
              You must be <span className="text-primary font-black">21 years of age or older</span> to enter this site.
            </p>
            <div className="flex flex-col gap-4">
              <button
                onClick={handleVerify}
                className="bg-primary text-white py-5 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all shadow-[0_0_20px_rgba(230,0,126,0.4)]"
              >
                Yes, I am 21+
              </button>
              <a href="https://google.com" className="text-slate-500 text-sm hover:text-slate-300 transition-colors">
                No, exit site
              </a>
            </div>
            <p className="text-zinc-700 text-[10px] mt-8 uppercase leading-relaxed">
              Cannabis products are for medical patients only. Must be 21+ with valid ID. Keep out of reach of children.
            </p>
          </div>
        </div>
      )}
      {/* Top Ticker */}
      <div className="bg-primary text-black py-2 overflow-hidden whitespace-nowrap border-b-2 border-primary z-50 relative">
        <div className="animate-ticker inline-block font-bold text-sm tracking-wider uppercase">
          DAILY SPECIALS: 20% OFF ALL ALIEN TECH CARTS ✦ FREE PRE-ROLL WITH PURCHASE OVER $50 ✦ COME IN PEACE, LEAVE IN PIECES ✦ DAILY SPECIALS: 20% OFF ALL ALIEN TECH CARTS ✦ FREE PRE-ROLL WITH PURCHASE OVER $50
        </div>
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-background-dark/80 border-b border-primary/20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center bg-primary/10 neon-box-glow group-hover:bg-primary group-hover:text-black transition-all duration-300 shadow-[0_0_15px_rgba(0,255,209,0.3)]">
              <span className="material-symbols-outlined text-primary group-hover:text-black">auto_awesome</span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold tracking-tighter uppercase neon-text-glow text-white">Lifted Spirits</h1>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a className="text-sm font-medium text-slate-300 hover:text-primary transition-colors" href="#">Home</a>
            <a className="text-sm font-medium text-slate-300 hover:text-primary transition-colors" href="#menu">Menu</a>
            <a className="text-sm font-medium text-slate-300 hover:text-primary transition-colors" href="#rewards">Rewards</a>
            <a className="text-sm font-medium text-slate-300 hover:text-primary transition-colors" href="#location">Find Us</a>
          </nav>
          <div className="flex items-center gap-4">
            <button className="hidden sm:flex items-center justify-center p-2 text-primary hover:bg-primary/10 rounded-full transition-colors cursor-pointer">
              <span className="material-symbols-outlined">search</span>
            </button>
            <button className="bg-primary text-white px-5 py-2 rounded font-bold text-sm hover:bg-white hover:text-black hover:scale-105 transition-all uppercase tracking-wide neon-box-glow cursor-pointer shadow-[0_0_15px_#e6007e]">
              Shop Now
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative min-h-[700px] flex items-center justify-center overflow-hidden py-20 px-4">
          {/* Background Image with Overlay and Animation */}
          <div className="absolute inset-0 overflow-hidden z-0">
            <div
              className="absolute inset-0 bg-cover bg-center animate-slow-zoom opacity-70"
              style={{ backgroundImage: "url('/DEMO/lifted-spirits/images/Lifted-Spirits-hero-image.webp')" }}
            ></div>
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-background-dark/60 via-transparent to-background-dark z-10"></div>

          {/* Content inside glass frame */}
          <div className="relative z-20 max-w-3xl mx-auto text-center flex flex-col items-center gap-8">
            <div className="bg-black/50 backdrop-blur-xl border border-white/10 rounded-3xl px-10 py-14 shadow-2xl flex flex-col items-center gap-8 w-full">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-primary/30 bg-black/50 text-base font-bold tracking-widest uppercase animate-pulse text-primary shadow-[0_0_15px_rgba(230,0,126,0.3)]">
                <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_10px_#e6007e]"></span>
                Elevation Starts Here
              </div>
              <h1 className="text-5xl md:text-8xl font-black leading-tight tracking-tight">
                <span className="text-white">Elevate Your </span><br />
                <span className="bg-gradient-to-r from-primary via-purple-400 to-cyan-400 bg-clip-text text-transparent italic">Perspective</span>
              </h1>
              <p className="text-lg md:text-xl text-slate-200 max-w-2xl font-light leading-relaxed">
                Muskogee's premier boutique dispensary. Curated flower, artisanal concentrates, and an atmosphere designed to lift your spirits.
              </p>
              <div className="flex flex-col sm:flex-row gap-6">
                <button className="bg-primary text-white px-10 py-5 rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-white hover:text-black hover:shadow-[0_0_30px_rgba(230,0,126,0.8)] transition-all transform hover:-translate-y-1 cursor-pointer">
                  View Menu
                </button>
                <button className="border-2 border-primary text-primary px-10 py-5 rounded-lg font-bold text-lg uppercase tracking-wider hover:bg-primary hover:text-white transition-all cursor-pointer">
                  Our Story
                </button>
              </div>
            </div>
          </div>

          {/* Decorative UFO Beam */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-full bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl pointer-events-none z-0"></div>
        </section>

        {/* The Curation (Product Highlights) */}
        <section id="menu" className="py-24 px-4 bg-background-dark relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-16">
              <div className="space-y-4">
                <div className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Our Selection</div>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight neon-text-glow text-white">
                  The Curation
                </h2>
              </div>
              <a className="hidden md:flex items-center text-primary hover:text-white transition-colors font-bold uppercase tracking-widest text-sm border-b border-primary/30 pb-1" href="#">
                Browse Full Menu <span className="material-symbols-outlined ml-2 scale-75">arrow_forward</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {/* Card 1: Flower */}
              <div className="group relative bg-white/5 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,209,0.1)] flex flex-col h-[500px]">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('/DEMO/shared-images/lifted_spirits_flower_bloom.webp')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Luxe Flower</div>
                  <h3 className="text-3xl font-bold text-white mb-3">Artisanal Bloom</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">Exotic genetics and hand-trimmed colas. For the connoisseur who demands the purest expression of the plant.</p>
                  <button className="w-full py-4 bg-primary/10 border border-primary/40 text-primary font-black text-xs uppercase tracking-widest rounded-lg hover:bg-primary hover:text-black transition-all">
                    Explore Flower
                  </button>
                </div>
              </div>

              {/* Card 2: Concentrates */}
              <div className="group relative bg-white/5 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,209,0.1)] flex flex-col h-[500px]">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('/DEMO/lifted-spirits/images/gold_extract.webp')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Pure Extract</div>
                  <h3 className="text-3xl font-bold text-white mb-3">Gold Reserve</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">Live rosin and diamonds captured at peak potency. The cleanest lift-off in the Muskogee skyline.</p>
                  <button className="w-full py-4 bg-primary/10 border border-primary/40 text-primary font-black text-xs uppercase tracking-widest rounded-lg hover:bg-primary hover:text-black transition-all">
                    Explore Extracts
                  </button>
                </div>
              </div>

              {/* Card 3: Wellness */}
              <div className="group relative bg-white/5 backdrop-blur-xl border border-primary/20 rounded-2xl overflow-hidden hover:border-primary/60 transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,255,209,0.1)] flex flex-col h-[500px]">
                <div className="h-full w-full bg-cover bg-center transition-transform duration-1000 group-hover:scale-110" style={{ backgroundImage: "url('/DEMO/lifted-spirits/images/elevated_edibles.webp')" }}></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10"></div>
                <div className="absolute inset-0 p-8 flex flex-col justify-end z-20">
                  <div className="text-primary text-xs font-black uppercase tracking-[0.3em] mb-3">Modern Ritual</div>
                  <h3 className="text-3xl font-bold text-white mb-3">Elevated Edibles</h3>
                  <p className="text-slate-300 text-sm mb-6 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">Chef-inspired infusions that blend world-class flavor with precise, predictable results.</p>
                  <button className="w-full py-4 bg-primary/10 border border-primary/40 text-primary font-black text-xs uppercase tracking-widest rounded-lg hover:bg-primary hover:text-black transition-all">
                    Explore Edibles
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Section (Elevated Style) */}
        <section className="py-32 bg-background-light relative overflow-hidden">
          <div className="absolute inset-0 bg-aurora-gradient opacity-20 z-0"></div>

          <div className="max-w-6xl mx-auto px-4 relative z-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="relative">
                <div className="relative rounded-3xl overflow-hidden shadow-[0_0_60px_rgba(0,255,209,0.15)] border border-primary/10">
                  <img
                    alt="Boutique dispensary interior with warm lighting"
                    className="w-full aspect-square object-cover"
                    src="/DEMO/lifted-spirits/images/dispensary_interior_boutique.webp"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 to-transparent"></div>
                </div>

                {/* Floating quote card */}
                <div className="absolute -bottom-10 -right-10 bg-background-dark border border-primary/30 p-8 rounded-2xl shadow-2xl max-w-sm backdrop-blur-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">auto_awesome</span>
                    <span className="text-primary text-xs font-black uppercase tracking-widest">Client Testimonial</span>
                  </div>
                  <p className="text-white text-lg font-light italic leading-relaxed">"The atmosphere here is unmatched. It's not just a transaction; it's an experience that truly lifts your spirits."</p>
                  <div className="text-right text-sm text-primary/60 mt-4 font-bold">— Sarah J., Local Enthusiast</div>
                </div>
              </div>

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Community</div>
                  <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                    THE BOUTIQUE<br /><span className="text-primary italic">EXPERIENCE</span>
                  </h2>
                </div>
                <p className="text-xl text-slate-300 font-light leading-relaxed">
                  We believe cannabis should be celebrated. Our space is designed to be a sanctuary for the curious and the connoisseur alike. From our terpene discovery bar to our expert consultants, every detail is crafted to help you find your perfect lift.
                </p>
                <div className="flex items-center gap-8 border-l-2 border-primary/30 pl-8">
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">4.9/5</div>
                    <div className="text-xs text-primary uppercase font-bold tracking-widest">Rating</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">100+</div>
                    <div className="text-xs text-primary uppercase font-bold tracking-widest">Strains</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-black text-white">Muskogee</div>
                    <div className="text-xs text-primary uppercase font-bold tracking-widest">Location</div>
                  </div>
                </div>
                <div className="pt-6">
                  <button className="bg-primary text-black px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,209,0.3)]">
                    Join The Community
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Trusted Farms Marquee */}
        {(() => {
          const farms = [
            "Grow Happy Farms", "Green Dynasty Farms", "Stability Cannabis",
            "Heartland Farms", "Hicksford Farms", "7 Leaf",
            "Rosebuds Cannabis Co.", "Happy Hippy Farms", "Afterhours Farm", "Mystik Farms"
          ];
          const Row = ({ prefix }: { prefix: string }) => (
            <div className="flex shrink-0 gap-16 items-center flex-nowrap min-w-full" style={{ animation: 'ticker 30s linear infinite' }}>
              {farms.map((farm, i) => (
                <div key={`${prefix}-${i}`} className="flex items-center gap-16 whitespace-nowrap">
                  <span className="text-2xl font-bold text-slate-400 hover:text-primary transition-colors cursor-default tracking-wide">
                    {farm}
                  </span>
                  <span className="text-primary/40 text-xl">✦</span>
                </div>
              ))}
            </div>
          );
          return (
            <section className="relative z-10 bg-gradient-to-r from-background-dark via-primary/5 to-background-dark border-y border-primary/20 py-8 overflow-hidden">
              <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background-dark to-transparent z-20"></div>
              <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background-dark to-transparent z-20"></div>
              <p className="text-center text-primary/80 text-xs tracking-[0.3em] font-bold mb-6 uppercase">Our Trusted Farms</p>
              <div className="flex w-[200%] gap-12">
                <Row prefix="a" />
                <Row prefix="b" />
              </div>
            </section>
          );
        })()}

        {/* Spirits Club (Rewards Section) */}
        <section id="rewards" className="py-24 bg-background-dark relative border-y border-primary/10">
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-aurora-gradient rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-2xl border border-primary/20">
              <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -mr-48 -mt-48"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 blur-[120px] rounded-full -ml-48 -mb-48"></div>

              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                <div className="space-y-8">
                  <div className="space-y-4">
                    <div className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Loyalty Program</div>
                    <h2 className="text-5xl md:text-7xl font-black text-white leading-[0.9] tracking-tighter">
                      JOIN THE<br /><span className="text-primary">SPIRITS CLUB</span>
                    </h2>
                  </div>
                  <p className="text-xl text-slate-300 font-light leading-relaxed">
                    Elevate every purchase. Earn points on every visit, access exclusive small-batch drops, and receive invitations to private community events.
                  </p>
                  <ul className="space-y-4">
                    {[
                      "1 Point for every $1 spent",
                      "Early access to limited 'Spirit' flower drops",
                      "Birthday rewards & anniversary gifts",
                      "Private invitations to pop-up tastings"
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-white font-medium">
                        <span className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-sm">check</span>
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <input
                      type="text"
                      placeholder="Enter Mobile Number"
                      className="bg-black/50 border border-primary/30 rounded-xl px-6 py-4 text-white focus:outline-none focus:border-primary transition-all flex-grow font-bold"
                    />
                    <button className="bg-primary text-black px-10 py-4 rounded-xl font-black uppercase tracking-widest text-sm hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,209,0.3)]">
                      Join Club
                    </button>
                  </div>
                </div>

                <div className="relative">
                  <div className="bg-black/40 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-8 shadow-2xl space-y-8 transform rotate-3">
                    <div className="flex justify-between items-start">
                      <div className="space-y-1">
                        <div className="text-primary text-[10px] font-black uppercase tracking-[0.2em]">Member Status</div>
                        <div className="text-white text-2xl font-bold">Zenith Elite</div>
                      </div>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined">stars</span>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-slate-400 font-bold uppercase tracking-widest">
                        <span>Current Points</span>
                        <span className="text-primary">850 / 1000</span>
                      </div>
                      <div className="h-3 bg-white/5 rounded-full overflow-hidden border border-white/10">
                        <div className="h-full bg-primary w-[85%] shadow-[0_0_15px_#e6007e]"></div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="text-[10px] text-slate-400 uppercase font-black mb-1">Total Savings</div>
                        <div className="text-xl font-black text-white">$142.50</div>
                      </div>
                      <div className="bg-white/5 rounded-2xl p-4 border border-white/5">
                        <div className="text-[10px] text-slate-400 uppercase font-black mb-1">Rewards Ready</div>
                        <div className="text-xl font-black text-primary">3</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Scrolling Reviews Bar */}
        {(() => {
          const reviews = [
            { name: "Sarah J.", stars: 5, text: "The atmosphere here is unmatched. It's not just a transaction — it's an experience." },
            { name: "Marcus T.", stars: 5, text: "Best boutique dispensary in Muskogee. Staff is incredibly knowledgeable and the selection is elite." },
            { name: "Brianna K.", stars: 5, text: "I found my perfect indica strain on my first visit. They actually listened to what I needed." },
            { name: "Derek M.", stars: 5, text: "The Gold Reserve concentrates are next level. Cleanest dabs I've ever had." },
            { name: "Alyssa P.", stars: 5, text: "Love the Spirits Club rewards. I've already saved over $80 this month!" },
            { name: "Jordan L.", stars: 5, text: "Walked in skeptical, walked out a regular. The vibe alone is worth the visit." },
            { name: "Chris W.", stars: 5, text: "Every single budtender knows their stuff. Elevated edibles are my new obsession." },
          ];
          const ReviewCard = ({ review, prefix }: { review: typeof reviews[0], prefix: string }) => (
            <div key={`${prefix}-${review.name}`} className="flex-shrink-0 w-80 bg-white/5 backdrop-blur-xl border border-primary/20 rounded-2xl p-6 hover:border-primary/50 transition-all">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: review.stars }).map((_, i) => (
                  <span key={i} className="text-primary text-lg">★</span>
                ))}
              </div>
              <p className="text-slate-300 text-sm leading-relaxed italic mb-4">"{review.text}"</p>
              <div className="text-primary text-xs font-black uppercase tracking-widest">— {review.name}</div>
            </div>
          );
          return (
            <section className="py-16 bg-background-dark overflow-hidden border-t border-primary/10">
              <p className="text-center text-primary/80 text-xs tracking-[0.3em] font-bold mb-8 uppercase">What Our Community Says</p>
              <div className="flex gap-6" style={{ animation: 'ticker 40s linear infinite', width: '200%' }}>
                {[...reviews, ...reviews].map((r, i) => (
                  <ReviewCard key={i} review={r} prefix={String(i)} />
                ))}
              </div>
            </section>
          );
        })()}

        {/* Operational Details & Location */}
        <section id="location" className="py-32 bg-background-dark">
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-background-light rounded-[3rem] overflow-hidden shadow-2xl border border-primary/10">
              {/* Map/Image Side */}
              <div className="h-80 md:h-full min-h-[500px] w-full relative group">
                <div
                  className="absolute inset-0 bg-cover bg-center grayscale group-hover:grayscale-0 transition-all duration-1000 scale-105 group-hover:scale-100"
                  style={{ backgroundImage: "url('/DEMO/lifted-spirits/images/dispensary_interior_boutique.webp')" }}
                ></div>
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay pointer-events-none"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-[0_0_50px_#e6007e] animate-bounce">
                    <span className="material-symbols-outlined text-black text-4xl">location_on</span>
                  </div>
                </div>
              </div>

              {/* Info Side */}
              <div className="p-12 md:p-20 flex flex-col justify-center gap-12">
                <div className="space-y-4">
                  <div className="text-primary font-bold tracking-[0.2em] uppercase text-sm">Location</div>
                  <h2 className="text-5xl font-black text-white leading-tight">Base of Operations</h2>
                </div>

                <div className="space-y-10">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">explore</span>
                    </div>
                    <div>
                      <h3 className="text-white font-black text-xl mb-1 uppercase tracking-widest">Coordinates</h3>
                      <p className="text-slate-300 text-lg font-light">301 S Main St,<br />Muskogee, OK 74401</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                      <span className="material-symbols-outlined">schedule</span>
                    </div>
                    <div>
                      <h3 className="text-white font-black text-xl mb-1 uppercase tracking-widest">Docking Hours</h3>
                      <p className="text-slate-300 text-lg font-light">Mon - Sat: 10:00 AM - 9:00 PM</p>
                      <p className="text-slate-300 text-lg font-light">Sunday: 12:00 PM - 6:00 PM</p>
                    </div>
                  </div>
                </div>

                <div className="pt-8">
                  <a href="tel:918-577-6160" className="group flex w-full items-center justify-center gap-4 bg-primary text-black py-6 px-10 rounded-2xl font-black text-xl uppercase tracking-widest transition-all shadow-[0_0_30px_rgba(0,255,209,0.4)] hover:shadow-[0_0_50px_rgba(0,255,209,0.7)] hover:bg-white">
                    <span className="material-symbols-outlined group-hover:animate-shake">call</span>
                    Call the Sanctuary
                  </a>
                  <p className="text-center text-slate-500 text-sm mt-6 font-mono tracking-widest uppercase">Direct Line: 918-577-6160</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer — desktop only */}
      <footer className="hidden md:block bg-black text-slate-400 py-20 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4">

          {/* Top row: logo + social links */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-12 mb-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full border border-primary/30 flex items-center justify-center bg-primary/5">
                <span className="material-symbols-outlined text-primary text-2xl">auto_awesome</span>
              </div>
              <span className="text-3xl font-black text-white tracking-tighter uppercase">LIFTED SPIRITS</span>
            </div>
            <div className="flex gap-6 items-center">
              {/* Meta / Facebook */}
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group text-slate-400 font-black text-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M22 12a10 10 0 1 0-11.563 9.876v-6.988H7.9V12h2.537V9.797c0-2.506 1.493-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.888h-2.33v6.988A10.003 10.003 0 0 0 22 12Z" /></svg>
              </a>
              {/* X / Twitter */}
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" title="X (Twitter)" className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group text-slate-400 font-black text-sm">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
              </a>
              {/* Weedmaps */}
              <a href="https://weedmaps.com" target="_blank" rel="noopener noreferrer" title="Weedmaps" className="w-auto h-12 px-4 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary hover:text-white transition-all group text-slate-400 font-black text-xs tracking-widest uppercase gap-2">
                <span className="text-lg">🌿</span> Weedmaps
              </a>
            </div>
          </div>

          {/* Gnomad Studio branding — prominent, linked */}
          <div className="border-t border-white/5 pt-10 mb-8 text-center">
            <a
              href="https://gnomadstudio.org"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-white/50 hover:text-primary transition-colors text-base font-bold tracking-wider group"
            >
              Made with ❤️ by
              <span className="text-primary group-hover:text-white transition-colors font-black text-lg tracking-tight">Gnomad Studio 🦙</span>
            </a>
          </div>

          {/* Bottom row: legal */}
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold uppercase tracking-[0.2em] gap-6">
            <div className="flex items-center gap-3 text-primary">
              <span className="material-symbols-outlined text-lg">verified_user</span>
              <span>21+ Medical Patients Only</span>
            </div>
            <p>© 2026 LIFTED SPIRITS MUSKOGEE. CURATED ELEVATION.</p>
          </div>
          <div className="text-[10px] text-zinc-700 mt-8 text-center max-w-3xl mx-auto font-medium leading-relaxed uppercase">
            Warning: Marijuana has intoxicating effects and may be habit forming and addictive. Marijuana impairs concentration, coordination, and judgment. Do not operate a vehicle or machinery under the influence of this drug. For use only by adults 21 and older. Keep out of the reach of children.
          </div>
        </div>
      </footer>


      {/* Mobile Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4">
        <div className="absolute inset-0 bg-black/80 backdrop-blur-2xl border-t border-white/10 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]"></div>

        <div className="relative max-w-md mx-auto">
          {/* Status Indicator */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-black border border-primary/30 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-2xl">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_#e6007e]"></span>
            <span className="text-[10px] font-black text-white uppercase tracking-widest">Open Now</span>
          </div>

          <div className="flex items-center justify-between px-2">
            <a href="tel:918-577-6160" className="flex flex-col items-center gap-1 text-slate-400 py-2 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-active:bg-primary group-active:text-black transition-all">
                <span className="material-symbols-outlined">call</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter">Call Now</span>
            </a>

            <a href="#menu" className="flex flex-col items-center gap-1 text-slate-400 py-2 group -mt-4">
              <div className="w-16 h-16 rounded-3xl bg-primary flex items-center justify-center text-white shadow-[0_0_30px_rgba(230,0,126,0.5)] group-active:scale-95 transition-all">
                <span className="material-symbols-outlined text-3xl">restaurant_menu</span>
              </div>
              <span className="text-[9px] font-black text-primary uppercase tracking-tighter">View Menu</span>
            </a>

            <a href="#location" className="flex flex-col items-center gap-1 text-slate-400 py-2 group">
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center group-active:bg-primary group-active:text-black transition-all">
                <span className="material-symbols-outlined">near_me</span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-tighter">Map Info</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
