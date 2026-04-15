import { kosarba } from "./kosar.js";
import { sajatTermekek } from "./post.js";

export let lastProducts = [];

const container = document.getElementById("termekek");

export async function loadProducts() {

    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    const allProducts = [...data.products, ...sajatTermekek];

    lastProducts = allProducts;
    window.lastProducts = lastProducts; // <-- kosar.js innen éri el

    render(allProducts);
    frissitTeljesOsszeg();
}

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

                    <button class="btn btn-primary btn-sm">
                        Kosár
                    </button>

                </div>
            </div>
        </div>
        `;

        div.querySelector("button").addEventListener("click", () => {
            if (p.stock > 0) {
                kosarba(p.id, p.title, p.price, p.stock);
                p.stock--;
                render(products);
                frissitTeljesOsszeg();
            } else {
                alert("Elfogyott a készlet!");
            }
        });

        container.appendChild(div);
    });
}

export function osszesTermekAr() {
    return lastProducts.reduce((sum, p) => sum + p.price, 0);
}

export function frissitTeljesOsszeg() {
    const elem = document.getElementById("vegosszeg");
    if (!elem) return;

    elem.innerHTML = `
        Email: <b>valami@email.com</b><br>
        Telefon: <b>+36 30 123 4567</b>
    `;
}


loadProducts();