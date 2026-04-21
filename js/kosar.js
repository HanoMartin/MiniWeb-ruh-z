export let kosar = JSON.parse(localStorage.getItem("kosar")) || [];
export let arfolyam = 1;

// ===============================
// ÁRFOLYAM
// ===============================
export async function frissitArfolyam() {
    try {
        const res = await fetch("https://api.exchangerate.host/latest?base=USD&symbols=HUF");
        const data = await res.json();
        arfolyam = data.rates.HUF;
    } catch {
        arfolyam = 360;
    }
}

// ===============================
// KOSÁR ÖSSZEG (HUF)
// ===============================
export function KosarOsszeg(adatok) {
    return adatok.reduce((osszeg, t) => osszeg + (t.ar * t.db), 0);
}

// ===============================
// KOSÁRBA RAKÁS (HUF ár!)
// ===============================
export function kosarba(id, nev, arHUF) {

    const van = kosar.find(t => t.id === id);

    if (van) {
        van.db++;
    } else {
        kosar.push({
            id,
            nev,
            ar: arHUF,   // HUF ár
            db: 1
        });
    }

    localStorage.setItem("kosar", JSON.stringify(kosar));
}

// ===============================
// KOSÁR OLDAL
// ===============================
export function kosarOldal() {
    const lista = document.getElementById("kosarLista");
    if (!lista) return;

    lista.innerHTML = "";

    kosar.forEach(t => {
        const tetelHUF = t.ar * t.db;

        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${t.nev} (${t.db} db)</span>
                <div>
                    <b class="me-3">${tetelHUF} Ft</b>
                    <button class="btn btn-danger btn-sm torol" data-id="${t.id}">X</button>
                </div>
            </li>
        `;
    });

    document.querySelectorAll(".torol").forEach(btn => {
        btn.addEventListener("click", () => {
            torol(btn.dataset.id);
        });
    });

    frissitVegosszeg();
}

// ===============================
// TÉTEL TÖRLÉSE + KÉSZLET VISSZAADÁSA
// ===============================
function torol(id) {
    let keszletek = JSON.parse(localStorage.getItem("keszletek")) || {};

    const torolt = kosar.find(t => t.id == id);

    if (torolt) {
        keszletek[torolt.id] = (keszletek[torolt.id] || 0) + torolt.db;
        localStorage.setItem("keszletek", JSON.stringify(keszletek));
    }

    kosar = kosar.filter(t => t.id != id);
    localStorage.setItem("kosar", JSON.stringify(kosar));

    kosarOldal();
}

// ===============================
// TELJES KOSÁR TÖRLÉSE + KÉSZLET VISSZAADÁSA
// ===============================
const uresBtn = document.getElementById("ures");

if (uresBtn) {
    uresBtn.addEventListener("click", () => {

        let keszletek = JSON.parse(localStorage.getItem("keszletek")) || {};

        kosar.forEach(t => {
            keszletek[t.id] = (keszletek[t.id] || 0) + t.db;
        });

        localStorage.setItem("keszletek", JSON.stringify(keszletek));

        kosar = [];
        localStorage.setItem("kosar", JSON.stringify([]));

        kosarOldal();
        frissitVegosszeg();
    });
}

// ===============================
// VÉGÖSSZEG
// ===============================
export function frissitVegosszeg() {
    const elem = document.getElementById("vegosszeg");
    if (!elem) return;

    const vegosszegHUF = KosarOsszeg(kosar);
    elem.textContent = vegosszegHUF + " Ft";
}

// ===============================
// INDÍTÁS
// ===============================
await frissitArfolyam();
kosarOldal();
