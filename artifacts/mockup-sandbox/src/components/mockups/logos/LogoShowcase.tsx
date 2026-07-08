
// KIUT. Brand Identity Showcase
// Displays all logo variants: mark only, horizontal lockup, vertical lockup
// across the three primary colorways.

function KMark({ color = "#D4AF37", size = 80 }: { color?: string; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill={color} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="14" height="84" rx="1" />
      <polygon points="24,47 24,30 84,8 84,25" />
      <polygon points="24,53 24,70 84,75 84,92" />
    </svg>
  );
}

type CardProps = {
  bg: string;
  border: string;
  label: string;
  labelColor: string;
  children: React.ReactNode;
};

function Card({ bg, border, label, labelColor, children }: CardProps) {
  return (
    <div
      style={{
        background: bg,
        border: `1px solid ${border}`,
        borderRadius: 20,
        padding: "40px 32px 28px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 0,
        minHeight: 200,
        position: "relative",
      }}
    >
      {children}
      <span
        style={{
          position: "absolute",
          bottom: 14,
          left: 0,
          right: 0,
          textAlign: "center",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: labelColor,
          textTransform: "uppercase",
          fontFamily: "system-ui, sans-serif",
          opacity: 0.55,
        }}
      >
        {label}
      </span>
    </div>
  );
}

function HorizLockup({ markColor, textColor, dotColor, size = 52 }: {
  markColor: string; textColor: string; dotColor: string; size?: number;
}) {
  const fontSize = size * 0.55;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: size * 0.22 }}>
      <KMark color={markColor} size={size} />
      <span style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 300,
        fontSize,
        letterSpacing: "0.3em",
        lineHeight: 1,
        color: textColor,
        textTransform: "uppercase",
      }}>
        KIUT<span style={{ color: dotColor }}>.</span>
      </span>
    </div>
  );
}

function VertLockup({ markColor, textColor, dotColor, size = 64 }: {
  markColor: string; textColor: string; dotColor: string; size?: number;
}) {
  const fontSize = size * 0.38;
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: size * 0.18 }}>
      <KMark color={markColor} size={size} />
      <span style={{
        fontFamily: "'Space Grotesk', system-ui, sans-serif",
        fontWeight: 300,
        fontSize,
        letterSpacing: "0.35em",
        lineHeight: 1,
        color: textColor,
        textTransform: "uppercase",
      }}>
        KIUT<span style={{ color: dotColor }}>.</span>
      </span>
    </div>
  );
}

const GOLD = "#D4AF37";
const IVORY = "#F5F0E8";
const BLACK = "#0a0a0c";
const WHITE = "#ffffff";

export function LogoShowcase() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#111113",
      fontFamily: "system-ui, sans-serif",
      padding: "48px 40px 60px",
    }}>
      {/* Space Grotesk font */}
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400&display=swap');`}</style>

      {/* Header */}
      <div style={{ marginBottom: 44 }}>
        <p style={{ color: GOLD, fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", marginBottom: 8 }}>
          KIUT. — Brand Identity System
        </p>
        <h1 style={{ color: WHITE, fontSize: 26, fontWeight: 300, letterSpacing: "0.08em", margin: 0 }}>
          Logo Variants
        </h1>
      </div>

      {/* ── Section 1: The Mark alone ───────────────────────── */}
      <SectionLabel>Mark Only</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
        <Card bg={BLACK} border="#2a2a2e" label="Gold on Black" labelColor={GOLD}>
          <KMark color={GOLD} size={88} />
        </Card>
        <Card bg="#1a1a1c" border="#2e2e32" label="White on Charcoal" labelColor="#666">
          <KMark color={WHITE} size={88} />
        </Card>
        <Card bg="#f0ebe0" border="#d8d0c0" label="Gold on Ivory" labelColor="#888">
          <KMark color={GOLD} size={88} />
        </Card>
        <Card bg={WHITE} border="#e0e0e0" label="Black on White" labelColor="#999">
          <KMark color={BLACK} size={88} />
        </Card>
      </div>

      {/* ── Section 2: Horizontal Lockup ────────────────────── */}
      <SectionLabel>Horizontal Lockup</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
        <Card bg={BLACK} border="#2a2a2e" label="Gold / Primary" labelColor={GOLD}>
          <HorizLockup markColor={GOLD} textColor={WHITE} dotColor={GOLD} size={52} />
        </Card>
        <Card bg="#1a1a1c" border="#2e2e32" label="All White" labelColor="#666">
          <HorizLockup markColor={WHITE} textColor={WHITE} dotColor={WHITE} size={52} />
        </Card>
        <Card bg={WHITE} border="#e0e0e0" label="Black / Reversed" labelColor="#999">
          <HorizLockup markColor={BLACK} textColor={BLACK} dotColor={BLACK} size={52} />
        </Card>
      </div>

      {/* ── Section 3: Vertical Lockup ──────────────────────── */}
      <SectionLabel>Vertical Lockup (Stacked)</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 36 }}>
        <Card bg={BLACK} border="#2a2a2e" label="Gold / Primary" labelColor={GOLD}>
          <VertLockup markColor={GOLD} textColor={WHITE} dotColor={GOLD} size={72} />
        </Card>
        <Card bg="#1a1a1c" border="#2e2e32" label="All White" labelColor="#666">
          <VertLockup markColor={WHITE} textColor={WHITE} dotColor={WHITE} size={72} />
        </Card>
        <Card bg={WHITE} border="#e0e0e0" label="Black / Reversed" labelColor="#999">
          <VertLockup markColor={BLACK} textColor={BLACK} dotColor={BLACK} size={72} />
        </Card>
      </div>

      {/* ── Section 4: Special-use ──────────────────────────── */}
      <SectionLabel>Special Use</SectionLabel>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        {/* Favicon / social avatar */}
        <Card bg="#0a0a0c" border="#2a2a2e" label="Favicon / Avatar (32×32)" labelColor={GOLD}>
          <div style={{
            width: 64, height: 64, background: BLACK, borderRadius: 12,
            display: "flex", alignItems: "center", justifyContent: "center",
            border: `1px solid #2a2a2e`,
          }}>
            <KMark color={GOLD} size={40} />
          </div>
        </Card>
        {/* Watermark / overlay */}
        <Card bg="linear-gradient(135deg,#1a1a1c 0%,#0d0d0f 100%)" border="#2a2a2e" label="Watermark / Overlay" labelColor="#555">
          <div style={{ position: "relative" }}>
            <div style={{
              width: 180, height: 100, borderRadius: 10, overflow: "hidden",
              background: "linear-gradient(135deg, #2a2a2e, #111)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <span style={{ color: "#444", fontSize: 12, letterSpacing: "0.1em" }}>photo / video</span>
            </div>
            <div style={{ position: "absolute", bottom: 8, right: 10, opacity: 0.35 }}>
              <HorizLockup markColor={WHITE} textColor={WHITE} dotColor={WHITE} size={22} />
            </div>
          </div>
        </Card>
        {/* Merch tag */}
        <Card bg={GOLD} border={GOLD} label="Merch / Physical Goods" labelColor="rgba(0,0,0,0.45)">
          <KMark color={BLACK} size={72} />
        </Card>
      </div>
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p style={{
      color: "#555",
      fontSize: 10,
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      margin: "0 0 12px 2px",
      fontFamily: "system-ui, sans-serif",
    }}>
      {children}
    </p>
  );
}
