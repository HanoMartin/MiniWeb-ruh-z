import { kosarba, arfolyam, frissitArfolyam } from "./kosar.js";
import { sajatTermekek } from "./post.js";

export let lastProducts = [];

const container = document.getElementById("termekek");

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
// TERMÉKEK BETÖLTÉSE
// ===============================
export async function loadProducts() {

    await frissitArfolyam(); // 🔥 árfolyam frissítése

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    const keszletek = getKeszletek();
    const mentettSajat = JSON.parse(localStorage.getItem("sajatTermekek")) || sajatTermekek;

    // 🔥 API + saját termékek összevonása
    const allProducts = [...data.products, ...mentettSajat];

    // 🔥 árfolyam átváltás + készlet felülírás
    allProducts.forEach(p => {
        p.price = Math.round(p.price * arfolyam); // USD → HUF

        if (typeof keszletek[p.id] === "number") {
            p.stock = keszletek[p.id];
        }
    });

    lastProducts = allProducts;
    window.lastProducts = lastProducts;

    render(allProducts);
}

// ===============================
// TERMÉKEK KIRAJZOLÁSA
// ===============================
export function render(products) {
    container.innerHTML = "";

    let keszletek = getKeszletek();

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

                    <b>${p.price} Ft</b>

                    <button class="btn btn-primary btn-sm kosar-btn">Kosár</button>

                </div>
            </div>
        </div>
        `;

        // ===============================
        // KOSÁRBA RAKÁS
        // ===============================
        div.querySelector(".kosar-btn").addEventListener("click", () => {
            
            if (p.stock <= 0) {
                alert("Nincs ebből a termékből több a készleten!");
                return;
            }

            kosarba(p.id, p.title, p.price, p.stock);

            p.stock--;
            keszletek[p.id] = p.stock;
            saveKeszletek(keszletek);

            render(products);
        });
        container.appendChild(div);
    });
}

// ===============================
// TÉMA VÁLTÁS (SÖTÉT / VILÁGOS)
// ===============================

// Betöltéskor visszaállítjuk a témát
if (localStorage.getItem("tema") === "dark") {
    document.body.classList.add("dark-mode");
}

// Fogaskerék ikon (felső menü)
document.getElementById("settingsBtn").onclick = () => {
    document.getElementById("settingsPanel").style.display = "flex";
};

// Fogaskerék ikon (mobil menü)
const settingsBtn2 = document.getElementById("settingsBtn2");
if (settingsBtn2) {
    settingsBtn2.onclick = () => {
        document.getElementById("settingsPanel").style.display = "flex";
        document.getElementById("mobilMenu").style.display = "none";
    };
}

// Bezárás gomb
document.getElementById("bezarSettings").onclick = () => {
    document.getElementById("settingsPanel").style.display = "none";
};

// 🌙 Téma váltás gomb
document.getElementById("temaValtas").onclick = () => {
    document.body.classList.toggle("dark-mode");

    // Mentjük a témát
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("tema", "dark");
    } else {
        localStorage.setItem("tema", "light");
    }
};


loadProducts();
