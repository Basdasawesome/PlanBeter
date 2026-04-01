# Afspraken project PlanBeter

Dit zijn de afspraken die wij (Gerjan Nienhuis, Ezra Vos en Rutger van der Kooi) hebben gemaakt.

---

## Algemeen

### Daily stand-up

Elke dag is er om 09:15 een daily stand-up. Als je niet aanwezig kan zijn wordt dat minimaal één dag van te voren gemeld.

### Taken bijhouden

Iedereen werkt aan zijn eigen tickets van GitHub Projects. Elke taak heeft een omschrijving, prioriteit en deadline. Het bord wordt minimaal één keer per dag bijgewerkt, vóór de stand-up.

### Ziekte

Als er iemand ziek is dan kan die persoon de dag erna verder met zijn werk en word er gekeken of hij hulp kan krijgen van iemand anders. Als er iemand meerdere dagen afwezig is word er gekeken of er tickets overgenomen kunnen worden door iemand anders en word de planning aangepast op basis van een kort overleg

---

## Code

### Layout via gedeeld component

Elke pagina gebruikt de standaard layout die is gedefinieerd in `resources/js/Layouts/app-layout.jsx`.

### Form Requests voor validatie

Voor elk formulier dat gegevens naar de server stuurt, wordt een aparte Form Request class aangemaakt in `app/Http/Requests/`. Er word nooit gevalideerd in een controller.

### Databasewijzigingen via migrations

Elke wijziging aan de databasestructuur (nieuwe tabel, kolom, index of foreign key) wordt vastgelegd in een nieuwe migration in `database/migrations/`.

### Database-queries via Eloquent of Query Builder

SQL-queries worden gemaakt op basis van de Elquent Query Builder. Alleen als deze de gewenste functionaliteit niet heeft mag je raw sql gebruiken maar moet wel gedocumenteerd worden wat de sql doet.

### Components

Alle React-componenten worden benoemd in kebab-case en opgeslagen in `resources/js/Components/` (herbruikbare componenten) of `resources/js/Pages/` (paginacomponenten). Bestandsnaam en componentnaam zijn altijd hetzelfde.

### Navigatie

Navigatie binnen de applicatie verloopt altijd via de `<Link>` component van Inertia.js. Gewone HTML `<a>` elements zijn alleen toegestaan voor externe links of die geen Inertia response geven (e.g. pdf downloads).

---

## Versiebeheer

### Branches

Elke nieuwe feature of bugfix krijgt een eigen branch. Er wordt nooit direct op main of dev gecommit.

### Pull Requests en code review

Elke branch wordt samengevoegd via een Pull Request. De PR wordt beoordeeld door minimaal één iemand anders voordat hij gemerged wordt.

### Commitberichten

Elk commitbericht begint met `General`, `Fix`, `Feature` of `Update`. `Fix` is voor een bugfix die je hebt gemaakt. `Feature` is het toevoegen van een nieuwe feature. `Update` is voor het aanpassen van een bestaande feature. `General` is voor als je commit niet onder `Fix`, `Feature` of `Update` past. Daarna word kort beschreven wat er is veranderd.