/**
 * TDA Cola - Variante A (2.2): cola lineal simple sobre arreglo de tamano fijo.
 *
 * Los indices "frente" y "fin" avanzan siempre hacia adelante. Cuando se
 * desencola, el lugar liberado NO se reutiliza; por eso, aunque queden lugares
 * libres al comienzo, la cola se considera llena cuando "fin" llega al final
 * del arreglo.
 *
 * Complejidad temporal:  encolar O(1) | desencolar O(1) | frente O(1)
 */
public class ColaLinealSimple<T> implements Cola<T> {

    private static final int CAPACIDAD_POR_DEFECTO = 1000;

    private final Object[] datos;
    private final int capacidad;
    private int frente; // indice del primer elemento
    private int fin;    // indice de la proxima posicion libre al final

    public ColaLinealSimple() {
        this(CAPACIDAD_POR_DEFECTO);
    }

    public ColaLinealSimple(int capacidad) {
        this.capacidad = capacidad;
        this.datos = new Object[capacidad];
        this.frente = 0;
        this.fin = 0;
    }

    @Override
    public void encolar(T elemento) {
        if (esLlena()) {
            throw new IllegalStateException("La cola esta llena");
        }
        datos[fin] = elemento;
        fin++;
    }

    @Override
    @SuppressWarnings("unchecked")
    public T desencolar() {
        if (esVacia()) {
            throw new IllegalStateException("La cola esta vacia");
        }
        T elemento = (T) datos[frente];
        datos[frente] = null;
        frente++;
        return elemento;
    }

    @Override
    @SuppressWarnings("unchecked")
    public T frente() {
        if (esVacia()) {
            throw new IllegalStateException("La cola esta vacia");
        }
        return (T) datos[frente];
    }

    @Override
    public boolean esVacia() {
        return frente == fin;
    }

    @Override
    public boolean esLlena() {
        // Caracteristica de la variante lineal: no se reutiliza el espacio libre
        // del comienzo. Cuando "fin" alcanza la capacidad, no se puede encolar mas.
        return fin == capacidad;
    }
}
