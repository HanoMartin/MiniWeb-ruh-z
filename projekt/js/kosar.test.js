import { kosarOsszeg } from "./kosar.js";

test("Kosár összeg számítás", () => {
    const tesztKosar = [
        { ar: 100, db: 2 },
        { ar: 50, db: 1 }
    ];

    /* A következő teszt a negatív árra vonatkozik, ami hibás adatnak számít */
    const tesztKosar2 = [
        { ar: -200, db: 1 },
        { ar: 150, db: 3 }
    ];

    /* A következő teszt a negatív darabszámra vonatkozik, ami szintén hibás adatnak számít */
    const tesztKosar3 = [
        { ar: 100, db: -2 },
        { ar: 50, db: 1 }
    ];

    /* A következő két teszt a túl nagy értékekre vonatkozik, amelyek szintén hibás adatnak számítanak */
    const tesztKosar4 = [
        { ar: 1000000, db: 2 },
        { ar: 50, db: 1 }
    ];

    /* A következő teszt a túl nagy darabszámra vonatkozik, ami szintén hibás adatnak számít */
    const tesztKosar5 = [
        { ar: 100, db: 2 },
        { ar: 50, db: 100 }
    ];

    expect(kosarOsszeg(tesztKosar)).toBe(250);
    expect(kosarOsszeg(tesztKosar2)).toBe("Hibás adat: ár vagy darabszám nem lehet negatív");
    expect(kosarOsszeg(tesztKosar3)).toBe("Hibás adat: ár vagy darabszám nem lehet negatív");
    expect(kosarOsszeg(tesztKosar4)).toBe("Hibás adat: ár vagy darabszám nem lehet túl nagy");
    expect(kosarOsszeg(tesztKosar5)).toBe("Hibás adat: ár vagy darabszám nem lehet túl nagy");
});