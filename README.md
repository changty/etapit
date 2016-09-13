# ViLLE eTapit
eTapit-hankkeen ViLLE-peli. 
![eTapit ViLLE-peli](https://cdn.rawgit.com/changty/etapit/master/esikatselu2.png)  

## Miten aloitan - Grafiikan muokkaaminen 
* Paina oikean yläreunan vihreästä **Clone or download** napista. Lataa ZIP-tiedosto.   
* Jaa tiedosto oppilaille esimerkiksi Onedrivessä  
* Jokainen oppilas lataa itselleen oman kopion ZIP-tiedostosta ja purkaa sen tietokoneelle  
* Avaa index.html-tiedosto Google Chrome tai Mozilla Firefox -selaimella. **Näkymä päivittyy F5 näppäimellä.** Tällöin myös peli alkaa alusta. **Päivittäminen lataa viimeisimmät oppilaan tekemät muutokset.**  
* Muokkaa kuvat/normal -kansion SVG-tiedostoja **Inkscapella**. Tallenna kuvat ja päivitä selaimen näkymää. Muutokset näkyvät heti. 
** Pidä kuvan koko samana, jotta vältytään tyyliongelmilta. Kuvasuhteen tai kuvan koon muuttaminen saattaa vaatia CSS-muutoksia.
* [Opetustuubi Inkscapen käyttäminen - Youtube](https://www.youtube.com/playlist?list=PLDpsi-eI0SgJv_syw26feTg7BP2AL01jT) 

![Pelin kuvat](https://cdn.rawgit.com/changty/etapit/master/esikatselu.png)    


## Tyylitiedoston muokkaaminen (CSS) 
* Seuraa ohjeita edellisestä kohdasta index.html -tiedoston avaamiseen asti
* Avaa omateema.css -tiedosto Notepad++ -sovelluksella. 
* Etsi kohta, jota haluat editoida. Tyylitiedostoon on lisätty kommentit helpottamaan oikean kohdan löytämistä. 
* Tallenna muutokset 
* Päivitä selaimen näkymää **F5** painikkeella ja ihastele muutoksia!
* **Voit myös käyttää selaimen Kehittäjäntyökaluja** helpompaan editointiin. Chromessa ja Firefoxissa saa kehittäjäjn työkalut (Developer tools) näkyviin painamalla **F12**. Tällä työkalulla voi kokeilla, miltä tyylimuutokset näyttävät, jonka jälkeen ne voi lisätä omateema.css -tiedostoon.   
* [Kehittäjän työkalujen käyttäminen suomeksi 1](https://corellia.fi/selain-kehittajan-tyokaluna-osa-1/)
* [Kehittäjän työkalujen käyttäminen suomeksi 2](https://corellia.fi/selain-kehittajan-tyokaluna-osa-2/)  

Alla olevassa kuvassa on merkitty pelkästään CSS-tyylitellyt pelin elementit.   
![CSS:llä muokattavat kohdat](https://cdn.rawgit.com/changty/etapit/master/esikatselu3.png)    


## Hyviä linkkejä 
[CSS3 "Cheat Sheet" Yleisimmät CSS-komennot](http://www.lesliefranke.com/files/reference/csscheatsheet.html)  
[W3Schools Paljon esimerkkejä CSS:n käytöstä](http://www.w3schools.com/css/)  
[Värivalitsin](http://www.w3schools.com/colors/colors_picker.asp)   

## Sovelluksia
[Inkscape - Vektorigrafiikan editointiin](https://inkscape.org/en/download/)  
[Notepad++ - Koodieditori](https://notepad-plus-plus.org/download/v6.9.2.html)   

## Valmiin sovelluksen jakaminen
Paketoi oppilaan tuotos ZIP-tiedostoksi ja tallenna se esimerkiksi Onedriveen. Lähetä minulle sähköpostiin ([emakur@utu.fi](mailto:emakur@utu.fi)) linkki ZIP-tiedostoon tai lisää koko tiedosto liitteeksi. Laita sähköpostiin myös pelintekijän nimi ja saatesanoja, jos tekijä haluaa pelistä jotain kertoa. Saat paluupostina linkin oppilaan tuotokseen, joka on julkisesti kaikkien nähtävillä. Linkki tulee myös eTapit blogiin. 

## Ota yhteyttä 
[emakur@utu.fi](mailto:emakur@utu.fi)

## Hakemistorakenne 
```
.
+-- index.html - Kokoaa yhteen muut, peli käynnistyy tästä
+-- asetukset.js - Pelin kysymykset, elämät ja pisteet
+-- README.md - Tämä ohjetiedosto
+-- aanet - Äänitiedostot
|   +-- all_audio.mp3 - Kaikki äänitehosteet yhdessä putkessa mp3-muodossa
|   +-- all_audio.ogg - Kaikki äänitehosteet yhdessä putkessa ogg-muodossa
+-- fontit - Pisteissä käytettävä fontti "Luckies Guy" 
|   +--LuckiestGuy.ttf - Fonttitiedosto
+-- kuvat
|   +-- normal - Kuvatiedosto
|   +--+--- coin.svg - Kolikko
|   +--+--- dude.svg - Pelin hahmo
|   +--+--- dude_sad.svg - Pelin hahmo väärin vastattaessa
|   +--+--- health.svg - Sydän (elämä)
|   +--+--- healt_used.svg  - Tyhjä sydän (käytetty elämä)
|   +--+--- level1.svg - Tason kuva 1 (joka taso arvotaan pelissä satunnaisesti 1-5) 
|   +--+--- level2.svg - Tason kuva 2
|   +--+--- level3.svg - Tason kuva 3 
|   +--+--- level4.svg - Tason kuva 4
|   +--+--- level5.svg - Tason kuva 5
|   +--+--- score.svg - Kolikko + x -merkki
|   +--+--- sign_blue_big_2.svg - Vastausvaihtoehdon alaosa oletuksena 
|   +--+--- sign_green_2.svg - Oikein vastattu vastausvaihtoehto
|   +--+--- sign_red_2.svg - Väärin vastattu vastausvaihtoehto
|   +--+--- times.svg - X -merkki 
|   +--+--- uncolored_castle.png - Taustakuva pelille 
+-- scripts - Javascript kooditiedostot
|   +-- ladder.js Varsinainen peli
|   +-- ... Erilaisia kirjastoja, voit kokeilla Googlettaa nimellä
+-- tyylit - CSS-tyylitiedostot
|   +-- omateema.css - Siistitty CSS-tiedosto, josta löytyy helposti tärkeimmät kohdat
|   +-- perusteema.css - Kaikki muut tarpeelliset asetukset, jotta peli näyttää oikealta
```
