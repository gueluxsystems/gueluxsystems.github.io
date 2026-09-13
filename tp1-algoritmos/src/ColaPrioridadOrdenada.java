/**
 * TDA Cola con Prioridad - Variante B (3.2): ORDENADA.
 *
 * El arreglo se mantiene siempre ordenado de forma ASCENDENTE por prioridad, de
 * modo que el maximo queda en la ultima posicion ocupada y extraerMax/verMax lo
 * acceden directamente en O(1).
 *
 * Criterio de desempate FIFO: al insertar un elemento con prioridad p se lo
 * ubica ANTES de los elementos ya existentes con esa misma prioridad (en la
 * posicion mas baja del bloque de empate). Asi, dentro de un bloque de igual
 * prioridad, el insertado antes queda en el indice mas alto y, como extraerMax
 * saca desde el final, se extrae primero -> FIFO.
 *
 * Complejidad temporal:  insertar O(n) | extraerMax O(1) | verMax O(1)
 */
public class ColaPrioridadOrdenada<T> implements ColaPrioridad<T> {

    private static final int CAPACIDAD_POR_DEFECTO = 1000;

    private final Object[] elementos;
    private final int[] prioridades;
    private final int capacidad;
    private int cantidad; // el maximo es elementos[cantidad - 1]

    public ColaPrioridadOrdenada() {
        this(CAPACIDAD_POR_DEFECTO);
    }

    public ColaPrioridadOrdenada(int capacidad) {
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
        // Primera posicion cuya prioridad es >= a la nueva. El nuevo elemento se
        // ubica alli, es decir, antes de los que ya tienen su misma prioridad.
        int pos = 0;
        while (pos < cantidad && prioridades[pos] < prioridad) {
            pos++;
        }
        // Desplazar a la derecha desde el final hasta "pos" para hacer lugar.
        for (int i = cantidad; i > pos; i--) {
            elementos[i] = elementos[i - 1];
            prioridades[i] = prioridades[i - 1];
        }
        elementos[pos] = elemento;
        prioridades[pos] = prioridad;
        cantidad++;
    }

    @Override
    @SuppressWarnings("unchecked")
    public Prioritario<T> verMax() {
        if (esVacia()) {
            throw new IllegalStateException("La cola con prioridad esta vacia");
        }
        return new Prioritario<>((T) elementos[cantidad - 1], prioridades[cantidad - 1]);
    }

    @Override
    @SuppressWarnings("unchecked")
    public Prioritario<T> extraerMax() {
        if (esVacia()) {
            throw new IllegalStateException("La cola con prioridad esta vacia");
        }
        cantidad--;
        Prioritario<T> maximo = new Prioritario<>((T) elementos[cantidad], prioridades[cantidad]);
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
