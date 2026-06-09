# Eksamenslogg — ITK2004 — 09.06.2026

**Verktøy:** Claude Code (Anthropic, claude-sonnet-4-6)

---

## Bilde 1 — Første topologi-forsøk
**Fil:** `bilder/alle_3_bedrifter_koblet_opp_med_ledning.png`  
**Beskrivelse:** Første forsøk på nettverkstopologi. Hadde 3 switcher (Switch0, Switch1, Switch2), 6 PC-er (PC0–PC5), 3 printere, 1 server og 1 router. Server var koblet til Switch1. Router var ikke koblet til noen switch.  
**Funn:** For mange switcher (oppgaven krever 1). Router ikke koblet til switch. Server på feil switch.  
**Tiltak:** Fjernet ekstra switcher, flyttet alt til Switch0.

---

## Bilde 2 — Forenklet topologi (1 switch)
**Fil:** `bilder/alle_3_bedrifter_koblet_opp_med_ledning.png`  
**Beskrivelse:** Forenklet til 1 switch (Switch0, 2960-24TT). PC0, PC1 og Printer0 koblet til Switch0. Server0 koblet til Switch0. Router0 (2911) lagt ut men ikke koblet til switch ennå.  
**Status:** Klar for å koble Router0 til Switch0 Gi0/1 → Gi0/0 og legge til resterende enheter.

---

## Bilde 3 — Komplett fysisk topologi
**Fil:** `bilder/alle_ip_config_ferdig.png`  
**Beskrivelse:** Alle enheter på plass og koblet til Switch0: PC0–PC5, Printer0–Printer2, Server0, Router0 (2911). Router0 koblet til Switch0 men viser røde trekanter (interface ikke konfigurert ennå). Alle andre porter grønne.  
**Status:** Fysisk topologi komplett ✅

---

## Bilde 4 — VLAN-konfigurasjon på Switch0 fullført
**Fil:** `bilder/VLAN_done.png`  
**Beskrivelse:** Alle porter konfigurert med riktig VLAN og trunk mot router:
- Fa0/1–0/3: VLAN 10 (Bedrift 1)
- Fa0/4–0/6: VLAN 20 (Bedrift 2)
- Fa0/7–0/9: VLAN 30 (Bedrift 3)
- Fa0/10: VLAN 99 (Server/Kontorutleie)
- Gi0/1: trunk (mot Router0)

**Status:** Switch-konfigurasjon fullført ✅

---

## Bilde 5 — Router subinterfaces konfigurert
**Fil:** `bilder/router_cli.png`  
**Beskrivelse:** Alle 4 subinterfaces på Router0 (Gi0/0.10, .20, .30, .99) konfigurert med dot1q encapsulation og IP-adresser. Alle interfaces kom opp (changed state to up).  
**Status:** Router-konfigurasjon fullført ✅

---

## Bilde 6 — Alle IP-adresser satt, alle porter grønne
**Fil:** `bilder/alle_ip_config_ferdig.png`  
**Beskrivelse:** Komplett topologi med alle grønne koblinger. PC0–PC5, Printer0–2, Server0 og Router0 alle koblet til Switch0. Alle IP-adresser konfigurert.  
**Status:** Klar for ping-test ✅

---

## Bilde 7 — Ping-test (første runde)
**Fil:** `bilder/VLAN_done.png`  
**Test 1:** `ping 192.168.10.3` (PC0 → PC1, VLAN 10) → **4/4 Reply** ✅  
**Test 2:** `ping 192.168.20.2` (PC0 → PC2, VLAN 20) → **Request timed out** ✅  
**Konklusjon:** VLAN-isolasjon bekreftet.

---

## Bilde 8 — Router running-config
**Fil:** `bilder/running_config.png`  
**Beskrivelse:** `show running-config` på Router0 viser hele konfigurasjonen. Alle 5 interfaces kom opp: Gi0/0, Gi0/0.10, Gi0/0.20, Gi0/0.30, Gi0/0.99. Subinterfaces har dot1Q encapsulation og korrekte IP-adresser.  
**Bevis:** Router-on-a-stick konfigurert korrekt av kandidaten.

---

## Bilde 9 — Switch show vlan brief
**Fil:** `bilder/show_vlan_brief.png`  
**Beskrivelse:** `show vlan brief` på Switch0 viser VLAN-tabellen. VLAN 10, 20, 30 og 99 opprettet. Fa0/1–Fa0/3 i VLAN 10, Fa0/4–Fa0/6 i VLAN 20, Fa0/7–Fa0/9 i VLAN 30, Fa0/10 i VLAN 99.  
**Bevis:** Kandidaten verifiserte VLAN-konfigurasjonen selv via CLI.

---

## Bilde 10 — Ping-test (eierskap)
**Fil:** `bilder/ping_test.png`  
**Beskrivelse:** Ping-test fra PC0 sin Command Prompt. Intra-VLAN til PC1 → Reply ✅. Inter-VLAN til PC2 → Timed out ✅.  
**Bevis:** Kandidaten utførte testene selv og bekreftet isolasjon.

---

## Bilde 11 — IP-konfigurasjon PC0
**Fil:** `bilder/ip_config.png`  
**Beskrivelse:** IP Configuration på PC0: 192.168.10.2, maske 255.255.255.0, gateway 192.168.10.1.  
**Bevis:** Kandidaten satte IP-adressene manuelt på enhetene.

---

## Bilde 12 — Web-løsning: Forside
**Fil:** `bilder/web_forside.png`  
**Beskrivelse:** Offentlig markedsføringsside for KontorLeie AS på http://localhost:3000. Viser tjenestebeskrivelse med 4 kort og navigasjon til kundeportalen.  
**Bevis:** Docker-stacken startet og web-løsningen kjører.

---

## Bilde 13 — Web-løsning: Innloggingsside
**Fil:** `bilder/login_web_side.png`  
**Beskrivelse:** Innloggingssiden for kundeportalen på http://localhost:3000/login.html med brukernavn- og passordfelt.

---

## Bilde 14 — Web-løsning: Bedrift 1 dashboard
**Fil:** `bilder/bedrift_data.png`  
**Beskrivelse:** Kundeportalen innlogget som bedrift1 (Bedrift AS, VLAN 10). Viser VLAN-nummer, nettverk, gateway og nettverksdokumentasjon hentet dynamisk fra MariaDB.  
**Bevis:** Session-basert innlogging og databaser fungerer.

---

## Bilde 15 — Web-løsning: Bedrift 2 dashboard
**Fil:** `bilder/annen_bedrift_data.png`  
**Beskrivelse:** Samme portal innlogget som bedrift2 (Konsulent AS, VLAN 20). Viser Konsulent AS sin data — ikke Bedrift AS sin.  
**Bevis:** Tilgangskontroll fungerer. Isolasjonen i web-løsningen speiler nettverksisolasjonen.

---

## Spørringer til AI

| # | Spørring | Svar brukt til |
|---|---|---|
| 1 | "Sjekk ut mappen. Har jeg gjort noe feil til nå?" (bilde av topologi med 3 switcher) | Identifiserte feil: 3 switcher i stedet for 1, router ikke koblet, server på feil switch. |
| 2 | "Les CLAUDE.md på nytt og oppdater context" | Leste eksamenskrav og lagret dokumentasjonskrav i minnet. |
| 3 | "Lagre bildene jeg sender deg som dokumentasjon. Vær eksamen-buddy." | Opprettet dokumentasjonslogg, startet bildelogging. |
| 4 | "Trenger jeg PC2-PC5 og Printer1-2?" | Ja — oppgaven krever 2 PC + 1 printer per bedrift = 6 PC + 3 printere totalt. |
| 5 | "Er alt gjort riktig nå?" (bilde av switch VLAN-config) | Bekreftet VLAN-konfigurasjon som korrekt. |
| 6 | "Er nå i router CLI" | Veiledet gjennom subinterface-konfigurasjon med dot1q encapsulation. |
| 7 | "Hvordan endrer jeg IP på printer?" | Forklarte at Config-fanen → FastEthernet0 brukes for IP på printere. |
| 8 | "Er oppgaven ferdig nå?" | Bekreftet at nettverket er ferdig, påpekte gjenstående dokumentasjonskrav. |
| 9 | "Gjør oss helt ferdig" | Genererte README.md, ferdigstilte logg, instruerte om GitHub-oppsett. |
| 10 | "Neste oppgave. Oppgave 1 Utvikling..." | Fastslo teknisk stack: Node.js, Express, MariaDB, Docker. |
| 11 | Passord i klartekst oppdaget | Implementerte .env-mønsteret for secrets — aldri passord i public repo. |
| 12 | "Lag en plan for alt dette med /writing-plans" | 10-task implementasjonsplan for web-løsningen. |
| 13 | "Skal ha muntlig fremføring om 10 minutter..." | Genererte ny 8-slide PPTX med oppdatert narrativ. |
| 14 | "Fjern alle tidspunkt. Oppdater presentasjonen." | Denne oppdateringen. |
