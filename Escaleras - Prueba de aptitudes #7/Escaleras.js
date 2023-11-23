// Juego para dos personas
class JuegoEscaleras {
    constructor() {
        this.jugador1 = { nombre: "Jugador 1", posicion: 0 }
        this.jugador2 = { nombre: "Jugador 2", posicion: 0 }
        this.turnoJugador = this.jugador1 // Iniciar con el jugador 1
    }

    // Método para lanzar el dado
    lanzarDado() {
        return Math.ceil(Math.random() * 6) // Números aleatorios del 1 al 6
    }

    // Método para mover a cada jugador y determinar cual es su nueva posición y si cayó o no en una serpiente o escalera
    moverJugador(jugador, pasos) {
        jugador.posicion += pasos;
        console.log(`${jugador.nombre} avanzó ${pasos} casillas. Ahora está en la casilla ${jugador.posicion}.`)


        if (jugador.posicion === 14) {
            jugador.posicion = 4
            console.log("¡Oh no! Serpiente. Retrocedes a la casilla 4.")
        } else if (jugador.posicion === 10) {
            jugador.posicion = 7
            console.log("¡Oh no! Serpiente. Retrocedes a la casilla 7.")
        } else if (jugador.posicion === 5) {
            jugador.posicion = 17
            console.log("¡Buena jugada! Escalera. Avanzas a la casilla 17.")
        } else if (jugador.posicion === 7) {
            jugador.posicion = 14
            console.log("¡Buena jugada! Escalera. Avanzas a la casilla 14.")
        }
       
    }

    // Método para verificar si un jugador ganó
    verificarGanador(jugador) {
        if (jugador.posicion >= 25) {
            console.log(`\n¡Felicidades, ${jugador.nombre}! ¡Ganaste el juego!\n`)
            return true
        }
        return false
    }

    // Método principal para jugar
    async jugar() {
        while (true) {
            const dado = this.lanzarDado() // Lanzar el dado
            console.log(`\n${this.turnoJugador.nombre} ha lanzado un ${dado}.`)

            this.moverJugador(this.turnoJugador, dado) // Mover al jugador

            if (this.verificarGanador(this.turnoJugador)) {
                break // Acabar el jueg si el jugador actual ganó
            }

            // Cambiar al siguiente jugador
            this.turnoJugador = this.turnoJugador === this.jugador1 ? this.jugador2 : this.jugador1

            // Delay por cada turno
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
}

// Crear una instancia del juego
const juego = new JuegoEscaleras()

// Iniciar el juego
juego.jugar()
