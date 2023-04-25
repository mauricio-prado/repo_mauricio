interface Apuesta {
    tipo: 'numero' | 'color',
    valor: number | string,
  }
  
  class Ruletaa {
    private numeros: number[];
    private posicionBola: number;
    private apuestas: Map<string, number>;
    constructor() {
      this.numeros = [];
      for (let i = 0; i <= 36; i++) {
        this.numeros.push(i);
      }
      this.posicionBola = -1;
      this.apuestas = new Map<string, number>();
    }
  
    public girar(): number {
      this.posicionBola = Math.floor(Math.random() * this.numeros.length);
      return this.numeros[this.posicionBola];
    }
  
    public realizarApuesta(numero: number, cantidad: number, jugador: string, tipo: 'numero' | 'color', valor: number | string) {
      if (this.apuestas.has(jugador)) {
        const cantidadActual = this.apuestas.get(jugador) ?? 0;
        this.apuestas.set(jugador, cantidadActual + cantidad);
      } else {
        this.apuestas.set(jugador, cantidad);
      }
    }
  
    public pagarApuestas(numeroGanador: number) {
      for (const [jugador, cantidad] of this.apuestas.entries()) {
        if (this.numeroGanadorPaga(numeroGanador, jugador)) {
          console.log(`${jugador} gana ${cantidad * 35} fichas`);
        } else if (this.colorGanadorPaga(numeroGanador, jugador)) {
          console.log(`${jugador} gana ${cantidad * 1} fichas`);
        } else {
          console.log(`${jugador} pierde ${cantidad} fichas`);
        }
      }
      this.apuestas.clear();
    }
  
    private numeroGanadorPaga(numeroGanador: number, jugador: string): boolean {
      const apuesta = this.obtenerApuesta(jugador);
      if (apuesta && apuesta.tipo === 'numero' && apuesta.valor === numeroGanador) {
        return true;
      }
      return false;
    }
  
    private colorGanadorPaga(numeroGanador: number, jugador: string): boolean {
      const apuesta = this.obtenerApuesta(jugador);
      if (!apuesta || apuesta.tipo !== 'color') {
        return false;
      }
      const esRojo = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36].includes(numeroGanador);
      const esNegro = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35].includes(numeroGanador);
      if (apuesta.valor === 'rojo' && esRojo) {
        return true;
      }
      if (apuesta.valor === 'negro' && esNegro) {
        return true;
      }
      return false;
    }
  
    private obtenerApuesta(jugador: string): Apuesta | undefined {
        const apuesta = this.apuestas.get(jugador);
        if (!apuesta) {
          return undefined;
        }
        }
    }
    