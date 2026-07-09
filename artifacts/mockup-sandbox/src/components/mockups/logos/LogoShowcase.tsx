
// KIUT. Brand Identity Showcase
// Displays all logo variants + canonical location assignments

function KMark({ color = "#D4AF37", size = 80 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="14" height="84" rx="1" />
      <polygon points="24,47 24,30 84,8 84,25" />
      <polygon points="24,53 24,70 84,75 84,92" />
    </svg>
  );
}

const GOLD = "#D4AF37";
const BLACK = "#0a0a0c";
const WHITE = "#ffffff";

function Card({ bg, border, label, labelColor, children }: {
  bg: string; border: string; label: string; labelColor: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      background: bg, border: `1px solid ${border}`, borderRadius: 16,
      padding: "32px 24px 28px", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", minHeight: 170, position: "relative",
    }}>
      {children}
      <span style={{
        position: "absolute", bottom: 12, left: 0, right: 0, textAlign: "center",
        fontSize: 9, letterSpacing: "0.18em", color: labelColor,
        textTransform: "uppercase", fontFamily: "system-ui, sans-serif", opacity: 0.5,
      }}>{label}</span>
    </div>
  );
}

function HorizLockup({ markColor, textColor, dotColor, size = 48 }: {
  markColor: string; textColor: string; dotColor: string; size?: number;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.2 }}>
      <KMark color={markColor} size={size} />
      <span style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 300,
        fontSize: size * 0.52, letterSpacing: "0.28em", lineHeight: 1,
        color: textColor, textTransform: "uppercase",
      }}>KIUT<span style={{ color: dotColor }}>.</span></span>
    </div>
  );
}

function VertLockup({ markColor, textColor, dotColor, size = 60 }: {
  markColor: string; textColor: string; dotColor: string; size?: number;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.16 }}>
      <KMark color={markColor} size={size} />
      <span style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif", fontWeight: 300,
        fontSize: size * 0.35, letterSpacing: "0.32em", lineHeight: 1,
        color: textColor, textTransform: "uppercase",
      }}>KIUT<span style={{ color: dotColor }}>.</span></span>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ color: "#555", fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", margin: "0 0 10px 2px", fontFamily: "system-ui" }}>
      {children}
    </p>
  );
}

function UsageRow({ location, variant, bg, note, children }: {
  location: string; variant: string; bg: string; note: string; children: React.ReactNode;
}) {
  return (
    <div style={{
      display: "grid", gridTemplateColumns: "1fr 220px 1fr",
      alignItems: "center", gap: 20, padding: "16px 0",
      borderBottom: "1px solid #1a1a1c",
    }}>
      <div>
        <div style={{ color: WHITE, fontSize: 12, fontWeight: 500, marginBottom: 4, fontFamily: "system-ui" }}>{location}</div>
        <div style={{ color: "#555", fontSize: 10, fontFamily: "system-ui", lineHeight: 1.5 }}>{note}</div>
      </div>
      <div style={{
        background: bg, borderRadius: 10, padding: "14px 16px",
        display: "flex", alignItems: "center", justifyContent: "center",
        minHeight: 64, border: "1px solid #2a2a2e",
      }}>{children}</div>
      <div style={{ color: "#666", fontSize: 10, fontFamily: "system-ui", paddingLeft: 10, lineHeight: 1.6 }}>
        {variant}
      </div>
    </div>
  );
}

export function LogoShowcase() {
  return (
    <div style={{ minHeight: "100vh", background: "#111113", fontFamily: "system-ui, sans-serif", padding: "48px 40px 60px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400&display=swap');`}</style>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>
          KIUT. — Brand Identity System
        </p>
        <h1 style={{ color: WHITE, fontSize: 24, fontWeight: 300, letterSpacing: "0.08em", margin: 0 }}>
          Logo Variants
        </h1>
      </div>

      {/* ── Mark Only ──────────────────────────────────────── */}
      <SectionLabel>Mark Only</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 32 }}>
        <Card bg={BLACK} border="#2a2a2e" label="Gold on Black" labelColor={GOLD}>
          <KMark color={GOLD} size={80} />
        </Card>
        <Card bg="#1a1a1c" border="#2e2e32" label="White on Charcoal" labelColor="#666">
          <KMark color={WHITE} size={80} />
        </Card>
        <Card bg="#f0ebe0" border="#d8d0c0" label="Gold on Ivory" labelColor="#888">
          <KMark color={GOLD} size={80} />
        </Card>
        <Card bg={WHITE} border="#e0e0e0" label="Black on White" labelColor="#999">
          <KMark color={BLACK} size={80} />
        </Card>
      </div>

      {/* ── Horizontal Lockup ──────────────────────────────── */}
      <SectionLabel>Horizontal Lockup</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 32 }}>
        <Card bg={BLACK} border="#2a2a2e" label="Gold / Primary" labelColor={GOLD}>
          <HorizLockup markColor={GOLD} textColor={WHITE} dotColor={GOLD} size={46} />
        </Card>
        <Card bg="#1a1a1c" border="#2e2e32" label="All White" labelColor="#666">
          <HorizLockup markColor={WHITE} textColor={WHITE} dotColor={WHITE} size={46} />
        </Card>
        <Card bg={WHITE} border="#e0e0e0" label="Black / Reversed" labelColor="#999">
          <HorizLockup markColor={BLACK} textColor={BLACK} dotColor={BLACK} size={46} />
        </Card>
      </div>

      {/* ── Vertical Lockup ────────────────────────────────── */}
      <SectionLabel>Vertical Lockup (Stacked)</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 14, marginBottom: 48 }}>
        <Card bg={BLACK} border="#2a2a2e" label="Gold / Primary" labelColor={GOLD}>
          <VertLockup markColor={GOLD} textColor={WHITE} dotColor={GOLD} size={64} />
        </Card>
        <Card bg="#1a1a1c" border="#2e2e32" label="All White" labelColor="#666">
          <VertLockup markColor={WHITE} textColor={WHITE} dotColor={WHITE} size={64} />
        </Card>
        <Card bg={WHITE} border="#e0e0e0" label="Black / Reversed" labelColor="#999">
          <VertLockup markColor={BLACK} textColor={BLACK} dotColor={BLACK} size={64} />
        </Card>
      </div>

      {/* ── Location Assignments ───────────────────────────── */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ color: GOLD, fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 6 }}>
          Canonical Assignment
        </p>
        <h2 style={{ color: WHITE, fontSize: 18, fontWeight: 300, letterSpacing: "0.08em", margin: "0 0 6px" }}>
          Where Each Variant Lives
        </h2>
        <p style={{ color: "#555", fontSize: 10, margin: 0 }}>
          Authoritative variant selected for each location across the site.
        </p>
      </div>

      <div style={{ border: "1px solid #1e1e20", borderRadius: 16, padding: "0 20px", overflow: "hidden" }}>
        {/* Table header */}
        <div style={{
          display: "grid", gridTemplateColumns: "1fr 220px 1fr", gap: 20,
          padding: "12px 0", borderBottom: "1px solid #2a2a2e",
        }}>
          {["Location", "Preview", "Variant"].map(h => (
            <span key={h} style={{ color: "#444", fontSize: 9, letterSpacing: "0.15em", textTransform: "uppercase", fontFamily: "system-ui" }}>{h}</span>
          ))}
        </div>

        <UsageRow
          location="Navigation Bar"
          variant="Horizontal Lockup — Gold / Primary"
          bg={BLACK}
          note="Sticky top bar, dark glass background. Mark(32) + 'KIUT.' text span with hover drop-shadow."
        >
          <HorizLockup markColor={GOLD} textColor={WHITE} dotColor={GOLD} size={28} />
        </UsageRow>

        <UsageRow
          location="Loading Screen (Cinematic Intro)"
          variant="Mark Only — Gold on Black (large)"
          bg={BLACK}
          note="Full-screen centered reveal. Mark(88) animates in; wordmark enters separately for theatre."
        >
          <KMark color={GOLD} size={50} />
        </UsageRow>

        <UsageRow
          location="Site Footer"
          variant="Mark Only — Gold on Black + bold display wordmark"
          bg={BLACK}
          note="Editorial treatment. Mark(48) above text-5xl–7xl bold wordmark for visual weight."
        >
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
            <KMark color={GOLD} size={28} />
            <span style={{ color: WHITE, fontSize: 17, fontWeight: 700, letterSpacing: "0.18em", fontFamily: "system-ui" }}>
              KIUT<span style={{ color: GOLD }}>.</span>
            </span>
          </div>
        </UsageRow>

        <UsageRow
          location="Browser Favicon"
          variant="Mark Only — Gold on Black square (favicon.svg)"
          bg="#1a1a1c"
          note="16–32 px — wordmark invisible at this scale. Black square background required."
        >
          <div style={{ width: 40, height: 40, background: BLACK, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <KMark color={GOLD} size={26} />
          </div>
        </UsageRow>

        <UsageRow
          location="Social / OG Image (1200 × 630)"
          variant="Horizontal Lockup — Gold / Primary on black canvas"
          bg={BLACK}
          note="Full lockup reads at social thumbnail scale. Confirms brand identity in feed previews."
        >
          <HorizLockup markColor={GOLD} textColor={WHITE} dotColor={GOLD} size={34} />
        </UsageRow>

        <UsageRow
          location="Photo / Video Watermark"
          variant="Horizontal Lockup — All White at 30% opacity"
          bg="linear-gradient(135deg,#2e2e32,#111)"
          note="White at low opacity reads on any photo/video background without obscuring content."
        >
          <div style={{ opacity: 0.3 }}>
            <HorizLockup markColor={WHITE} textColor={WHITE} dotColor={WHITE} size={28} />
          </div>
        </UsageRow>

        <UsageRow
          location="Merch / Physical Goods"
          variant="Mark Only — Black on Gold"
          bg={GOLD}
          note="Single-colour for embroidery, screen-printing, heat stamp. Gold substrate = brand colour."
        >
          <KMark color={BLACK} size={44} />
        </UsageRow>
      </div>

      {/* bottom breathing room */}
      <div style={{ height: 40 }} />
    </div>
  );
}
