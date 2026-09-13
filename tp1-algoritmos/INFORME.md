# Trabajo Práctico 1 — TDAs: Conceptos Básicos
## Informe (resolución desde el punto 2.2 en adelante)

> Lenguaje: Java. Cada método de utilización se resuelve usando **únicamente** las
> operaciones de la interfaz del TDA correspondiente, sin acceder al arreglo
> interno ni a los índices de tope/frente/fin desde afuera de la implementación.
>
> **Verificación:** todas las implementaciones y métodos de este informe se
> compilaron y probaron con una batería de 29 casos (`PruebasTP.java`), con
> resultado 29/29 OK.
>
> **Nota sobre capacidad:** al ser implementaciones *estáticas* (arreglo de
> tamaño fijo), las estructuras nuevas creadas dentro de los métodos de
> utilización usan una capacidad por defecto que se asume suficientemente grande;
> un arreglo estático no puede redimensionarse.

---

# Parte 2 — TDA Cola

## 2.2 Implementación

La Cola se implementa mediante un arreglo de tamaño fijo. Se presentan dos
variantes, diferenciadas por cómo se mueven los índices dentro del arreglo.

### Variante A — Cola lineal simple

Los índices `frente` (primer elemento) y `fin` (próxima posición libre) **avanzan
siempre hacia adelante**. Cuando se desencola, el lugar que queda libre al
comienzo **no se reutiliza**. Por eso, aunque queden posiciones libres al
principio, la cola se considera llena cuando `fin` llega al final del arreglo.

- `encolar`: coloca el elemento en `datos[fin]` e incrementa `fin`.
- `desencolar`: devuelve `datos[frente]` e incrementa `frente`.
- `frente`: devuelve `datos[frente]`.

| Operación   | Complejidad |
|-------------|:-----------:|
| encolar     | O(1)        |
| desencolar  | O(1)        |
| frente      | O(1)        |

Todas trabajan sobre una única posición del arreglo, sin desplazar elementos.
**Desventaja:** desperdicia espacio; una vez que `fin` alcanza el final, no se
pueden usar las posiciones que quedaron libres al principio.

### Variante B — Cola circular

El arreglo se considera **circular**: cuando `frente` o `fin` llegan al final,
vuelven al comienzo mediante **aritmética modular** (`% capacidad`). Así, las
posiciones liberadas al desencolar **se reutilizan**. Se mantiene `frente` y
`cantidad`; el fin se calcula como `(frente + cantidad) % capacidad`.

| Operación   | Complejidad |
|-------------|:-----------:|
| encolar     | O(1)        |
| desencolar  | O(1)        |
| frente      | O(1)        |

### Comparación y conclusión — ¿cuál conviene?

Ambas variantes tienen **O(1)** en `encolar`, `desencolar` y `frente`, por lo que
en tiempo son equivalentes. La diferencia está en el **uso de memoria**:

- La **cola lineal** es más simple de implementar, pero **desperdicia espacio**:
  cuando `fin` llega al final del arreglo, la considera llena aunque haya lugares
  libres al comienzo.
- La **cola circular** **reutiliza** esos lugares, aprovechando toda la capacidad
  del arreglo y manteniendo las operaciones en O(1).

**En la práctica conviene la cola circular**, porque logra el mismo costo temporal
que la lineal pero aprovecha mejor la memoria disponible. La lineal solo se
justifica si se busca la máxima simplicidad de código y se sabe que la cantidad
total de encolados no superará la capacidad del arreglo.

---

## 2.3 Utilización

Todos los métodos usan solo operaciones de la interfaz `Cola` (y de `Pila` en el
método 7). Funcionan con cualquiera de las dos variantes de implementación.

### 6. `pasarCola(origen: Cola): Cola`
Devuelve una nueva cola con todos los elementos de `origen`, en el mismo orden,
dejando `origen` vacía.

```java
public static <T> Cola<T> pasarCola(Cola<T> origen) {
    Cola<T> nueva = new ColaCircular<>();
    while (!origen.esVacia()) {
        nueva.encolar(origen.desencolar());
    }
    return nueva;
}
```
Como se desencola desde el frente y se encola al final, el orden se conserva.
**Complejidad temporal: O(n).**

### 7. `invertirColaConPila(c: Cola): Cola`
Devuelve una nueva cola con los elementos de `c` en orden inverso, usando una
**Pila** auxiliar.

```java
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
```
El truco es combinar el comportamiento **FIFO** de la cola con el **LIFO** de la
pila: al volcar la cola en la pila y luego la pila en una cola nueva, el orden
se invierte. `c` queda vacía al finalizar. **Complejidad temporal: O(n).**

### 8. `invertirColaSinPila(c: Cola): Cola`
Mismo resultado que el punto 7, pero **sin ninguna estructura auxiliar** (ni
Pila, ni arreglo, ni Cola extra): solo **recursión pura** sobre la propia cola.

```java
public static <T> Cola<T> invertirColaSinPila(Cola<T> c) {
    if (c.esVacia()) {
        return new ColaCircular<>();
    }
    T x = c.desencolar();
    Cola<T> invertida = invertirColaSinPila(c);
    invertida.encolar(x);
    return invertida;
}
```
**Idea:** se saca el frente `x`, se invierte recursivamente el resto y recién
entonces se agrega `x` al final. Como `x` era el primer elemento y se agrega
último, la cola queda invertida. La **única** cola que existe es la que se
devuelve (se crea en el caso base y se propaga hacia arriba); no se usa ninguna
estructura auxiliar. `c` queda vacía al finalizar.
**Complejidad temporal: O(n)**, con **O(n)** de profundidad de recursión (pila
de llamadas del sistema).

### 9. `finalCoincide(c1: Cola, c2: Cola, k: entero): boolean`
Indica si los últimos `k` elementos de `c1` coinciden, en el mismo orden, con los
últimos `k` de `c2`. **Ambas colas quedan con su contenido y orden original.**

```java
public static <T> boolean finalCoincide(Cola<T> c1, Cola<T> c2, int k) {
    if (k <= 0) return true;
    Cola<T> ultimos1 = ultimosK(c1, k);
    Cola<T> ultimos2 = ultimosK(c2, k);
    if (ultimos1 == null || ultimos2 == null) return false; // menos de k elementos
    while (!ultimos1.esVacia()) {
        T a = ultimos1.desencolar();
        T b = ultimos2.desencolar();
        if (!a.equals(b)) return false;
    }
    return true;
}

// Nueva cola con los últimos k elementos de c (en orden), dejando c intacta.
// Devuelve null si c tiene menos de k elementos.
private static <T> Cola<T> ultimosK(Cola<T> c, int k) {
    Cola<T> aux = new ColaCircular<>();
    int n = 0;
    while (!c.esVacia()) { aux.encolar(c.desencolar()); n++; }   // vaciar y contar
    Cola<T> ultimos = (n >= k) ? new ColaCircular<>() : null;
    int i = 0;
    while (!aux.esVacia()) {
        T x = aux.desencolar();
        c.encolar(x);                                 // restaurar c
        if (ultimos != null && i >= n - k) ultimos.encolar(x); // quedarse con los últimos k
        i++;
    }
    return ultimos;
}
```
Se vacía cada cola en una auxiliar para contar su tamaño `n`; al restaurarla se
reencolan los elementos y se retienen solo los de posición `>= n - k` (los
últimos `k`). Luego se comparan en orden. Este método sí puede usar estructuras
auxiliares porque el enunciado solo exige que `c1` y `c2` queden con su contenido
y orden original.
**Complejidad temporal: O(n1 + n2)**, donde `n1` y `n2` son los tamaños de las
colas.
*Precondiciones:* `k >= 0` y elementos no nulos (se comparan con `equals`). Si `k`
supera el tamaño de alguna cola, devuelve `false`.

---

# Parte 3 — TDA Cola con Prioridad

## 3.1 Especificación

**Dominio:** colección de pares `(elemento, prioridad)`, donde la prioridad es un
entero. **A mayor valor de prioridad, mayor prioridad** (el máximo es el que se
extrae).

**Operaciones** (con precondición/postcondición):

- **crear** `-> ColaPrioridad`
  *post:* devuelve una cola con prioridad vacía.
- **insertar**`(e, p)` : `ColaPrioridad × Elemento × Entero -> ColaPrioridad`
  *pre:* la cola no está llena.
  *post:* agrega el elemento `e` con prioridad `p`.
- **extraerMax**`()` : `ColaPrioridad -> Prioritario`
  *pre:* la cola no está vacía.
  *post:* elimina y devuelve el par de mayor prioridad (aplicando el criterio de
  desempate).
- **verMax**`()` : `ColaPrioridad -> Prioritario`
  *pre:* la cola no está vacía.
  *post:* devuelve (sin eliminar) el par de mayor prioridad, con el mismo criterio
  de desempate que `extraerMax`.
- **esVacia**`()` : `ColaPrioridad -> boolean`
  *post:* `true` si y solo si no hay elementos.
- **esLlena**`()` : `ColaPrioridad -> boolean` — observador propio de la
  implementación estática.

**Criterio de desempate:** **FIFO por orden de inserción.** Si dos elementos
tienen la misma prioridad, se extrae primero el que fue **insertado antes**. Es
decir, la cola con prioridad es **estable**.

**Decisión de diseño (`Prioritario`):** `verMax()` y `extraerMax()` devuelven un
objeto `Prioritario<T>` que encapsula el par `(elemento, prioridad)`. Esto es
necesario porque los métodos de utilización 10 y 12 requieren conocer **tanto el
elemento como su prioridad**, y la única vía permitida es la interfaz del TDA.
Devolver el par junto mantiene la interfaz reducida a
`{crear, insertar, extraerMax, verMax, esVacia}` sin exponer detalles internos.

## 3.2 Implementación

Ambas variantes respetan el criterio de desempate FIFO de 3.1.

### Variante A — Desordenada

Los elementos se insertan en el **primer lugar libre** (al final del arreglo),
sin mantener ningún orden. `extraerMax`/`verMax` **recorren** el arreglo buscando
la prioridad máxima. Para el desempate FIFO, el arreglo se mantiene en orden de
inserción y se toma la **primera aparición** del máximo (la más antigua); en
`extraerMax` se desplazan los elementos restantes a la izquierda para conservar
su orden de inserción.

| Operación   | Complejidad |
|-------------|:-----------:|
| insertar    | O(1)        |
| extraerMax  | O(n)        |
| verMax      | O(n)        |

### Variante B — Ordenada

El arreglo se mantiene **siempre ordenado de forma ascendente por prioridad**, de
modo que el máximo queda en la **última posición ocupada** y `extraerMax`/`verMax`
lo acceden directamente. Para el desempate FIFO, al insertar un elemento con
prioridad `p` se lo ubica **antes** de los que ya tienen esa misma prioridad; así,
el insertado antes queda en el índice más alto del bloque de empate y, como se
extrae desde el final, sale primero.

| Operación   | Complejidad |
|-------------|:-----------:|
| insertar    | O(n)        |
| extraerMax  | O(1)        |
| verMax      | O(1)        |

### Discusión — ¿una variante es mejor que la otra en todos los casos?

**No.** Ninguna domina a la otra en todos los casos; la elección **depende del
contexto de uso**. Cada variante hace O(1) una operación a costa de dejar la otra
en O(n):

- La **desordenada** conviene cuando hay **muchas inserciones** y pocas
  extracciones/consultas (inserta en O(1)).
- La **ordenada** conviene cuando hay **muchas extracciones/consultas del máximo**
  y relativamente pocas inserciones (extrae y consulta en O(1)).

Si el patrón de uso está equilibrado (por ejemplo, insertar `n` elementos y luego
extraerlos todos), ambas terminan en **O(n²)** en total, así que no hay una mejor
en el caso general. La decisión se toma según **qué operación esté en el camino
crítico** de la aplicación.

## 3.3 Utilización

### 10. `combinar(cp1, cp2): ColaPrioridad`
Nueva cola con prioridad con todos los elementos de `cp1` y `cp2`, respetando el
criterio de desempate de 3.1 (se conserva el orden relativo de inserción entre
elementos de igual prioridad). **Ambas entradas quedan vacías.**

```java
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
```
Se extraen los elementos de `cp1` en orden de prioridad (con desempate FIFO) y se
insertan en el resultado; luego los de `cp2`. Como el resultado también aplica
desempate FIFO, para una misma prioridad quedan primero los de `cp1` (en su orden
original) y después los de `cp2` (en su orden original).
**Complejidad temporal: O((n1 + n2)²)** en el peor caso con implementación
estática: se realizan O(n1 + n2) operaciones y cada `insertar`/`extraerMax` cuesta
O(n) en alguna de las variantes.

### 11. `invertirColaConColaPrioridad(c: Cola): Cola`
Nueva cola con los elementos de `c` en orden inverso, usando una **ColaPrioridad**
auxiliar.

```java
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
```
**Idea sobre la prioridad:** a medida que se recorre `c` se asigna una prioridad
**creciente** (0, 1, 2, …). Como el último elemento de `c` recibe la mayor
prioridad, `extraerMax` lo devuelve primero, y el resultado queda invertido. `c`
queda vacía.
**Complejidad temporal: O(n) operaciones de TDA.** Con la variante ordenada, como
las prioridades son crecientes, cada `insertar` cae al final en O(1), por lo que
el método resulta **O(n)**.

### 12. `sumarValoresPrioridadPar(cp): entero`
Suma de los valores de todos los elementos cuya **prioridad es par**. `cp` queda
con su contenido y orden original al finalizar.

```java
public static int sumarValoresPrioridadPar(ColaPrioridad<Integer> cp) {
    ColaPrioridad<Integer> aux = new ColaPrioridadOrdenada<>();
    int suma = 0;
    while (!cp.esVacia()) {
        Prioritario<Integer> e = cp.extraerMax();
        if (e.getPrioridad() % 2 == 0) suma += e.getElemento();
        aux.insertar(e.getElemento(), e.getPrioridad());
    }
    while (!aux.esVacia()) {                        // reconstruir cp
        Prioritario<Integer> e = aux.extraerMax();
        cp.insertar(e.getElemento(), e.getPrioridad());
    }
    return suma;
}
```
Se vacía `cp` en una cola con prioridad auxiliar (acumulando la suma de los de
prioridad par) y luego se reconstruye `cp` desde la auxiliar. Como el criterio de
extracción (prioridad + desempate FIFO) es determinista, reinsertar en el mismo
orden de extracción restaura `cp` de forma idéntica.
**Complejidad temporal: O(n²)** en el peor caso con implementación estática.

---

## Resumen de complejidades de utilización

| # | Método                          | Complejidad |
|---|---------------------------------|:-----------:|
| 6 | pasarCola                       | O(n)        |
| 7 | invertirColaConPila             | O(n)        |
| 8 | invertirColaSinPila             | O(n)        |
| 9 | finalCoincide                   | O(n1 + n2)  |
| 10| combinar                        | O((n1+n2)²) |
| 11| invertirColaConColaPrioridad    | O(n)        |
| 12| sumarValoresPrioridadPar        | O(n²)       |

*(En 10 y 12 el término cuadrático proviene del costo O(n) de las operaciones de
la Cola con Prioridad estática; contando solo operaciones de TDA, ambos realizan
O(n) llamadas.)*
