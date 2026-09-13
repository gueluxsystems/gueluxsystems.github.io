/**
 * Implementacion estatica del TDA Pila (Variante A de la Parte 1: el tope se
 * mantiene en el ultimo lugar ocupado del arreglo). apilar, desapilar y tope
 * son O(1). Se usa como estructura auxiliar en el metodo 7.
 */
public class PilaEstatica<T> implements Pila<T> {

    private static final int CAPACIDAD_POR_DEFECTO = 1000;

    private final Object[] datos;
    private final int capacidad;
    private int cantidad; // el tope es datos[cantidad - 1]

    public PilaEstatica() {
        this(CAPACIDAD_POR_DEFECTO);
    }

    public PilaEstatica(int capacidad) {
        this.capacidad = capacidad;
        this.datos = new Object[capacidad];
        this.cantidad = 0;
    }

    @Override
    public void apilar(T elemento) {
        if (esLlena()) {
            throw new IllegalStateException("La pila esta llena");
        }
        datos[cantidad] = elemento;
        cantidad++;
    }

    @Override
    @SuppressWarnings("unchecked")
    public T desapilar() {
        if (esVacia()) {
            throw new IllegalStateException("La pila esta vacia");
        }
        cantidad--;
        T elemento = (T) datos[cantidad];
        datos[cantidad] = null;
        return elemento;
    }

    @Override
    @SuppressWarnings("unchecked")
    public T tope() {
        if (esVacia()) {
            throw new IllegalStateException("La pila esta vacia");
        }
        return (T) datos[cantidad - 1];
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
