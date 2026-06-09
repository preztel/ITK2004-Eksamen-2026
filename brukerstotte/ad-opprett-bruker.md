# Slik oppretter du en ny bruker i Active Directory

**Hvem er denne veilederen for?**
Deg som skal legge til en ny ansatt i systemet. Du trenger ikke teknisk bakgrunn — bare følg stegene.

**Hva trenger du?**
- En datamaskin med tilgang til serveren (domeneadministrator-konto)
- Navn og informasjon om den nye ansatte

---

## Steg 1: Åpne Active Directory

1. Klikk på **Start**-menyen (Windows-ikonet nede til venstre)
2. Skriv inn: `Active Directory Users and Computers`
3. Klikk på programmet som dukker opp

> **Tips:** Hvis du ikke finner det, gå til **Verktøy** i Serverbehandling og velg **Active Directory-brukere og -datamaskiner**.

---

## Steg 2: Finn riktig mappe (OU)

I vinduet ser du en mappestruktur til venstre.

1. Klikk på pilen ved siden av domenenavnet (f.eks. `kontorutleie.local`) for å åpne det
2. Finn mappen som heter **Brukere** — eller den organisasjonsenheten (OU) som passer den nye ansatte

> **Hva er en OU?** En organisasjonsenhet er som en mappe for å holde orden på brukere. Det kan finnes egne mapper for `Bedrift1`, `Bedrift2` osv.

---

## Steg 3: Opprett ny bruker

1. **Høyreklikk** på mappen der brukeren skal opprettes
2. Velg **Ny** → **Bruker**

Fyll inn i vinduet som åpnes:

| Felt | Hva du skriver | Eksempel |
|------|----------------|---------|
| Fornavn | Den ansattes fornavn | `Kari` |
| Etternavn | Den ansattes etternavn | `Nordmann` |
| Brukerpåloggingsnavn | Brukernavnet de logger inn med | `kari.nordmann` |

3. Klikk **Neste**

---

## Steg 4: Sett passord

1. Skriv inn et midlertidig passord i **Passord**-feltet
2. Skriv det samme i **Bekreft passord**
3. Huk av **Brukeren må endre passord ved neste pålogging** ✅

> **Hvorfor tvinge passordbytte?** God sikkerhetspraksis. Da slipper du å vite den ansattes passord, og den ansatte får sitt eget private passord fra dag én.

4. Klikk **Neste** → **Fullfør**

---

## Steg 5: Legg brukeren til i riktig gruppe

For at brukeren skal få tilgang til riktige mapper, må de legges til i en gruppe.

1. **Dobbeltklikk** på den nye brukeren
2. Gå til fanen **Medlem av**
3. Klikk **Legg til...**
4. Skriv inn gruppenavnet (f.eks. `Bedrift1-ansatte`) og klikk **OK**
5. Klikk **Bruk** → **OK**

---

## Steg 6: Bekreft at brukeren er opprettet

Du skal nå se den nye brukeren i listen.

**Test at innlogging fungerer:**
1. Gå til en klientmaskin
2. Logg inn med det nye brukernavnet og det midlertidige passordet
3. Du skal bli bedt om å sette et nytt passord

✅ Brukeren er klar til bruk!

---

## Rask oversikt

```
Start → Active Directory Users and Computers
→ Finn riktig OU
→ Høyreklikk → Ny → Bruker
→ Fyll inn navn og brukernavn
→ Sett midlertidig passord (tving bytte)
→ Legg til i gruppe
→ Test innlogging
```
