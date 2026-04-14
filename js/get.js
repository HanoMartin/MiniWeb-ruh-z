import { kosarba } from "./kosar.js";

const container = document.querySelector(".container .row");

async function termekekBetoltese() {
    try {
        const res = await fetch("https://dummyjson.com/products");
        const data = await res.json();

        megjelenites(data.products);
    } catch (error) {
        console.error("Hiba történt:", error);
    }
}

function megjelenites(termekek) {
    termekek.forEach(t => {
        const div = document.createElement("div");

        div.className = "col-ml-3 float-start sm-12";

        div.innerHTML = `
        <div class="kartyak">
            <img src="${t.thumbnail}" class="card-img-top" alt="${t.title}">
            <div class="card-body d-flex flex-column">
                <h5 class="kartya-nev">${t.title}</h5>
                <p class="kartya-leiras">${t.description}</p>
                <div class="mt-auto">
                    <h4><span class="ar">${t.price}ft</span></h4>
                    <h4>Darabszám: <span class="db">1</span></h4>
                    <button class="btn btn-primary float-end">Kosárba</button>
                </div>
            </div>
        </div>
        `;

        const gomb = div.querySelector("button");

        gomb.addEventListener("click", () => {
            kosarba({
                id: t.id,
                title: t.title,
                price: t.price
            });
        });

        container.appendChild(div);
    });
}

termekekBetoltese();