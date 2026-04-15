const { KosarOsszeg } = require("./kosarOsszeg.js");

describe("KosarOsszeg tesztek", () => {

    test("Pozitív árak és darabszámok", () => {
        const bemenet = [
            { ar: 100, db: 2 },
            { ar: 50, db: 1 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(250);
    });

    test("Negatív árak (mindkettő negatív)", () => {
        const bemenet = [
            { ar: -100, db: 2 },
            { ar: -50, db: 1 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(-250);
    });

    test("Egyik ár negatív, másik pozitív", () => {
        const bemenet = [
            { ar: -100, db: 1 },
            { ar: 200, db: 1 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(100);
    });

    test("Negatív darabszám (elméleti hibás adat)", () => {
        const bemenet = [
            { ar: 100, db: -2 },
            { ar: 50, db: 1 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(-150);
    });

    test("Ár nulla", () => {
        const bemenet = [
            { ar: 0, db: 5 },
            { ar: 100, db: 1 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(100);
    });

    test("Darabszám nulla", () => {
        const bemenet = [
            { ar: 100, db: 0 },
            { ar: 50, db: 3 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(150);
    });

    test("Minden nulla", () => {
        const bemenet = [
            { ar: 0, db: 0 },
            { ar: 0, db: 0 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(0);
    });

    test("Vegyes pozitív, negatív és nulla értékek", () => {
        const bemenet = [
            { ar: 100, db: 1 },
            { ar: -50, db: 2 },
            { ar: 0, db: 10 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(0);
    });

    test("Üres tömb", () => {
        const bemenet = [];
        expect(KosarOsszeg(bemenet)).toBe(0);
    });

    test("Nagy számok", () => {
        const bemenet = [
            { ar: 1000000, db: 2 },
            { ar: 500000, db: 3 }
        ];
        expect(KosarOsszeg(bemenet)).toBe(3500000);
    });

});
