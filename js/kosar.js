export let kosar = [];

export function megjelenites(termekek) {
    const tarolo = document.getElementById("termekek");
    tarolo.innerHTML = "";

    termekek.forEach(t => {
        tarolo.innerHTML += `
        <div class="kartya">
            <img src="${t.thumbnail}">
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <p>${t.price} Ft</p>
            <button onclick="kosarba(${t.id}, '${t.title}', ${t.price})">
                Kosárba
            </button>
        </div>
        `;
    });
}

export function kosarba(id, nev, ar) {
    const van = kosar.find(t => t.id === id);

    if (van) {
        van.db++;
    } else {
        kosar.push({ id, nev, ar, db: 1 });
    }

    kosarFrissites();
}

function kosarFrissites() {
    const lista = document.getElementById("kosarLista");
    lista.innerHTML = "";

    kosar.forEach(t => {
        lista.innerHTML += `
            <li>${t.nev} - ${t.db} db - ${t.ar * t.db} Ft</li>
        `;
    });

    document.getElementById("vegosszeg").textContent =
        kosarOsszeg(kosar);
}

export function kosarOsszeg(kosar) {
    let osszeg = 0;

    kosar.forEach(t => {
        osszeg += t.ar * t.db;
    });

    return osszeg;
}