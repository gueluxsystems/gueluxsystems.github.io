import java.util.ArrayList;
import java.util.List;

/**
 * Pruebas de verificacion (no forman parte de la entrega, sirven para validar
 * la correccion de las implementaciones y de los metodos de utilizacion).
 */
public class PruebasTP {

    static int pruebas = 0;
    static int ok = 0;

    static void check(String nombre, boolean condicion) {
        pruebas++;
        if (condicion) {
            ok++;
            System.out.println("  OK   " + nombre);
        } else {
            System.out.println("  FALLA " + nombre);
        }
    }

    // Vuelca una cola a lista y la restaura (para inspeccionar sin destruir).
    static <T> List<T> aLista(Cola<T> c) {
        List<T> l = new ArrayList<>();
        Cola<T> aux = new ColaCircular<>();
        while (!c.esVacia()) {
            T x = c.desencolar();
            l.add(x);
            aux.encolar(x);
        }
        while (!aux.esVacia()) {
            c.encolar(aux.desencolar());
        }
        return l;
    }

    static <T> Cola<T> colaDe(Cola<T> c, T... xs) {
        for (T x : xs) c.encolar(x);
        return c;
    }

    public static void main(String[] args) {
        System.out.println("== 2.2 TDA Cola: variantes ==");
        probarColaLineal();
        probarColaCircular();

        System.out.println("== 2.3 Utilizacion Cola (6-9) ==");
        probarPasarCola();
        probarInvertirConPila();
        probarInvertirSinPila();
        probarFinalCoincide();

        System.out.println("== 3.2 Cola con Prioridad: variantes y desempate ==");
        probarCPDesordenada();
        probarCPOrdenada();

        System.out.println("== 3.3 Utilizacion Cola con Prioridad (10-12) ==");
        probarCombinar();
        probarInvertirConCP();
        probarSumarPrioridadPar();

        System.out.println("\nResultado: " + ok + "/" + pruebas + " pruebas OK");
        if (ok != pruebas) {
            System.exit(1);
        }
    }

    static void probarColaLineal() {
        Cola<Integer> c = new ColaLinealSimple<>(3);
        c.encolar(1); c.encolar(2);
        check("lineal frente=1", c.frente() == 1);
        check("lineal desencolar=1", c.desencolar() == 1);
        c.encolar(3);
        // frente avanzo, se ocuparon indices 0,1,2 => esLlena aunque haya lugar liberado
        check("lineal esLlena (no reutiliza espacio)", c.esLlena());
        // Se drena de forma destructiva: la lineal no puede reutilizar el espacio liberado.
        List<Integer> l = new ArrayList<>();
        while (!c.esVacia()) {
            l.add(c.desencolar());
        }
        check("lineal orden FIFO", l.equals(List.of(2, 3)));
    }

    static void probarColaCircular() {
        Cola<Integer> c = new ColaCircular<>(3);
        c.encolar(1); c.encolar(2); c.encolar(3);
        check("circular esLlena", c.esLlena());
        check("circular desencolar=1", c.desencolar() == 1);
        c.encolar(4); // reutiliza el lugar liberado
        check("circular reutiliza espacio", c.esLlena());
        check("circular orden FIFO", aLista(c).equals(List.of(2, 3, 4)));
    }

    static void probarPasarCola() {
        Cola<Integer> origen = colaDe(new ColaCircular<>(), 1, 2, 3);
        Cola<Integer> nueva = UtilCola.pasarCola(origen);
        check("6 pasarCola: mismo orden", aLista(nueva).equals(List.of(1, 2, 3)));
        check("6 pasarCola: origen vacia", origen.esVacia());
    }

    static void probarInvertirConPila() {
        Cola<Integer> c = colaDe(new ColaCircular<>(), 1, 2, 3, 4);
        Cola<Integer> r = UtilCola.invertirColaConPila(c);
        check("7 invertirConPila: invertida", aLista(r).equals(List.of(4, 3, 2, 1)));
    }

    static void probarInvertirSinPila() {
        Cola<Integer> c = colaDe(new ColaCircular<>(), 1, 2, 3, 4);
        Cola<Integer> r = UtilCola.invertirColaSinPila(c);
        check("8 invertirSinPila: invertida", aLista(r).equals(List.of(4, 3, 2, 1)));
        // caso vacio
        Cola<Integer> vac = new ColaCircular<>();
        check("8 invertirSinPila: vacia", UtilCola.invertirColaSinPila(vac).esVacia());
    }

    static void probarFinalCoincide() {
        Cola<Integer> c1 = colaDe(new ColaCircular<>(), 9, 1, 2, 3);
        Cola<Integer> c2 = colaDe(new ColaCircular<>(), 7, 8, 2, 3);
        check("9 finalCoincide k=2 (coincide)", UtilCola.finalCoincide(c1, c2, 2));
        check("9 finalCoincide k=3 (no coincide)", !UtilCola.finalCoincide(c1, c2, 3));
        check("9 c1 preservada", aLista(c1).equals(List.of(9, 1, 2, 3)));
        check("9 c2 preservada", aLista(c2).equals(List.of(7, 8, 2, 3)));
        check("9 k mayor que tamano => false", !UtilCola.finalCoincide(c1, c2, 5));
        check("9 k=0 => true", UtilCola.finalCoincide(c1, c2, 0));
    }

    // Extrae todo respetando prioridad+desempate y devuelve la secuencia de elementos.
    static <T> List<T> drenar(ColaPrioridad<T> cp) {
        List<T> l = new ArrayList<>();
        while (!cp.esVacia()) {
            l.add(cp.extraerMax().getElemento());
        }
        return l;
    }

    static void probarCPDesordenada() {
        ColaPrioridad<String> cp = new ColaPrioridadDesordenada<>();
        cp.insertar("a", 5);
        cp.insertar("b", 1);
        cp.insertar("c", 5); // empate con "a"; "a" se inserto antes => sale primero
        cp.insertar("d", 8);
        check("CP desordenada verMax=d", cp.verMax().getElemento().equals("d"));
        check("CP desordenada orden+desempate", drenar(cp).equals(List.of("d", "a", "c", "b")));
    }

    static void probarCPOrdenada() {
        ColaPrioridad<String> cp = new ColaPrioridadOrdenada<>();
        cp.insertar("a", 5);
        cp.insertar("b", 1);
        cp.insertar("c", 5);
        cp.insertar("d", 8);
        cp.insertar("e", 5); // tercer empate en prioridad 5
        check("CP ordenada verMax=d", cp.verMax().getElemento().equals("d"));
        check("CP ordenada orden+desempate FIFO", drenar(cp).equals(List.of("d", "a", "c", "e", "b")));
    }

    static void probarCombinar() {
        ColaPrioridad<String> cp1 = new ColaPrioridadOrdenada<>();
        cp1.insertar("a1", 5);
        cp1.insertar("a2", 5);
        cp1.insertar("a3", 1);
        ColaPrioridad<String> cp2 = new ColaPrioridadDesordenada<>();
        cp2.insertar("b1", 5);
        cp2.insertar("b2", 9);
        ColaPrioridad<String> r = UtilColaPrioridad.combinar(cp1, cp2);
        // prioridad 9: b2 ; prioridad 5: a1,a2 (cp1) luego b1 (cp2) ; prioridad 1: a3
        check("10 combinar orden", drenar(r).equals(List.of("b2", "a1", "a2", "b1", "a3")));
        check("10 combinar cp1 vacia", cp1.esVacia());
        check("10 combinar cp2 vacia", cp2.esVacia());
    }

    static void probarInvertirConCP() {
        Cola<Integer> c = colaDe(new ColaCircular<>(), 1, 2, 3, 4, 5);
        Cola<Integer> r = UtilColaPrioridad.invertirColaConColaPrioridad(c);
        check("11 invertir con CP", aLista(r).equals(List.of(5, 4, 3, 2, 1)));
    }

    static void probarSumarPrioridadPar() {
        ColaPrioridad<Integer> cp = new ColaPrioridadDesordenada<>();
        cp.insertar(10, 2); // par
        cp.insertar(20, 3); // impar
        cp.insertar(30, 4); // par
        cp.insertar(40, 5); // impar
        int suma = UtilColaPrioridad.sumarValoresPrioridadPar(cp);
        check("12 suma prioridad par = 40", suma == 40);
        // cp preservada (mismo orden de extraccion que antes)
        check("12 cp preservada", drenar(cp).equals(List.of(40, 30, 20, 10)));
    }
}
