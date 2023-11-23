class JuegoEscaleras {
  constructor(numeroJugadores) {
    this.jugadores = [];
    for (let i = 1; i <= numeroJugadores; i++) {
      this.jugadores.push({ nombre: `Jugador ${i}`, posicion: 0 });
    }
    this.turnoJugador = this.jugadores[0]; // Iniciar con el primer jugador
  }

  lanzarDado() {
    return Math.ceil(Math.random() * 6); // Números aleatorios del 1 al 6
  }

  moverJugador(jugador, pasos) {
    jugador.posicion += pasos;

    // Retroceder si supera la casilla 25
    if (jugador.posicion > 25) {
      const retroceso = jugador.posicion - 25;
      jugador.posicion -= retroceso;
      console.log(`${jugador.nombre} retrocede ${retroceso} casillas. Ahora está en la casilla ${jugador.posicion}.`);
    } else {
      console.log(`${jugador.nombre} avanzó ${pasos} casillas. Ahora está en la casilla ${jugador.posicion}.`);
    }

    // Resto de la lógica para serpientes y escaleras
    if (jugador.posicion === 14) {
      jugador.posicion = 4;
      console.log("¡Oh no! Serpiente. Retrocedes a la casilla 4.");
    } else if (jugador.posicion === 10) {
      jugador.posicion = 7;
      console.log("¡Oh no! Serpiente. Retrocedes a la casilla 7.");
    } else if (jugador.posicion === 5) {
      jugador.posicion = 17;
      console.log("¡Buena jugada! Escalera. Avanzas a la casilla 17.");
    } else if (jugador.posicion === 7) {
      jugador.posicion = 14;
      console.log("¡Buena jugada! Escalera. Avanzas a la casilla 14.");
    }
  }

  verificarGanador(jugador) {
    if (jugador.posicion === 25) {
      console.log(`\n¡Felicidades, ${jugador.nombre}! ¡Ganaste el juego, siiuuuu!\n`);
      return true;
    }
    return false;
  }

  async jugar() {
    while (true) {
      for (const jugador of this.jugadores) {
        const dado = this.lanzarDado(); // Lanzar el dado
        console.log(`\n${jugador.nombre} ha lanzado un ${dado}.`);

        this.moverJugador(jugador, dado); // Mover al jugador

        if (this.verificarGanador(jugador)) {
          return; // Salir del método si un jugador ganó
        }

        // Delay por cada turno
        await new Promise(resolve => setTimeout(resolve, 2000));
      }
    }
  }
}

// Crear una instancia del juego con la cantidad de ugadores que desee
const juego = new JuegoEscaleras(6);

// Iniciar el juego
juego.jugar();
