/**
 * Utilizacion del TDA Cola con Prioridad (3.3): metodos 10 a 12.
 *
 * Resuelven usando UNICAMENTE las operaciones de la interfaz ColaPrioridad
 * (y de Cola en el metodo 11). Solo "new" nombra implementaciones concretas.
 */
public class UtilColaPrioridad {

    /**
     * 10. combinar: nueva cola con prioridad con todos los elementos de cp1 y
     * cp2, respetando el criterio de desempate de 3.1 (se conserva el orden
     * relativo de insercion entre elementos de igual prioridad). Ambas colas de
     * entrada quedan vacias al finalizar.
     *
     * Se extraen los elementos de cp1 en orden de prioridad (con desempate FIFO)
     * y se insertan en el resultado; luego los de cp2. Como el resultado tambien
     * aplica desempate FIFO, para una misma prioridad quedan primero los de cp1
     * (en su orden) y despues los de cp2 (en su orden).
     *
     * Complejidad: O((n1 + n2)^2) en el peor caso con implementacion estatica,
     * porque realiza O(n1 + n2) operaciones y cada insertar/extraerMax cuesta
     * O(n) en alguna de las variantes.
     */
    public static <T> ColaPrioridad<T> combinar(ColaPrioridad<T> cp1, ColaPrioridad<T> cp2) {
        ColaPrioridad<T> resultado = new ColaPrioridadOrdenada<>();
        while (!cp1.esVacia()) {
            Prioritario<T> e = cp1.extraerMax();
            resultado.insertar(e.getElemento(), e.getPrioridad());
        }
        while (!cp2.esVacia()) {
            Prioritario<T> e = cp2.extraerMax();
            resultado.insertar(e.getElemento(), e.getPrioridad());
        }
        return resultado;
    }

    /**
     * 11. invertirColaConColaPrioridad: nueva cola con los elementos de c en
     * orden inverso, usando una ColaPrioridad auxiliar.
     *
     * A medida que se recorre c se asigna a cada elemento una prioridad
     * creciente (0, 1, 2, ...). Como todas las prioridades son distintas, el
     * ultimo elemento de c recibe la mayor prioridad y por lo tanto extraerMax
     * lo devuelve primero: el resultado queda invertido. c queda vacia.
     * Complejidad: O(n) operaciones de TDA. Con la variante ordenada, como las
     * prioridades son crecientes, cada insertar cae al final en O(1), por lo que
     * el metodo resulta O(n).
     */
    public static <T> Cola<T> invertirColaConColaPrioridad(Cola<T> c) {
        ColaPrioridad<T> cp = new ColaPrioridadOrdenada<>();
        int prioridad = 0;
        while (!c.esVacia()) {
            cp.insertar(c.desencolar(), prioridad);
            prioridad++;
        }
        Cola<T> resultado = new ColaCircular<>();
        while (!cp.esVacia()) {
            resultado.encolar(cp.extraerMax().getElemento());
        }
        return resultado;
    }

    /**
     * 12. sumarValoresPrioridadPar: suma de los valores de todos los elementos
     * cuya prioridad es un numero par. cp queda con su contenido y orden
     * original al finalizar.
     *
     * Se vacia cp en una cola con prioridad auxiliar (acumulando la suma de los
     * de prioridad par) y luego se reconstruye cp desde la auxiliar. Como el
     * criterio de extraccion (prioridad + desempate FIFO) es determinista,
     * reinsertar en el mismo orden de extraccion restaura cp de forma identica.
     * Complejidad: O(n^2) en el peor caso con implementacion estatica.
     */
    public static int sumarValoresPrioridadPar(ColaPrioridad<Integer> cp) {
        ColaPrioridad<Integer> aux = new ColaPrioridadOrdenada<>();
        int suma = 0;
        while (!cp.esVacia()) {
            Prioritario<Integer> e = cp.extraerMax();
            if (e.getPrioridad() % 2 == 0) {
                suma += e.getElemento();
            }
            aux.insertar(e.getElemento(), e.getPrioridad());
        }
        // Reconstruir cp en su orden original.
        while (!aux.esVacia()) {
            Prioritario<Integer> e = aux.extraerMax();
            cp.insertar(e.getElemento(), e.getPrioridad());
        }
        return suma;
    }
}
