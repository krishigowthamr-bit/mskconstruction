import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Company", "Services", "Projects", "Packages", "Resources", "Contact Us"];

const SERVICES = [
  {
    icon: "🏛",
    title: "Architecture",
    desc: "Our expert architects create innovative, functional designs tailored to your unique vision and lifestyle.",
    cta: "Get Architecture Help",
  },
  {
    icon: "🏗",
    title: "Construction",
    desc: "As a leading construction company, we deliver exceptional residential and commercial projects on time.",
    cta: "Start Your Construction",
  },
  {
    icon: "🛋",
    title: "Interior Design",
    desc: "Transform your spaces with bespoke interior design solutions that reflect your personal style.",
    cta: "Talk to Our Designers",
  },
  {
    icon: "🔨",
    title: "Renovation",
    desc: "Revitalize your existing spaces with expert renovation services enhancing functionality and aesthetics.",
    cta: "Plan Your Renovation",
  },
];

const PROCESS = [
  { num: "01", title: "Discussion", desc: "Initial meeting to understand scope, design ideas, and preliminary budget considerations." },
  { num: "02", title: "Agreement", desc: "Finalise scope, timelines, and sign the project agreement with complete transparency." },
  { num: "03", title: "Design", desc: "Our architects prepare detailed blueprints tailored to your requirements and Vastu norms." },
  { num: "04", title: "Execution", desc: "Skilled teams execute on-site with real-time progress tracking via our dedicated app." },
  { num: "05", title: "Handover", desc: "Final walkthrough and handover of your dream home, built to the highest quality standards." },
];

const WHY = [
  { icon: "🏅", title: "15+ Years of Excellence", desc: "Deep expertise in turnkey luxury construction across Chennai." },
  { icon: "📋", title: "ISO 9001:2015 Certified", desc: "Certified quality assurance on every single project we undertake." },
  { icon: "📱", title: "Transparent Tracking", desc: "Real-time project updates via our proprietary tracking application." },
  { icon: "🧭", title: "Vastu Compliant", desc: "Expert in crafting homes that align with Vastu Shastra principles." },
  { icon: "⏱", title: "On-Time Delivery", desc: "We respect your time — deadlines are commitments, not suggestions." },
  { icon: "🤝", title: "Personalised Service", desc: "Dedicated architect and project manager for every single client." },
];

const PROJECTS = [
  { name: "Palatial G+2 Luxury Home", location: "Sholinganallur", area: "4,200 sq ft", type: "Residential", color: "#C8A97E" },
  { name: "Modern Duplex Villa", location: "OMR, Perungudi", area: "3,100 sq ft", type: "Villa", color: "#8BA888" },
  { name: "Contemporary Apartment", location: "Velachery", area: "1,800 sq ft", type: "Interior", color: "#8A9CB0" },
  { name: "Premium Row House", location: "Medavakkam", area: "2,400 sq ft", type: "Residential", color: "#B8926A" },
];

const STATS = [
  { value: "500+", label: "Projects Completed" },
  { value: "15+", label: "Years of Experience" },
  { value: "98%", label: "Client Satisfaction" },
  { value: "ISO", label: "9001:2015 Certified" },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setActiveStep(s => (s + 1) % PROCESS.length), 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", background: "#0D0D0D", color: "#F0EDE6", minHeight: "100vh", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::selection { background: #C8A97E44; }
        html { scroll-behavior: smooth; }
        .sans { font-family: 'DM Sans', sans-serif; }
        .btn-gold {
          background: linear-gradient(135deg, #C8A97E, #A8845A);
          color: #1a1208;
          border: none;
          padding: 14px 32px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 500;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-gold:hover { background: linear-gradient(135deg, #DDB98E, #C8A97E); transform: translateY(-1px); }
        .btn-outline {
          background: transparent;
          color: #C8A97E;
          border: 1px solid #C8A97E66;
          padding: 12px 28px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          cursor: pointer;
          transition: all 0.3s ease;
        }
        .btn-outline:hover { border-color: #C8A97E; background: #C8A97E0D; }
        .service-card {
          border: 1px solid #2a2820;
          padding: 40px 32px;
          transition: all 0.4s ease;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .service-card::before {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0; height: 2px;
          background: linear-gradient(90deg, #C8A97E, #A8845A);
          transition: width 0.4s ease;
        }
        .service-card:hover::before { width: 100%; }
        .service-card:hover { border-color: #3a3830; background: #141410; transform: translateY(-4px); }
        .project-card {
          position: relative;
          overflow: hidden;
          cursor: pointer;
        }
        .project-card img { transition: transform 0.6s ease; }
        .project-card:hover img { transform: scale(1.05); }
        .project-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 60%);
          padding: 24px;
          display: flex; flex-direction: column; justify-content: flex-end;
        }
        .why-card {
          padding: 32px;
          border: 1px solid #1e1c18;
          transition: border-color 0.3s;
        }
        .why-card:hover { border-color: #C8A97E44; }
        .divider {
          width: 48px; height: 1px;
          background: linear-gradient(90deg, #C8A97E, transparent);
          margin: 16px 0;
        }
        .step-dot {
          width: 10px; height: 10px;
          border-radius: 50%;
          border: 1px solid #C8A97E66;
          cursor: pointer;
          transition: all 0.3s;
        }
        .step-dot.active { background: #C8A97E; border-color: #C8A97E; }
        .nav-link {
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          font-weight: 400;
          letter-spacing: 0.06em;
          color: #C8BBA8;
          text-decoration: none;
          transition: color 0.2s;
          cursor: pointer;
        }
        .nav-link:hover { color: #F0EDE6; }
        .gold { color: #C8A97E; }
        .muted { color: #7A7568; }
        .tag {
          font-family: 'DM Sans', sans-serif;
          font-size: 11px;
          letter-spacing: 0.15em;
          text-transform: uppercase;
          color: #C8A97E;
          border: 1px solid #C8A97E44;
          padding: 5px 14px;
          display: inline-block;
        }
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .hero-title { font-size: 42px !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .projects-grid { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* NAV */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        padding: scrolled ? "16px 48px" : "24px 48px",
        background: scrolled ? "rgba(13,13,13,0.96)" : "transparent",
        borderBottom: scrolled ? "1px solid #1e1c18" : "none",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        transition: "all 0.4s ease", backdropFilter: scrolled ? "blur(12px)" : "none",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ width: 36, height: 36, border: "1px solid #C8A97E", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#C8A97E", fontWeight: 600, fontSize: 16 }}>J</span>
          </div>
          <div>
            <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: "0.08em" }}>JRM</div>
            <div className="sans muted" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Construction</div>
          </div>
        </div>

        <div className="hide-mobile" style={{ display: "flex", gap: 40 }}>
          {NAV_LINKS.map(link => (
            <span key={link} className="nav-link">{link}</span>
          ))}
        </div>

        <div className="hide-mobile">
          <button className="btn-gold">Free Consultation</button>
        </div>

        <button
          className="sans"
          onClick={() => setMenuOpen(!menuOpen)}
          style={{ display: "none", background: "none", border: "none", color: "#F0EDE6", fontSize: 22, cursor: "pointer" }}
        >☰</button>
      </nav>

      {/* HERO */}
      <section ref={heroRef} style={{
        minHeight: "100vh",
        background: "linear-gradient(160deg, #0D0D0D 0%, #141210 40%, #1a1510 100%)",
        display: "flex", alignItems: "center",
        padding: "0 48px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* decorative grid lines */}
        <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "linear-gradient(#C8A97E 1px, transparent 1px), linear-gradient(90deg, #C8A97E 1px, transparent 1px)", backgroundSize: "80px 80px", pointerEvents: "none" }} />

        {/* large decorative text */}
        <div style={{ position: "absolute", right: -20, top: "50%", transform: "translateY(-50%)", fontSize: 280, fontWeight: 300, color: "#C8A97E", opacity: 0.03, lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>JRM</div>

        <div style={{ maxWidth: 680, position: "relative", zIndex: 2, paddingTop: 100 }}>
          <div className="tag" style={{ marginBottom: 32 }}>Builders in Chennai · Est. 2008</div>

          <h1 className="hero-title" style={{ fontSize: 72, fontWeight: 300, lineHeight: 1.08, letterSpacing: "-0.01em", marginBottom: 28 }}>
            Building Your<br />
            <em style={{ fontStyle: "italic", color: "#C8A97E" }}>Dream Home</em><br />
            with Excellence
          </h1>

          <p className="sans" style={{ fontSize: 16, color: "#8A8070", lineHeight: 1.8, marginBottom: 44, maxWidth: 480 }}>
            JRM Construction — trusted architects and builders in Chennai delivering expert architecture, interior design, and renovation services for over 15 years.
          </p>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <button className="btn-gold">Contact Us for Free Consultation</button>
            <button className="btn-outline">View Our Projects</button>
          </div>

          {/* stats row */}
          <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0, marginTop: 72, borderTop: "1px solid #1e1c18", paddingTop: 40 }}>
            {STATS.map((s, i) => (
              <div key={i} style={{ paddingRight: 32, borderRight: i < 3 ? "1px solid #1e1c18" : "none", paddingLeft: i > 0 ? 32 : 0 }}>
                <div style={{ fontSize: 32, fontWeight: 300, color: "#C8A97E" }}>{s.value}</div>
                <div className="sans muted" style={{ fontSize: 12, letterSpacing: "0.06em", marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* hero image block */}
        <div style={{ position: "absolute", right: 48, top: "50%", transform: "translateY(-50%)", width: 420, display: "flex", flexDirection: "column", gap: 16 }} className="hide-mobile">
          <div style={{ height: 280, background: "linear-gradient(135deg, #1e1a14 0%, #2a2318 100%)", border: "1px solid #2a2820", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" }}>
            <div style={{ fontSize: 80, opacity: 0.3 }}>🏛</div>
            <div style={{ position: "absolute", bottom: 20, left: 20 }}>
              <div style={{ fontSize: 13, color: "#C8A97E", fontStyle: "italic" }}>Palatial G+2 Villa</div>
              <div className="sans muted" style={{ fontSize: 11 }}>Sholinganallur, Chennai</div>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
            <div style={{ height: 120, background: "linear-gradient(135deg, #1a1814 0%, #232018 100%)", border: "1px solid #2a2820", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, opacity: 0.6 }}>🛋</div>
            <div style={{ height: 120, background: "linear-gradient(135deg, #141614 0%, #1a2018 100%)", border: "1px solid #2a2820", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 40, opacity: 0.6 }}>🏗</div>
          </div>
        </div>
      </section>

      {/* ABOUT STRIP */}
      <section style={{ background: "#C8A97E", padding: "32px 48px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, flexWrap: "wrap" }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 22, fontWeight: 600, color: "#1a1208" }}>15+ Years of Building Excellence in Chennai</div>
        <div className="sans" style={{ fontSize: 13, color: "#3a2e18", maxWidth: 480, lineHeight: 1.6 }}>
          ISO 9001:2015 certified. Recognised as one of the Top 10 Architecture Firms in Chennai 2024 by SiliconIndia Magazine.
        </div>
        <button style={{ background: "#1a1208", color: "#C8A97E", border: "none", padding: "12px 28px", fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", whiteSpace: "nowrap" }}>
          Request Consultation
        </button>
      </section>

      {/* SERVICES */}
      <section style={{ padding: "100px 48px", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 60 }}>
            <div className="tag">What We Do</div>
            <h2 style={{ fontSize: 52, fontWeight: 300, marginTop: 20, lineHeight: 1.1 }}>
              Construction, Architecture<br />& <em style={{ fontStyle: "italic", color: "#C8A97E" }}>Design Services</em>
            </h2>
          </div>

          <div className="services-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#1a1810" }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="service-card" style={{ background: "#0D0D0D" }}>
                <div style={{ fontSize: 36, marginBottom: 20 }}>{s.icon}</div>
                <h3 style={{ fontSize: 26, fontWeight: 400, marginBottom: 12 }}>{s.title}</h3>
                <div className="divider" />
                <p className="sans" style={{ fontSize: 14, color: "#6A6358", lineHeight: 1.8, marginBottom: 28 }}>{s.desc}</p>
                <button className="btn-outline" style={{ fontSize: 12, padding: "10px 20px" }}>{s.cta} →</button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESS */}
      <section style={{ padding: "100px 48px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <div className="tag">How We Work</div>
            <h2 style={{ fontSize: 52, fontWeight: 300, marginTop: 20, lineHeight: 1.1 }}>
              From <em style={{ fontStyle: "italic", color: "#C8A97E" }}>Concept</em> to Completion
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="hide-mobile">
            {/* steps list */}
            <div>
              {PROCESS.map((p, i) => (
                <div
                  key={i}
                  onClick={() => setActiveStep(i)}
                  style={{
                    padding: "28px 0",
                    borderBottom: "1px solid #1e1c18",
                    cursor: "pointer",
                    display: "flex",
                    gap: 24,
                    alignItems: "flex-start",
                    opacity: activeStep === i ? 1 : 0.45,
                    transition: "opacity 0.3s",
                  }}
                >
                  <span style={{ color: "#C8A97E", fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.1em", minWidth: 28, paddingTop: 4 }}>{p.num}</span>
                  <div>
                    <div style={{ fontSize: 22, fontWeight: 400, marginBottom: 8 }}>{p.title}</div>
                    <p className="sans" style={{ fontSize: 13, color: "#6A6358", lineHeight: 1.7 }}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* active step display */}
            <div style={{ border: "1px solid #2a2820", padding: 48, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 24, right: 28, fontFamily: "'Cormorant Garamond', serif", fontSize: 120, fontWeight: 300, color: "#C8A97E", opacity: 0.07, lineHeight: 1 }}>{PROCESS[activeStep].num}</div>
              <div className="tag" style={{ marginBottom: 28 }}>Step {parseInt(PROCESS[activeStep].num)} of {PROCESS.length}</div>
              <h3 style={{ fontSize: 40, fontWeight: 300, marginBottom: 20, color: "#F0EDE6" }}>{PROCESS[activeStep].title}</h3>
              <div className="divider" />
              <p className="sans" style={{ fontSize: 15, color: "#8A8070", lineHeight: 1.9, marginBottom: 32 }}>{PROCESS[activeStep].desc}</p>

              <div style={{ display: "flex", gap: 8 }}>
                {PROCESS.map((_, i) => (
                  <div key={i} className={`step-dot${activeStep === i ? " active" : ""}`} onClick={() => setActiveStep(i)} />
                ))}
              </div>
            </div>
          </div>

          {/* Mobile process list */}
          <div style={{ display: "none" }} className="show-mobile">
            {PROCESS.map((p, i) => (
              <div key={i} style={{ padding: "24px 0", borderBottom: "1px solid #1e1c18", display: "flex", gap: 20 }}>
                <span className="gold sans" style={{ fontSize: 12, minWidth: 24 }}>{p.num}</span>
                <div>
                  <div style={{ fontSize: 20, marginBottom: 8 }}>{p.title}</div>
                  <p className="sans muted" style={{ fontSize: 13, lineHeight: 1.7 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY US */}
      <section style={{ padding: "100px 48px", background: "#0D0D0D" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 80, alignItems: "start" }} className="hide-mobile">
            <div>
              <div className="tag">Why Choose Us</div>
              <h2 style={{ fontSize: 48, fontWeight: 300, marginTop: 20, lineHeight: 1.1 }}>
                Why JRM<br /><em style={{ fontStyle: "italic", color: "#C8A97E" }}>Stands Apart</em>
              </h2>
              <div className="divider" style={{ marginTop: 28 }} />
              <p className="sans" style={{ fontSize: 14, color: "#6A6358", lineHeight: 1.8, marginTop: 20, marginBottom: 36 }}>
                Choosing JRM Construction means choosing a partner who is invested in your vision as much as you are.
              </p>
              <button className="btn-gold">Learn More</button>
            </div>

            <div className="why-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "#1a1810" }}>
              {WHY.map((w, i) => (
                <div key={i} className="why-card" style={{ background: "#0D0D0D" }}>
                  <div style={{ fontSize: 28, marginBottom: 16 }}>{w.icon}</div>
                  <h4 style={{ fontSize: 20, fontWeight: 400, marginBottom: 10, color: "#E0D8CC" }}>{w.title}</h4>
                  <p className="sans" style={{ fontSize: 13, color: "#6A6358", lineHeight: 1.7 }}>{w.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section style={{ padding: "100px 48px", background: "#0A0A08" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48 }}>
            <div>
              <div className="tag">Portfolio</div>
              <h2 style={{ fontSize: 52, fontWeight: 300, marginTop: 20, lineHeight: 1.1 }}>
                Featured <em style={{ fontStyle: "italic", color: "#C8A97E" }}>Projects</em>
              </h2>
            </div>
            <button className="btn-outline hide-mobile">View All Projects →</button>
          </div>

          <div className="projects-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {PROJECTS.map((p, i) => (
              <div key={i} className="project-card" style={{ height: i === 0 ? 400 : 300 }}>
                <div style={{
                  width: "100%", height: "100%",
                  background: `linear-gradient(135deg, ${p.color}22 0%, #1a1810 100%)`,
                  border: "1px solid #2a2820",
                  position: "relative",
                  overflow: "hidden",
                }}>
                  <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 80, opacity: 0.1 }}>🏠</div>
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 100%)", padding: "24px" }}>
                    <div className="tag" style={{ marginBottom: 10, borderColor: `${p.color}44`, color: p.color }}>{p.type}</div>
                    <div style={{ fontSize: 20, fontWeight: 400, color: "#F0EDE6" }}>{p.name}</div>
                    <div className="sans" style={{ fontSize: 12, color: "#7A7568", marginTop: 4 }}>{p.location} · {p.area}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{
        padding: "100px 48px",
        background: "linear-gradient(160deg, #1a1510 0%, #211c12 100%)",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}>
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 600, height: 600, borderRadius: "50%", background: "#C8A97E", opacity: 0.04, filter: "blur(80px)", pointerEvents: "none" }} />
        <div style={{ position: "relative", zIndex: 2 }}>
          <div className="tag" style={{ marginBottom: 28 }}>Let's Build Together</div>
          <h2 style={{ fontSize: 60, fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>
            Ready to Build Your<br /><em style={{ fontStyle: "italic", color: "#C8A97E" }}>Dream Home?</em>
          </h2>
          <p className="sans" style={{ fontSize: 15, color: "#6A6358", marginBottom: 44, maxWidth: 480, margin: "0 auto 44px" }}>
            Get in touch with our team for a free consultation. We'll walk you through the entire journey from concept to handover.
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-gold" style={{ padding: "16px 44px", fontSize: 14 }}>Contact Us for Free Consultation</button>
            <button className="btn-outline" style={{ padding: "16px 44px", fontSize: 14 }}>+91 98765 43210</button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#080806", padding: "60px 48px 32px", borderTop: "1px solid #1e1c18" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, marginBottom: 60 }} className="hide-mobile">
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 36, height: 36, border: "1px solid #C8A97E44", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ color: "#C8A97E", fontWeight: 600 }}>J</span>
                </div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15, letterSpacing: "0.08em" }}>JRM Construction</div>
                  <div className="sans muted" style={{ fontSize: 10, letterSpacing: "0.2em", textTransform: "uppercase" }}>Builders in Chennai</div>
                </div>
              </div>
              <p className="sans" style={{ fontSize: 13, color: "#4A4540", lineHeight: 1.8, maxWidth: 280 }}>
                Trusted builders in Chennai delivering expert architecture, interior design, and renovation services for over 15 years.
              </p>
            </div>

            {[
              { heading: "Services", links: ["Architecture", "Construction", "Interior Design", "Renovation"] },
              { heading: "Company", links: ["About Us", "Projects", "Packages", "Resources"] },
              { heading: "Contact", links: ["Chennai, Tamil Nadu", "+91 98765 43210", "hello@jrmconstruction.in", "Mon–Sat 9am–6pm"] },
            ].map((col, i) => (
              <div key={i}>
                <div className="sans" style={{ fontSize: 11, letterSpacing: "0.2em", textTransform: "uppercase", color: "#C8A97E", marginBottom: 20 }}>{col.heading}</div>
                {col.links.map(l => (
                  <div key={l} className="sans" style={{ fontSize: 13, color: "#4A4540", marginBottom: 10, cursor: "pointer" }}>{l}</div>
                ))}
              </div>
            ))}
          </div>

          <div style={{ borderTop: "1px solid #1e1c18", paddingTop: 28, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
            <div className="sans" style={{ fontSize: 12, color: "#3A3530" }}>
              © 2025 JRM Construction. All rights reserved. ISO 9001:2015 Certified.
            </div>
            <div style={{ display: "flex", gap: 20 }}>
              {["Instagram", "YouTube", "LinkedIn", "Facebook"].map(s => (
                <span key={s} className="sans" style={{ fontSize: 12, color: "#4A4540", cursor: "pointer" }}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}