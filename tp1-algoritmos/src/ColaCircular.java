/**
 * TDA Cola - Variante B (2.2): cola circular sobre arreglo de tamano fijo.
 *
 * El arreglo se recorre de forma circular mediante aritmetica modular. Cuando
 * "frente" o "fin" llegan al final del arreglo vuelven al comienzo, de modo que
 * las posiciones que quedan libres al desencolar SE reutilizan.
 *
 * Se mantiene "frente" (indice del primer elemento) y "cantidad" (numero de
 * elementos). El fin se calcula como (frente + cantidad) % capacidad.
 *
 * Complejidad temporal:  encolar O(1) | desencolar O(1) | frente O(1)
 */
public class ColaCircular<T> implements Cola<T> {

    private static final int CAPACIDAD_POR_DEFECTO = 1000;

    private final Object[] datos;
    private final int capacidad;
    private int frente;   // indice del primer elemento
    private int cantidad; // cantidad de elementos almacenados

    public ColaCircular() {
        this(CAPACIDAD_POR_DEFECTO);
    }

    public ColaCircular(int capacidad) {
        this.capacidad = capacidad;
        this.datos = new Object[capacidad];
        this.frente = 0;
        this.cantidad = 0;
    }

    @Override
    public void encolar(T elemento) {
        if (esLlena()) {
            throw new IllegalStateException("La cola esta llena");
        }
        int fin = (frente + cantidad) % capacidad;
        datos[fin] = elemento;
        cantidad++;
    }

    @Override
    @SuppressWarnings("unchecked")
    public T desencolar() {
        if (esVacia()) {
            throw new IllegalStateException("La cola esta vacia");
        }
        T elemento = (T) datos[frente];
        datos[frente] = null;
        frente = (frente + 1) % capacidad;
        cantidad--;
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
        return cantidad == 0;
    }

    @Override
    public boolean esLlena() {
        return cantidad == capacidad;
    }
}
