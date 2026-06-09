# Kontorutleie-nettverk — ITK2004 Eksamen 2026

**Elev:** Devin  
**Fagkode:** ITK2004 — VG2 Informasjonsteknologi  
**Eksamensdato:** 09.06.2026

---

## Beskrivelse

Nettverksløsning for et kontorutleiefirma med 3 bedrifter. Hver bedrift er isolert i sitt eget VLAN slik at de ikke kan nå hverandres utstyr, men kan kommunisere internt (PC → printer).

---

## Nettverkstopologi

```
[PC0]  [PC1]  [Printer0]   ← Bedrift 1 (VLAN 10)
[PC2]  [PC3]  [Printer1]   ← Bedrift 2 (VLAN 20)
[PC4]  [PC5]  [Printer2]   ← Bedrift 3 (VLAN 30)
[Server0]                   ← Kontorutleie (VLAN 99)
         |
      [Switch0]  ←→  [Router0]
      2960-24TT        2911
```

---

## IP-plan

| Bedrift | VLAN | Nettverk | Gateway |
|---|---|---|---|
| Bedrift 1 | VLAN 10 | 192.168.10.0/24 | 192.168.10.1 |
| Bedrift 2 | VLAN 20 | 192.168.20.0/24 | 192.168.20.1 |
| Bedrift 3 | VLAN 30 | 192.168.30.0/24 | 192.168.30.1 |
| Kontorutleie (server) | VLAN 99 | 192.168.99.0/24 | 192.168.99.1 |

### Enhetsoversikt

| Enhet | IP-adresse | VLAN |
|---|---|---|
| PC0 | 192.168.10.2 | 10 |
| PC1 | 192.168.10.3 | 10 |
| Printer0 | 192.168.10.4 | 10 |
| PC2 | 192.168.20.2 | 20 |
| PC3 | 192.168.20.3 | 20 |
| Printer1 | 192.168.20.4 | 20 |
| PC4 | 192.168.30.2 | 30 |
| PC5 | 192.168.30.3 | 30 |
| Printer2 | 192.168.30.4 | 30 |
| Server0 | 192.168.99.2 | 99 |

---

## Hvordan åpne prosjektet

1. Installer [Cisco Packet Tracer](https://www.netacad.com/courses/packet-tracer) (gratis med Cisco NetAcad-konto)
2. Last ned `oppgaver/kontorutleie.pkt` fra dette repoet
3. Åpne filen i Packet Tracer
4. Nettverket er ferdig konfigurert og klart til bruk

---

## Teknisk løsning

### Utstyr
- **Router:** Cisco 2911
- **Switch:** Cisco 2960-24TT
- **End devices:** 6 PC-er, 3 printere, 1 server

### VLAN-konfigurasjon (Switch0)
Hver bedrift er tildelt sitt eget VLAN. Portene Fa0/1–Fa0/3 tilhører VLAN 10, Fa0/4–Fa0/6 tilhører VLAN 20, Fa0/7–Fa0/9 tilhører VLAN 30, og Fa0/10 tilhører VLAN 99. Gi0/1 er konfigurert som trunk-port mot routeren.

### Router-on-a-stick (Router0)
Routeren bruker subinterfaces på Gi0/0 med 802.1Q encapsulation (dot1q) for å rute trafikk mellom VLAN-ene. Hvert VLAN har sin egen gateway.

### VLAN-isolasjon
Bedriftene er isolert fra hverandre gjennom VLAN-segmentering. Ping mellom bedrifter returnerer "Request timed out", mens ping innad i samme bedrift fungerer.

---

## Testing

| Test | Fra | Til | Forventet | Resultat |
|---|---|---|---|---|
| Intra-VLAN | PC0 (10.2) | PC1 (10.3) | Reply | ✅ Reply |
| Inter-VLAN | PC0 (10.2) | PC2 (20.2) | Timed out | ✅ Timed out |

---

## Kilder

- Cisco Systems. *Cisco IOS Software Configuration Guide, Release 15.1* — https://www.cisco.com/c/en/us/td/docs/ios/15_1/configuration/guide/ (lastet ned 09.06.2026)
- Cisco Networking Academy. *Packet Tracer – documentation* — https://www.netacad.com/courses/packet-tracer (lastet ned 09.06.2026)
- Utdanningsdirektoratet. *Læreplan i informasjonsteknologi og medieproduksjon (ITK01-02)* — https://www.udir.no/lk20/itk01-02 (lastet ned 09.06.2026)

---

## AI-bruk

Se [dokumentasjon/logg.md](dokumentasjon/logg.md) for fullstendig logg over AI-bruk, inkludert konkrete spørringer, utdrag av svar og hvordan svarene ble brukt.

**Verktøy brukt:** Claude (Anthropic) via Claude Code  
**Formål:** Veiledning og feilsøking under nettverkskonfigurasjon
