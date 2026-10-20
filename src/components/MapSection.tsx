export default function MapSection() {
  return (
    <section
      id="find-us"
      className="section"
      style={{ backgroundColor: "var(--bg-page)", borderTop: "1px solid var(--border-subtle)" }}
    >
      <div className="container" style={{ textAlign: "center" }}>
        <h2 style={{ marginBottom: "0.5rem" }}>Find Us</h2>
        <p style={{ marginBottom: "1.5rem", color: "var(--text-muted)" }}>
          Visit Will Drafting or find us on Google.
        </p>
        <div style={{ borderRadius: "16px", overflow: "hidden", boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
          <iframe
            title="Will Drafting on Google Maps"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d449163.95544628054!2d76.77163720772579!3d28.416438404881305!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d23ba82ca65ed%3A0x3b6abd3a0f6a8e7d!2sWill%20Drafting!5e0!3m2!1sen!2sin!4v1792479473529!5m2!1sen!2sin"
            width="100%"
            height="450"
            style={{ border: 0, display: "block" }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>
        <a
          href="https://www.google.com/maps/search/?api=1&query=Will+Drafting"
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "inline-block", marginTop: "1rem", fontWeight: 600, color: "var(--color-navy)" }}
        >
          View on Google Maps →
        </a>
      </div>
    </section>
  );
}
