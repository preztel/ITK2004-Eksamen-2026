# Oppsettsveiledning for tekniker

Denne veiledningen forutsetter at alt utstyr er tilgjengelig og fysisk montert.
Se `subnett-plan.md` for fullstendig IP-tabell og `brannmur-portstyring.md` for ACL-regler.

---

## Steg 1: Fysisk kabling

1. Koble PC0, PC1, Printer0 til **Fa0/1, Fa0/2, Fa0/3** på Switch0
2. Koble PC2, PC3, Printer1 til **Fa0/4, Fa0/5, Fa0/6**
3. Koble PC4, PC5, Printer2 til **Fa0/7, Fa0/8, Fa0/9**
4. Koble Server0 til **Fa0/10**
5. Koble Switch0 **Gi0/1** → Router0 **Gi0/0** (Cross-over eller Auto-MDI)

---

## Steg 2: Konfigurer Switch0

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

interface range fa0/1-3
 switchport mode access
 switchport access vlan 10

interface range fa0/4-6
 switchport mode access
 switchport access vlan 20

interface range fa0/7-9
 switchport mode access
 switchport access vlan 30

interface fa0/10
 switchport mode access
 switchport access vlan 99

interface gi0/1
 switchport mode trunk

end
write memory
```

---

## Steg 3: Konfigurer Router0

```
enable
configure terminal

interface gi0/0
 no shutdown

interface gi0/0.10
 encapsulation dot1q 10
 ip address 192.168.10.1 255.255.255.0

interface gi0/0.20
 encapsulation dot1q 20
 ip address 192.168.20.1 255.255.255.0

interface gi0/0.30
 encapsulation dot1q 30
 ip address 192.168.30.1 255.255.255.0

interface gi0/0.99
 encapsulation dot1q 99
 ip address 192.168.99.1 255.255.255.0

end
write memory
```

---

## Steg 4: Sett IP på alle enheter

Bruk tabellen i `subnett-plan.md`. Eksempel for PC0:

```
IP-adresse:   192.168.10.2
Subnett-maske: 255.255.255.0
Standard gateway: 192.168.10.1
```

---

## Steg 5: Konfigurer ACL (brannmur)

```
enable
configure terminal

access-list 110 deny   ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
access-list 110 deny   ip 192.168.10.0 0.0.0.255 192.168.30.0 0.0.0.255
access-list 110 permit ip any any

access-list 120 deny   ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 120 deny   ip 192.168.20.0 0.0.0.255 192.168.30.0 0.0.0.255
access-list 120 permit ip any any

access-list 130 deny   ip 192.168.30.0 0.0.0.255 192.168.10.0 0.0.0.255
access-list 130 deny   ip 192.168.30.0 0.0.0.255 192.168.20.0 0.0.0.255
access-list 130 permit ip any any

interface gi0/0.10
 ip access-group 110 in

interface gi0/0.20
 ip access-group 120 in

interface gi0/0.30
 ip access-group 130 in

end
write memory
```

---

## Steg 6: Test

| Test                            | Forventet resultat         |
|---------------------------------|----------------------------|
| Ping PC0 → PC1 (VLAN 10→10)    | Reply — fungerer           |
| Ping PC0 → PC2 (VLAN 10→20)    | Timed out — blokkert       |
| Ping PC0 → PC4 (VLAN 10→30)    | Timed out — blokkert       |
| Ping PC0 → Server0 (VLAN 10→99)| Reply — tillatt            |

Ferdig Packet Tracer-fil: `../oppgaver/kontorutleie.pkt`
