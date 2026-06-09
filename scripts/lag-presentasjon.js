const pptxgen = require("pptxgenjs");
const path = require("path");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Devin";
pres.title = "ITK2004 Eksamen 2026";

const C = {
  dark:   "065A82",
  mid:    "1C7293",
  accent: "21295C",
  white:  "FFFFFF",
  light:  "F0F7FF",
  gray:   "64748B",
  text:   "1E293B",
  green:  "16A34A",
  red:    "DC2626",
  orange: "D97706",
};

const shadow = () => ({ type: "outer", blur: 8, offset: 3, angle: 135, color: "000000", opacity: 0.15 });

const header = (s, tittel) => {
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 0, w: 10, h: 1.0, fill: { color: C.dark }, line: { color: C.dark } });
  s.addText(tittel, { x: 0.5, y: 0.15, w: 9, h: 0.7, fontSize: 28, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
};

// ─── SLIDE 1 — Tittel ────────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.8, w: 10, h: 1.825, fill: { color: C.accent }, line: { color: C.accent } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.8, w: 10, h: 0.07, fill: { color: C.mid }, line: { color: C.mid } });
  s.addText("Kontorutleie — IT-løsning", { x: 0.6, y: 0.6, w: 8.8, h: 1.1, fontSize: 42, bold: true, color: C.white, fontFace: "Calibri", align: "left", margin: 0 });
  s.addText("Web · Nettverk · Active Directory", { x: 0.6, y: 1.75, w: 8.8, h: 0.6, fontSize: 20, color: "A8D4F5", fontFace: "Calibri", align: "left", margin: 0 });
  s.addText([
    { text: "ITK2004 — VG2 Informasjonsteknologi", options: { breakLine: true } },
    { text: "Eksamensdato: 09.06.2026", options: {} }
  ], { x: 0.6, y: 4.05, w: 7, h: 1.2, fontSize: 14, color: "A8D4F5", fontFace: "Calibri", align: "left", margin: 0 });
}

// ─── SLIDE 2 — Oppgaveoversikt ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Situasjon og oppgaveoversikt");
  s.addText("Et kontorutleiefirma med 3 bedrifter trenger en komplett IT-løsning.", {
    x: 0.5, y: 1.15, w: 9, h: 0.5, fontSize: 15, color: C.text, fontFace: "Calibri", margin: 0
  });
  const oppgaver = [
    { nr: "1", tittel: "Utvikling", desc: "Web-løsning med Node.js, MariaDB og Docker", farge: C.mid, status: "Fullført ✓" },
    { nr: "2", tittel: "Drift", desc: "Nettverksoppsett med VLAN-isolasjon i Packet Tracer", farge: C.green, status: "Fullført ✓" },
    { nr: "3", tittel: "Brukerstøtte", desc: "Active Directory-veiledere for ansatte", farge: C.orange, status: "Fullført ✓" },
  ];
  oppgaver.forEach((o, i) => {
    const y = 1.75 + i * 1.15;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 1.0, fill: { color: C.white }, line: { color: "CBD5E1" }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.08, h: 1.0, fill: { color: o.farge }, line: { color: o.farge } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: y + 0.15, w: 0.55, h: 0.55, fill: { color: o.farge }, line: { color: o.farge } });
    s.addText(o.nr, { x: 0.7, y: y + 0.15, w: 0.55, h: 0.55, fontSize: 20, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(`Oppgave ${o.nr}: ${o.tittel}`, { x: 1.4, y: y + 0.1, w: 5.5, h: 0.38, fontSize: 15, bold: true, color: C.dark, fontFace: "Calibri", margin: 0 });
    s.addText(o.desc, { x: 1.4, y: y + 0.48, w: 5.5, h: 0.35, fontSize: 12, color: C.gray, fontFace: "Calibri", margin: 0 });
    s.addShape(pres.shapes.RECTANGLE, { x: 7.2, y: y + 0.28, w: 2.0, h: 0.38, fill: { color: o.farge }, line: { color: o.farge } });
    s.addText(o.status, { x: 7.2, y: y + 0.28, w: 2.0, h: 0.38, fontSize: 12, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// OPPGAVE 1 — UTVIKLING
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SLIDE 3 — Web: Arkitektur ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Oppgave 1 — Utvikling: Arkitektur");
  const lag = [
    { label: "Nettleser", sub: "HTML + CSS (plain)", farge: C.mid },
    { label: "Backend",   sub: "Node.js + Express",  farge: C.dark },
    { label: "Database",  sub: "MariaDB i Docker",   farge: C.accent },
  ];
  lag.forEach((l, i) => {
    const y = 1.2 + i * 1.1;
    s.addShape(pres.shapes.RECTANGLE, { x: 1.5, y, w: 7, h: 0.85, fill: { color: l.farge }, line: { color: l.farge }, shadow: shadow() });
    s.addText(l.label, { x: 1.5, y, w: 3.5, h: 0.85, fontSize: 18, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(l.sub,   { x: 5.0, y, w: 3.5, h: 0.85, fontSize: 14, color: "A8D4F5", fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  });
  const features = ["docker compose up --build — én kommando", "Session-basert auth med bcrypt", "Hver bedrift ser kun egne data", "Secrets i .env — aldri i GitHub"];
  s.addText(features.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < features.length - 1 } })), {
    x: 0.5, y: 4.55, w: 9, h: 0.85, fontSize: 13, color: C.gray, fontFace: "Calibri"
  });
}

// ─── SLIDE 4 — Web: Forside + Login ──────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Oppgave 1 — Web-løsning: Forside og innlogging");
  s.addImage({ path: path.resolve("bilder/web_forside.png"), x: 0.5, y: 1.1, w: 4.5, h: 3.3 });
  s.addImage({ path: path.resolve("bilder/login_web_side.png"), x: 5.2, y: 1.1, w: 4.5, h: 3.3 });
  s.addText("Offentlig markedsføringsside — localhost:3000", { x: 0.5, y: 4.5, w: 4.5, h: 0.4, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
  s.addText("Innloggingsside for kundeportal", { x: 5.2, y: 4.5, w: 4.5, h: 0.4, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
}

// ─── SLIDE 5 — Web: Portal-isolasjon ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Oppgave 1 — Kundeportal: Isolasjon bekreftet");
  s.addImage({ path: path.resolve("bilder/bedrift_data.png"), x: 0.5, y: 1.1, w: 4.5, h: 3.2 });
  s.addImage({ path: path.resolve("bilder/annen_bedrift_data.png"), x: 5.2, y: 1.1, w: 4.5, h: 3.2 });
  s.addText("bedrift1 → Bedrift AS (VLAN 10)", { x: 0.5, y: 4.35, w: 4.5, h: 0.35, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
  s.addText("bedrift2 → Konsulent AS (VLAN 20)", { x: 5.2, y: 4.35, w: 4.5, h: 0.35, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 4.78, w: 9, h: 0.45, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Hver bedrift ser kun egne data — isolasjon på nett- og applikasjonsnivå ✓", {
    x: 0.5, y: 4.78, w: 9, h: 0.45, fontSize: 13, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0
  });
}

// ─── SLIDE 6 — Database ───────────────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Oppgave 1 — Database: MariaDB i Docker");
  const rows = [
    [{ text: "Tabell", options: { bold: true, color: C.white, fill: { color: C.dark } } }, { text: "Felt", options: { bold: true, color: C.white, fill: { color: C.dark } } }, { text: "Formål", options: { bold: true, color: C.white, fill: { color: C.dark } } }],
    ["bedrifter",     "id, navn, vlan, ip_nett, gateway",              "Nettverksinfo per bedrift"],
    ["brukere",       "id, brukernavn, passord_hash, bedrift_id (FK)", "Innlogging med bcrypt"],
    ["dokumentasjon", "id, bedrift_id (FK), tittel, innhold",          "Docs per bedrift"],
  ];
  s.addTable(rows, { x: 0.5, y: 1.2, w: 9, h: 2.0, fontSize: 13, fontFace: "Calibri", border: { pt: 1, color: "CBD5E1" }, fill: { color: C.white }, colW: [2.0, 3.5, 3.5] });
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.4, w: 4.3, h: 1.8, fill: { color: "1E293B" }, line: { color: "1E293B" }, shadow: shadow() });
  s.addText("docker compose up --build\n# MariaDB + Node.js starter\n# init.sql kjøres automatisk\n# Åpne http://localhost:3000", {
    x: 0.6, y: 3.5, w: 4.1, h: 1.6, fontSize: 11, color: "7DD3FC", fontFace: "Consolas", valign: "top", margin: 0
  });
  s.addText([
    { text: "bedrifter (1)", options: { breakLine: true } },
    { text: "  ├── brukere (mange)", options: { breakLine: true } },
    { text: "  └── dokumentasjon (mange)", options: {} },
  ], { x: 5.1, y: 3.5, w: 4.2, h: 1.6, fontSize: 13, color: C.text, fontFace: "Consolas" });
}

// ═══════════════════════════════════════════════════════════════════════════════
// OPPGAVE 2 — DRIFT
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SLIDE 7 — Drift: Topologi ───────────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Oppgave 2 — Drift: Nettverkstopologi");
  s.addImage({ path: path.resolve("bilder/alle_ip_config_ferdig.png"), x: 0.5, y: 1.1, w: 5.2, h: 3.8 });
  const pts = ["1 switch (Cisco 2960), 1 router (Cisco 2911)", "3 bedrifter × (2 PC + 1 printer)", "Server i VLAN 99", "Router-on-a-stick med dot1Q", "Alle koblinger grønne — oppe"];
  s.addText(pts.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < pts.length - 1 } })), {
    x: 5.9, y: 1.3, w: 3.8, h: 2.5, fontSize: 13, color: C.text, fontFace: "Calibri"
  });
  s.addShape(pres.shapes.RECTANGLE, { x: 5.9, y: 4.1, w: 3.8, h: 0.6, fill: { color: C.green }, line: { color: C.green } });
  s.addText("Oppgave 2 fullført ✓", { x: 5.9, y: 4.1, w: 3.8, h: 0.6, fontSize: 15, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
}

// ─── SLIDE 8 — Drift: VLAN-konfig + running-config ───────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Drift — VLAN og router-konfigurasjon");
  s.addImage({ path: path.resolve("bilder/show_vlan_brief.png"), x: 0.5, y: 1.1, w: 4.5, h: 3.3 });
  s.addImage({ path: path.resolve("bilder/running_config.png"), x: 5.2, y: 1.1, w: 4.5, h: 3.3 });
  s.addText("show vlan brief — Switch0", { x: 0.5, y: 4.5, w: 4.5, h: 0.4, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
  s.addText("show running-config — Router0", { x: 5.2, y: 4.5, w: 4.5, h: 0.4, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
}

// ─── SLIDE 9 — Drift: Ping + IP-konfig ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Drift — Isolasjon og IP-konfigurasjon bekreftet");
  s.addImage({ path: path.resolve("bilder/ping_test.png"), x: 0.5, y: 1.1, w: 4.5, h: 3.3 });
  s.addImage({ path: path.resolve("bilder/ip_config.png"), x: 5.2, y: 1.1, w: 4.5, h: 3.3 });
  s.addText("Ping-test: intra-VLAN Reply ✓ / inter-VLAN Timed out ✓", { x: 0.5, y: 4.5, w: 4.5, h: 0.4, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
  s.addText("IP-konfig PC0 — 192.168.10.2 / gateway 192.168.10.1", { x: 5.2, y: 4.5, w: 4.5, h: 0.4, fontSize: 11, color: C.gray, fontFace: "Calibri", align: "center", italic: true, margin: 0 });
}

// ═══════════════════════════════════════════════════════════════════════════════
// OPPGAVE 3 — BRUKERSTØTTE
// ═══════════════════════════════════════════════════════════════════════════════

// ─── SLIDE 10 — Brukerstøtte: Oversikt ──────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Oppgave 3 — Brukerstøtte: Active Directory");
  s.addText("Tre veiledere skrevet for ansatte uten teknisk bakgrunn:", {
    x: 0.5, y: 1.15, w: 9, h: 0.45, fontSize: 15, color: C.text, fontFace: "Calibri", margin: 0
  });
  const veiledere = [
    { nr: "A", tittel: "Opprett ny bruker", desc: "Steg-for-steg fra åpne AD til test av innlogging. Inkl. navnekonvensjon og sikkerhetsregel om å ikke sende passord på e-post.", farge: C.mid },
    { nr: "B", tittel: "Gi/fjern mappetilgang", desc: "Tilgang via grupper (ikke enkeltbrukere). Del A: gi tilgang. Del B: deaktiver/fjern ved avslutning.", farge: C.dark },
    { nr: "C", tittel: "Vanlige feil og løsninger", desc: "6 feilscenarier: låst konto, ser ikke mappe, tilgang nektet, kan ikke bytte passord, ikke synlig i AD, ny ansatt mangler tilgang.", farge: C.orange },
  ];
  veiledere.forEach((v, i) => {
    const y = 1.75 + i * 1.05;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.9, fill: { color: C.white }, line: { color: "CBD5E1" }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 0.08, h: 0.9, fill: { color: v.farge }, line: { color: v.farge } });
    s.addShape(pres.shapes.RECTANGLE, { x: 0.7, y: y + 0.17, w: 0.5, h: 0.5, fill: { color: v.farge }, line: { color: v.farge } });
    s.addText(v.nr, { x: 0.7, y: y + 0.17, w: 0.5, h: 0.5, fontSize: 16, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
    s.addText(v.tittel, { x: 1.35, y: y + 0.08, w: 4.5, h: 0.35, fontSize: 14, bold: true, color: C.dark, fontFace: "Calibri", margin: 0 });
    s.addText(v.desc,   { x: 1.35, y: y + 0.43, w: 7.8, h: 0.35, fontSize: 11, color: C.gray, fontFace: "Calibri", margin: 0 });
  });
}

// ─── SLIDE 11 — Brukerstøtte: Opprett bruker ─────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Brukerstøtte A — Opprett ny bruker i AD");
  const steg = [
    "1. Åpne Active Directory Users and Computers",
    "2. Finn riktig OU (f.eks. Bedrift1)",
    "3. Høyreklikk → Ny → Bruker — fyll inn navn og brukernavn",
    "4. Sett midlertidig passord — huk av «Brukeren må endre passord»",
    "5. Legg til i gruppe (f.eks. Bedrift1-ansatte) → fanen «Medlem av»",
    "6. Test innlogging på en klientmaskin",
  ];
  s.addText(steg.map((t, i) => ({ text: t, options: { bullet: false, breakLine: i < steg.length - 1 } })), {
    x: 0.5, y: 1.15, w: 9, h: 3.0, fontSize: 14, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.4
  });
  const regler = [
    { tekst: "Navnekonvensjon: fornavn.etternavn — hold det konsekvent i hele domenet", farge: C.mid },
    { tekst: "Send aldri passord på e-post — lever brukernavnet på papir eller i person", farge: C.orange },
  ];
  regler.forEach((r, i) => {
    const y = 4.3 + i * 0.5;
    s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y, w: 9, h: 0.4, fill: { color: r.farge }, line: { color: r.farge } });
    s.addText(r.tekst, { x: 0.65, y, w: 8.7, h: 0.4, fontSize: 12, color: C.white, fontFace: "Calibri", valign: "middle", margin: 0 });
  });
}

// ─── SLIDE 12 — Brukerstøtte: Mappetilgang ───────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Brukerstøtte B — Gi og fjerne mappetilgang");

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.1, w: 4.3, h: 0.38, fill: { color: C.mid }, line: { color: C.mid } });
  s.addText("Del A: Gi tilgang", { x: 0.5, y: 1.1, w: 4.3, h: 0.38, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  const delA = ["Høyreklikk mappen → Egenskaper → Sikkerhet", "Rediger → Legg til gruppe", "Velg Endre-tillatelse (ikke Full kontroll)", "Bruk → OK → Test med bruker fra gruppen"];
  s.addText(delA.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < delA.length - 1 } })), {
    x: 0.5, y: 1.55, w: 4.3, h: 2.0, fontSize: 12, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.35
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 5.2, y: 1.1, w: 4.3, h: 0.38, fill: { color: C.orange }, line: { color: C.orange } });
  s.addText("Del B: Fjerne tilgang", { x: 5.2, y: 1.1, w: 4.3, h: 0.38, fontSize: 14, bold: true, color: C.white, fontFace: "Calibri", align: "center", valign: "middle", margin: 0 });
  const delB = ["Deaktiver kontoen (anbefalt — beholder historikk)", "Eller: fjern fra gruppe → fanen «Medlem av»", "Ikke slett brukeren — deaktiver"];
  s.addText(delB.map((t, i) => ({ text: t, options: { bullet: true, breakLine: i < delB.length - 1 } })), {
    x: 5.2, y: 1.55, w: 4.3, h: 2.0, fontSize: 12, color: C.text, fontFace: "Calibri", lineSpacingMultiple: 1.35
  });

  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 3.65, w: 9, h: 1.55, fill: { color: "EFF6FF" }, line: { color: "BFDBFE" }, shadow: shadow() });
  s.addText("Eksempel — Bedrift 1 med 8 ansatte:", { x: 0.7, y: 3.72, w: 8.5, h: 0.35, fontSize: 13, bold: true, color: C.dark, fontFace: "Calibri", margin: 0 });
  s.addText("Mappen har kun gruppen Bedrift1-ansatte. Ny ansatt? Legg til i gruppen — tilgang følger. Ansatt slutter? Deaktiver konto. Mappen røres aldri.", {
    x: 0.7, y: 4.08, w: 8.5, h: 0.95, fontSize: 12, color: C.gray, fontFace: "Calibri", margin: 0
  });
}

// ─── SLIDE 13 — Brukerstøtte: Vanlige feil ───────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.light };
  header(s, "Brukerstøtte C — Vanlige feil og løsninger");
  const feil = [
    { problem: "Feil passord / konto låst",           losning: "AD → Høyreklikk bruker → Egenskaper → Konto → Lås opp" },
    { problem: "Ser ikke delt mappe",                  losning: "Sjekk gruppe-medlemskap og at mappen er delt (Deling-fanen)" },
    { problem: "Tilgang nektet på fil",                losning: "Sjekk Sikkerhet-fanen — Avslå overstyrer alltid Tillat" },
    { problem: "Kan ikke bytte passord",               losning: "Tilbakestill via AD → Høyreklikk → Tilbakestill passord" },
    { problem: "Bruker ikke synlig i AD",              losning: "Vis → Avanserte funksjoner, bruk Handling → Finn..." },
    { problem: "Ny ansatt mangler tilgang til mappe",  losning: "Gruppemedlemskap oppdateres kun ved innlogging — logg ut og inn igjen" },
  ];
  feil.forEach((f, i) => {
    const col = i < 3 ? 0 : 1;
    const row = i % 3;
    const x = col === 0 ? 0.4 : 5.1;
    const y = 1.15 + row * 1.1;
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 1.0, fill: { color: C.white }, line: { color: "CBD5E1" }, shadow: shadow() });
    s.addShape(pres.shapes.RECTANGLE, { x, y, w: 4.5, h: 0.35, fill: { color: C.dark }, line: { color: C.dark } });
    s.addText(f.problem, { x: x + 0.1, y, w: 4.3, h: 0.35, fontSize: 11, bold: true, color: C.white, fontFace: "Calibri", valign: "middle", margin: 0 });
    s.addText(f.losning, { x: x + 0.1, y: y + 0.38, w: 4.3, h: 0.55, fontSize: 11, color: C.text, fontFace: "Calibri", valign: "top", margin: 0 });
  });
}

// ─── SLIDE 14 — Alle oppgaver fullført ───────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.dark };
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.8, w: 10, h: 1.825, fill: { color: C.accent }, line: { color: C.accent } });
  s.addShape(pres.shapes.RECTANGLE, { x: 0, y: 3.8, w: 10, h: 0.07, fill: { color: C.mid }, line: { color: C.mid } });
  s.addText("Alle oppgaver fullført", { x: 0.6, y: 0.5, w: 8.8, h: 1.0, fontSize: 40, bold: true, color: C.white, fontFace: "Calibri", margin: 0 });
  const status = [
    { oppg: "Oppgave 1", punkt: "Web-løsning med Node.js, MariaDB, Docker — kjørende ✓" },
    { oppg: "Oppgave 2", punkt: "VLAN-nettverk i Packet Tracer — isolasjon bekreftet ✓" },
    { oppg: "Oppgave 3", punkt: "Active Directory-veiledere — publisert på GitHub ✓" },
  ];
  status.forEach((v, i) => {
    const y = 1.6 + i * 0.65;
    s.addText(`${v.oppg}:`, { x: 0.6, y, w: 1.7, h: 0.5, fontSize: 14, bold: true, color: "A8D4F5", fontFace: "Calibri", margin: 0 });
    s.addText(v.punkt, { x: 2.3, y, w: 7, h: 0.5, fontSize: 14, color: C.white, fontFace: "Calibri", margin: 0 });
  });
  s.addText("github.com/preztel/ITK2004-Eksamen-2026", {
    x: 0.6, y: 4.1, w: 8.8, h: 0.6, fontSize: 13, color: "A8D4F5", fontFace: "Calibri", margin: 0
  });
}

pres.writeFile({ fileName: "presentasjon/ITK2004-Eksamen-2026.pptx" })
  .then(() => console.log("✅ Presentasjon lagret: presentasjon/ITK2004-Eksamen-2026.pptx"))
  .catch(e => console.error("❌ Feil:", e));
