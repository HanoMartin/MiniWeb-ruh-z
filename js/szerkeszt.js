import { arfolyam, frissitArfolyam } from "./kosar.js";

// ===============================
// SAJÁT TERMÉKEK BETÖLTÉSE
// ===============================
let sajatTermekek = JSON.parse(localStorage.getItem("sajatTermekek")) || [];

// ===============================
// KÉSZLET TÁBLA
// ===============================
function getKeszletek() {
    return JSON.parse(localStorage.getItem("keszletek")) || {};
}

function saveKeszletek(k) {
    localStorage.setItem("keszletek", JSON.stringify(k));
}

// ===============================
// API TERMÉKEK BETÖLTÉSE
// ===============================
async function loadApiTermekek() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();
    return data.products;
}

// ===============================
// TELJES LISTA BETÖLTÉSE (API + SAJÁT)
// ===============================
async function loadAllProducts() {

    await frissitArfolyam(); // árfolyam frissítése

    const api = await loadApiTermekek();
    const keszletek = getKeszletek();

    // API termékek árfolyam átváltása + készlet felülírás
    api.forEach(p => {
        p.price = Math.round(p.price * arfolyam);
        if (typeof keszletek[p.id] === "number") {
            p.stock = keszletek[p.id];
        }
    });

    // Saját termékek árfolyam átváltása + készlet felülírás
    sajatTermekek.forEach(p => {
        p.price = Math.round(p.price * arfolyam);
        if (typeof keszletek[p.id] === "number") {
            p.stock = keszletek[p.id];
        }
    });

    return [...api, ...sajatTermekek];
}

// ===============================
// LISTA KIRAJZOLÁSA
// ===============================
async function renderSzerkesztesLista() {
    const lista = document.getElementById("termekek");
    lista.innerHTML = "";

    const products = await loadAllProducts();

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-12 col-md-6 col-lg-4";

        div.innerHTML = `
            <div class="card p-3 shadow-sm">

                <img src="${p.thumbnail || 'https://via.placeholder.com/300'}"
                     class="img-fluid mb-3 rounded">

                <h5>${p.title}</h5>
                <p>${p.description}</p>

                <p><b>Ár:</b> ${p.price} Ft</p>
                <p><b>Készlet:</b> ${p.stock}</p>

                <button class="btn btn-primary modositas" data-id="${p.id}">Módosítás</button>
                <button class="btn btn-danger torles mt-2" data-id="${p.id}">Törlés</button>
            </div>
        `;

        lista.appendChild(div);
    });

    // Módosítás gombok
    document.querySelectorAll(".modositas").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            const termek = products.find(t => t.id === id);
            megnyitModositot(termek);
        });
    });

    // Törlés gombok
    document.querySelectorAll(".torles").forEach(btn => {
        btn.addEventListener("click", () => {
            const id = Number(btn.dataset.id);
            torolTermek(id);
        });
    });
}

// ===============================
// MÓDOSÍTÓ PANEL
// ===============================
let aktualisTermek = null;

function megnyitModositot(p) {
    aktualisTermek = p;

    document.getElementById("modNev").value = p.title;
    document.getElementById("modAr").value = p.price;
    document.getElementById("modKeszlet").value = p.stock;

    document.getElementById("modositMenu").style.display = "flex";
}

document.getElementById("bezMod").onclick = () => {
    document.getElementById("modositMenu").style.display = "none";
};

// ===============================
// MÓDOSÍTÁS MENTÉSE
// ===============================
document.getElementById("mentesMod").onclick = async () => {

    let keszletek = getKeszletek();

    aktualisTermek.title = document.getElementById("modNev").value;
    aktualisTermek.price = Number(document.getElementById("modAr").value);
    aktualisTermek.stock = Number(document.getElementById("modKeszlet").value);

    // saját termék mentése
    const index = sajatTermekek.findIndex(t => t.id === aktualisTermek.id);
    if (index !== -1) {
        sajatTermekek[index] = aktualisTermek;
        localStorage.setItem("sajatTermekek", JSON.stringify(sajatTermekek));
    }

    // készlet mentése
    keszletek[aktualisTermek.id] = aktualisTermek.stock;
    saveKeszletek(keszletek);

    document.getElementById("modositMenu").style.display = "none";

    renderSzerkesztesLista();
    alert("Termék módosítva!");
};

// ===============================
// TÖRLÉS
// ===============================
async function torolTermek(id) {

    if (!confirm("Biztosan törlöd ezt a terméket?")) return;

    sajatTermekek = sajatTermekek.filter(t => t.id !== id);
    localStorage.setItem("sajatTermekek", JSON.stringify(sajatTermekek));

    let keszletek = getKeszletek();
    delete keszletek[id];
    saveKeszletek(keszletek);

    renderSzerkesztesLista();
    alert("Termék törölve!");
}

// ===============================
// OLDAL INDÍTÁSA
// ===============================


renderSzerkesztesLista();
