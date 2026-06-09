# Subnett-plan og VLAN-oversikt

## VLAN-tabell

| VLAN | Navn         | Nettverk          | Gateway       | Broadcast       | Brukbare IP-er |
|------|--------------|-------------------|---------------|-----------------|----------------|
| 10   | Bedrift1     | 192.168.10.0/24   | 192.168.10.1  | 192.168.10.255  | .2 – .254      |
| 20   | Bedrift2     | 192.168.20.0/24   | 192.168.20.1  | 192.168.20.255  | .2 – .254      |
| 30   | Bedrift3     | 192.168.30.0/24   | 192.168.30.1  | 192.168.30.255  | .2 – .254      |
| 99   | Kontorutleie | 192.168.99.0/24   | 192.168.99.1  | 192.168.99.255  | .2 – .254      |

### Subnett-detaljer (/24)
- **Nettmaske:** 255.255.255.0
- **Antall brukbare IP-er per subnett:** 254
- **Begrunnelse for /24:** Hver bedrift har maks ~10 ansatte og utstyr. /24 gir god vekstmargin uten sløsing.

## Enhetsoversikt med IP-adresser

| Enhet    | IP-adresse    | Subnett-maske | Gateway       | VLAN |
|----------|---------------|---------------|---------------|------|
| PC0      | 192.168.10.2  | 255.255.255.0 | 192.168.10.1  | 10   |
| PC1      | 192.168.10.3  | 255.255.255.0 | 192.168.10.1  | 10   |
| Printer0 | 192.168.10.4  | 255.255.255.0 | 192.168.10.1  | 10   |
| PC2      | 192.168.20.2  | 255.255.255.0 | 192.168.20.1  | 20   |
| PC3      | 192.168.20.3  | 255.255.255.0 | 192.168.20.1  | 20   |
| Printer1 | 192.168.20.4  | 255.255.255.0 | 192.168.20.1  | 20   |
| PC4      | 192.168.30.2  | 255.255.255.0 | 192.168.30.1  | 30   |
| PC5      | 192.168.30.3  | 255.255.255.0 | 192.168.30.1  | 30   |
| Printer2 | 192.168.30.4  | 255.255.255.0 | 192.168.30.1  | 30   |
| Server0  | 192.168.99.2  | 255.255.255.0 | 192.168.99.1  | 99   |

## Switch-porttildeling

| Port   | Enhet    | VLAN | Modus  |
|--------|----------|------|--------|
| Fa0/1  | PC0      | 10   | access |
| Fa0/2  | PC1      | 10   | access |
| Fa0/3  | Printer0 | 10   | access |
| Fa0/4  | PC2      | 20   | access |
| Fa0/5  | PC3      | 20   | access |
| Fa0/6  | Printer1 | 20   | access |
| Fa0/7  | PC4      | 30   | access |
| Fa0/8  | PC5      | 30   | access |
| Fa0/9  | Printer2 | 30   | access |
| Fa0/10 | Server0  | 99   | access |
| Gi0/1  | Router0  | alle | trunk  |
