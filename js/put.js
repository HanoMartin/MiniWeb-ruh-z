export async function arModositas(id, ujAr) {
    const valasz = await fetch(`https://dummyjson.com/products/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            price: ujAr
        })
    });

    return await valasz.json();
}