| volg nummer                | 1                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Enkel evenement plannen                                                          |
| Scenario:                  | Aanmaken van een evenement met geldige gegevens en meerdere datumopties          |
| Test input:                | Titel: "Teamuitje", 3 toekomstige datumopties, gekoppeld aan een bestaande groep |
| Verwachte werking/output:  | Evenement wordt aangemaakt en is zichtbaar in het overzicht van de groep         |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 2                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Enkel evenement plannen                                                          |
| Scenario:                  | Aanmaken van een evenement zonder titel                                          |
| Test input:                | Lege titel, wel geldige datumopties                                              |
| Verwachte werking/output:  | Validatiefout: titel is verplicht                                                |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 3                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Enkel evenement plannen                                                          |
| Scenario:                  | Een niet-ingelogde gebruiker probeert een evenement aan te maken                 |
| Test input:                | Niet-ingelogde gebruiker stuurt een POST-verzoek                                 |
| Verwachte werking/output:  | Gebruiker wordt doorgestuurd naar de inlogpagina (401/403)                       |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 4                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Planningen bekijken                                                              |
| Scenario:                  | Ingelogde gebruiker bekijkt een planning waarvoor hij is uitgenodigd             |
| Test input:                | Gebruiker opent een planning waarvan hij deelnemer is                            |
| Verwachte werking/output:  | Planningspagina wordt geladen met de juiste datumopties en deelnemers            |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 5                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Planningen bekijken                                                              |
| Scenario:                  | Gebruiker probeert een planning te bekijken waarvoor hij niet is uitgenodigd     |
| Test input:                | Gebruiker stuurt een GET-verzoek naar een planning van een andere groep          |
| Verwachte werking/output:  | Toegang geweigerd (403)                                                          |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 6                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Planningen bekijken                                                              |
| Scenario:                  | Niet-ingelogde gebruiker probeert een planning te bekijken                       |
| Test input:                | GET-verzoek zonder sessie                                                        |
| Verwachte werking/output:  | Gebruiker wordt doorgestuurd naar de inlogpagina                                 |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 7                                                                                   |
| -------------------------- | ----------------------------------------------------------------------------------- |
| Functionaliteit:           | Beschikbaarheid opgeven                                                             |
| Scenario:                  | Gebruiker geeft beschikbaarheid op voor alle datumopties                            |
| Test input:                | Status: "ja" voor datum 1, "nee" voor datum 2, "twijfel" voor datum 3               |
| Verwachte werking/output:  | Beschikbaarheid wordt opgeslagen en gekoppeld aan de juiste gebruiker en datumoptie |
| Werkelijke werking/output: | *leeg*                                                                              |
| Conclusie test             | *leeg*                                                                              |

| volg nummer                | 8                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Beschikbaarheid opgeven                                                          |
| Scenario:                  | Gebruiker past eerder opgegeven beschikbaarheid aan                              |
| Test input:                | Status wijzigen van "ja" naar "nee" voor datum 1                                 |
| Verwachte werking/output:  | Bestaande beschikbaarheid wordt bijgewerkt in de database                        |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 9                                                                                |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Beschikbaarheid opgeven                                                          |
| Scenario:                  | Gebruiker geeft een ongeldige status op                                          |
| Test input:                | Status: "misschien" (niet toegestane waarde)                                     |
| Verwachte werking/output:  | Validatiefout: status moet "ja", "nee" of "twijfel" zijn                         |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 10                                                                               |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Data wijzigen                                                                    |
| Scenario:                  | Evenement-beheerder wijzigt een datumoptie naar een geldige toekomstige datum    |
| Test input:                | Nieuwe datum voor datumoptie 1                                                   |
| Verwachte werking/output:  | Datum wordt bijgewerkt in de database                                            |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 11                                                                               |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Data wijzigen                                                                    |
| Scenario:                  | Gewone deelnemer probeert een datum te wijzigen                                  |
| Test input:                | Deelnemer zonder beheerdersrol stuurt een PATCH-verzoek                          |
| Verwachte werking/output:  | Toegang geweigerd (403)                                                          |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |

| volg nummer                | 12                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------- |
| Functionaliteit:           | Herhalend evenement aanmaken                                                          |
| Scenario:                  | Aanmaken van een maandelijks herhalend evenement                                      |
| Test input:                | Titel: "Maandelijkse borrel", herhaling: maandelijks, gekoppeld aan een groep         |
| Verwachte werking/output:  | Evenement wordt aangemaakt met `is_recurring = true` en `recurrence_type = "monthly"` |
| Werkelijke werking/output: | *leeg*                                                                                |
| Conclusie test             | *leeg*                                                                                |

| volg nummer                | 13                                                                                     |
| -------------------------- | -------------------------------------------------------------------------------------- |
| Functionaliteit:           | Herhalend evenement aanmaken                                                           |
| Scenario:                  | Aanmaken van een herhalend evenement met een ongeldig herhalingstype                   |
| Test input:                | `recurrence_type: "elk kwartaal"`                                                      |
| Verwachte werking/output:  | Validatiefout: herhalingstype moet dagelijks, wekelijks, maandelijks of jaarlijks zijn |
| Werkelijke werking/output: | *leeg*                                                                                 |
| Conclusie test             | *leeg*                                                                                 |

| volg nummer                | 14                                                                               |
| -------------------------- | -------------------------------------------------------------------------------- |
| Functionaliteit:           | Live updates                                                                     |
| Scenario:                  | Evenement-beheerder wijzigt een datum — broadcast-event wordt afgevuurd          |
| Test input:                | Beheerder stuurt een PATCH-verzoek om een datum te wijzigen                      |
| Verwachte werking/output:  | Het juiste broadcast-event wordt afgevuurd op het verwachte kanaal               |
| Werkelijke werking/output: | *leeg*                                                                           |
| Conclusie test             | *leeg*                                                                           |
