export let kosar = JSON.parse(localStorage.getItem("kosar")) || [];

/* =========================
   KOSÁRBA
========================= */
export function kosarba(id, nev, ar, stock) {

    const van = kosar.find(t => t.id === id);

    if (van) {
        if (van.db < stock) {
            van.db++;
            van.stock--;
        } 
        else{
            alert("Nincs több készleten!");
            return;
        }
    } else {
        kosar.push({ id, nev, ar, stock: stock - 1, db: 1 });
    }

    mentes();
}

/* =========================
   MENTÉS LOCALSTORAGE-BA
========================= */
function mentes() {
    localStorage.setItem("kosar", JSON.stringify(kosar));
}

/* =========================
   KOSÁR MEGJELENÍTÉS
========================= */
function kosarOldal() {
    const lista = document.getElementById("kosarLista");
    if (!lista) return;

    lista.innerHTML = "";

    let osszeg = 0;

    kosar.forEach(t => {
        osszeg += t.ar * t.db;

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

    const veg = document.getElementById("vegosszeg");
    if (veg) veg.textContent = osszeg;

    document.querySelectorAll(".torol").forEach(btn => {
        btn.addEventListener("click", () => {
            torol(btn.dataset.id);
        });
    });

    const ures = document.getElementById("ures");
    if (ures) {
        ures.addEventListener("click", () => {
            kosar = [];
            mentes();
            kosarOldal();
        });
    }
}

/* =========================
   TÖRLÉS
========================= */
function torol(id) {
    kosar = kosar.filter(t => t.id != id);
    mentes();
    kosarOldal();
}

/* =========================
   AUTO FUTÁS KOSÁR OLDALON
========================= */
kosarOldal();