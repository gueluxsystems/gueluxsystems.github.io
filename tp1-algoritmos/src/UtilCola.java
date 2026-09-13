/**
 * Utilizacion del TDA Cola (2.3): metodos 6 a 9.
 *
 * Todos resuelven usando UNICAMENTE las operaciones de la interfaz Cola (y de
 * Pila en el metodo 7). No se accede al arreglo interno ni a los indices
 * frente/fin desde afuera de la implementacion. Solo el operador "new" nombra
 * una implementacion concreta para poder crear estructuras nuevas.
 *
 * Nota sobre capacidad: al ser implementaciones estaticas, las estructuras
 * nuevas se crean con una capacidad por defecto que se asume suficientemente
 * grande (no pueden redimensionarse).
 */
public class UtilCola {

    /**
     * 6. pasarCola: nueva cola con todos los elementos de origen, en el mismo
     * orden, dejando origen vacia.
     * Complejidad: O(n).
     */
    public static <T> Cola<T> pasarCola(Cola<T> origen) {
        Cola<T> nueva = new ColaCircular<>();
        while (!origen.esVacia()) {
            nueva.encolar(origen.desencolar());
        }
        return nueva;
    }

    /**
     * 7. invertirColaConPila: nueva cola con los elementos de c en orden
     * inverso, usando una Pila auxiliar.
     * Al volcar la cola (FIFO) en una pila (LIFO) y de vuelta a una cola, el
     * orden se invierte. La cola c queda vacia al finalizar.
     * Complejidad: O(n).
     */
    public static <T> Cola<T> invertirColaConPila(Cola<T> c) {
        Pila<T> pila = new PilaEstatica<>();
        while (!c.esVacia()) {
            pila.apilar(c.desencolar());
        }
        Cola<T> resultado = new ColaCircular<>();
        while (!pila.esVacia()) {
            resultado.encolar(pila.desapilar());
        }
        return resultado;
    }

    /**
     * 8. invertirColaSinPila: nueva cola con los elementos de c en orden
     * inverso, SIN estructuras auxiliares (ni Pila, ni arreglo, ni Cola extra):
     * solo recursion pura sobre la propia cola.
     *
     * Idea: se saca el frente (x), se invierte recursivamente el resto y se
     * agrega x al final de la cola invertida. La unica cola creada es la que se
     * devuelve (se construye en el caso base y se propaga hacia arriba); c queda
     * vacia al finalizar.
     * Complejidad: O(n) en tiempo y O(n) en profundidad de recursion (pila de
     * llamadas).
     */
    public static <T> Cola<T> invertirColaSinPila(Cola<T> c) {
        if (c.esVacia()) {
            return new ColaCircular<>();
        }
        T x = c.desencolar();
        Cola<T> invertida = invertirColaSinPila(c);
        invertida.encolar(x);
        return invertida;
    }

    /**
     * 9. finalCoincide: indica si los ultimos k elementos de c1 coinciden, en
     * el mismo orden, con los ultimos k de c2. Ambas colas quedan con su
     * contenido y orden original al finalizar.
     * Precondiciones: k >= 0 y elementos no nulos (se comparan con equals).
     * Complejidad: O(n1 + n2).
     */
    public static <T> boolean finalCoincide(Cola<T> c1, Cola<T> c2, int k) {
        if (k <= 0) {
            return true; // los "ultimos 0" coinciden trivialmente
        }
        Cola<T> ultimos1 = ultimosK(c1, k);
        Cola<T> ultimos2 = ultimosK(c2, k);
        if (ultimos1 == null || ultimos2 == null) {
            return false; // alguna cola tiene menos de k elementos
        }
        while (!ultimos1.esVacia()) {
            T a = ultimos1.desencolar();
            T b = ultimos2.desencolar();
            if (!a.equals(b)) {
                return false;
            }
        }
        return true;
    }

    /**
     * Auxiliar de finalCoincide: devuelve una nueva cola con los ultimos k
     * elementos de c (en orden), dejando c con su contenido y orden original.
     * Devuelve null si c tiene menos de k elementos.
     */
    private static <T> Cola<T> ultimosK(Cola<T> c, int k) {
        Cola<T> aux = new ColaCircular<>();
        int n = 0;
        while (!c.esVacia()) {
            aux.encolar(c.desencolar());
            n++;
        }
        Cola<T> ultimos = (n >= k) ? new ColaCircular<>() : null;
        int i = 0;
        while (!aux.esVacia()) {
            T x = aux.desencolar();
            c.encolar(x); // restaurar c en su orden original
            if (ultimos != null && i >= n - k) {
                ultimos.encolar(x);
            }
            i++;
        }
        return ultimos;
    }
}
