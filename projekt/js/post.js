// TERMÉK LISTA LOCALSTORAGE-BÓL (ha később kellene)
export let sajatTermekek = JSON.parse(localStorage.getItem("sajatTermekek")) || [];

// MENTÉS (most nem használjuk)
function mentes() {
    localStorage.setItem("sajatTermekek", JSON.stringify(sajatTermekek));
}

// HOZZÁADÁS GOMB
const gomb = document.getElementById("hozzagomb");

if (gomb) {
    gomb.addEventListener("click", () => {

        const nev = document.getElementById("name").value.trim();
        const desc = document.getElementById("desc").value.trim();
        const price = Number(document.getElementById("price").value);
        const stock = Number(document.getElementById("stock").value);

        // Üres mezők ellenőrzése
        if (!nev || !desc || !price || !stock) {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        // ÚJ TERMÉK OBJEKTUM
        const uj = {
            id: Date.now(),
            title: nev,
            description: desc,
            price: price,
            stock: stock,
            thumbnail: "https://via.placeholder.com/300x200?text=Új+termék"
        };

        // Negatív vagy nulla érték tiltása
        if (uj.price <= 0 || uj.stock <= 0) {
            alert("Hibás adat: ár vagy darabszám nem lehet negatív vagy nulla!");
            return;
        }

        // Túl nagy érték tiltása
        if (uj.price >= 1000000 || uj.stock >= 100) {
            alert("Hibás adat: ár vagy darabszám túl nagy!");
            return;
        }

        // Kiírás konzolra
        console.log("📦 Új termék objektum:", uj);

        // 🔔 SIKERES HOZZÁADÁS ALERT
        alert("Sikeresen hozzáadva a konzolra!");

        // Mezők ürítése
        document.getElementById("name").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("price").value = "";
        document.getElementById("stock").value = "";
    });
}