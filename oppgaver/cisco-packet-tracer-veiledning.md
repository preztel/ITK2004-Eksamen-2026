# Cisco Packet Tracer — Kontorutleie-nettverk

## Situasjon
Et kontorutleiefirma trenger nettverk der:
- Hver bedrift (1–10 ansatte) kan kommunisere internt (PC → printer)
- Bedrifter **ikke** kan nå hverandres utstyr (VLAN-isolasjon)

---

## IP-plan

| Bedrift | VLAN | Nettverk | Gateway |
|---|---|---|---|
| Bedrift 1 | VLAN 10 | 192.168.10.0/24 | 192.168.10.1 |
| Bedrift 2 | VLAN 20 | 192.168.20.0/24 | 192.168.20.1 |
| Bedrift 3 | VLAN 30 | 192.168.30.0/24 | 192.168.30.1 |
| Kontorutleie (server) | VLAN 99 | 192.168.99.0/24 | 192.168.99.1 |

---

## Rekkefølge

```
1. Planlegg IP-plan på papir
2. Legg ut: 1 router, 1 switch, 6 PC, 3 printer, 1 server
3. Koble med kabler (Auto-kabel)
4. Konfigurer VLAN på switch
5. Konfigurer subinterfaces på router
6. Sett opp ACL for isolasjon
7. Sett IP på alle PC-er
8. Test med ping
```

---

## Del 1 — Utstyr

- **Router:** 2911
- **Switch:** 2960
- **End Devices:** 2 PC-er + 1 printer per bedrift, 1 server

### Kabling
- PC/printer/server → Switch: **Copper Straight-Through** (eller Auto-kabel)
- Switch → Router: **Copper Cross-Over** (eller Auto-kabel)
- Auto-kabelen (oransje blitzsymbol) velger riktig type automatisk

### Portoversikt (eksempel)
| Port | Enhet | VLAN |
|---|---|---|
| Fa0/1 | Bedrift 1 – PC1 | 10 |
| Fa0/2 | Bedrift 1 – PC2 | 10 |
| Fa0/3 | Bedrift 1 – Printer | 10 |
| Fa0/4 | Bedrift 2 – PC1 | 20 |
| Fa0/5 | Bedrift 2 – PC2 | 20 |
| Fa0/6 | Bedrift 2 – Printer | 20 |
| Fa0/7 | Bedrift 3 – PC1 | 30 |
| Fa0/8 | Bedrift 3 – PC2 | 30 |
| Fa0/9 | Bedrift 3 – Printer | 30 |
| Fa0/10 | Server (kontorutleie) | 99 |
| Gi0/1 | → Router (trunk) | trunk |

---

## Del 2 — VLAN på switch (CLI)

```
enable
configure terminal

vlan 10
 name Bedrift1
vlan 20
 name Bedrift2
vlan 30
 name Bedrift3
vlan 99
 name Kontorutleie
exit

! Bedrift 1
interface fastethernet 0/1
 switchport mode access
 switchport access vlan 10
exit
interface fastethernet 0/2
 switchport mode access
 switchport access vlan 10
exit
interface fastethernet 0/3
 switchport mode access
 switchport access vlan 10
exit

! Bedrift 2
interface fastethernet 0/4
 switchport mode access
 switchport access vlan 20
exit
interface fastethernet 0/5
 switchport mode access
 switchport access vlan 20
exit
interface fastethernet 0/6
 switchport mode access
 switchport access vlan 20
exit

! Bedrift 3
interface fastethernet 0/7
 switchport mode access
 switchport access vlan 30
exit
interface fastethernet 0/8
 switchport mode access
 switchport access vlan 30
exit
interface fastethernet 0/9
 switchport mode access
 switchport access vlan 30
exit

! Server
interface fastethernet 0/10
 switchport mode access
 switchport access vlan 99
exit

! Trunk mot router
interface gigabitethernet 0/1
 switchport mode trunk
exit
```

---

## Del 3 — Subinterfaces på router (CLI)

```
enable
configure terminal

interface gigabitethernet 0/0
 no shutdown
exit

interface gigabitethernet 0/0.10
 encapsulation dot1q 10
 ip address 192.168.10.1 255.255.255.0
exit

interface gigabitethernet 0/0.20
 encapsulation dot1q 20
 ip address 192.168.20.1 255.255.255.0
exit

interface gigabitethernet 0/0.30
 encapsulation dot1q 30
 ip address 192.168.30.1 255.255.255.0
exit

interface gigabitethernet 0/0.99
 encapsulation dot1q 99
 ip address 192.168.99.1 255.255.255.0
exit
```

---

## Del 4 — ACL (blokkér trafikk mellom bedrifter)

```
! Blokkér Bedrift 1 fra å nå Bedrift 2 og 3
access-list 110 deny ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
access-list 110 deny ip 192.168.10.0 0.0.0.255 192.168.30.0 0.0.0.255
access-list 110 permit ip any any

! Blokkér Bedrift 2 fra å nå Bedrift 1 og 3
access-list 120 deny ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 120 deny ip 192.168.20.0 0.0.0.255 192.168.30.0 0.0.0.255
access-list 120 permit ip any any

! Blokkér Bedrift 3 fra å nå Bedrift 1 og 2
access-list 130 deny ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 130 deny ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
access-list 130 permit ip any any

! Bruk ACL på subinterfacene
interface gigabitethernet 0/0.10
 ip access-group 110 in
exit

interface gigabitethernet 0/0.20
 ip access-group 120 in
exit

interface gigabitethernet 0/0.30
 ip access-group 130 in
exit
```

---

## Del 5 — IP-adresse på PC-er

Dobbeltklikk PC → Desktop → IP Configuration:

| Enhet | IP-adresse | Subnet Mask | Gateway |
|---|---|---|---|
| Bedrift1-PC1 | 192.168.10.2 | 255.255.255.0 | 192.168.10.1 |
| Bedrift1-PC2 | 192.168.10.3 | 255.255.255.0 | 192.168.10.1 |
| Bedrift1-Printer | 192.168.10.4 | 255.255.255.0 | 192.168.10.1 |
| Bedrift2-PC1 | 192.168.20.2 | 255.255.255.0 | 192.168.20.1 |
| Bedrift2-PC2 | 192.168.20.3 | 255.255.255.0 | 192.168.20.1 |
| Bedrift2-Printer | 192.168.20.4 | 255.255.255.0 | 192.168.20.1 |
| Bedrift3-PC1 | 192.168.30.2 | 255.255.255.0 | 192.168.30.1 |
| Bedrift3-PC2 | 192.168.30.3 | 255.255.255.0 | 192.168.30.1 |
| Bedrift3-Printer | 192.168.30.4 | 255.255.255.0 | 192.168.30.1 |
| Server | 192.168.99.2 | 255.255.255.0 | 192.168.99.1 |

---

## Del 6 — Test med ping

PC → Desktop → Command Prompt:

```
! Skal fungere (samme VLAN):
ping 192.168.10.4      (Bedrift1-PC1 → Bedrift1-Printer)

! Skal IKKE fungere (annen bedrift):
ping 192.168.20.2      (Bedrift1-PC1 → Bedrift2-PC1)
```

- Svar = ✅ isolasjon fungerer
- Request timeout = ✅ blokkering fungerer
