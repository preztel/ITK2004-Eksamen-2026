# Oppgave 2 — Drift: Nettverksdokumentasjon

Teknisk dokumentasjon for oppsett av kontorutleie-nettverket med VLAN-isolasjon.

## Innhold

| Fil | Beskrivelse |
|-----|-------------|
| [nettverk-skisse.md](nettverk-skisse.md) | ASCII-topologi, enheter og kabeltyper |
| [subnett-plan.md](subnett-plan.md) | IP-plan, VLAN-tabell, switch-porttildeling |
| [brannmur-portstyring.md](brannmur-portstyring.md) | ACL-regler, tillatte/blokkerte porter |
| [oppsett-veiledning.md](oppsett-veiledning.md) | Steg-for-steg CLI-konfigurasjon for tekniker |

## Packet Tracer-fil

Ferdig konfigurert simulering: [`../oppgaver/kontorutleie.pkt`](../oppgaver/kontorutleie.pkt)

## Nettverksoversikt

- **3 bedrifter** isolert i hvert sitt VLAN (10, 20, 30)
- **1 server** i administrasjons-VLAN (99)
- **Router-on-a-stick** med dot1Q subinterfaces
- **VLAN-isolasjon** bekreftet med ping-tester
