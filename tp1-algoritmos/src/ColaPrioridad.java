/**
 * TDA Cola con Prioridad.
 *
 * Especificacion (3.1):
 *  Dominio: coleccion de pares (elemento, prioridad). La prioridad es un
 *  entero: a mayor valor, mayor prioridad.
 *
 *  Operaciones (con pre/postcondiciones):
 *   - crear (constructor): -> ColaPrioridad
 *        post: devuelve una cola con prioridad vacia.
 *   - insertar(e, p): ColaPrioridad x Elemento x Entero -> ColaPrioridad
 *        pre : la cola no esta llena.
 *        post: agrega el elemento e con prioridad p.
 *   - extraerMax(): ColaPrioridad -> Prioritario
 *        pre : la cola no esta vacia.
 *        post: elimina y devuelve el par (elemento, prioridad) de mayor
 *              prioridad. Ante empate se aplica el criterio de desempate.
 *   - verMax(): ColaPrioridad -> Prioritario
 *        pre : la cola no esta vacia.
 *        post: devuelve (sin eliminar) el par de mayor prioridad, aplicando el
 *              mismo criterio de desempate que extraerMax.
 *   - esVacia(): ColaPrioridad -> boolean
 *        post: true si y solo si no hay elementos.
 *   - esLlena(): ColaPrioridad -> boolean  (observador de la implementacion estatica)
 *
 *  Criterio de desempate: FIFO por orden de insercion. Si dos elementos tienen
 *  la misma prioridad, se extrae primero el que fue insertado antes. Es decir,
 *  la cola con prioridad es ESTABLE.
 */
public interface ColaPrioridad<T> {
    void insertar(T elemento, int prioridad);
    Prioritario<T> extraerMax();
    Prioritario<T> verMax();
    boolean esVacia();
    boolean esLlena();
}
