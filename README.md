# Browser Technologies @cmda-minor-web 1819

## Wireflow
Core functionaliteit: Melding ontvangen wanneer favoriete voetbalteam gescoord heeft.
Met gebruik van: Node.js & service workers.

![https://i.ibb.co/W2Xv1YZ/front-page.png](frontpage.png)
De hoofdpagina van de website is heel eenvoudig. Op de hoofdpagina kan je in een drop-down menu je favoriete eredivisie team selecteren. Na het selecteren klik je op volgende en wordt je doorgeleid naar de ‘live score pagina’. 
(Deze pagina werkt ook zonder afbeeldingen, javascript en cache)
(Deze pagina werkt op alle devices omdat ‘select’ en ‘button’ door alle browsers gesupport wordt.) 

![https://i.ibb.co/0hzynZ1/soccer-page.png](livepage.png)
De live score pagina heeft verschillende functionaliteit. Het eerste wat je ziet is de live score van de voetbalwedstrijd (uit een lokaal JSON  bestand, zou ook API kunnen zijn). Bij het refreshen van de pagina wordt opnieuw de score geladen en weergegeven (ook zonder javascript). Dit werkt dus op alle browsers, omdat het server side gerendered wordt.

Omdat meldingen niet op alle browsers gesupport worden

De core functionalteit van de website is ‘een meldingen ontvangen als je favoriete voetbalteam gescoord heeft’. Omdat notifications niet door 
