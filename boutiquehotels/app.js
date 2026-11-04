const chat=document.getElementById('chat'), typing=document.getElementById('typing'), inp=document.getElementById('inp'), quick=document.getElementById('quick');

let MODE='comercial'; // 'comercial' | 'auto' — acá siempre comercial (concierge, no auto-reserva)

let S;
function reset(){
  S={ region:null, hotelMostrado:null, mostrados:[], nombre:null, esperandoNombre:false, fichaMostrada:false };
}
reset();

function hora(){ const d=new Date(); return d.getHours().toString().padStart(2,'0')+':'+d.getMinutes().toString().padStart(2,'0'); }
function burbuja(txt,cls){ const b=document.createElement('div'); b.className='bubble '+cls; b.innerHTML=txt+'<span class="t">'+hora()+(cls==='out'?' ✓✓':'')+'</span>'; chat.appendChild(b); chat.scrollTop=chat.scrollHeight; }
function sysNote(txt){ const b=document.createElement('div'); b.className='sys'; b.textContent=txt; chat.appendChild(b); chat.scrollTop=chat.scrollHeight; }
function bot(txt,delay=820){ typing.style.display='block'; chat.scrollTop=chat.scrollHeight; return new Promise(r=>setTimeout(()=>{ typing.style.display='none'; burbuja(txt,'in'); r(); }, delay)); }
function setQuick(arr){ quick.innerHTML=''; arr.forEach(t=>{ const b=document.createElement('button'); b.textContent=t; b.onclick=()=>{inp.value=t;enviar();}; quick.appendChild(b); }); }
const QUICK_INICIO = ['Norte (Salta/Jujuy)', 'Patagonia', 'Cuyo (Mendoza)', 'Buenos Aires', 'No sé, sorprendeme'];

function sinAcentos(s){
  const map = {'á':'a','é':'e','í':'i','ó':'o','ú':'u','ñ':'n','Á':'a','É':'e','Í':'i','Ó':'o','Ú':'u','Ñ':'n'};
  let out = '';
  for(const ch of s){ out += map[ch] || ch; }
  return out;
}

function detectarRegion(t){
  const tn = sinAcentos(t.toLowerCase());
  for(const region in REGION_ALIAS){
    for(const alias of REGION_ALIAS[region]){
      if(tn.includes(sinAcentos(alias))) return region;
    }
  }
  return null;
}

function esSaludo(t){
  return /^(hola+|holis+|ey+|hey+|qu[eé] tal)[\s!.,¡]*$/.test(t)
      || /^buen(?:[oa]s?)?(\s*(d[ií]as?|tardes|noches))?[\s!.,¡]*$/.test(t);
}

function matchHotel(region){
  let pool = HOTELES.filter(h => !S.mostrados.includes(h.slug));
  if(region){ const r = pool.filter(h => h.region === region); if(r.length) pool = r; }
  return pool[0] || null;
}

function presentarHotel(h){
  S.hotelMostrado = h;
  S.mostrados.push(h.slug);
  const precioTxt = h.precio ? ` ${h.precio}.` : '';
  return `Te va a copar <b>${h.nombre}</b>, en ${h.ciudad}.${precioTxt} ¿Querés que coordine con el equipo para ver disponibilidad?`;
}

async function responder(m){
  const t=m.toLowerCase().trim();

  if(/(empezar de nuevo|reiniciar|de cero)/.test(t)){ reset(); await bot('¡Dale, arrancamos de nuevo! ¿Qué tipo de experiencia buscás?'); setQuick(QUICK_INICIO); return; }

  if(S.esperandoNombre){
    S.nombre = m.trim(); S.esperandoNombre=false;
    await bot(`Gracias, ${S.nombre}. Le paso tus datos al equipo de Boutique Hotels Argentina y te confirman disponibilidad y tarifa para ${S.hotelMostrado?S.hotelMostrado.nombre:'la propiedad'} por este mismo medio. En breve te escriben.`);
    sysNote('→ conversación derivada al equipo (handoff)');
    setQuick(['Gracias','Contame de otro destino']);
    return;
  }

  if(esSaludo(t)){
    if(!S.hotelMostrado){ await bot('¡Hola! ¿Qué tipo de experiencia buscás — norte, Cuyo, Patagonia, Buenos Aires...?'); setQuick(QUICK_INICIO); return; }
    await bot('¡Hola! ¿Seguimos con esta opción o te cuento de otro destino?'); setQuick(['Coordinemos', 'Otro destino']); return;
  }

  if(/^(gracias|muchas gracias|mil gracias|ok gracias)\b/.test(t)){
    await bot('¡De nada! Cualquier cosa quedo por acá. 🙌');
    setQuick(S.hotelMostrado?['Coordinemos','Otro destino']:QUICK_INICIO);
    return;
  }

  if(/(sos (un |una )?(bot|robot|m[aá]quina|persona|humano|real|programa|ia)|es(to)? (un |una )?(bot|robot|autom[aá]tic)|qui[eé]n sos|hablo con)/.test(t)){
    await bot('Soy el asistente de Boutique Hotels Argentina: atiendo las consultas al instante para que no tengas que esperar. Si querés hablar con una persona del equipo, te derivo sin problema. ¿En qué te puedo ayudar?');
    setQuick(S.hotelMostrado?['Coordinemos','Otro destino']:QUICK_INICIO);
    return;
  }

  if(/(precio|cu[aá]nto sale|tarifa|cuesta|disponibilidad|hay lugar)/.test(t) && S.hotelMostrado){
    await bot(`Eso lo confirma el equipo según la fecha exacta que tengas en mente — no tiramos tarifa sin confirmar disponibilidad real. ¿Te paso con ellos?`);
    setQuick(['Sí, coordinemos','Otro destino']);
    return;
  }

  if(/(coordin|me interesa|quiero reservar|reservar|contactarme)/.test(t) && S.hotelMostrado){
    if(!S.fichaMostrada){ sysNote(`📋 Interés: ${S.hotelMostrado.nombre} (${S.hotelMostrado.ciudad})`); S.fichaMostrada=true; }
    S.esperandoNombre=true;
    await bot('¡Buenísimo! ¿Me pasás tu nombre para avisarle al equipo?');
    return;
  }

  if(/(otro destino|otra opcion|otra opción|mas opciones|más opciones|que mas tenes|qu[eé] m[aá]s ten[eé]s|sorprend)/.test(t)){
    const h = matchHotel(null);
    if(h){ await bot(presentarHotel(h)); setQuick(['Coordinemos','Otro destino']); }
    else { await bot(`Ya te mostré los ${HOTELES.length} que tengo cargados de tu catálogo público hoy. Conectado al sistema real, se carga el resto.`); setQuick(['Coordinemos']); }
    return;
  }

  const region = detectarRegion(t);
  if(region){
    const h = matchHotel(region);
    if(h){ await bot(presentarHotel(h)); setQuick(['Coordinemos','Otro destino']); return; }
  }

  await bot('No tengo nada que te calce con eso en lo que tengo cargado, pero puedo avisarte apenas sume algo. ¿Probamos otra región?');
  setQuick(QUICK_INICIO);
}

async function enviar(){ const m=inp.value.trim(); if(!m) return; burbuja(m,'out'); inp.value=''; await responder(m); }
inp.addEventListener('keydown',e=>{ if(e.key==='Enter') enviar(); });
function arrancar(){ bot('¡Hola! Soy quien atiende las consultas de Boutique Hotels Argentina. ¿Qué tipo de experiencia buscás — norte, Cuyo, Patagonia, Buenos Aires...?', 400).then(()=>setQuick(QUICK_INICIO)); }
arrancar();
