export async function ujTermekFelvitel() {
    const nev = document.getElementById("nev").value;
    const ar = document.getElementById("ar").value;
    const leiras = document.getElementById("leiras").value;
    const kep = document.getElementById("kep").value;

    const valasz = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: nev,
            price: Number(ar),
            description: leiras,
            thumbnail: kep
        })
    });

    const adat = await valasz.json();
    alert("Termék hozzáadva!");
    console.log(adat);
}