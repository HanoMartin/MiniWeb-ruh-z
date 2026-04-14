const { KosarOsszeg } = require("./kosarOsszeg.js");

test("Kosár végösszeg helyes kiszámítása", () => {
    const bemenet = [
        { ar: 100, db: 2 },
        { ar: 50, db: 1 }
    ];

    expect(KosarOsszeg(bemenet)).toBe(250);
});
