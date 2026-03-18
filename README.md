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

---

## Setup

### Benodigdheden
- **PHP** (8.3 aanbevolen)
- **Composer**
- **Node.js + npm**
- **MySQL** (standaard)

### Installeren
1. Kopieer je env en zet je database goed:

```bash
cp .env.example .env
```

Pas daarna in `.env` minimaal deze waarden aan:
- **DB_DATABASE**
- **DB_USERNAME**
- **DB_PASSWORD**

2. Draai de standaard setup (installeert dependencies, genereert key, draait migraties, bouwt frontend):

```bash
composer run setup
```

### Project starten (development)
Dit start tegelijk de Laravel server, queue worker, logs (Pail) en Vite:

```bash
composer run dev
```

Open daarna de app via `http://localhost:8000`.

### Tests

```bash
php artisan test --compact
```
