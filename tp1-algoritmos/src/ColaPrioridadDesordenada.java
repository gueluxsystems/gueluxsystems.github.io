/**
 * TDA Cola con Prioridad - Variante A (3.2): DESORDENADA.
 *
 * Los elementos se insertan en el primer lugar libre (al final), sin mantener
 * ningun orden. Para extraerMax/verMax se recorre el arreglo buscando el maximo.
 *
 * Criterio de desempate FIFO: el arreglo se mantiene en orden de insercion.
 * indiceMaximo() toma la PRIMERA aparicion de la prioridad maxima (usa ">"),
 * que corresponde al elemento insertado antes. En extraerMax se desplazan los
 * elementos restantes una posicion a la izquierda, conservando asi el orden de
 * insercion de los que quedan.
 *
 * Complejidad temporal:  insertar O(1) | extraerMax O(n) | verMax O(n)
 */
public class ColaPrioridadDesordenada<T> implements ColaPrioridad<T> {

    private static final int CAPACIDAD_POR_DEFECTO = 1000;

    private final Object[] elementos;
    private final int[] prioridades;
    private final int capacidad;
    private int cantidad;

    public ColaPrioridadDesordenada() {
        this(CAPACIDAD_POR_DEFECTO);
    }

    public ColaPrioridadDesordenada(int capacidad) {
        this.capacidad = capacidad;
        this.elementos = new Object[capacidad];
        this.prioridades = new int[capacidad];
        this.cantidad = 0;
    }

    @Override
    public void insertar(T elemento, int prioridad) {
        if (esLlena()) {
            throw new IllegalStateException("La cola con prioridad esta llena");
        }
        elementos[cantidad] = elemento;
        prioridades[cantidad] = prioridad;
        cantidad++;
    }

    // Indice de la prioridad maxima; ante empate, la primera aparicion
    // (elemento insertado antes) -> desempate FIFO.
    private int indiceMaximo() {
        int idx = 0;
        for (int i = 1; i < cantidad; i++) {
            if (prioridades[i] > prioridades[idx]) {
                idx = i;
            }
        }
        return idx;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Prioritario<T> verMax() {
        if (esVacia()) {
            throw new IllegalStateException("La cola con prioridad esta vacia");
        }
        int idx = indiceMaximo();
        return new Prioritario<>((T) elementos[idx], prioridades[idx]);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Prioritario<T> extraerMax() {
        if (esVacia()) {
            throw new IllegalStateException("La cola con prioridad esta vacia");
        }
        int idx = indiceMaximo();
        Prioritario<T> maximo = new Prioritario<>((T) elementos[idx], prioridades[idx]);
        // Desplazar a la izquierda para conservar el orden de insercion de los restantes.
        for (int i = idx; i < cantidad - 1; i++) {
            elementos[i] = elementos[i + 1];
            prioridades[i] = prioridades[i + 1];
        }
        cantidad--;
        elementos[cantidad] = null;
        return maximo;
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
