# Brannmur og portstyring

## Prinsipp: Standard Deny

All trafikk som ikke er eksplisitt tillatt, blokkeres. Bedrifter skal ikke kunne nå hverandres utstyr.

## VLAN-isolasjon

Isolasjonen skjer på to lag:
- **Lag 2 (switch):** VLAN-segmentering hindrer at trafikk mellom bedrifter sendes videre.
- **Lag 3 (router):** ACL-regler blokkerer ruting mellom bedrift-subnettene.

To-lags forsvar er bedre enn ett.

### ACL 110 — Bedrift 1 (VLAN 10)

```
access-list 110 deny   ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
access-list 110 deny   ip 192.168.10.0 0.0.0.255 192.168.30.0 0.0.0.255
access-list 110 permit ip any any
```

Anvendes: `interface gi0/0.10` → `ip access-group 110 in`

### ACL 120 — Bedrift 2 (VLAN 20)

```
access-list 120 deny   ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 120 deny   ip 192.168.20.0 0.0.0.255 192.168.30.0 0.0.0.255
access-list 120 permit ip any any
```

Anvendes: `interface gi0/0.20` → `ip access-group 120 in`

### ACL 130 — Bedrift 3 (VLAN 30)

```
access-list 130 deny   ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 130 deny   ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
access-list 130 permit ip any any
```

Anvendes: `interface gi0/0.30` → `ip access-group 130 in`

## Tillatte porter

| Port | Protokoll | Tjeneste | Hvem        | Retning          |
|------|-----------|----------|-------------|------------------|
| 80   | TCP       | HTTP     | Alle VLAN   | Ut (internett)   |
| 443  | TCP       | HTTPS    | Alle VLAN   | Ut (internett)   |
| 53   | UDP       | DNS      | Alle VLAN   | Ut (internett)   |
| 3000 | TCP       | Web-app  | VLAN 99     | Inn (server)     |
| 3306 | TCP       | MariaDB  | Kun VLAN 99 | Intern           |
| 22   | TCP       | SSH      | Kun admin   | Inn (server)     |
| ICMP | —         | Ping     | Intra-VLAN  | Tillatt          |
| ICMP | —         | Ping     | Inter-VLAN  | **Blokkert**     |

## Blokkerte trafikktyper

| Trafikk                          | Begrunnelse                           |
|----------------------------------|---------------------------------------|
| Bedrift til bedrift (inter-VLAN) | VLAN-isolasjon — personvern/sikkerhet |
| Inngående trafikk utenfra        | Standard deny fra internett           |
| Port 3306 fra bedrift-VLAN       | Database kun tilgjengelig fra server  |
| Port 22 fra bedrift-VLAN         | SSH kun for administrator             |

## Verifisering av isolasjon

I Packet Tracer er VLAN-isolasjonen bekreftet:

```
PC0 (VLAN 10) → ping PC1 (VLAN 10):  4/4 Reply  ✓  (samme bedrift)
PC0 (VLAN 10) → ping PC2 (VLAN 20):  Request timed out  ✓  (annen bedrift)
```
