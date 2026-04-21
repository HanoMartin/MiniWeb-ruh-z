Dátum: 2026.04.21
Prompt: „Miért kapok 404 hibát a GitHub Pages oldalamon, és hogyan kell beállítani, hogy működjön?”

AI válasz rövid összefoglalása:
Az AI megállapította, hogy a GitHub Pages 404 hibát azért kapom, mert a Pages rossz helyről próbálja publikálni a weboldalt. A beállításokban a GitHub Pages a main branch /docs mappájából próbálta építeni az oldalt, de a projekt nem ott található. A helyes beállítás: Martin branch /root, mert a projekt gyökérmappában van, és nincs docs könyvtár.

Mit tanultam:
A GitHub Pages csak akkor működik, ha a publikálási forrás pontosan meg van adva.

Ha a projekt nem a main branch‑en van, akkor a Pages‑nek is a megfelelő branch‑et kell használni.

Ha nincs docs mappa, akkor a Pages‑t /root módra kell állítani.

A 404 hiba legtöbbször nem kódból ered, hanem hibás Pages‑beállításból.

Hol implementáltam:
GitHub → Repository → Settings → Pages  
Beállítások, amiket módosítottam:

Source: Deploy from a branch

Branch: Martin

Folder: /root

Mentés után a weboldal 20–40 másodperc múlva elérhetővé vált a következő címen:
https://hanomartin.github.io/MiniWeb-ruh-z/
