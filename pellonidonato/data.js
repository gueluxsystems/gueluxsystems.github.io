/* ── Cartera REAL y COMPLETA de Pelloni Donato ──────────────────────────────
   Relevada en vivo de pellonidonato.com.ar (71 resultados, 1/10/2026).
   Ningún dato inventado: dirección, m², ambientes, precio y zona son los
   publicados por la inmobiliaria (zona inferida de taxonomía/texto propio del
   sitio cuando no viene explícita; marcada "zona a confirmar" cuando no hay
   evidencia suficiente — nunca se adivina un barrio sin base).
   op: venta | alquiler | alquiler_temp
   tipo: casa | ph | depto | terreno | local | oficina | galpon | cochera | quinta
*/
const PROPIEDADES = [
  { cod:'1381', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (San Ramiro)', amb:4, dorms:3, m2:174, m2terreno:543, precio:'U$D 195.000', expensas:'$520.000', estado:'', dir:'San Ramiro S/N', desc:'excelente casa, muy luminosa' },
  { cod:'1401', op:'venta', tipo:'ph', zona:'zona_sin_especificar', zonaLabel:'Zona a confirmar', amb:3, dorms:2, m2:111, precio:'U$D 149.000', expensas:null, estado:'', dir:'Salvador Debenedetti N° 1500', desc:'PH con espectacular terraza, excelente ubicación' },
  { cod:'1379', op:'venta', tipo:'depto', zona:'belgrano', zonaLabel:'Belgrano', amb:3, dorms:2, m2:112, precio:'U$D 280.000', expensas:'$285.000', estado:'13 años', dir:'Crisólogo Larralde N° 2700', desc:'dúplex con terraza propia, balcón y cochera' },
  { cod:'1396', op:'venta', tipo:'depto', zona:'caballito', zonaLabel:'Caballito', amb:3, dorms:2, m2:90, precio:'U$D 198.000', expensas:'$260.000', estado:'a estrenar', dir:'Eduardo Acevedo N° 100', desc:'amplio, muy luminoso, cocina integrada y a estrenar' },
  { cod:'1394', op:'venta', tipo:'casa', zona:'saavedra', zonaLabel:'Saavedra (Parque Saavedra)', amb:4, dorms:3, m2:138, m2terreno:61, precio:'U$D 300.000', expensas:null, estado:'', dir:'Cap. Gral. Ramón Freire N° 3600', desc:'triplex en excelente ubicación' },
  { cod:'1387', op:'venta', tipo:'ph', zona:'villaurquiza', zonaLabel:'Villa Urquiza', amb:3, dorms:2, m2:125, precio:'U$D 245.000', expensas:null, estado:'6 años', dir:'Tomás A. Le Bretón N° 4900', desc:'PH sin expensas, muy luminoso' },
  { cod:'1208', op:'venta', tipo:'depto', zona:'pilar', zonaLabel:'Pilar (Complejo One Pilar)', amb:1, dorms:0, m2:32, precio:'U$D 49.500', expensas:null, estado:'a estrenar', dir:'Los Malvones N° 3700', desc:'monoambiente a estrenar, ideal para invertir o para arrancar solo' },
  { cod:'1395', op:'venta', tipo:'depto', zona:'caballito', zonaLabel:'Caballito', amb:3, dorms:2, m2:72, precio:'U$D 175.000', expensas:'$220.000', estado:'a estrenar', dir:'Eduardo Acevedo N° 100', desc:'a estrenar, muy prolijo y con buena distribución' },
  { cod:'1378', op:'venta', tipo:'casa', zona:'zona_sin_especificar', zonaLabel:'Zona a confirmar', amb:4, dorms:3, m2:368, m2terreno:375, precio:'U$D 209.000', expensas:null, estado:'', dir:'Leandro N. Alem N° 2800', desc:'con jardín y cochera, ideal dos familias' },
  { cod:'1344', op:'venta', tipo:'ph', zona:'caballito', zonaLabel:'Caballito (Parque Centenario)', amb:4, dorms:3, m2:87, precio:'U$D 149.000', expensas:null, estado:'50 años', dir:'Franklin N° 500', desc:'PH apto crédito', aptoCredito:true },
  { cod:'1397', op:'venta', tipo:'ph', zona:'villaurquiza', zonaLabel:'Villa Urquiza / Saavedra', amb:3, dorms:2, m2:93, precio:'U$D 215.000', expensas:null, estado:'30 años', dir:'Plaza N° 3400', desc:'dúplex muy luminoso' },
  { cod:'1376', op:'venta', tipo:'ph', zona:'vicentelopez', zonaLabel:'Vicente López (Florida)', amb:4, dorms:3, m2:188, precio:'U$D 139.000', expensas:null, estado:'50 años', dir:'Esmeralda N° 4500', desc:'casa PH con cochera y jardín, sin expensas' },
  { cod:'1375', op:'venta', tipo:'depto', zona:'monserrat', zonaLabel:'Monserrat', amb:3, dorms:2, m2:64, precio:'U$D 120.000', expensas:'$177.000', estado:'60 años', dir:'Venezuela N° 1100', desc:'impecable, refaccionado' },
  { cod:'1370', op:'venta', tipo:'depto', zona:'saavedra', zonaLabel:'Saavedra', amb:3, dorms:2, m2:75, precio:'U$D 215.000', expensas:'$185.000', estado:'1 año', dir:'Estomba N° 3600', desc:'con cochera' },
  { cod:'1356', op:'venta', tipo:'ph', zona:'zona_sin_especificar', zonaLabel:'Zona a confirmar', amb:4, dorms:4, m2:120, precio:'U$D 128.000', expensas:null, estado:'50 años', dir:'Sgto. Cabral N° 3100', desc:'4 o 5 ambientes con entrada independiente, sin expensas' },
  { cod:'1321', op:'venta', tipo:'local', zona:'nunez', zonaLabel:'Núñez', amb:null, m2:51, precio:'U$D 159.000', expensas:null, estado:'a estrenar', dir:'Núñez N° 2300', desc:'local comercial a estrenar' },
  { cod:'1305', op:'alquiler', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (San Ramiro)', amb:4, dorms:3, m2:174, m2terreno:543, precio:'U$D 1.100/mes', expensas:'$520.000', estado:'', dir:'San Ramiro S/N', desc:'excelente casa en alquiler' },
  { cod:'1245', op:'venta', tipo:'casa', zona:'villarosa', zonaLabel:'Villa Rosa (La Cumbre I)', amb:3, dorms:2, m2:110, m2terreno:326, precio:'U$D 130.000', expensas:null, estado:'', dir:'Pedro Miguel Araoz N° 1300', desc:'' },
  { cod:'1384', op:'venta', tipo:'depto', zona:'lascanitas', zonaLabel:'Las Cañitas', amb:2, dorms:1, m2:32, precio:'U$D 92.000', expensas:'$170.000', estado:'a estrenar', dir:'Av. Gral. Indalecio Chenaut N° 1700', desc:'refaccionado a nuevo' },
  { cod:'1390', op:'venta', tipo:'depto', zona:'nunez', zonaLabel:'Núñez (Lomas de Núñez)', amb:3, dorms:2, m2:64, precio:'U$D 150.000', expensas:'$230.000', estado:'50 años', dir:'O´higgins N° 4500', desc:'con cochera móvil' },
  { cod:'1360', op:'venta', tipo:'depto', zona:'villaurquiza', zonaLabel:'Villa Urquiza', amb:4, dorms:3, m2:113, precio:'U$D 219.900', expensas:null, estado:'40 años', dir:'Monroe N° 4400', desc:'' },
  { cod:'1282', op:'venta', tipo:'depto', zona:'balvanera', zonaLabel:'Balvanera', amb:6, dorms:5, m2:188, precio:'U$D 110.000', expensas:null, estado:'55 años', dir:'Sarmiento N° 2800', desc:'departamento/oficinas' },
  { cod:'1243', op:'venta', tipo:'oficina', zona:'balvanera', zonaLabel:'Balvanera (Once)', amb:null, m2:188, precio:'U$D 110.000', expensas:'$340.000', estado:'55 años', dir:'Sarmiento N° 2800', desc:'excelente ubicación, 3 baños' },
  { cod:'1046', op:'venta', tipo:'depto', zona:'belgrano', zonaLabel:'Belgrano', amb:1, dorms:0, m2:35, precio:'U$D 114.100', expensas:null, estado:'a estrenar', dir:'Aguilar N° 2400', desc:'emprendimiento en pozo' },
  { cod:'1358', op:'venta', tipo:'depto', zona:'belgrano', zonaLabel:'Belgrano (Olazábal y Cabildo)', amb:1, dorms:0, m2:27, precio:'U$D 80.000', expensas:null, estado:'a estrenar', dir:'Av. Olazábal N° 2400', desc:'monoambiente apto profesional' },
  { cod:'1307', op:'venta', tipo:'depto', zona:'nunez', zonaLabel:'Núñez', amb:2, dorms:1, m2:47, precio:'U$D 136.500', expensas:null, estado:'a estrenar', dir:'Núñez N° 2300', desc:'emprendimiento, 1, 2 y 3 ambientes' },
  { cod:'1262', op:'venta', tipo:'casa', zona:'munro', zonaLabel:'Munro', amb:4, dorms:3, m2:248, m2terreno:116, precio:'U$D 118.000', expensas:null, estado:'', dir:'Int. Cnel. Amaro Ávalos N° 3600', desc:'sobre lote propio' },
  { cod:'1261', op:'venta', tipo:'galpon', zona:'munro', zonaLabel:'Munro', amb:null, m2:248, precio:'U$D 118.000', expensas:null, estado:'', dir:'Int. Cnel. Amaro Ávalos N° 3600', desc:'depósito / galpón' },
  { cod:'802', op:'venta', tipo:'terreno', zona:'escobar', zonaLabel:'Escobar (Garín)', amb:null, m2terreno:400, precio:'U$D 28.000', expensas:null, estado:'', dir:'C. 1 S/N', desc:'lote en Barrio Parque Garín' },
  { cod:'1308', op:'venta', tipo:'depto', zona:'nunez', zonaLabel:'Núñez', amb:3, dorms:2, m2:77, precio:'U$D 195.000', expensas:null, estado:'a estrenar', dir:'Núñez N° 2300', desc:'emprendimiento, 1, 2 y 3 ambientes' },
  { cod:'440', op:'alquiler', tipo:'depto', zona:'belgrano', zonaLabel:'Belgrano', amb:2, dorms:1, m2:50, precio:'$1.000.000/mes', expensas:null, estado:'a estrenar', dir:'Av. Monroe N° 2300', desc:'apto profesional' },
  { cod:'1047', op:'venta', tipo:'depto', zona:'palermo', zonaLabel:'Palermo', amb:1, dorms:0, m2:31, precio:'U$D 115.200', expensas:null, estado:'a estrenar', dir:'Av. Santa Fe N° 5000', desc:'emprendimiento en pozo, monoambientes' },
  { cod:'1403', op:'alquiler', tipo:'depto', zona:'vicentelopez', zonaLabel:'Vicente López', amb:3, dorms:2, m2:82, precio:'U$D 1.250/mes', expensas:'$380.000', estado:'5 años', dir:'25 De Mayo N° 48', desc:'con balcón, muy luminoso' },
  { cod:'1400', op:'venta', tipo:'terreno', zona:'escobar', zonaLabel:'Escobar (El Cazal)', amb:null, m2terreno:1022, precio:'U$D 55.000', expensas:'$488.000', estado:'', dir:'Barrio Parque Náutico El Cazal, Lote 00', desc:'lote a la laguna, barrio privado' },
  { cod:'1399', op:'venta', tipo:'terreno', zona:'escobar', zonaLabel:'Escobar (El Cazal)', amb:null, m2terreno:826, precio:'U$D 129.000', expensas:'$488.000', estado:'', dir:'Barrio Náutico El Cazal, Lote 00', desc:'terreno + casa 5 amb con piscina a terminar, barrio privado' },
  { cod:'1398', op:'venta', tipo:'terreno', zona:'escobar', zonaLabel:'Escobar (El Cazal)', amb:null, m2terreno:826, precio:'U$D 129.000', expensas:'$488.000', estado:'', dir:'Barrio Náutico El Cazal S/N', desc:'terreno + casa 5 amb con piscina a terminar, barrio privado (lote hermano del anterior)' },
  { cod:'1372', op:'venta', tipo:'depto', zona:'recoleta', zonaLabel:'Recoleta', amb:1, dorms:0, m2:31, precio:'U$D 111.300', expensas:null, estado:'', dir:'Pueyrredón N° 1900', desc:'en pozo' },
  { cod:'1371', op:'venta', tipo:'cochera', zona:'palermo', zonaLabel:'Palermo (Alma Palermo)', amb:null, m2:12, precio:'U$D 20.000', expensas:null, estado:'', dir:'Medrano N° 1200', desc:'cochera fija, con ascensor' },
  { cod:'1359', op:'venta', tipo:'quinta', zona:'escobar', zonaLabel:'Escobar (Garín)', amb:4, dorms:3, m2:90, precio:'U$D 130.000', expensas:null, estado:'', dir:'Olivetti N° 900', desc:'casa quinta, 2 baños' },
  { cod:'1310', op:'venta', tipo:'depto', zona:'villaballester', zonaLabel:'Villa Ballester', amb:3, dorms:2, m2:46, precio:'U$D 69.000', expensas:null, estado:'28 años', dir:'Alvear N° 1700', desc:'con balcón' },
  { cod:'1306', op:'venta', tipo:'depto', zona:'nunez', zonaLabel:'Núñez', amb:1, dorms:0, m2:28, precio:'U$D 73.000', expensas:null, estado:'a estrenar', dir:'Núñez N° 2300', desc:'emprendimiento, 1, 2 y 3 ambientes' },
  { cod:'1256', op:'venta', tipo:'casa', zona:'sanisidro', zonaLabel:'San Isidro (La Horqueta)', amb:5, dorms:4, m2:590, m2terreno:1000, precio:'U$D 1.250.000', expensas:null, estado:'', dir:'Int. Neyer N° 4000', desc:'impecable, gran parque y piscina' },
  { cod:'1242', op:'alquiler', tipo:'terreno', zona:'villarosa', zonaLabel:'Villa Rosa', amb:null, m2terreno:1350, precio:'U$D 1.400/mes', expensas:null, estado:'', dir:'E. Casella N° 1500', desc:'lote, zonificación CPI' },
  { cod:'1220', op:'venta', tipo:'casa', zona:'zona_sin_especificar', zonaLabel:'Zona a confirmar', amb:4, dorms:3, m2:144, precio:'U$D 168.000', expensas:null, estado:'20 años', dir:'Profesor Manuel García N° 5300', desc:'dúplex con cochera y jardín' },
  { cod:'1011', op:'venta', tipo:'depto', zona:'monserrat', zonaLabel:'Monserrat', amb:1, dorms:0, m2:48, precio:'U$D 85.000', expensas:null, estado:'a estrenar', dir:'Bernardo De Irigoyen N° 1400', desc:'monoambiente al frente' },
  { cod:'939', op:'venta', tipo:'depto', zona:'coghlan', zonaLabel:'Coghlan', amb:1, dorms:0, m2:35, precio:'U$D 80.000', expensas:null, estado:'a estrenar', dir:'Conde N° 2700', desc:'emprendimiento, monoambiente' },
  { cod:'911', op:'venta', tipo:'depto', zona:'palermo', zonaLabel:'Palermo', amb:1, dorms:0, m2:35, precio:'U$D 105.000', expensas:null, estado:'a estrenar', dir:'Medrano N° 1200', desc:'monoambiente' },
  { cod:'882', op:'venta', tipo:'depto', zona:'belgrano', zonaLabel:'Belgrano', amb:2, dorms:1, m2:40, precio:'U$D 122.200', expensas:null, estado:'', dir:'Luis Maria Campos N° 1300', desc:'' },
  { cod:'874', op:'venta', tipo:'depto', zona:'colegiales', zonaLabel:'Colegiales', amb:1, dorms:0, m2:35, precio:'U$D 102.500', expensas:null, estado:'a estrenar', dir:'Moldes N° 800', desc:'monoambiente al frente' },
  { cod:'1389', op:'venta', tipo:'terreno', zona:'pilar', zonaLabel:'Pilar (Santa Sofía)', amb:null, m2terreno:505, precio:'U$D 23.500', expensas:null, estado:'', dir:'Barrio Santa Sofía S/N', desc:'lote interno' },
  { cod:'1386', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (San Ramón)', amb:4, dorms:3, m2:160, m2terreno:577, precio:'U$D 175.000', expensas:'$400.000', estado:'', dir:'Barrio San Ramón S/N', desc:'a estrenar' },
  { cod:'1385', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (San Sebastián)', amb:4, dorms:3, m2:192, m2terreno:852, precio:'U$D 255.000', expensas:'$800.000', estado:'', dir:'Barrio San Sebastián, Área 8 S/N', desc:'con vista al lago' },
  { cod:'1367', op:'alquiler_temp', tipo:'depto', zona:'palermo', zonaLabel:'Palermo', amb:1, dorms:0, m2:34, precio:'U$D 740', expensas:null, estado:'6 años', dir:'Agüero N° 1000', desc:'alquiler temporario' },
  { cod:'1364', op:'alquiler_temp', tipo:'depto', zona:'palermo', zonaLabel:'Palermo', amb:1, dorms:0, m2:34, precio:'U$D 740', expensas:null, estado:'6 años', dir:'Agüero N° 1000', desc:'alquiler temporario, amplio monoambiente muy luminoso' },
  { cod:'1335', op:'venta', tipo:'depto', zona:'pilar', zonaLabel:'Pilar (San Jerónimo)', amb:1, dorms:0, m2:33, precio:'U$D 93.000', expensas:null, estado:'a estrenar', dir:'Barrio San Jerónimo S/N', desc:'monoambiente' },
  { cod:'1334', op:'venta', tipo:'depto', zona:'pilar', zonaLabel:'Pilar (San Jerónimo)', amb:2, dorms:1, m2:59, precio:'U$D 155.000', expensas:null, estado:'a estrenar', dir:'Barrio San Jerónimo S/N', desc:'' },
  { cod:'1333', op:'venta', tipo:'depto', zona:'pilar', zonaLabel:'Pilar (San Jerónimo)', amb:3, dorms:2, m2:69, precio:'U$D 177.000', expensas:null, estado:'a estrenar', dir:'Barrio San Jerónimo S/N', desc:'' },
  { cod:'1224', op:'venta', tipo:'terreno', zona:'pilar', zonaLabel:'Pilar (Los Potrillos)', amb:null, m2terreno:700, precio:'U$D 68.000', expensas:'$500.000', estado:'', dir:'Barrio Los Potrillos S/N', desc:'' },
  { cod:'1209', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (Santa Emilia)', amb:5, dorms:4, m2:189, m2terreno:506, precio:'U$D 180.000', expensas:'$300.000', estado:'', dir:'Barrio Santa Emilia S/N', desc:'a estrenar' },
  { cod:'1195', op:'venta', tipo:'terreno', zona:'escobar', zonaLabel:'Escobar (El Ensueño)', amb:null, m2terreno:600, precio:'U$D 27.500', expensas:null, estado:'', dir:'Barrio El Ensueño S/N', desc:'' },
  { cod:'1182', op:'venta', tipo:'local', zona:'escobar', zonaLabel:'Escobar (Pueblo Caamaño)', amb:null, m2:32, precio:'U$D 56.000', expensas:null, estado:'', dir:'Pueblo Caamaño S/N', desc:'inmejorable ubicación, con renta' },
  { cod:'1147', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (Santa Guadalupe)', amb:4, dorms:3, m2:188, m2terreno:850, precio:'U$D 220.000', expensas:'$400.000', estado:'', dir:'Barrio Santa Guadalupe S/N', desc:'' },
  { cod:'1146', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (San Ramiro)', amb:5, dorms:4, m2:620, precio:'U$D 220.000', expensas:'$400.000', estado:'', dir:'San Ramiro S/N', desc:'a estrenar' },
  { cod:'1145', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (Santa Elena)', amb:4, dorms:3, m2:202, m2terreno:599, precio:'U$D 240.000', expensas:'$500.000', estado:'', dir:'Barrio Santa Elena S/N', desc:'a estrenar' },
  { cod:'1144', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (dirección a confirmar)', amb:4, dorms:3, m2:205, m2terreno:532, precio:'U$D 240.000', expensas:'$500.000', estado:'', dir:'Consultar dirección', desc:'a estrenar, con piscina' },
  { cod:'1142', op:'venta', tipo:'terreno', zona:'pinamar', zonaLabel:'Pinamar (Costa Esmeralda)', amb:null, m2terreno:940, precio:'U$D 62.000', expensas:null, estado:'', dir:'Costa Esmeralda, Barrio Senderos IV', desc:'' },
  { cod:'957', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (Santa Guadalupe)', amb:4, dorms:3, m2:150, precio:'U$D 200.000', expensas:'$350.000', estado:'', dir:'Barrio Santa Guadalupe S/N', desc:'3 baños' },
  { cod:'831', op:'venta', tipo:'terreno', zona:'pilar', zonaLabel:'Pilar (Centro)', amb:null, m2terreno:208, precio:'U$D 150.000', expensas:null, estado:'', dir:'Hipólito Yrigoyen N° 800', desc:'ideal comercial y/o habitacional' },
  { cod:'396', op:'venta', tipo:'casa', zona:'pilar', zonaLabel:'Pilar (Habitat Residencias)', amb:4, dorms:3, m2:140, m2terreno:385, precio:'U$D 260.000', expensas:'$150.000', estado:'', dir:'Habitat Residencias S/N', desc:'' },
  { cod:'1393', op:'venta', tipo:'ph', zona:'saavedra', zonaLabel:'Saavedra (Parque Saavedra)', amb:4, dorms:3, m2:138, precio:'U$D 300.000', expensas:null, estado:'30 años', dir:'Cap. Gral. Ramón Freire N° 3600', desc:'triplex en excelente ubicación' },
];

const TIPO_LABELS = { casa:'Casa', ph:'Casa PH', depto:'Departamento', terreno:'Terreno', local:'Local', oficina:'Oficina', galpon:'Galpón', cochera:'Cochera', quinta:'Quinta' };
const OP_LABELS = { venta:'Venta', alquiler:'Alquiler', alquiler_temp:'Alquiler temporario' };
/** Tipos "residenciales" donde tiene sentido preguntar/filtrar por ambientes. */
const TIPOS_RESIDENCIALES = new Set(['casa','ph','depto','quinta']);
/** Zonas destacadas para los chips rápidos (detectarZona reconoce TODAS las demás igual). */
const ZONA_CHIPS = ['caballito','belgrano','palermo','pilar','vicentelopez','villaurquiza','nunez'];
const ZONA_LABEL_CORTO = { caballito:'Caballito', belgrano:'Belgrano', palermo:'Palermo', pilar:'Pilar', vicentelopez:'Vicente López', villaurquiza:'Villa Urquiza', nunez:'Núñez' };
