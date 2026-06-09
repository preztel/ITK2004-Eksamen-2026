# Nettverksskisse — Kontorutleie

## Topologi

```
                       INTERNETT
                           |
                      [Brannmur]
                           |
                       [Router0]
                       Cisco 2911
                       Gi0/0 (trunk til Switch0)
                           |
                       [Switch0]
                    Cisco 2960-24TT
               _________|_________
              |      |      |      |
           Fa0/1  Fa0/4  Fa0/7  Fa0/10  Gi0/1→Router
           -0/3   -0/6   -0/9          (trunk)
             |      |      |      |
          VLAN10 VLAN20 VLAN30 VLAN99
          Bedrift Bedrift Bedrift Server
            1       2       3
```

## Enheter

| Enhet      | Modell          | Rolle                               |
|------------|-----------------|-------------------------------------|
| Router0    | Cisco 2911      | Router-on-a-stick, standard gateway |
| Switch0    | Cisco 2960-24TT | VLAN-segmentering, trunk til router  |
| Server0    | Server-PT       | Kontorutleie intern server           |
| PC0–PC1    | PC-PT           | Klientmaskiner Bedrift 1 (VLAN 10)  |
| PC2–PC3    | PC-PT           | Klientmaskiner Bedrift 2 (VLAN 20)  |
| PC4–PC5    | PC-PT           | Klientmaskiner Bedrift 3 (VLAN 30)  |
| Printer0   | Printer-PT      | Nettverksskriver Bedrift 1           |
| Printer1   | Printer-PT      | Nettverksskriver Bedrift 2           |
| Printer2   | Printer-PT      | Nettverksskriver Bedrift 3           |

## Kabeltyper

| Kobling             | Kabeltype                    |
|---------------------|------------------------------|
| PC/Printer → Switch | Copper Straight-Through      |
| Server → Switch     | Copper Straight-Through      |
| Switch → Router     | Copper Cross-Over (Auto-MDI) |

## Router subinterfaces (dot1Q)

| Subinterface | VLAN | IP-adresse     |
|--------------|------|----------------|
| Gi0/0.10     | 10   | 192.168.10.1   |
| Gi0/0.20     | 20   | 192.168.20.1   |
| Gi0/0.30     | 30   | 192.168.30.1   |
| Gi0/0.99     | 99   | 192.168.99.1   |
