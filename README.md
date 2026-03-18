# Projectplan

**Project:** PlanBeter
**Tech Stack:** Laravel + Inertia.js + React

---

## 1. Projectomschrijving
We willen en verbeterde versie van de standaard datumprikker hebben. Naast dat je standaard eenmalige datums kan prikken kan je ook groepen maken en daar samen een doorlopende kalender hebben met meerdere "datumprikkers" tegerlijkertijd, die je ook herhalend kan inzetten.


### Kernfunctionaliteiten
* **Herhalende planning:** eenmalige afspraken en terugkerende evenementen.
* **Kalendar exporteren:** Als er een evenement geplent is dan kan deze in je agenda worden gezet.
* **Live updates:** Live updates van beschikbaarheid via WebSockets (Laravel Reverb).
* **Reminders:** Overzicht van mensen die nog geen beschikbaarheid hebben opgegeven en mogelijkheid om die een reminder te sturen.
* **Kosten-splitser:** Makkelijk kosten kunnen splitten op basis van de kosten die zijn gemaakt.

<!--

## 2. User Story Backlog

### Sprint 1: Fundament & Gebruikersbeheer (Week 1)
- [ ] **US01:** Als gebruiker wil ik kunnen inloggen met Google (OAuth) zodat mijn profiel en agenda direct gekoppeld zijn.
- [ ] **US02:** Als gebruiker wil ik groepen kunnen aanmaken en leden uitnodigen via e-mail.
- [ ] **US03:** Als groepbeheerder wil ik rollen (Admin, Moderator, Lid) kunnen toewijzen voor beveiligd beheer.

### Sprint 2: De Planning Logica (Week 2)
- [ ] **US04:** Als organisator wil ik een terugkerende 'Event Series' kunnen aanmaken zodat ik niet handmatig elke datum hoef in te voeren.
- [ ] **US05:** Als deelnemer wil ik mijn status (Ja, Nee, Misschien) kunnen opgeven voor voorgestelde datums.
- [ ] **US06:** Als deelnemer wil ik visuele indicaties zien wanneer een voorgestelde datum botst met mijn Google Calendar.

### Sprint 3: Real-time & Slacker Dashboard (Week 3)
- [ ] **US07:** Als gebruiker wil ik dat stemmen direct zichtbaar zijn voor de rest van de groep zonder de pagina te verversen (WebSockets).
- [ ] **US08:** Als organisator wil ik locaties kunnen zoeken via de Google Places API.
- [ ] **US09:** Als beheerder wil ik een 'Slacker Dashboard' zien om te achterhalen wie de planning ophoudt.
- [ ] **US10:** Als beheerder wil ik een herinneringsmail kunnen sturen naar alle mensen die nog niet gestemd hebben.

### Sprint 4: Kosten & Afronding (Week 4)
- [ ] **US11:** Als organisator wil ik een totaalbedrag aan een bevestigd event kunnen koppelen.
- [ ] **US12:** Als deelnemer wil ik mijn deel van de kosten zien en een QR-code kunnen scannen voor terugbetaling.
- [ ] **US13:** Als student wil ik het proces documenteren via de opgenomen Daily Standups en Retrospectives.

--!>