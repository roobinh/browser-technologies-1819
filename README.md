# Browser Technologies @cmda-minor-web 1819

## Inhoudsopgave
1. [De opdracht](#1)
2. [Wireflow (functional, reliable & pleasurable layers)](#2)
3. [Feature(s)/browser technologies](#3)
4. [Browser Support](#4)
5. [Accessability](#5)

<a name="1"></a>
## 1. De opdracht
Er zijn talloze mogelijke apparaten/browsers/operating systems die jouw site willen bekijken. In het vak browser Technologies leren we hoe we een robuuste & toegankelijke website voor alle devices maken. Het web is voor iedereen en daarom is het belangrijk dat de website op alle devices de core functionaliteit behaalt.

Voor het vak browser technologies maken we een site over 1 van de mogelijke onderwerpen gekregen van de docent. Ik heb gekozen voor de opdracht: *Melding ontvangen wanneer favoriete voetbalteam gescoord heeft.* Er zitten veel restrictions aan het geven van meldingen, zo is het geven van meldingen vanuit de browser bijvoorbeeld al niet mogelijk op safari (Apple). 

In deze readme beschrijf ik hoe de website werkt en hoe ik onlangs de restricties toch een toegankelijke website voor alle devices heb gemaakt.

*Belangrijk om te weten: De website wordt server-side gerendered door middel van node.js. Dit zorgt ervoor dat de website ook werkt zonder javascript.*

<a name="2"></a>
## 2. Wireflow
### Hoofdpagina 
![frontpage.png](https://i.ibb.co/W2Xv1YZ/front-page.png)

De hoofdpagina van de website is heel eenvoudig. Op de hoofdpagina kan je in een drop-down menu je favoriete eredivisie team selecteren. Na het selecteren klik je op *volgende* en wordt je doorgeleid naar de ‘live score pagina’. 

- Deze pagina werkt ook zonder afbeeldingen, javascript en cache
- Deze pagina werkt op alle devices omdat ‘select’ en ‘button’ door alle browsers gesupport wordt
  
### Score pagina
![livepage.png](https://i.ibb.co/G5dQDX8/f17ct8p.png)

De live score pagina heeft verschillende functionaliteit: 

- Het eerste wat je ziet is de live score van de voetbalwedstrijd (uit een lokaal JSON bestand, zou ook API kunnen zijn). Bij het refreshen van de pagina wordt opnieuw de score geladen en weergegeven (ook zonder javascript). Dit werkt dus op alle browsers, omdat het server side gerendered wordt.
- Nadat er gechecked is of de gebruiker service workers ondersteund, wordt er gevraagd of de gebruiker gebruik wil maken van push notifications. Bij het klikken op 'Ja, graag' wordt er door de browser gevraagd of je meldingen wil toestaan. Hierna wordt er een service worker aangemaakt die push notifications mogelijk maakt. Elke 10 seconden wordt de pagina refreshed; op het moment dat er gescoord is krijgt de gebruiker een push notification.
- Mocht de gebruiker geen service worker/javascipt toestaan, is het mogelijk om je e-mail/whatsapp op te geven. Deze wordt dan opgeslagen in een lokaal JSON bestand op de server. Elke keer als er gescoord is, stuurt de server een e-mail/whatsapp bericht naar alle opgeslagen gebruikers. Zo is het ook nog mogelijk om op apple/oudere producten meldingen te ontvangen.
- Mocht de gebruiker hier allemaal geen gebruik van willen maken, wordt de pagina elke 10 seconden automatisch ververst om de meest up-to-date score weer te geven.

<a name="3"></a>

## 3. Feature(s)/browser technologies
- Zonder afbeeldingen werkt de pagina zoals behoren
- De pagina is volledig resizeable en useable op alle dimensies
<img src="https://i.ibb.co/x8FYChz/image.png" width="200" height="400" />

- Ook zonder CSS werkt de pagina goed. 
  
<img src="https://i.ibb.co/LYMNdPB/image.png" width="200" height="400" />

- Logo size is in HTML defined om ware grootte te voorkomen
```html
<img class="logo" src="/img/logo_eredivisie.png" alt="oba_logo" href="#home" width="300" height="200">
```
- Zonder javascript is het alleen niet mogelijk om push notifications te ontvangen, de rest van de pagina werkt nog zoals behoren. Ook refresht de pagina automatisch, omdat dit niet in JavaScript maar in HTML wordt gedaan
```html
<meta http-equiv="refresh" content="10">
```
- Mocht het laden van de custom font mislukken, is er een fallback font
```css
*, *:before, *:after {
    font-family: 'Inconsolata', monospace, 'Sans-Serif';
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
```
- viewport tag
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

<a name="4"></a>
## 4. Browser Support
Er wordt op de website gebruik gemaakt van de volgende technieken:

- [img (98.17%)](https://caniuse.com/#search=img)
- [button (100%?)](https://www.w3schools.com/tags/tag_button.asp)
- [select (100%?)](https://www.w3schools.com/tags/tag_select.asp)
- [viewport (95.73)](https://caniuse.com/#search=viewport)
- [form (95.33)](https://caniuse.com/#search=form)
- [http-equiv (100%)](https://www.w3schools.com/tags/att_meta_http_equiv.asp)
- [service Worker (89.84%)](https://caniuse.com/#search=service%20worker)
- [notifications (75.17%)](https://caniuse.com/#search=notifications)

Zonder Javascript en CSS werkt de pagina zoals behoren, dus is het niet *noodzakelijk* dat deze functies gesupport worden. Bovendien heb je een redelijk nieuw device nodig om service workers en notificaties te supporten. Bovenstaand staat de support voor de html functies, die allemaal goed gesupport worden (druk op links voor meer informatie).

<a name="5"></a>
## 5. Accessability

In dit hoofdstuk ga ik de volgende onderwerpen testen
Localstorage/Cookies, Afbeeldingen, Custom Fonts, Kleur, Muis, Javascript, Breedband & Screen reader

### Screen reader
