// TERMÉK LISTA LOCALSTORAGE-BÓL
export let sajatTermekek = JSON.parse(localStorage.getItem("sajatTermekek")) || [];

// MENTÉS
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

        if (!nev || !desc || !price || !stock) {
            alert("Minden mezőt ki kell tölteni!");
            return;
        }

        // ÚJ TERMÉK OBJEKTUM
        const uj = {
            id: Date.now(), // egyedi ID
            title: nev,
            description: desc,
            price: price,
            stock: stock,
            thumbnail: "https://via.placeholder.com/300x200?text=Új+termék"
        };

        sajatTermekek.push(uj);
        mentes();

        alert("Termék hozzáadva!");

        // 🔥 Konzolra kiírjuk, hogy minden lefutott
        console.log("✔ Hozzáadás sikeresen lefutott!");
        console.log("📦 Új termék objektum:", uj);
        console.log("📚 Aktuális terméklista:", sajatTermekek);

        // mezők ürítése
        document.getElementById("name").value = "";
        document.getElementById("desc").value = "";
        document.getElementById("price").value = "";
        document.getElementById("stock").value = "";

        // újrarenderelés
        import("./get.js").then(mod => {
            mod.render([...mod.lastProducts, ...sajatTermekek]);
        });
    });
}