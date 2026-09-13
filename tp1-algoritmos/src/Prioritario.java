/**
 * Par (elemento, prioridad) que devuelven verMax() y extraerMax() del TDA
 * Cola con Prioridad.
 *
 * Se usa este par porque las operaciones de utilizacion (metodos 10 y 12)
 * necesitan conocer TANTO el elemento COMO su prioridad, y la unica via
 * permitida es la interfaz del TDA. Devolver ambos datos juntos mantiene la
 * interfaz reducida a {crear, insertar, extraerMax, verMax, esVacia} sin
 * exponer detalles internos de la implementacion.
 */
public class Prioritario<T> {

    private final T elemento;
    private final int prioridad;

    public Prioritario(T elemento, int prioridad) {
        this.elemento = elemento;
        this.prioridad = prioridad;
    }

    public T getElemento() {
        return elemento;
    }

    public int getPrioridad() {
        return prioridad;
    }

    @Override
    public String toString() {
        return "(" + elemento + ", p=" + prioridad + ")";
    }
}
