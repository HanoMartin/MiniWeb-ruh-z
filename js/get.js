import { kosarba } from "./kosar.js";
import { sajatTermekek } from "./post.js";

export let lastProducts = [];


const container = document.getElementById("termekek");

async function loadProducts() {
    const res = await fetch("https://dummyjson.com/products");
    const data = await res.json();

    render(data.products);
}

function render(products) {
    container.innerHTML = "";

    products.forEach(p => {
        const div = document.createElement("div");
        div.className = "col-12 col-sm-6 col-md-4 col-lg-3";

        div.innerHTML = `
        <div class="card shadow-sm h-100">
            <img src="${p.thumbnail}" class="card-img-top">

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
            } else {
                alert("Elfogyott a készlet!");
            }
        });

        container.appendChild(div);
    });
}

loadProducts();