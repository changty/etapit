# ViLLE eTapit
eTapit-hankkeen ViLLE-tehtävä. 

## Hyviä linkkejä 
[CSS3 "Cheat Sheet" Yleisimmät CSS-komennot](http://www.lesliefranke.com/files/reference/csscheatsheet.html)  
[W3Schools Paljon esimerkkejä CSS:n käytöstä](http://www.w3schools.com/css/)  
[Värivalitsin](http://www.w3schools.com/colors/colors_picker.asp)   

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
