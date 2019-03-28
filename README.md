# Browser Technologies @cmda-minor-web 1819

## Inhoudsopgave
1. De opdracht
2. Wireflow (functional, reliable & pleasurable layers)
3. Beschrijving van de feature(s)/browser technologies
4. Welke browsers de features wel/niet ondersteunen
5. Accessability




## 1. De opdracht
Er zijn talloze mogelijke apparaten/browsers/operating systems die jouw site willen bekijken. In het vak browser Technologies leren we hoe we een robuuste & toegankelijke website voor alle devices maken. Het web is voor iedereen en daarom is het belangrijk dat de website op alle devices de core functionaliteit behaalt.

Voor het vak browser technologies maken we een site over 1 van de mogelijke onderwerpen gekregen van de docent. Ik heb gekozen voor de opdracht: *Melding ontvangen wanneer favoriete voetbalteam gescoord heeft.* Er zitten veel restrictions aan het geven van meldingen, zo is het geven van meldingen vanuit de browser bijvoorbeeld al niet mogelijk op safari (Apple). 

In deze readme beschrijf ik hoe de website werkt en hoe ik onlangs de restricties toch een toegankelijke website voor alle devices heb gemaakt.

*Belangrijk om te weten: De website wordt server-side gerendered door middel van node.js. Dit zorgt ervoor dat de website ook werkt zonder javascript.*

## 1. Wireflow
### Hoofdpagina 
![frontpage.png](https://i.ibb.co/W2Xv1YZ/front-page.png)
De hoofdpagina van de website is heel eenvoudig. Op de hoofdpagina kan je in een drop-down menu je favoriete eredivisie team selecteren. Na het selecteren klik je op *volgende* en wordt je doorgeleid naar de ‘live score pagina’. 

- Deze pagina werkt ook zonder afbeeldingen, javascript en cache
- Deze pagina werkt op alle devices omdat ‘select’ en ‘button’ door alle browsers gesupport wordt

### Score pagina
![livepage.png](https://i.ibb.co/0hzynZ1/soccer-page.png)
De live score pagina heeft verschillende functionaliteit: 

- Het eerste wat je ziet is de live score van de voetbalwedstrijd (uit een lokaal JSON  bestand, zou ook API kunnen zijn). Bij het refreshen van de pagina wordt opnieuw de score geladen en weergegeven (ook zonder javascript). Dit werkt dus op alle browsers, omdat het server side gerendered wordt.
- Nadat er door de server gechecked is of de gebruiker service workers ondersteund, wordt onder de score gevraagd of de gebruiker gebruik wil maken van push notifications. Bij het klikken op 'Ja, graag' wordt er door de browser gevraagd of je meldingen wil toestaan. Hierna wordt er een service worker aangemaakt die push notifications mogelijk maakt. Elke 10 seconden wordt de pagina refreshed, en op het moment dat er gescoord is krijgt de gebruiker een push notification.
- Mocht de gebruiker geen service worker/javascipt toestaan, is het mogelijk om je e-mail adres op te geven. Deze wordt dan opgeslagen in een lokaal JSON bestand op de server. Elke keer als er gescoord is, stuurt de server een e-mail bericht naar alle opgeslagen gebruikers. Zo is het ook nog mogelijk om op oude devices/apple producten meldingen te ontvangen.
- 

 
