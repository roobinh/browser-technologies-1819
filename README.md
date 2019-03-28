# Browser Technologies @cmda-minor-web 1819
Er zijn talloze mogelijke apparaten/browsers/operating systems die jouw site willen bezoeken. In het vak browser Technologies leren we hoe we een robuuste & toegankelijke website voor alle devices maken. Het web is voor iedereen en daarom is het belangrijk dat de website op alle devices de core functionaliteit behaalt.

## Inhoudsopgave
* [1. De opdracht](#1)
* [2. Wireflow](#2)
  + [2.1 Hoofdpagina](#2)
  + [2.2 Score pagina](#2)
* [3. Feature(s)/browser technologies](#3)
* [4. Browser Support](#4)
* [5. Accessability](#5)

<a name="1"></a>

## 1. De opdracht
Voor het vak browser technologies maken we een site over 1 van de mogelijke onderwerpen gekregen van de docent. Ik heb gekozen voor de opdracht: *Melding ontvangen wanneer favoriete voetbalteam gescoord heeft.* Er zitten veel restrictions aan het geven van meldingen, zo is het geven van meldingen vanuit de browser bijvoorbeeld al niet mogelijk op safari (Apple). 

In deze readme beschrijf ik hoe de website werkt en hoe ik onlangs de restricties toch een toegankelijke website voor alle devices heb gemaakt.

*Belangrijk om te weten: De website wordt server-side gerendered door middel van node.js. Dit zorgt ervoor dat de website ook werkt zonder javascript.*

<a name="2"></a>

## 2. Wireflow
### 2.1 Hoofdpagina 
![frontpage.png](https://i.ibb.co/W2Xv1YZ/front-page.png)

De hoofdpagina van de website is heel eenvoudig. Op de hoofdpagina kan je in een drop-down menu je favoriete eredivisie team selecteren. Na het selecteren klik je op *volgende* en wordt je doorgeleid naar de ‘live score pagina’. 

- Deze pagina werkt ook zonder afbeeldingen, javascript en cache
- Deze pagina werkt op alle devices omdat ‘select’ en ‘button’ door alle browsers gesupport wordt
  
### 2.2 Score pagina
![livepage.png](https://i.ibb.co/G5dQDX8/f17ct8p.png)

De live score pagina heeft verschillende functionaliteit: 

- Het eerste wat je ziet is de live score van de voetbalwedstrijd (uit een lokaal JSON bestand, zou ook API kunnen zijn). Bij het refreshen van de pagina wordt opnieuw de score geladen en weergegeven (ook zonder javascript). Dit werkt dus op alle browsers, omdat het server side gerendered wordt.
- Nadat er gechecked is of de gebruiker service workers ondersteund, wordt er gevraagd of de gebruiker gebruik wil maken van push notifications. Bij het klikken op 'Ja, graag' wordt er door de browser gevraagd of je meldingen wil toestaan. Hierna wordt er een service worker aangemaakt die push notifications mogelijk maakt. Elke 10 seconden wordt de pagina refreshed; op het moment dat er gescoord is krijgt de gebruiker een push notification.
- Mocht de gebruiker geen service worker/javascipt toestaan, is het mogelijk om je e-mail/whatsapp op te geven. Deze wordt dan opgeslagen in een lokaal JSON bestand op de server. Elke keer als er gescoord is, stuurt de server een e-mail/whatsapp bericht naar alle opgeslagen gebruikers. Zo is het ook nog mogelijk om op apple/oudere producten meldingen te ontvangen.
- Mocht de gebruiker hier allemaal geen gebruik van willen maken, wordt de pagina elke 10 seconden automatisch ververst om de meest up-to-date score weer te geven.

<a name="3"></a>

## 3. Feature detection / browser technologies
- Zonder afbeeldingen werkt de pagina zoals behoren
- De pagina is volledig resizeable en useable op alle dimensies
<img src="https://i.ibb.co/x8FYChz/image.png" width="200" height="400" />
- Ook zonder CSS werkt de pagina goed. 
  
<img src="https://i.ibb.co/LYMNdPB/image.png" width="200" height="400" />

- Logo size is in HTML defined om ware grootte te voorkomen
  
```html
<img class="logo" src="/img/logo_eredivisie.png" alt="oba_logo" href="#home" width="300" height="200">
```

- Zonder javascript is het alleen niet mogelijk om push notifications te ontvangen, de rest van de pagina werkt nog zoals behoren. Ook refresht de pagina automatisch, omdat dit niet in JavaScript maar in HTML wordt gedaan.
  
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

Zonder Javascript en CSS werkt de pagina zoals behoren, dus is het niet *noodzakelijk* dat deze functies gesupport worden. Er worden ook geen bijzondere CSS functies gebruikt. Bovendien heb je een redelijk nieuw device nodig om service workers en notificaties te supporten. Bovenstaand staat de support voor de html functies, die allemaal goed gesupport worden (druk op links voor meer informatie).

<a name="5"></a>
## 5. Accessability

In dit hoofdstuk ga ik de volgende onderwerpen testen
Localstorage/Cookies, Afbeeldingen, Custom Fonts, Kleur, Muis, Javascript, Breedband & Screen 

### 5.1 Afbeeldingen
<img src="https://i.ibb.co/RN2GymZ/image.png" width="400" height="300" />

Zonder afbeeldingen is de webpagina prima te gebruiken. Alleen het eredivisie logo wordt niet meer weergegeven, maar er is wel een alt-text aanwezig:

```html
<img class="logo" src="/img/logo_eredivisie.png" alt="eredivisie_logo" href="#home" width="300" height="200">
```

### 5.2 Muis
Zonder het gebruik van een muis kan er door de webpagina genavigeerd worden door middel van `tab`. Dit werkt naar behoren: alle buttons, input en select velden werken. 

### 5.3 Screen reader
Voor slechtzienden is het lastig om het web te gebruiken. Ze weten namelijk niet hoe jouw webpagina eruit ziet en dus waar ze moeten drukken. Daarom gebruiken slechtzienden vooral de `tab` knop om door de webpagina te scrollen.

Ik heb getest of mijn website ook duidelijk te gebruiken is voor slechtzienden/blinden. Dit heb ik gedaan door middel van een screenreader extencie van Chrome genaamd [ChromeVox](https://chrome.google.com/webstore/detail/chromevox/kgejglhpjiefppelpmljglcjbhoiplfn?hl=nl). 

Het eerste wat je hoort bij het bezoeken van de pagina is Browser Technologies. Dit komt omdat ik de title nog niet heb veranderd naar het doel van de applicatie. Dit heb ik nu wel:
```html
<!-- Oud -->
<title>Browser Technologies</title>
```
```html
<!-- Nieuw -->
<title>Voetbal Live Score</title>
```

Bij de volgende `tab` hoor je meteen 'ajax'. Dit komt omdat de selector nog geen *alt-text* heeft. Dit heb ik vervolgens aangepast:
```html
<!-- Oud -->
<select name="teams" id="teams">
```
```html
<!-- Nieuw -->
<select name="teams" id="teams" alt="selecteer team">
```
Bij  de volgende `tab` hoor je 'button verzenden'. Dit lijkt me duidelijk een button om door te gaan.

Op de volgende pagina hoor eerst de title 'voetbal live score'. Dit komt omdat dit de title van de website is. Als ik deze title verander in de huidige score (bijv: Ajax 1 - Feyenoord 0) krijg je bij het laden van de pagina meteen de score te horen. Dit heb ik gedaan d.m.v. de volgende code:
```html
<title> <%-thuisteam %> <%- thuisgoals %> - <%-uitgoals %> <%- uitteam %> </title>
```
Nu hoor je bij elke pagina refresh de score (en is het doel van de site bereikt).

### 5.4 Javascript
Omdat de website server-side gerendered wordt werkt de site zonder Javascript bijna volledig functioneel:
- Het is mogelijk om de live score te zien
- De pagina wordt elke 10 seconden automatisch ververst
```html
<meta http-equiv="refresh" content="10">
```
- Het is alleen niet mogelijk push notifications in te schakelen, omdat je hiervoor client-side javascript en service workers (javascript) nodig hebt. 
  - Wel is hiervoor feedback ingebracht, de gebruiker krijgt te zien wanneer hij javascript heeft uitgeschakeld en dus geen notificaties kan gebruiken.
- Wel zijn de invoervelden nog steeds te gebruiken en is het dus mogelijk om emails/whatsapp berichten te ontvangen

### 5.5 Breedband
Ik heb de laadsnelheid getest door middel van de Chrome Dev Tools. Ik heb hierin de netwerksnelheid op *Slow 3G* gezet, en vervolgens de cache geleegd. Het laden van de hoofdpagina pagina onder deze omstandigheden duurde gemiddeld maar 4.3 seconden, wat minder is dan de 10 seconden waarna hij automatisch ververst. 

(De volledige pagina is maar 10.9Kb)

![Breedband](https://i.ibb.co/bW0xxn9/image.png)
