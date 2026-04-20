import { kosarba } from "./kosar.js";
import { sajatTermekek } from "./post.js";

export let lastProducts = [];

const container = document.getElementById("termekek");

// TERMÉKEK BETÖLTÉSE
export async function loadProducts() {

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    // API + saját termékek összevonása
    const allProducts = [...data.products, ...sajatTermekek];

    lastProducts = allProducts;
    window.lastProducts = lastProducts;

    render(allProducts);
    frissitTeljesOsszeg();
}

// TERMÉKEK KIRAJZOLÁSA
export function render(products) {
    container.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        div.innerHTML = `
        <div class="card shadow-sm h-100">
            <img src="${p.thumbnail || 'https://via.placeholder.com/300'}" class="card-img-top">

            <div class="card-body d-flex flex-column">

                <h5>${p.title}</h5>

                <p class="small flex-grow-1">
                    ${p.description.substring(0, 60)}...
                </p>

                <span class="badge bg-primary mb-2">
                    Készlet: ${p.stock}
                </span>

                <div class="d-flex justify-content-between align-items-center">

                    <b>${p.price} $</b>

                    <div class="btn-group">
                        <button class="btn btn-primary btn-sm kosar-btn">Kosár</button>
                        <button class="btn btn-primary btn-sm modositas-btn" style="margin-right:6px;">✏️</button>
                        <button class="btn btn-danger btn-sm torles-btn">🗑️</button>
                    </div>

                </div>
            </div>
        </div>
        `;

        // KOSÁRBA RAKÁS
        div.querySelector(".kosar-btn").addEventListener("click", () => {
            if (p.stock > 0) {
                kosarba(p.id, p.title, p.price, p.stock);
                p.stock--;
                render(products);
                frissitTeljesOsszeg();
            } else {
                alert("Elfogyott a készlet!");
            }
        });

        // MÓDOSÍTÁS
        div.querySelector(".modositas-btn").addEventListener("click", () => {
            megnyitModositoMenu(p);
        });

        // TÖRLÉS
        div.querySelector(".torles-btn").addEventListener("click", () => {
            torolTermek(p.id);
        });

        container.appendChild(div);
    });
}

loadProducts();


// ===============================
// MÓDOSÍTÓ MENÜ LOGIKA
// ===============================

let aktualisTermek = null;

export function megnyitModositoMenu(p) {
    aktualisTermek = p;

    document.getElementById("modNev").value = p.title;
    document.getElementById("modAr").value = p.price;
    document.getElementById("modKeszlet").value = p.stock;

    document.getElementById("modositMenu").style.display = "flex";
}

document.getElementById("bezMod").onclick = () => {
    document.getElementById("modositMenu").style.display = "none";
};

document.getElementById("mentesMod").onclick = () => {
    aktualisTermek.title = document.getElementById("modNev").value;
    aktualisTermek.price = Number(document.getElementById("modAr").value);
    aktualisTermek.stock = Number(document.getElementById("modKeszlet").value);

    document.getElementById("modositMenu").style.display = "none";
    render(lastProducts);
};


// ===============================
// TÖRLÉS FUNKCIÓ
// ===============================

export function torolTermek(id) {

    // Csak saját termék törölhető
    const index = sajatTermekek.findIndex(t => t.id === id);

    if (index === -1) {
        alert("Ezt a terméket nem lehet törölni (API termék).");
        return;
    }

    if (!confirm("Biztosan törlöd ezt a terméket?")) return;

    sajatTermekek.splice(index, 1);
    localStorage.setItem("sajatTermekek", JSON.stringify(sajatTermekek));

    alert("Termék törölve!");

    // API termékek + saját termékek újrarenderelése
    render([...lastProducts.filter(p => p.id < 1000000000000), ...sajatTermekek]);
}


// ===============================
// BEÁLLÍTÁSOK PANEL + TÉMA VÁLTÁS
// ===============================

document.getElementById("settingsBtn").onclick = () => {
    document.getElementById("settingsPanel").style.display = "flex";
};

document.getElementById("bezarSettings").onclick = () => {
    document.getElementById("settingsPanel").style.display = "none";
};

document.getElementById("temaValtas").onclick = () => {
    document.body.classList.toggle("dark-mode");
};


// ===============================
// HAMBURGER MENÜ
// ===============================

const hamburger = document.getElementById("hamburger");
const mobilMenu = document.getElementById("mobilMenu");

if (hamburger) {
    hamburger.addEventListener("click", () => {
        mobilMenu.style.display = mobilMenu.style.display === "flex" ? "none" : "flex";
    });
}

const settingsBtn2 = document.getElementById("settingsBtn2");

if (settingsBtn2) {
    settingsBtn2.onclick = () => {
        document.getElementById("settingsPanel").style.display = "flex";
        mobilMenu.style.display = "none";
    };
}