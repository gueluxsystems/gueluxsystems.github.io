/**
 * TDA Cola (FIFO).
 *
 * Especificacion (2.1):
 *  Dominio: Cola = secuencia finita de elementos que respeta el principio
 *  FIFO (First In, First Out): el primer elemento en ingresar es el primero
 *  en salir.
 *
 *  Operaciones (con pre/postcondiciones):
 *   - crear (constructor): -> Cola
 *        post: devuelve una cola vacia.
 *   - encolar(e): Cola x Elemento -> Cola
 *        pre : la cola no esta llena.
 *        post: agrega e al final de la cola.
 *   - desencolar(): Cola -> Elemento
 *        pre : la cola no esta vacia.
 *        post: elimina y devuelve el elemento del frente.
 *   - frente(): Cola -> Elemento
 *        pre : la cola no esta vacia.
 *        post: devuelve el elemento del frente sin modificar la cola.
 *   - esVacia(): Cola -> boolean
 *        post: devuelve true si y solo si la cola no tiene elementos.
 *   - esLlena(): Cola -> boolean   (observador propio de la implementacion estatica)
 *        post: devuelve true si y solo si no hay lugar para encolar.
 */
public interface Cola<T> {
    void encolar(T elemento);
    T desencolar();
    T frente();
    boolean esVacia();
    boolean esLlena();
}
