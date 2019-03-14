# Browser Technologies - Opdracht 1.2

# Table of Contents
1. Doel van deze opdracht
2. Uitleg opdracht
3. Testresultaten + Oplossingen
4. Conclusie 

# 1. Doel van deze opdracht
Het doel van de deze opdracht is het testen van mijn eigen site op 8 verschillende criteria, om te zien of mijn website geoptimaliseerd is.

# 2. Uitleg opdracht
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

# 3. Testresultaten + Oplossingen
Onderstaand ga ik alle 8 features bij langs. Hierin behandel ik hoe ik heb getest, wat de testrestulaten zijn en hoe ik mogelijke problemen heb opgelost. Voor het testen gebruik ik Google Chrome op mijn Windows Laptop.

# 3.1 Localstorage/Cookies
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

# 3.2 Afbeeldingen
#### Hoe?
Instellingen -> Instellingen voor content -> Afbeeldingen -> Uitschakelen

#### Waarnemingen
Door het uitschakelen van afbeeldingen blijft de functionaliteit op de website volledig werken, alleen is het OBA logo & zijn de boekcovers niet meer te zien. 

#### Oplossing
Omdat de functionaliteit volledig werkt, is het niet nodig om aanpassingen te maken. De kaart (mapbox) werkt nog steeds en er zijn titels van boeken te zien. 

Wel is het handig om een "alt-text" mee te geven aan alle "img" objecten, om de gebruiker te laten weten wat hij had moeten zien.
```html
<!-- Oud -->
<img class="logo" src="./src/img/oba_logo.jpg" href="#home">

<!-- Nieuw -->
<img class="logo" src="./src/img/oba_logo.jpg" alt="oba_logo" href="#home">
```



# 3.3 Custom Fonts
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

# 3.4 Kleur
#### Hoe?
Windows Logo -> Color Filter -> Enable Color Filter (greyscale)

#### Waarnemingen
Site blijft duidelijk en overzichtelijk. Ook is de MapBox nog steeds zeer duidelijk te zien.

![Screenshot](https://imgshare.io/images/2019/03/14/oba-site-greyscale.png)

#### Oplossingen
Omdat het doel van de site nog behaald kan worden, is er geen oplossing nodig.

# 3.5 Muis
#### Hoe?
Door het niet gebruiken van mijn muis maar alleen van het toetsenbord, is te testen hoe mijn site functioneert zonder muis. 

#### Waarnemingen
Het eerste scherm is het hoofdscherm. Door het klikken op TAB ga ik meteen naar de zoekbalk. Na het intypen van mijn zoekopdracht kan ik nog een keer op TAB drukken, om vervolgens op ENTER te drukken.

Na het zoeken van het boek, kan ik door middel van TAB door alle `beschikbaarheid` tags van alle boeken heen scrollen. Dit komt omdat de beschikbaarheid in een `a` tag staat en dit wordt opgepakt door TAB.

Na het kiezen van het gewenste boek, wordt de beschikbaarheidpagina geladen. Helaas reageert de mapbox niet op het toetsenbord. Wel kan ik onderaan de pagina door alle mogelijke locaties heen tabben.

#### Oplossingen
'Bijna' alle functionaliteit werkt zonder het gebruik van een muis. In principe zou je kunnen zoeken naar de beschikbaarheid van een boek en de routebeschrijving kunnen opvragen. Helaas is er geen interractie met de mapbox zonder muis, wel is de kaart gewoon te zien.

# 3.6 Javascript
#### Hoe?
Instellingen -> Instellingen voor content -> Javascript -> Uitschakelen

#### Waarnemingen
Zonder Javascript is mijn site helaas nutteloos. Omdat alle connectie met de API via Javascript gebeurd, is er nu geen data op te halen. Zelfs de zoeken knop functioneert niet.

#### Oplossingen
De oplossing om de site bruikbaar te maken voor mensen die geen javascript ondersteunen in hun browser is het laden van de alle javascript op de server. Naast dat zou ik een melding kunnen geven aan mensen die javascript uit hebben staan, met de melding dat ze Javascript aan moeten hebben om de site te kunnen gebruiken.

# 3.7 Breedband
#### Hoe?
Developer tools -> Network -> Online -> Slow 3G

#### Waarnemingen
Na het legen van de Cache duurt het laden van de hoofdpagina 19.2 seconden. Hij is hier voornamelijk bezig met het laden van de 'oba_logo.png' (169KB, 9.39 seconden). 

Daarna duurt het zoeken van boeken ongeveer 5 seconden. Hij laadt hierbij eerst de boeken, daarna pas de afbeeldingen van de boeken.

Daarna bij het klikken op het boek duurt het ongeveer 10 seconden voordat de availabilty en de mapbox ingeladen zijn.

Je bent dus totaal 19.2 + 5 + 10 = ongeveer 35 seconden bezig met het zoeken naar de beschikbaarheid

#### Oplossingen
Met langzaam 3G kan je in 35 seconden checken waar je boek is, dit is niet heel langzaam. Ik zou de laadtijd met ongeveer 25% kunnen laten afnemen door de kwaliteit van de afbeelding op de voorpagina de verlagen. Verder zijn er geen punten waarop ik de laadtijd kan versnellen. 

# 3.8 Screen reader
#### Hoe?
Om te testen of mijn site gebruikt kan worden door slechtzienden heb ik de Chrome Extensie ChromeVox geinstalleerd. Deze extensie zorgt ervoor dat alles voorgelezen wordt.

#### Waarnemingen & Oplossingen
Bij het laden van de hoofdpagina hoor ik: 'oba_logo image'. Dit zou de gebruiker op de hoogte kunnen stellen dat de pagina succesvol geladen is en momenteel het logo weergegeven wordt. 

Door het drukken op tab hoor ik: 'search book'. Dit kan de gebruiker op de hoogte stellen dat het gewenste boek daar gevonden kan worden. Door nog een keer op tab te drukken hoor ik 'enter'. Omdat dit niet duidelijk is, heb ik 'enter' veranderd naar 'search'.
```html
<!-- Old -->
<button type="button" class="button" id="search">ENTER</button>

<!-- New -->
<button type="button" class="button" id="search">SEARCH</button>
```
De gebruiker krijgt nu 'search' te horen, waarna hij op enter kan drukken om te zoeken.

Na het zoeken komen alle mogelijke boeken op het scherm. Door nu op tab te drukken hoor je alleen maar 'beschikbaarheid, beschikbaarheid, beschikbaarheid, ...'. Dit komt omdat de pagina door alle `<a>` tags met daarin de tekst 'beschikbaarheid' heen tabt. Ik zou dit kunnen oplossen door de tekst te veranderen naar `beschikbaarheid [titel boek]`. 

De laatste stap is het kijken naar de beschikbaarheid. Helaas is het voor blinden niet mogelijk om de MapBox te zien. Gelukkig is het wel mogelijk om van alle mogelijkheden doorgestuurd te worden naar Google Maps. Dit zorgt ervoor dat de gebruiker vanuit Google Maps routebeschrijving te horen krijgt waar hij langs moet lopen, zoals hij dit normaal ook doet. Vervolgens zou hij bij de bibliotheek naar het boek kunnen vragen.

Het is dus mogelijk om als slechtziende/blinde op mijn website naar een boek te zoeken (als de oplossingen hierboven worden uitgevoerd).

# 3.9 Device Lab
#### Hoe?
Door mijn website op de apparaten in het device lab te testen. (morgen).

#### Waarnemingen


#### Oplossingen

# 4. Conclusie
Onder perfecte omstandigheden (eigen laptop, alle functionaliteit beschikbaar) werkt mijn site naar behoren, maar werkt het ook als bepaalde functionaliteit ontbreekt? Door middel van het testen van mijn site op de punten besproken in dit vak ben ik op de hoogte van mogelijke knelpunten van mijn site en heb ik deze aangepakt. 

Al met al is was het zeer leerzaam en is het geen verkeerd idee om je site dubbel te checken.

