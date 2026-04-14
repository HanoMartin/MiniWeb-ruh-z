let kosar = [];

export function kosarba(termek) {
    const van = kosar.find(t => t.id === termek.id);

    if (van) {
        van.db++;
    } else {
        kosar.push({ ...termek, db: 1 });
    }

    osszegFrissites();
}

export function kosarOsszeg(lista) {
    return lista.reduce((osszeg, t) => {
        return osszeg + t.price * t.db;
    }, 0);
}

function osszegFrissites() {
    const veg = kosarOsszeg(kosar);
    document.getElementById("vege-osszeg").innerText = veg + "ft";
}

export function getKosar() {
    return kosar;
}