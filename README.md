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

### Laravel Reverb starten (voor live updates)
Voor WebSocket live updates moet Reverb in een aparte terminal draaien:

```bash
php artisan reverb:start
```

Gebruik dus tijdens development twee terminals:
- Terminal 1: `composer run dev`
- Terminal 2: `php artisan reverb:start`

> [!NOTE]
Laravel Reverb hoeft niet aan te staan om het project te laten werken maar dan werken de live updates van de WebSocket niet

### Tests

Zorg ervoor dat de waardes in de [`phpunit.xml`](/phpunit.xml) goed staan. Belangerijk is dat de database gebruikt kan worden:

```xml
<env name="DB_DATABASE" value="laravel_test"/>
<env name="DB_USERNAME" value="USERNAME"/>
<env name="DB_PASSWORD" value="PASSWORD"/>
```

run de tests met de commando:

```bash
php artisan test
```
