import { useState } from "react";

const ACCENT = "#C9A96E";
const BG = "#0a0a0a";
const BORDER = "rgba(255,255,255,0.08)";
function PrivacyPolicy({ onClose }) {
  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: "'Inter',-apple-system,sans-serif", color: "#fff", padding: "2rem 1rem" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');*{box-sizing:border-box;}`}</style>
      <div style={{ maxWidth: 680, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", paddingBottom: "1rem", borderBottom: `1px solid ${BORDER}` }}>
          <div style={{ fontSize: "1rem", fontWeight: 700 }}>Dom Maier <em style={{ color: ACCENT, fontStyle: "italic" }}>Finance</em></div>
          <button onClick={onClose} style={{ padding: "0.5rem 1rem", borderRadius: 4, cursor: "pointer", background: "transparent", border: `1px solid ${BORDER}`, color: "rgba(255,255,255,0.4)", fontSize: "0.82rem", fontFamily: "inherit" }}>← Back</button>
        </div>
        <h1 style={{ fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.5rem" }}>Privacy Policy</h1>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.8rem", marginBottom: "2rem" }}>Last updated: June 9, 2026</p>
        {[
          ["1. Who We Are", "Dom Maier Finance ('we', 'us', or 'our') operates dommaierfinance.com and its subdomains, providing financial education, credit coaching resources, and mortgage readiness tools. We are not a lender, credit repair organization, or licensed financial advisor."],
          ["2. Information We Collect", "When you use our Mortgage Readiness Score tool, we collect your name, email address, phone number, and quiz responses for the purpose of generating your score and connecting you with relevant services."],
          ["3. How We Use Your Information", "We use your information to: deliver your mortgage readiness results; contact you about consultation requests; send follow-up educational content; and connect you with relevant financial products and services, which may include mortgage lenders, debt consolidation companies, and credit repair services."],
          ["4. Sharing Your Information", "We may share your information with third-party partners including mortgage lenders, debt consolidation companies, credit repair services, and other financial service providers who may contact you regarding their products and services. By submitting your information, you consent to this sharing. We do not sell your information to unrelated third parties."],
          ["5. TCPA Consent & Communications", "By submitting your name, email, and phone number on this site, you expressly consent to receive autodialed and/or pre-recorded calls, text messages, and emails from Dom Maier Finance and its marketing partners at the number and email address provided, even if your number is on a Do Not Call list. Consent is not a condition of purchase or receiving any service. Message and data rates may apply. You may opt out at any time by replying STOP to any text message or emailing dommaier.finance@gmail.com."],
          ["6. Fair Housing & Equal Opportunity", "Dom Maier Finance is committed to the principles of the Fair Housing Act and the Equal Credit Opportunity Act. We do not discriminate based on race, color, religion, national origin, sex, disability, familial status, or any other characteristic protected by law."],
          ["7. Your Rights & Choices", "You may request to access, correct, or delete your personal information at any time by contacting us at dommaier.finance@gmail.com. California residents may have additional rights under the CCPA."],
          ["8. Data Security", "We implement reasonable security measures to protect your information. However, no method of transmission over the internet is 100% secure and we cannot guarantee absolute security."],
          ["9. Third-Party Links", "Our site may contain links to third-party websites. We are not responsible for the privacy practices of those sites and encourage you to review their privacy policies."],
          ["10. Changes to This Policy", "We may update this policy from time to time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance."],
          ["11. Contact Us", "Questions about this privacy policy? Contact us at dommaier.finance@gmail.com or visit dommaierfinance.com."],
        ].map(([title, body]) => (
          <div key={title} style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#fff", marginBottom: "0.5rem" }}>{title}</h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "0.88rem", lineHeight: 1.7, margin: 0 }}>{body}</p>
          </div>
        ))}
        <div style={{ marginTop: "2rem", padding: "1rem", background: "rgba(201,169,110,0.05)", border: `1px solid rgba(201,169,110,0.2)`, borderRadius: 4 }}>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: "0.78rem", lineHeight: 1.6, margin: 0 }}>
            <strong style={{ color: "rgba(255,255,255,0.6)" }}>Disclaimer:</strong> Dom Maier Finance provides educational information only. Nothing on this site constitutes financial, legal, or credit repair advice. Results vary. Credit scores and mortgage eligibility depend on many factors. Always consult a licensed professional for advice specific to your situation.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage() {
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);

  if (showPrivacy) return <PrivacyPolicy onClose={() => setShowPrivacy(false)} />;

  async function handleSubmit() {
    if (!form.name.trim() || !form.email.trim() || !form.phone.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError("Please enter a valid email address.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          score: 0,
          score_cat: "facebook-lead",
          submittedAt: new Date().toISOString(),
        }),
      });
    } catch (e) {}
    setLoading(false);
    window.location.href = "https://mortgage.dommaierfinance.com";
  }

  return (
    <div style={{
      minHeight: "100vh", background: BG,
      fontFamily: "'Inter',-apple-system,sans-serif", color: "#fff",
      display: "flex", flexDirection: "column", alignItems: "center",
      justifyContent: "center", padding: "2rem 1rem",
      backgroundImage: "radial-gradient(ellipse at 30% 20%, rgba(201,169,110,0.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(201,169,110,0.04) 0%, transparent 60%)",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        input::placeholder { color: rgba(255,255,255,0.2); }
        .gi:focus { border-color: rgba(201,169,110,0.5) !important; outline: none; }
      `}</style>

      <div style={{ width: "100%", maxWidth: 520 }}>

        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ fontSize: "1rem", fontWeight: 700, marginBottom: "1.75rem" }}>
            Dom Maier <em style={{ color: ACCENT, fontStyle: "italic" }}>Finance</em>
          </div>

          {/* Badge */}
          <div style={{ display: "inline-block", padding: "0.3rem 1rem", borderRadius: 3, background: "rgba(201,169,110,0.1)", border: "1px solid rgba(201,169,110,0.25)", color: ACCENT, fontSize: "0.7rem", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", marginBottom: "1.25rem" }}>
            Free Assessment
          </div>

          {/* Headline */}
          <h1 style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: "clamp(2rem,6vw,2.8rem)", fontWeight: 700, lineHeight: 1.1, margin: "0 0 1rem", letterSpacing: "-0.02em" }}>
            Are You <em style={{ fontStyle: "italic", color: ACCENT }}>Mortgage Ready?</em>
          </h1>

          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "1rem", lineHeight: 1.65, margin: "0 0 1.5rem", maxWidth: 420, marginLeft: "auto", marginRight: "auto" }}>
            Take our free 8-question assessment and get your personalized Mortgage Readiness Score — plus exactly what's blocking you from getting approved.
          </p>

          {/* Trust badges */}
          <div style={{ display: "flex", justifyContent: "center", gap: "1.25rem", flexWrap: "wrap" }}>
            {["Takes 2 minutes", "100% Free", "No credit pull required"].map(b => (
              <div key={b} style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)" }}>
                <span style={{ color: ACCENT, fontWeight: 700 }}>✓</span> {b}
              </div>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div style={{ background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 8, padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ fontSize: "0.65rem", color: ACCENT, letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 600, marginBottom: "1.25rem" }}>
            Get Your Free Score
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "1.25rem" }}>
            {[
              { key: "name", label: "Full Name", placeholder: "Jane Smith", type: "text" },
              { key: "email", label: "Email Address", placeholder: "jane@example.com", type: "email" },
              { key: "phone", label: "Phone Number", placeholder: "(555) 000-0000", type: "tel" },
            ].map(field => (
              <div key={field.key}>
                <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: "0.35rem" }}>{field.label}</div>
                <input
                  className="gi"
                  type={field.type}
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm(prev => ({ ...prev, [field.key]: e.target.value }))}
                  onKeyDown={e => e.key === "Enter" && handleSubmit()}
                  style={{ width: "100%", padding: "0.8rem 1rem", background: "rgba(255,255,255,0.03)", border: `1px solid ${BORDER}`, borderRadius: 4, color: "#fff", fontSize: "0.9rem", fontFamily: "inherit" }}
                />
              </div>
            ))}
          </div>

          {error && <p style={{ color: "#ef4444", fontSize: "0.8rem", marginBottom: "0.75rem" }}>{error}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            style={{
              width: "100%", padding: "0.95rem", borderRadius: 4, cursor: "pointer",
              background: ACCENT, border: "none", color: "#0a0a0a",
              fontWeight: 700, fontSize: "1rem", fontFamily: "inherit",
              letterSpacing: "0.06em", textTransform: "uppercase",
              opacity: loading ? 0.7 : 1,
              boxShadow: "0 4px 20px rgba(201,169,110,0.25)",
            }}
          >
            {loading ? "Loading..." : "Get My Free Score →"}
          </button>

          {/* TCPA Consent */}
          <p style={{ color: "rgba(255,255,255,0.18)", fontSize: "0.67rem", lineHeight: 1.55, marginTop: "1rem", textAlign: "center" }}>
            By submitting this form, I consent to receive autodialed calls, texts, and emails from Dom Maier Finance and its partners regarding mortgage and financial products, even if my number is on a Do Not Call list. Consent is not required to purchase. Msg & data rates may apply. I have read and agree to the{" "}
            <span onClick={() => setShowPrivacy(true)} style={{ color: ACCENT, cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>.
          </p>
        </div>

        {/* Social proof */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginBottom: "1.5rem" }}>
          {[
            { stat: "13 yrs", label: "Industry Experience" },
            { stat: "Free", label: "No Cost, No Catch" },
            { stat: "2 min", label: "To Complete" },
          ].map(({ stat, label }) => (
            <div key={label} style={{ textAlign: "center", padding: "1rem 0.5rem", background: "rgba(255,255,255,0.02)", border: `1px solid ${BORDER}`, borderRadius: 6 }}>
              <div style={{ fontSize: "1.3rem", fontWeight: 700, color: ACCENT, fontFamily: "'Playfair Display',serif" }}>{stat}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(255,255,255,0.3)", marginTop: "0.2rem" }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Legal footer */}
        <div style={{ textAlign: "center" }}>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.68rem", lineHeight: 1.6, margin: "0 0 0.5rem" }}>
            Dom Maier Finance provides educational information only. Nothing on this site constitutes financial, legal, or credit repair advice. Results vary. We are committed to the Fair Housing Act and Equal Credit Opportunity Act.
          </p>
          <p style={{ color: "rgba(255,255,255,0.15)", fontSize: "0.68rem", margin: 0 }}>
            © 2026 Dom Maier Finance ·{" "}
            <span onClick={() => setShowPrivacy(true)} style={{ color: "rgba(201,169,110,0.4)", cursor: "pointer", textDecoration: "underline" }}>Privacy Policy</span>
          </p>
        </div>
      </div>
    </div>
  );
}
