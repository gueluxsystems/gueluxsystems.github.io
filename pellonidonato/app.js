const chat=document.getElementById('chat'), typing=document.getElementById('typing'), inp=document.getElementById('inp'), quick=document.getElementById('quick');
const ASESOR_NOMBRE = 'Fede, de nuestro equipo comercial';

let MODE='comercial'; // 'comercial' | 'auto'
function setMode(m){
  MODE=m;
  document.getElementById('modeA').classList.toggle('active', m==='comercial');
  document.getElementById('modeB').classList.toggle('active', m==='auto');
  document.getElementById('modedesc').textContent = m==='comercial'
    ? 'El agente toma los datos y te pasa el contacto para que un asesor cierre el horario de la visita.'
    : 'El agente mismo coordina y confirma el horario de la visita, sin pasar por un asesor.';
  reset(); chat.innerHTML=''; quick.innerHTML='';
  arrancar();
}

let S, followupTimer;
function reset(){
  S={ op:null, tipo:null, tipoSkip:false, zona:null, zonaSkip:false, amb:null, ambSkip:false,
      presupuesto:null, pago:null, pagoSkip:false,
      paso:'inicio', mostrado:null, mostrados:[], nombre:null,
      esperandoNombre:false, esperandoHorario:false, fichaMostrada:false };
  clearTimeout(followupTimer);
}
reset();

function hora(){ const d=new Date(); return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'); }
function burbuja(txt,cls){ const b=document.createElement('div'); b.className='bubble '+cls; b.innerHTML=txt+'<span class="t">'+hora()+(cls==='out'?' ✓✓':'')+'</span>'; chat.appendChild(b); chat.scrollTop=chat.scrollHeight; }
function sysNote(txt){ const b=document.createElement('div'); b.className='sys'; b.textContent=txt; chat.appendChild(b); chat.scrollTop=chat.scrollHeight; }
function bot(txt,delay=820){ typing.style.display='block'; chat.scrollTop=chat.scrollHeight; return new Promise(r=>setTimeout(()=>{ typing.style.display='none'; burbuja(txt,'in'); r(); }, delay)); }
function setQuick(arr){ quick.innerHTML=''; arr.forEach(t=>{ const b=document.createElement('button'); b.textContent=t; b.onclick=()=>{inp.value=t;enviar();}; quick.appendChild(b); }); }
const QUICK_INICIO = ['Busco para alquilar','Busco para comprar','Requisitos para alquilar'];

function zonaLabel(zKey){ const found = PROPIEDADES.find(d=>d.zona===zKey); if(found) return found.zonaLabel.split(' (')[0]; return ZONA_LABEL_CORTO[zKey] || (zKey ? zKey.charAt(0).toUpperCase()+zKey.slice(1) : 'esa zona'); }

/* ── Detección de intención (todo mapea a datos reales, nunca se inventa) ── */
function detectarOp(t){
  if(/temporari/.test(t)) return 'alquiler_temp';
  if(/alquil|renta/.test(t)) return 'alquiler';
  if(/vend|venta|comprar|compra|invertir/.test(t)) return 'venta';
  return null;
}
function detectarTipo(t){
  if(/\bph\b/.test(t)) return 'ph';
  if(/terreno|lote\b/.test(t)) return 'terreno';
  if(/oficina/.test(t)) return 'oficina';
  if(/local comercial|\blocal\b/.test(t)) return 'local';
  if(/galp[oó]n|dep[oó]sito/.test(t)) return 'galpon';
  if(/cochera|garage/.test(t)) return 'cochera';
  if(/quinta/.test(t)) return 'quinta';
  if(/casa\b/.test(t)) return 'casa';
  if(/depto|departamento|monoambiente/.test(t)) return 'depto';
  return null;
}
/** Saca acentos con un mapa explícito de caracteres (sin regex de rango unicode,
    para evitar problemas de codificación con combining marks). */
function sinAcentos(s){
  const map = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ñ':'n','Á':'a','É':'e','Í':'i','Ó':'o','Ú':'u','Ñ':'n'};
  let out = '';
  for(const ch of s){ out += map[ch] || ch; }
  return out;
}
function detectarZona(t){
  const tn = sinAcentos(t.toLowerCase());
  // Primero las zonas "chip" y luego TODAS las de la cartera (barrios/partidos reales).
  const todas = Array.from(new Set(PROPIEDADES.map(d=>d.zona))).filter(z=>z!=='zona_sin_especificar');
  for(const z of todas){
    const needle = sinAcentos((ZONA_LABEL_CORTO[z] || z).toLowerCase());
    if(tn.includes(needle) || tn.includes(z.replace(/_/g,' '))) return z;
  }
  // alias de sub-barrios mencionados en descripciones
  const subalias = { 'las canitas':'lascanitas', 'san isidro':'sanisidro', 'villa ballester':'villaballester', 'villa rosa':'villarosa', 'san ramiro':'pilar', 'san ramon':'pilar', 'santa elena':'pilar', 'santa guadalupe':'pilar', 'san sebastian':'pilar', 'san jeronimo':'pilar', 'los potrillos':'pilar', 'el cazal':'escobar', 'el ensueno':'escobar', 'garin':'escobar', 'pueblo caamano':'escobar' };
  for(const k in subalias){ if(tn.includes(k)) return subalias[k]; }
  return null;
}
function detectarAmb(t){
  if(/mono\s?ambiente/.test(t)) return 1;
  const m = t.match(/(\d)\s*amb/);
  if(m) return parseInt(m[1]);
  return null;
}
function detectarPresupuesto(t){
  const m = t.match(/(u\$d|usd|\$)?\s*([\d.,]{3,})\s*(mil|k)?/i);
  if(!m) return null;
  const raw = m[0].trim();
  if(raw.replace(/\D/g,'').length < 3) return null; // evita falsos positivos tipo "3 amb"
  return raw;
}
function detectarPago(t){
  if(/cr[eé]dito|hipotecario/.test(t)) return 'crédito hipotecario';
  if(/contado|efectivo/.test(t)) return 'contado';
  return null;
}

function poolBase(){ return PROPIEDADES.filter(d => !S.op || d.op===S.op); }
function match(){
  let pool = poolBase();
  if(S.tipo){ const x = pool.filter(d=>d.tipo===S.tipo); if(x.length) pool=x; }
  if(S.zona){ const z = pool.filter(d => d.zona===S.zona); if(z.length) pool=z; }
  if(S.amb && TIPOS_RESIDENCIALES.has(S.tipo||pool[0]?.tipo)){ const a = pool.filter(d => d.amb===S.amb); if(a.length) pool=a; }
  pool = pool.filter(d => !S.mostrados.includes(d.id||d.cod));
  return pool[0] || null;
}

function descTipo(d){
  if(d.tipo==='depto') return d.amb===1?'monoambiente':d.amb+' ambientes';
  if(d.tipo==='casa') return 'casa de '+(d.amb||'varios')+' ambientes';
  if(d.tipo==='ph') return 'PH de '+(d.amb||'varios')+' ambientes';
  if(d.tipo==='quinta') return 'quinta de '+(d.amb||'varios')+' ambientes';
  return TIPO_LABELS[d.tipo]||d.tipo;
}
const TIPOS_FEMENINOS = new Set(['casa','quinta','oficina','cochera']);
function articulo(tipo){ return TIPOS_FEMENINOS.has(tipo) ? 'una' : 'un'; }

function presentar(d){
  S.mostrado = d; S.mostrados.push(d.cod);
  const partes = [];
  if(d.expensas) partes.push(`${d.precio} + ${d.expensas} de expensas`);
  else partes.push(d.precio);
  const supTxt = d.m2 ? `${d.m2} m²` + (d.m2terreno?` (${d.m2terreno} m² de terreno)`:'') : (d.m2terreno?`${d.m2terreno} m² de terreno`:'');
  let caveat = '';
  if(S.tipo && d.tipo!==S.tipo) caveat = `De ${TIPO_LABELS[S.tipo]} no tengo ahora en esa búsqueda, pero tengo esto que te puede interesar: `;
  else if(S.zona && d.zona!==S.zona) caveat = `En ${zonaLabel(S.zona)} no tengo nada disponible ahora mismo, pero en ${d.zonaLabel} sí tengo algo: `;
  else if(S.amb && TIPOS_RESIDENCIALES.has(d.tipo) && d.amb!==S.amb) caveat = `De ${S.amb===1?'monoambiente':S.amb+' ambientes'} no tengo ahora en ${d.zonaLabel}, pero tengo esto que está muy bueno: `;
  else caveat = `Mirá, tengo justo ${TIPOS_RESIDENCIALES.has(d.tipo)?articulo(d.tipo)+' '+descTipo(d):'esto'} en ${d.zonaLabel} que te puede interesar: `;
  const aptoC = d.aptoCredito ? ' (apto crédito hipotecario)' : '';
  return `${caveat}${d.desc||TIPO_LABELS[d.tipo]}. ${supTxt}${supTxt?', sobre':'Sobre'} ${d.dir}${d.estado?' ('+d.estado+')':''}.\n\n${partes[0]}${aptoC}.`;
}

/** Ficha visible para Jeremias: muestra en el chat los datos que se van juntando
    para su base — el pedido explícito de "sacar toda la info necesaria". */
function fichaResumen(){
  const campos = [];
  if(S.op) campos.push(OP_LABELS[S.op]);
  if(S.tipo) campos.push(TIPO_LABELS[S.tipo]);
  if(S.zona) campos.push(zonaLabel(S.zona));
  if(S.amb) campos.push((S.amb===1?'Monoambiente':S.amb+' ambientes'));
  if(S.presupuesto) campos.push('Presupuesto: '+S.presupuesto);
  if(S.pago) campos.push(S.pago.charAt(0).toUpperCase()+S.pago.slice(1));
  return '📋 Ficha para la base de datos\n'+campos.join(' · ');
}

function armarSeguimiento(){
  clearTimeout(followupTimer);
  if(S.paso==='cierre_ok') return;
  followupTimer = setTimeout(async ()=>{
    sysNote('5 min después (simulado)');
    const alt = poolBase().filter(d => !S.mostrados.includes(d.cod))[0];
    if(S.mostrado){
      if(alt){
        await bot(`¡Hola de nuevo! Te quería contar que además de lo de ${S.mostrado.zonaLabel.split(' (')[0]} tengo otra opción que capaz te cierra mejor: ${TIPOS_RESIDENCIALES.has(alt.tipo)?descTipo(alt):TIPO_LABELS[alt.tipo].toLowerCase()} en ${alt.zonaLabel.split(' (')[0]}, ${alt.precio}. ¿Te paso los detalles o seguís pensando lo anterior?`);
        setQuick(['Contame esa otra','Sigo pensando lo anterior','Coordinemos una visita']);
      } else {
        await bot(`¡Hola! Te escribo por si seguís con intenciones de avanzar con lo de ${S.mostrado.zonaLabel.split(' (')[0]}. Si querés coordinamos una visita, o si preferís te cuento otra opción.`);
        setQuick(['Coordinemos una visita','Ver otras opciones']);
      }
    }
  }, 6000);
}

async function responder(m){
  const t=m.toLowerCase().trim();
  clearTimeout(followupTimer);

  if(/(empezar de nuevo|reiniciar|de cero)/.test(t)){ reset(); await bot('¡Dale, arrancamos de nuevo! ¿Buscás algo para alquilar o para comprar?'); setQuick(QUICK_INICIO); return; }

  if(S.esperandoNombre){
    S.nombre = m.trim(); S.esperandoNombre=false; S.esperandoHorario=true;
    await bot(`Gracias, ${S.nombre}. ¿Qué día y horario te queda cómodo para la visita?`);
    setQuick(['Esta semana por la tarde','El sábado a la mañana','Mañana temprano']);
    return;
  }
  if(S.esperandoHorario){
    S.esperandoHorario=false; S.paso='cierre_ok';
    if(MODE==='comercial'){
      await bot(`Perfecto, ${S.nombre}. Le paso tus datos y el horario (${m.trim()}) a ${ASESOR_NOMBRE}, así te confirma la visita a ${S.mostrado?S.mostrado.dir:'la propiedad'} y queda cerrado directo con él. En breve te escribe.`);
      sysNote('→ conversación derivada a comercial (handoff)');
    } else {
      await bot(`¡Listo, ${S.nombre}! Quedás agendado para ${m.trim()} en ${S.mostrado?S.mostrado.dir:'la propiedad'}. Te mando la ubicación exacta más cerca de la fecha. ¡Te esperamos!`);
      sysNote('→ visita agendada automáticamente');
    }
    setQuick(['Gracias','Ver otra opción']);
    return;
  }

  const op=detectarOp(t), tipo=detectarTipo(t), zona=detectarZona(t), amb=detectarAmb(t), presu=detectarPresupuesto(t), pago=detectarPago(t);
  const preguntaPrecio=/(precio|cu[aá]nto|sale|vale|cuesta|valor)/.test(t);
  const quiereVisita=/(visita|coordin|verla|conocerla|agendar|ir a ver|me interesa|quiero verlo)/.test(t);
  const pensando=/(lo voy a pensar|lo pienso|despu[eé]s te aviso|te aviso|dale gracias|despues veo)/.test(t);
  const noSabe=/(prefiero no decir|no quiero decir|^paso$|no\s*(lo\s*)?(s[eé]|tengo|tenes|tenés)\b|ni\s*idea|la verdad que no|cualquier\w*|lo que (haya|sea|tengas|tengan)|no tengo preferencia|me da igual|no estoy segur[oa])/.test(t);

  if(op) S.op=op; if(tipo) S.tipo=tipo; if(zona) S.zona=zona; if(amb) S.amb=amb;
  if(presu && !S.presupuesto) S.presupuesto=presu;
  if(pago) S.pago=pago;

  // Si contesta "no sé / no tengo / cualquiera" a la pregunta que está pendiente,
  // se saltea ESE dato puntual en vez de repetir la misma pregunta en loop
  // (el resto de los filtros ya cargados se sigue respetando).
  if(noSabe && !S.mostrado){
    if(S.op && !S.tipo && !S.tipoSkip) S.tipoSkip=true;
    else if(S.op && !S.zona && !S.zonaSkip) S.zonaSkip=true;
    else if(S.op && TIPOS_RESIDENCIALES.has(S.tipo) && !S.amb && !S.ambSkip) S.ambSkip=true;
    else if(S.op && !S.presupuesto) S.presupuesto='prefiere no decir';
    else if(S.op==='venta' && !S.pago && !S.pagoSkip) S.pagoSkip=true;
  }

  if(quiereVisita && S.mostrado){
    if(!S.fichaMostrada){ sysNote(fichaResumen()); S.fichaMostrada=true; }
    S.esperandoNombre=true;
    await bot('¡Buenísimo! Para coordinar, ¿me pasás tu nombre?');
    return;
  }

  if(/(requisit|qu[eé] piden|qu[eé] necesito|garant[ií]a|papeles|documenta)/.test(t)){
    await bot(S.op==='venta' ? 'Para la compra trabajamos con boleto y escritura en escribanía, y si es con crédito hipotecario te podemos orientar con el banco. ¿Seguimos viendo opciones?' : 'Para alquilar pedimos garantía propietaria o seguro de caución, recibo de sueldo (3 veces el valor del alquiler aprox.) o monotributo equivalente, y DNI. ¿Coordinamos una visita a la que vimos o seguimos buscando?');
    setQuick(S.mostrado ? ['Coordinemos una visita','Ver otra opción'] : QUICK_INICIO);
    return;
  }

  if(preguntaPrecio && S.mostrado){
    const precioLinea = S.mostrado.expensas ? `${S.mostrado.precio} + ${S.mostrado.expensas} de expensas` : S.mostrado.precio;
    await bot(`${precioLinea}. ¿Coordinamos una visita para que la conozcas, o preferís ver otra opción?`);
    setQuick(['Sí, coordinar visita','Ver otra opción']);
    armarSeguimiento();
    return;
  }

  if(pensando && S.mostrado){
    await bot('¡Dale, sin apuro! Cualquier cosa quedo por acá.');
    armarSeguimiento();
    return;
  }

  if(/(otra opci|otras opci|ver otr|no me convence|algo distinto|otra zona|ver otra)/.test(t)){
    const d = match();
    if(d){ await bot(presentar(d)); setQuick(['Me interesa, coordinemos','Precio y expensas','Ver otra opción']); armarSeguimiento(); }
    else { await bot(`Por ahora no tengo más opciones que las que ya te conté para esa búsqueda, pero puedo avisarte apenas entre algo nuevo a la cartera. ¿Querés que te avise, o probamos otra zona/tipo?`); setQuick(['Avisame cuando entre algo','Probar otra zona']); }
    return;
  }

  // Secuencia de calificación (como la haría un buen asesor, no un formulario rígido)
  if(!S.op){ await bot('¿Lo estás buscando para alquilar o para comprar?'); setQuick(['Para alquilar','Para comprar','Alquiler temporario']); return; }
  if(!S.mostrado && !S.tipo && !S.tipoSkip){ await bot('¿Qué tipo de propiedad buscás: casa, departamento, PH, terreno, u otra?'); setQuick(['Departamento','Casa','Casa PH','Terreno','No tengo preferencia']); return; }
  if(!S.mostrado && !S.zona && !S.zonaSkip){ await bot(`¿En qué zona te interesa? Tengo disponibilidad en ${ZONA_CHIPS.map(z=>ZONA_LABEL_CORTO[z]).join(', ')}, entre otras.`); setQuick([...ZONA_CHIPS.map(z=>ZONA_LABEL_CORTO[z]), 'Cualquier zona']); return; }
  if(!S.mostrado && TIPOS_RESIDENCIALES.has(S.tipo) && !S.amb && !S.ambSkip){ await bot('¿De cuántos ambientes lo buscás?'); setQuick(['Monoambiente','2 ambientes','3 ambientes','No tengo preferencia']); return; }
  if(!S.mostrado && !S.presupuesto){ await bot('¿Tenés un presupuesto aproximado en mente? Así te muestro algo que calce bien.'); setQuick(['Prefiero no decir']); return; }
  if(!S.mostrado && S.op==='venta' && !S.pago && !S.pagoSkip){ await bot('¿Lo pensás pagar de contado o con crédito hipotecario?'); setQuick(['Contado','Crédito hipotecario','Prefiero no decir']); return; }

  if(!S.mostrado){
    const d = match();
    if(d){ await bot(presentar(d)); setQuick(['Me interesa, coordinemos','Precio y expensas','Ver otra opción']); armarSeguimiento(); return; }
    await bot(`Justo para esa búsqueda no tengo disponible ahora mismo, pero dejame tu contacto y te aviso apenas entre algo, o si preferís te muestro lo más parecido que tengo en otra zona o tipo.`);
    setQuick(['Mostrame otra opción','Dejo mi contacto']);
    return;
  }

  if(/^(hola|buenas|buen d[ií]a|buenas tardes|buenas noches|hey|qu[eé] tal|holis|hi)\b/.test(t)){
    await bot('¡Hola! ¿Estás buscando algo para alquilar o para comprar?');
    setQuick(QUICK_INICIO);
    return;
  }

  await bot('Dejame confirmarlo bien con el equipo así no te digo cualquier cosa, y te aviso apenas lo tenga. Mientras tanto, ¿seguimos viendo opciones o coordinamos una visita a lo que ya vimos?');
  setQuick(S.mostrado ? ['Coordinemos una visita','Ver otra opción'] : QUICK_INICIO);
}

async function enviar(){ const m=inp.value.trim(); if(!m) return; burbuja(m,'out'); inp.value=''; await responder(m); }
inp.addEventListener('keydown',e=>{ if(e.key==='Enter') enviar(); });
function arrancar(){ bot('¡Hola! Soy quien atiende las consultas de Pelloni Donato. ¿Estás buscando algo para alquilar o para comprar?', 400).then(()=>setQuick(QUICK_INICIO)); }
arrancar();
