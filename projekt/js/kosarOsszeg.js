function KosarOsszeg(adatok) {
    return adatok.reduce((osszeg, t) => osszeg + t.ar * t.db, 0);
}

module.exports = { KosarOsszeg };