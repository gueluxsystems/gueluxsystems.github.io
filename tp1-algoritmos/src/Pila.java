/**
 * TDA Pila (LIFO). Se incluye aqui porque el metodo 7 (invertirColaConPila)
 * la utiliza como estructura auxiliar. Corresponde a la Parte 1 del TP.
 */
public interface Pila<T> {
    void apilar(T elemento);
    T desapilar();
    T tope();
    boolean esVacia();
    boolean esLlena();
}
