var Ruleta = /** @class */ (function () {
    function Ruleta() {
        this.numeros = [];
        for (var i = 0; i <= 36; i++) {
            this.numeros.push(i);
        }
        this.posicionBola = -1;
        this.apuestas = new Map();
    }
    Ruleta.prototype.girar = function () {
        this.posicionBola = Math.floor(Math.random() * this.numeros.length);
        return this.numeros[this.posicionBola];
    };
    Ruleta.prototype.realizarApuesta = function (numero, cantidad, jugador, tipo, valor) {
        var _a;
        if (this.apuestas.has(jugador)) {
            var cantidadActual = (_a = this.apuestas.get(jugador)) !== null && _a !== void 0 ? _a : 0;
            this.apuestas.set(jugador, cantidadActual + cantidad);
        }
        else {
            this.apuestas.set(jugador, cantidad);
        }
    };
    Ruleta.prototype.pagarApuestas = function (numeroGanador) {
        for (var _i = 0, _a = this.apuestas.entries(); _i < _a.length; _i++) {
            var _b = _a[_i], jugador = _b[0], cantidad = _b[1];
            if (this.numeroGanadorPaga(numeroGanador, jugador)) {
                console.log("".concat(jugador, " gana ").concat(cantidad * 35, " fichas"));
            }
            else if (this.colorGanadorPaga(numeroGanador, jugador)) {
                console.log("".concat(jugador, " gana ").concat(cantidad * 1, " fichas"));
            }
            else {
                console.log("".concat(jugador, " pierde ").concat(cantidad, " fichas"));
            }
        }
        this.apuestas.clear();
    };
    Ruleta.prototype.numeroGanadorPaga = function (numeroGanador, jugador) {
        var apuesta = this.obtenerApuesta(jugador);
        if (apuesta && apuesta.tipo === 'numero' && apuesta.valor === numeroGanador) {
            return true;
        }
        return false;
    };
    Ruleta.prototype.colorGanadorPaga = function (numeroGanador, jugador) {
        var apuesta = this.obtenerApuesta(jugador);
        if (!apuesta || apuesta.tipo !== 'color') {
            return false;
        }
        var esRojo = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(numeroGanador);
        var esNegro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].includes(numeroGanador);
        if (apuesta.valor === 'rojo' && esRojo) {
            return true;
        }
        if (apuesta.valor === 'negro' && esNegro) {
            return true;
        }
        return false;
    };
    Ruleta.prototype.obtenerApuesta = function (jugador) {
        var apuesta = this.apuestas.get(jugador);
        if (!apuesta) {
            return undefined;
        }
    };
    return Ruleta;
}());
