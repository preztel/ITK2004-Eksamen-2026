# Eksamenslogg — ITK2004 — 09.06.2026

## AI-bruk
Verktøy: Claude (claude.ai / Claude Code)

---

## Bilde 1 — Første topologi-forsøk
**Tidspunkt:** Tidlig i eksamen  
**Beskrivelse:** Første forsøk på nettverkstopologi. Hadde 3 switcher (Switch0, Switch1, Switch2), 6 PC-er (PC0–PC5), 3 printere, 1 server og 1 router. Server var koblet til Switch1. Router var ikke koblet til noen switch.  
**Funn/tilbakemelding:** For mange switcher (oppgaven krever 1). Router ikke koblet til switch. Server på feil switch.  
**Tiltak:** Fjernet ekstra switcher, flyttet alt til Switch0.

---

## Bilde 2 — Forenklet topologi (1 switch)
**Tidspunkt:** Etter opprydding  
**Beskrivelse:** Forenklet til 1 switch (Switch0, 2960-24TT). PC0, PC1 og Printer0 koblet til Switch0. Server0 koblet til Switch0. Router0 (2911) er lagt ut men ikke koblet til switch ennå.  
**Status:** Neste steg er å koble Router0 til Switch0 (Gi0/1 → Gi0/0), deretter legge til resterende PC-er og printere for bedrift 2 og 3.

---

## Bilde 3 — Komplett fysisk topologi
**Tidspunkt:** 08:37  
**Beskrivelse:** Alle enheter på plass og koblet til Switch0: PC0–PC5, Printer0–Printer2, Server0, Router0 (2911). Router0 er koblet til Switch0 men viser røde trekanter (interface nede — ikke konfigurert ennå). Alle andre porter viser grønne trekanter (oppe).  
**Status:** Fysisk topologi komplett ✅. Klar for VLAN-konfigurasjon på switch (Del 2).

---

## Bilde 4 — VLAN-konfigurasjon på Switch0 fullført
**Tidspunkt:** ~08:45  
**Beskrivelse:** Alle porter konfigurert med riktig VLAN og trunk mot router:
- Fa0/1–0/3: VLAN 10 (Bedrift 1)
- Fa0/4–0/6: VLAN 20 (Bedrift 2)
- Fa0/7–0/9: VLAN 30 (Bedrift 3)
- Fa0/10: VLAN 99 (Server/Kontorutleie)
- Gi0/1: trunk (mot Router0)  
**Status:** Switch-konfigurasjon fullført ✅. Neste: subinterfaces på Router0 (Del 3).

---

## Bilde 5 — Router subinterfaces konfigurert
**Tidspunkt:** ~08:55  
**Beskrivelse:** Alle 4 subinterfaces på Router0 (Gi0/0.10, .20, .30, .99) konfigurert med dot1q encapsulation og IP-adresser. Alle interfaces kom opp (changed state to up).  
**Status:** Router-konfigurasjon fullført ✅. Neste: sett IP på PC-er (Del 5) og ACL (Del 4).

---

## Bilde 6 — Alle IP-adresser satt, alle porter grønne
**Tidspunkt:** ~09:34  
**Beskrivelse:** Komplett topologi med alle grønne koblinger. PC0–PC5, Printer0–2, Server0 og Router0 alle koblet til Switch0. Alle IP-adresser konfigurert på enhetene.  
**Status:** Klar for ping-test og ACL-konfigurasjon ✅.

---

## Bilde 7 — Ping-test fra PC0
**Tidspunkt:** ~09:40  
**Test 1:** `ping 192.168.10.3` (PC0 → PC1, samme VLAN 10) → **4/4 Reply** ✅  
**Test 2:** `ping 192.168.20.2` (PC0 → PC2, annen bedrift VLAN 20) → **Request timed out** ✅  
**Konklusjon:** VLAN-isolasjon fungerer. Intra-VLAN kommunikasjon virker, inter-VLAN er blokkert.

---

## Spørringer til AI

| # | Spørring | Svar brukt til |
|---|---|---|
| 1 | "Sjekk ut mappen. Har jeg gjort noe feil til nå?" (bilde av topologi med 3 switcher) | Identifiserte feil: 3 switcher i stedet for 1, router ikke koblet, server på feil switch. Anbefalt å forenkle til 1 switch. |
| 2 | "Les CLAUDE.md på nytt og oppdater context" | Leste eksamenskrav og lagret dokumentasjonskrav (GitHub, AI-logg, kilder) i minnet. |
| 3 | "Lagre bildene jeg sender deg som dokumentasjon. Vær eksamen-buddy." | Opprettet dokumentasjonslogg, startet bildelogging. |
| 4 | "Trenger jeg PC2-PC5 og Printer1-2?" | Ja — oppgaven krever 2 PC + 1 printer per bedrift = 6 PC + 3 printere totalt. |
| 5 | "Er alt gjort riktig nå?" (bilde av switch VLAN-config) | Bekreftet VLAN-konfigurasjon som korrekt. Forklarte at Gi0/1 i VLAN 1 er normalt for trunk i Packet Tracer. |
| 6 | "Er nå i router CLI" | Veiledet gjennom subinterface-konfigurasjon med dot1q encapsulation. |
| 7 | "Hvordan endrer jeg IP på printer?" | Forklarte at Config-fanen → FastEthernet0 brukes for IP på printere i Packet Tracer. |
| 8 | "Er oppgaven ferdig nå?" | Bekreftet at nettverket er ferdig, påpekte gjenstående dokumentasjonskrav. |
| 9 | "Gjør oss helt ferdig" | Genererte README.md, ferdigstilte logg.md, instruerte om GitHub-oppsett. |

