# Vanlige feil og løsninger — Active Directory

## "Feil brukernavn eller passord" ved innlogging

**Mulige årsaker:**
- Feil passord — prøv igjen
- Capslock er på — sjekk tastaturet
- Kontoen er låst etter for mange feil forsøk

**Løsning:**
1. Åpne **Active Directory Users and Computers**
2. Finn brukeren → **Høyreklikk** → **Egenskaper**
3. Gå til fanen **Konto**
4. Huk av **Lås opp konto** hvis den er låst
5. Klikk **OK**

---

## Brukeren ser ikke den delte mappen

**Mulige årsaker:**
- Brukeren er ikke i riktig gruppe
- Mappen er ikke delt på nettverket

**Løsning:**
1. Sjekk at brukeren er i gruppen som har tilgang (fanen **Medlem av**)
2. Sjekk at mappen er delt: Høyreklikk → Egenskaper → **Deling**
3. Logg ut og inn igjen — gruppemedlemskap oppdateres ved innlogging

---

## "Tilgang nektet" når bruker prøver å åpne fil

**Mulige årsaker:**
- Gruppen har kun **Leser**-tillatelse, ikke Endre
- En overordnet mappe blokkerer tilgangen
- Et **Avslå**-oppføring overstyrer Tillat

**Løsning:**
1. Sjekk tillatelsene på mappen (fanen **Sikkerhet**)
2. Sjekk også tillatelsene på overordnet mappe
3. Husk: **Avslå overstyrer alltid Tillat**

---

## Brukeren kan ikke bytte passord

**Mulige årsaker:**
- Passordet er for nytt (policy krever X dager mellom bytte)
- Kontoen er konfigurert til "Passord utløper aldri" uten endringsrett

**Løsning:**
1. Finn brukeren i Active Directory
2. **Høyreklikk** → **Tilbakestill passord**
3. Sett nytt midlertidig passord og huk av **Brukeren må endre passord**

---

## Bruker er ikke synlig i Active Directory

**Mulige årsaker:**
- Brukeren er i en annen OU enn du ser på
- Søk er begrenset til gjeldende mappe

**Løsning:**
1. I **Active Directory Users and Computers**, klikk **Vis** → **Avanserte funksjoner**
2. Bruk søk: **Handling** → **Finn...**
3. Skriv inn brukernavnet og klikk **Finn nå**

---

## Ny ansatt logger inn men får ikke tilgang til mapper

Dette er en vanlig fallgruve som ikke er åpenbar første gang.

**Årsak:** Gruppemedlemskap oppdateres ikke midt i en pålogget økt — bare ved innlogging.

**Løsning:** Be den ansatte logge helt ut og inn igjen. Tilgangen skal da fungere.

> Denne feilen er veldig vanlig når noen nettopp er lagt til i en gruppe. Husk det som første løsning.
