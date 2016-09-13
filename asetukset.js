// Pelin kysymykset määritellään tässä

// optionsList 
// Tarkoittaa vastausvaihtoehtoja.
// Vaihtoehdot ovat merkkijonoja, eli '' tai "" välissä. Vaihtoehdot erotetaan pilkulla, sillä ne ovat listassa.
// Oikean vastausvaihtoehdon ei tarvitse olla vaihtoehdoissa.

// correct
// Tarkoittaa oikeaa vastausta.
// Arvon pitää olla merkkijono.

// question
// Tarkoittaa kysymystä.
// Arvon pitää olla merkkijono.
var kysymykset = [ 
				{optionsList : ['3', '4', '0'], correct : '2', question : '1+1'},
				{optionsList : ['1', '4', '2'], correct : '3', question : '2+1'},				
				{optionsList : ['3', '5', '1'], correct : '4', question : '2+2'},
				{optionsList : ['3', '1', '2'], correct : '4', question : '3+1'},		
				{optionsList : ['3', '2', '0'], correct : '1', question : '0+1'},			
			];
// Sydämien lukumäärä pelissä.
// Arvon pitää olla numero.
var elamat = 5; 

// Kuinka monta vastausvaihtoehtoa näytetään joka kysymyksessä.
// Arvon pitää olla numero.
var vastausVaihtoehtoja = 4; 

// Kuinka monta pistettä annetaan vastauksesta.
// Arvon pitää olla numero.
var pistettaVastauksesta = 100; 