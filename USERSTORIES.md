# Userstories

---

| **Titel**              | Planningen bekijken |
|------------------------|------------------------|
| **Als een**            | deelnemer |
| **Wil ik**             | de planningen kunnen bekijken waarvoor ik ben uitgenodigd of die ik zelf heb aangemaakt |
| **Zodat**              | ik per planning kan zien wanneer een afspraak vaststaat |
| **Prioriteit**         | Must Have |
| **Tijd**               | 2 dagen |
| **Acceptatiecriteria** | - Een deelnemer kan op elk moment de planning openen en de geplande data bekijken<br>- Een deelnemer zonder beheerdersrol kan de planning niet aanpassen<br>- Een deelnemer ziet alleen planningen waarvoor hij/zij is uitgenodigd of die hij/zij zelf heeft aangemaakt |
| **Scenario**           | **Scenario:**<br> Gegeven  dat er een teamuitje aan komt maar je niet weet op welke dag dat is<br> Wanneer je de website opent en klikt op een planning<br> Dan zie je direct de datum en tijd die door de groep is gekozen<br> En kan je het alleen zien |

---

| **Titel**              | Beschikbaarheid opgeven |
|------------------------|------------------------|
| **Als een**            | deelnemer |
| **Wil ik**             | De data waarop ik beschikbaar ben makkelijk kunnen opgeven |
| **Zodat**              | Ik meegenomen kan worden in de planning |
| **Prioriteit**         | Must have |
| **Tijd**               | 2 dagen |
| **Acceptatiecriteria** | - Er is een optie om aan te geven op welke data je beschikbaar bent<br> - Voor elke data kan je minimaal aangeven ja, twijfel, of nee voor beschikbaarheid<br> - Je kan de data nadertijd nog aanpassen |
| **Scenario**           | **Scenario:**<br> Gegeven dat er een evenement wordt georganiseert<br> Wanneer ik mijn beschikbaarheid opgeef per datum<br> Dan wordt mijn beschikbaarheid opgeslagen<br> En wordt ik meegenomen in de berekening van de beste datum |


---

| **Titel**              | Data wijzigen |
|------------------------|------------------------|
| **Als een**            | beheerder |
| **Wil ik**             | een geplande datum kunnen wijzigen |
| **Zodat**              | de planning up-to-date blijft als er iets verandert |
| **Prioriteit**         | Must Have |
| **Tijd**               | 2 dagen |
| **Acceptatiecriteria** | - Alleen de aanmaker of een beheerder van de planning kan een datum wijzigen<br>- Na het wijzigen zien alle deelnemers direct de nieuwe datum<br>- Het systeem slaat de vorige datum op als geschiedenis, zodat wijzigingen traceerbaar zijn<br>- Deelnemers ontvangen een melding als een datum wordt gewijzigd |
| **Scenario**           | **Scenario:**<br> Gegeven dat het teamuitje verzet moet worden<br> Wanneer de aanmaker de planning opent en een nieuwe datum kiest<br> Dan zien alle andere deelnemers de bijgewerkte datum<br> En ontvangen zij een melding dat de planning is gewijzigd |

---

| **Titel**              | Groep aanmaken |
|------------------------|------------------------|
| **Als een**            | gebruiker |
| **Wil ik**             | een groep aanmaken met meerdere deelnemers |
| **Zodat**              | ik samen met vaste mensen meerdere evenementen kan inplannen zonder een nieuwe uitnodiging te sturen |
| **Prioriteit**         | Must Have |
| **Tijd**               | 1 dag |
| **Acceptatiecriteria** | - Een gebruiker kan een nieuwe groep aanmaken met een naam<br>- De aanmaker wordt automatisch beheerder van de groep<br>- De aanmaker kan direct bij het aanmaken mensen uitnodigen via e-mailadres<br>- De groep is zichtbaar in het overzicht van de aanmaker zodra hij/zij is aangemaakt |
| **Scenario**           | **Scenario:**<br> Gegeven dat je regelmatig activiteiten organiseert met je vriendengroep<br> Wanneer je een groep aanmaakt met een naam en een aantal vrienden toevoegt<br> Dan kunnen zij samen planningen aanmaken<br> En hoef je niet meer elke keer opnieuw iedereen uit te nodigen |

---

| **Titel**              | Groep beheren |
|------------------------|------------------------|
| **Als een**            | beheerder |
| **Wil ik**             | rollen kunnen toewijzen en leden beheren binnen een groep |
| **Zodat**              | de verantwoordelijkheid voor de planning goed verdeeld kan worden |
| **Prioriteit**         | Must Have |
| **Tijd**               | 2 dagen |
| **Acceptatiecriteria** | - Een beheerder kan een lid de rol "beheerder" of "deelnemer" geven<br>- Een beheerder kan leden verwijderen uit de groep<br>- Een beheerder kan nieuwe leden uitnodigen via e-mailadres<br>- Gewone deelnemers kunnen de ledenlijst bekijken maar niet aanpassen<br>- Er is altijd minimaal één beheerder in een groep |
| **Scenario**           | **Scenario:**<br> Gegeven dat Tom beheerder is van de sportvereniging-groep<br> Wanneer hij een nieuw lid (Sara) de rol beheerder geeft en een vertrokken lid verwijdert<br> Dan kan Sara helpen met plannen<br> En heeft het vertrokken lid geen toegang meer tot de groep |

---

| **Titel**              | Herhalend evenement aanmaken |
|------------------------|------------------------|
| **Als een**            | beheerder |
| **Wil ik**             | een evenement herhalend kunnen instellen, bijvoorbeeld wekelijks of maandelijks |
| **Zodat**              | ik niet elke keer handmatig hetzelfde evenement hoef aan te maken |
| **Prioriteit**         | Must have |
| **Tijd**               | 3 dagen |
| **Acceptatiecriteria** | - Een beheerder kan bij het aanmaken van een evenement kiezen voor herhaling: dagelijks, wekelijks, maandelijks of jaarlijks<br>- Alle herhalingen zijn zichtbaar in de kalender als aparte items<br>- Een enkele herhaling kan worden gewijzigd zonder dat de rest verandert |
| **Scenario**           | **Scenario:**<br> Gegeven dat er een vriendengroep maandelijks bij elkaar komt<br> Wanneer Ik hier de planning voor maak geef ik aan dat het een maandleijks event is<br> Dan kunnen alle deelnamers hun beschikbaarheid elke maand opgeven<br> En word er per maand gekeken naar wat de beste datum is en word het evenement bevestigd, zo hoef je maar één planning aan te maken |

---

| **Titel**              | Handmatige herinnering versturen |
|------------------------|------------------------|
| **Als een**            | beheerder |
| **Wil ik**             | deelnemers een herinnering kunnen sturen |
| **Zodat**              | ik het evenement kan vastzetten |
| **Prioriteit**         | Should Have |
| **Tijd**               | 1 dag |
| **Acceptatiecriteria** | - Een beheerder kan per evenement op een knop klikken om een herinnering te sturen<br>- De herinnering wordt verstuurd via e-mail<br>- De herinnering word alleen gestuurt naar deelnemers die nog niet hun beschikbaarheid hebben opgegeven<br>- Je kan dit als beheerder eens in de 24 uur doen |
| **Scenario**           | **Scenario:**<br> Gegeven dat de beheerder over een week de planning klaar wil hebben<br> Wanneer een aantal mensen nog niet hun beschikbaarheid hebben opgegeven<br> Dan kan de beheerder op een knop drukken<br> En worden die mensen herinnerd dat ze hun beschikbaarheid nog moeten opgeven |

---

| **Titel**              | Automatische reminder |
|------------------------|------------------------|
| **Als een**            | beheerder |
| **Wil ik**             | kunnen instellen dat er automaties een herinnering word verstuurd |
| **Zodat**              | de mensen die nog niet hun beschikbaarheid hebben opgegeven dat nog kunnen doen |
| **Prioriteit**         | Should have |
| **Tijd**               | 1 dag |
| **Acceptatiecriteria** | - De beheerder <br>- Een beheerder kan de automatische reminder uitschakelen<br>- Deelnemers kunnen zich afmelden voor automatische herinneringen<br>- De herinnering bevat de naam van het evenement, datum en tijd |
| **Scenario**           | **Scenario:**<br> Gegeven dat er een aantal mensen zijn die hun beschikbaarheid nog niet hebben opgegeven<br>Wanneer niemnad heeft gereageerd na 3 dagen<br> Dan krijgt iedereen automatisch een herinnerings mail om aan te geven dat ze hun beschikbaarheid moeten opgeven<br> En kunnen ze vanuit de mail worden doorgestuurt om het in te vullen |

---

| **Titel**              | Live updates zien |
|------------------------|------------------------|
| **Als een**            | deelnemer |
| **Wil ik**             | wijzigingen in een planning direct zien zonder de pagina te verversen |
| **Zodat**              | ik altijd de meest actuele informatie zie |
| **Prioriteit**         | Should Have |
| **Tijd**               | 3 dagen |
| **Acceptatiecriteria** | - Als een beheerder een datum wijzigt, zien alle actieve deelnemers de update binnen 5 seconden<br>- Nieuwe evenementen in een groepskalender verschijnen direct bij alle deelnemers<br>- Er is een zichtbare indicator als de pagina live wordt bijgewerkt |
| **Scenario**           | **Scenario:**<br> Gegeven dat meerdere mensen tegelijk naar de planning kijken<br> Wanneer de beheerder een datum verzet<br> Dan zien alle anderen de nieuwe datum direct verschijnen op hun scherm<br> En hoeven ze de pagina niet te verversen |

---

| **Titel**              | Evenement exporteren |
|------------------------|------------------------|
| **Als een**            | deelnemer |
| **Wil ik**             | een evenement in mijn agenda kunnen zetten |
| **Zodat**              | ik al mijn afspraken op één plek zie en dubbele afspraken kan voorkomen |
| **Prioriteit**         | Should Have |
| **Tijd**               | 2 dagen |
| **Acceptatiecriteria** | - Een gebruiker kan op een knop klikken om het in de agenda te zetten<br>- Na het exporteren zijn de evenementen zichtbaar in je eigen kalender |
| **Scenario**           | **Scenario:**<br> Gegeven dat een evenement gepland is<br> Wanneer je dit exporteert naar je agenda<br> Dan word dit weergegeven in je persoonlijke agenda<br> En heb je een overzicht met al je afspraken  |

---

| **Titel**              | Kalender synchroniseren |
|------------------------|------------------------|
| **Als een**            | deelnemer |
| **Wil ik**             | mijn agenda synchroniseren met de website |
| **Zodat**              | ik makkelijk mijn beschikbaarheid op kan geven |
| **Prioriteit**         | Could Have |
| **Tijd**               | 3 dagen |
| **Acceptatiecriteria** | - Een deelnemer kan een koppeling maken met Google Agenda of Apple Agenda via inloggen met dat account<br>- De synchronisatie werkt twee kanten op: groepswijzigingen gaan naar de persoonlijke agenda en vice versa<br>- De synchronisatie wordt minimaal elke 15 minuten automatisch uitgevoerd als je op de website zit<br>- Een deelnemer kan de koppeling op elk moment stop zetten |
| **Scenario**           | **Scenario:**<br> Gegeven dat je jou Google agenda koppelt aan de website<br> Wanneer er een nieuw evenement wordt aangemaakt<br> Dan verschijnt dit evenement in je Google Agenda<br> En hoeft je dit zelf niet te exporteren |
