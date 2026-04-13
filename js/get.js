import { megjelenites } from "./kosar.js";

export async function termekekBetoltese() {
    const valasz = await fetch("https://dummyjson.com/products");
    const adat = await valasz.json();

    megjelenites(adat.products);
}