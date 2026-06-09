# Slik setter du opp tilgang til mapper og filer

**Hvem er denne veilederen for?**
Deg som skal gi ansatte tilgang til delte mapper på nettverket — eller fjerne tilgang når noen slutter.

**Hva trenger du?**
- Tilgang til filserveren (administrator-konto)
- Vite hvilken gruppe eller bruker som skal ha tilgang

---

## Del A: Gi tilgang via gruppe (anbefalt)

Den beste måten er å styre tilgang gjennom **grupper**, ikke enkeltbrukere. Da er det enkelt å legge til og fjerne ansatte uten å endre selve mappetillatelsene.

### Steg 1: Finn mappen

1. Åpne **Filutforsker** på serveren
2. Naviger til den delte mappen (f.eks. `C:\Delt\Bedrift1`)
3. **Høyreklikk** på mappen → velg **Egenskaper**

---

### Steg 2: Åpne sikkerhetstillatelser

1. Klikk på fanen **Sikkerhet**
2. Du ser en liste over hvem som har tilgang

> **Hva betyr kolonnene?**
> - **Tillat** ✅ = personen/gruppen KAN gjøre dette
> - **Avslå** ❌ = personen/gruppen kan IKKE gjøre dette — overstyrer alltid Tillat

---

### Steg 3: Legg til en gruppe

1. Klikk på **Rediger...**
2. Klikk på **Legg til...**
3. Skriv inn gruppenavnet (f.eks. `Bedrift1-ansatte`)
4. Klikk **Kontroller navn** — navnet skal bli understreket hvis det finnes
5. Klikk **OK**

---

### Steg 4: Sett tillatelsesnivå

Velg gruppen du nettopp la til og huk av riktig tillatelse:

| Tillatelse | Hva det betyr | Passer for |
|------------|---------------|------------|
| **Leser** | Kan åpne og lese filer, men ikke lagre endringer | Gjester, ledelse |
| **Endre** | Kan lese, lagre, opprette og slette filer | Vanlige ansatte |
| **Full kontroll** | Kan alt, inkludert endre tillatelser | Kun administratorer |

> **Anbefaling:** Gi ansatte **Endre**-tilgang. Gi aldri **Full kontroll** til vanlige brukere.

6. Huk av **Tillat** ved siden av riktig tillatelse
7. Klikk **Bruk** → **OK**

---

### Steg 5: Test tilgangen

1. Logg inn som en bruker i gruppen på en klientmaskin
2. Åpne mappen via nettverksstien (f.eks. `\\server\Bedrift1`)
3. Prøv å åpne en fil ✅
4. Prøv å lagre en endring ✅
5. Prøv å åpne en mappe du IKKE skal ha tilgang til ❌ (skal gi feilmelding)

---

## Del B: Fjerne tilgang (når ansatt slutter)

### Alternativ 1: Deaktiver brukeren (anbefalt)

Deaktiver heller enn å slette — da beholder du historikk.

1. Åpne **Active Directory Users and Computers**
2. Finn brukeren
3. **Høyreklikk** → **Deaktiver konto**
4. Brukeren kan ikke lenger logge inn ✅

### Alternativ 2: Fjern fra gruppe

1. **Dobbeltklikk** på brukeren i Active Directory
2. Gå til fanen **Medlem av**
3. Velg gruppen → klikk **Fjern**
4. Klikk **Bruk** → **OK**

Brukeren mister da tilgang til alle mapper gruppen hadde tilgang til.

---

## Rask oversikt

```
Mappe → Høyreklikk → Egenskaper → Sikkerhet → Rediger
→ Legg til gruppe
→ Velg tillatelse (Endre for vanlige ansatte)
→ Bruk → OK
→ Test med en bruker fra gruppen
```

---

## Viktige regler

> ⚠️ **Gi aldri Full kontroll til vanlige ansatte**
> ⚠️ **Bruk grupper, ikke enkeltbrukere — enklere å administrere**
> ⚠️ **Deaktiver brukere i stedet for å slette dem**
