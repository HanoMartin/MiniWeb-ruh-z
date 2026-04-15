export function KosarOsszeg(adatok) {
    return adatok.reduce((osszeg, t) => osszeg + t.ar * t.db, 0);
}

export let kosar = JSON.parse(localStorage.getItem("kosar")) || [];

export function kosarba(id, nev, ar, stock) {

    const van = kosar.find(t => t.id === id);

    if (van) {
        if (van.db < stock) {
            van.db++;
            van.stock--;
        } else {
            alert("Nincs több készleten!");
            return;
        }
    } else {
        kosar.push({ id, nev, ar, stock: stock - 1, db: 1 });
    }

    mentes();
    frissitVegosszeg();
    kosarOldal();
}

function mentes() {
    localStorage.setItem("kosar", JSON.stringify(kosar));
}

function frissitVegosszeg() {
    const elem = document.getElementById("vegosszeg");
    if (!elem) return;

    elem.textContent = KosarOsszeg(kosar).toFixed(2);
}

function kosarOldal() {
    const lista = document.getElementById("kosarLista");

    frissitVegosszeg();

    if (!lista) return;

    lista.innerHTML = "";

    kosar.forEach(t => {
        lista.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                <span>${t.nev} (${t.db} db)</span>
                <div>
                    <b class="me-3">${t.ar * t.db} $</b>
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
}

function torol(id) {
    kosar = kosar.filter(t => t.id != id);
    mentes();
    frissitVegosszeg();
    kosarOldal();
}

kosarOldal();
frissitVegosszeg();