# Browser Technologies - Opdracht 1.2

# Table of Contents
+ Doel van deze opdracht
+ Uitleg opdracht
+ Testresultaten + Oplossingen
  
# Doel van deze opdracht
Het doel van de deze opdracht is het testen van mijn eigen site op 8 verschillende criteria, om te zien of mijn website geoptimaliseerd is.

# Uitleg opdracht
In deze opdracht ga ik Progressive Enhancement toepassen op mijn eigen OBA Web App. Hierin ga ik mijn website basis van de onderstaande 8 features testen.:
+ Localstorage/Cookies
+ Afbeeldingen
+ Custom Fonts 
+ Kleur
+ Muis
+ Javascript
+ Breedband
+ Screen reader
+ Device Lab

Op basis van de testresultaten ga ik mijn code aanpassen, en uitleggen waarom ik deze aanpassingen maak. Die uitleg schrijf ik in deze readme. In de readme komt onder andere:
  - een beschrijving van alle features die je hebt getest
  - een beschrijving van de Device lab test en screenreader test.
  - beschrijf hoe je de problemen hebt opgelost, of hoe je dit zou oplossen (met todo’s) als je genoeg tijd en budget zou hebben

# Testresultaten + Oplossingen
Onderstaand ga ik alle 8 features bij langs. Hierin behandel ik hoe ik heb getest, wat de testrestulaten zijn en hoe ik mogelijke problemen heb opgelost. Voor het testen gebruik ik Google Chrome op mijn Windows Laptop.

# 1. Localstorage/Cookies
#### Hoe?
Om localstorage uit te schakelen in mijn browser, moet ik ook cookies uitschakelen. Daarom test ik beide onderdelen in 1 keer. Om het uit te schakelen ga ik naar instellingen -> instellingen voor content -> cookies -> uitschakelen.


#### Waarnemingen
Bij het opstarten van de website, krijg ik in de console de foutmelding: _Uncaught DOMException: Failed to read the 'localStorage' property from 'Window': Access is denied for this document.'_ Dit komt omdat ik de localstorage uitgeschakeld heb en mijn website wel gebruik maakt van localstorage. Hierin sla ik namelijk de gebruikergegevens, zoals locatie, in op. Dit wordt later in de site gebruikt om de dichstbijzijnde bibliotheek te bepalen. Door de foutmelding aan het begin, werkt de rest van de site helaas ook niet meer.

(helaas maakt de API wrapper ook gebruik van localstorage en is er dus geen data op te halen zonder localstorage. Oplossing hieronder is alleen voor mijn website)

#### Oplossing
Door het opslaan van gebruikergegevens in private variabelen is er geen behoefte meer aan localstorage. Hieronder is te zien hoe de variabelen in de iife worden aangemaakt
```javascript
(async() => {

    var userLat;
    var userLong;
```

Hieronder is te zien hoe de variablen geset worden vanuit een andere functie.
```javascript
setLocation: function(position) {
    userLat = position.coords.latitude;
    userLong = position.coords.longitude;
}
```

# 2. Afbeeldingen
#### Hoe?
Instellingen -> Instellingen voor content -> Afbeeldingen -> Uitschakelen

#### Waarnemingen
Door het uitschakelen van afbeeldingen blijft de functionaliteit op de website volledig werken, alleen is het OBA logo & zijn de boekcovers niet meer te zien. 

#### Oplossing
Omdat de functionaliteit volledig werkt, is het niet nodig om aanpassingen te maken. De kaart (mapbox) werkt nog steeds en er zijn titels van boeken te zien. Wel is het handig om een "alt-text" mee te geven aan alle "img" objecten, om de gebruiker te laten weten wat hij had moeten zien.


# 3. Custom Fonts
#### Hoe?
Ik maak op mijn website gebruik van de 'inconsolata' font. Zie hieronder mijn CSS:
```css
* {
	font-family: 'Inconsolata', monospace;
}
```

Deze font wordt in de index.html gedownload:
```html
<link href="https://fonts.googleapis.com/css?family=Inconsolata" rel="stylesheet">
```
Door het weghalen van deze regels wordt er op mijn site gebruik gemaakt van de Google Chrome standaardfont, namelijk Times New Roman.

#### Waarnemingen
Door het uitschakelen van mijn custom font werkt de website nog steeds naar behoren, alleen iets minder mooi. 

#### Oplossing
Om toch errors te voorkomen, zorg ik ervoor dat er een standaardfont wordt aangewezen als Inconsolata niet geladen kan worden. Dit doe ik door de volgende regel code:
```css
* {
    font-family: 'Inconsolata', monospace, 'Sans-Serif';
}
```

# 4. Kleur
#### Hoe?
Windows Logo -> Color Filter -> Enable Color Filter (greyscale)

#### Waarnemingen
Site blijft duidelijk en overzichtelijk. Ook is de MapBox nog steeds zeer duidelijk te zien.

![Screenshot](https://imgshare.io/images/2019/03/14/oba-site-greyscale.png)

#### Oplossingen
Geen oplossing nodig.

# 5. Muis
#### Hoe?
Door het niet gebruiken van mijn muis maar alleen van het toetsenbord, is te testen hoe mijn site functioneert zonder muis. 

#### Waarnemingen
Het eerste scherm is het hoofdscherm. Door het klikken op TAB ga ik meteen naar de zoekbalk. Na het intypen van mijn zoekopdracht kan ik nog een keer op TAB drukken, om vervolgens op ENTER te drukken.

Na het zoeken van het boek, kan ik door middel van TAB door alle `beschikbaarheid` tags van alle boeken heen scrollen. Dit komt omdat de beschikbaarheid in een `a` tag staat en dit wordt opgepakt door TAB.

Na het kiezen van het gewenste boek, wordt de beschikbaarheidpagina geladen. Helaas reageert de mapbox niet op het toetsenbord. Wel kan ik onderaan de pagina door alle mogelijke locaties heen tabben.

#### Oplossingen
'Bijna' alle functionaliteit werkt zonder het gebruik van een muis. In principe zou je kunnen zoeken naar de beschikbaarheid van een boek en de routebeschrijving kunnen opvragen. Helaas is er geen interractie met de mapbox zonder muis, wel is de kaart gewoon te zien.

# 6. Javascript
#### Hoe?
Instellingen -> Instellingen voor content -> Javascript -> Uitschakelen

#### Waarnemingen
Zonder Javascript is mijn site helaas nutteloos. Omdat alle connectie met de API via Javascript gebeurd, is er nu geen data op te halen. Zelfs de zoeken knop functioneert niet.

#### Oplossingen
De enige oplossing mogelijk om de site bruikbaar te maken voor mensen die geen javascript ondersteunen in hun browser is het laden van de javascript op de server. Hier gaan we in het komende project mee bezig. Wel zou ik een melding kunnen geven aan mensen die javascript uit hebben staan, met de melding dat ze Javascript aan moeten hebben om de site functioneel te maken.

# 7. Breedband
#### Hoe?
Developer tools -> Network -> Online -> Slow 3G

#### Waarnemingen
Na het legen van de Cache duurt het laden van de hoofdpagina 19.2 seconden. Hij is hier voornamelijk bezig met het laden van de 'oba_logo.png' (169KB, 9.39 seconden). 

Daarna duurt het zoeken van boeken ongeveer 5 seconden. Hij laadt hierbij eerst de boeken, daarna pas de afbeeldingen van de boeken.

Daarna bij het klikken op het boek duurt het ongeveer 10 seconden voordat de availabilty en de mapbox ingeladen zijn.

Je bent dus totaal 19.2 + 5 + 10 = ongeveer 35 seconden bezig met het zoeken naar de beschikbaarheid

#### Oplossingen
Met langzaam 3G kan je in 35 seconden checken waar je boek is, dit is niet heel langzaam. Ik zou de laadtijd met ongeveer 25% kunnen laten afnemen door de kwaliteit van de afbeelding op de voorpagina de verlagen. Verder zijn er geen punten waarop ik de laadtijd kan versnellen. 



