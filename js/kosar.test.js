import { kosarOsszeg } from "./kosar.js";

test("Kosár összeg számítás", () => {
    const tesztKosar = [
        { ar: 100, db: 2 },
        { ar: 50, db: 1 }
    ];

    expect(kosarOsszeg(tesztKosar)).toBe(250);
});