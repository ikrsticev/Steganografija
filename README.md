# Steganografija
Enkriptiranje poruke u slici

Ovim programom možemo skriti poruku u slici. Ima funkcija za skrivanje i funkcija za otkrivanje poruke. Program se puno igra s nulama i jedinicama u krajnjim bitovima piksela. Bira zadnji bit iz "nasumične" lokacije, i mijenja samo njega. Okom je nevidljivo je li vrijednost crvene boje za pojedini bit 244 ili 245, i tu se sakrije poruka. Što je još nužno za isčitavanje poruke je random seed. Bez seeda, primatelj poruke ne zna kako su razmješteni izmijenjeni pikseli koji sadrže poruku, i ne može nikako isčitati poruku. Osim toga primatelj mora znati i pravilno isčitati duljinu poruke, koja može biti zapisana preko bilo kojeg broja bitova (dijeljivih s 8). Bez tog znanja on ne zna kad prestati isčitavati poruku.
