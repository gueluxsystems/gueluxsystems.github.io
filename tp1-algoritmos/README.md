# TP1 — Algoritmos y Estructuras de Datos II — TDAs

Resolución del Trabajo Práctico 1 **desde el punto 2.2 en adelante** (TDA Cola,
TDA Cola con Prioridad, y sus métodos de utilización).

## Contenido

- `INFORME.md` — informe con especificaciones, tablas de complejidad,
  justificaciones y la complejidad de cada método de utilización (2.2, 2.3, 3.1,
  3.2 y 3.3).
- `src/` — código fuente Java (una clase por TDA y por variante, más las clases
  de utilización).

### TDA Cola (2.2)
- `Cola.java` — interfaz.
- `ColaLinealSimple.java` — Variante A (lineal simple).
- `ColaCircular.java` — Variante B (circular).

### TDA Cola con Prioridad (3.1 / 3.2)
- `ColaPrioridad.java` — interfaz.
- `Prioritario.java` — par (elemento, prioridad) devuelto por verMax/extraerMax.
- `ColaPrioridadDesordenada.java` — Variante A (desordenada).
- `ColaPrioridadOrdenada.java` — Variante B (ordenada).

### Utilización
- `UtilCola.java` — métodos 6 a 9 (2.3).
- `UtilColaPrioridad.java` — métodos 10 a 12 (3.3).

### Auxiliares y pruebas
- `Pila.java` / `PilaEstatica.java` — Pila estática (Parte 1), usada por el método 7.
- `PruebasTP.java` — batería de pruebas de verificación (29 casos).

## Compilar y ejecutar las pruebas

```bash
cd tp1-algoritmos
javac -d out src/*.java
java -cp out PruebasTP
```

Salida esperada: `Resultado: 29/29 pruebas OK`.
