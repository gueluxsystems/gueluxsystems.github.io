// Datos REALES relevados de boutiquehotelsargentina.com/en/search (catálogo completo
// de búsqueda, no la home — ahí solo se veían 4). 65 propiedades confirmadas en el
// sitio al momento de relevar (se excluyeron ~6 tarjetas de "Experiencias y
// Promociones" por ser duplicados promocionales de hoteles ya listados, no
// propiedades nuevas). El sitio declara "100+" en su copy institucional — esta
// demo muestra lo que está público hoy; conectado al sistema real, se actualiza solo.
const HOTELES = [
  { slug:'azur-real', nombre:'Azur Real', ciudad:'Córdoba', region:'cuyo', precio:'Desde USD 299' },
  { slug:'casa-bora', nombre:'Casa Bora', ciudad:'San Antonio de Areco, Buenos Aires', region:'buenosaires', precio:'Desde ARS 250.000' },
  { slug:'posada-paso-de-los-patos', nombre:'Posada Paso de Los Patos', ciudad:'Barreal, San Juan', region:'cuyo', precio:'Desde ARS 250.000' },
  { slug:'posada-puerto-bemberg', nombre:'Posada Puerto Bemberg', ciudad:'Iguazú, Misiones', region:'litoral', precio:'Desde USD 115' },
  { slug:'casa-septem', nombre:'Casa Septem', ciudad:'Tupungato, Valle de Uco', region:'cuyo', precio:'Desde USD 374' },
  { slug:'hotel-legado-mitico-salta', nombre:'Hotel Legado Mítico Salta', ciudad:'Salta', region:'norte', precio:'Desde USD 250' },
  { slug:'manantial-del-silencio', nombre:'Manantial del Silencio', ciudad:'Purmamarca, Jujuy', region:'norte', precio:'' },
  { slug:'correntoso-lake-river-hotel', nombre:'Correntoso Lake & River Hotel', ciudad:'Villa La Angostura, Neuquén', region:'patagonia', precio:'Desde USD 382' },
  { slug:'house-of-jasmines', nombre:'House of Jasmines', ciudad:'La Merced, Salta', region:'norte', precio:'Desde USD 370' },
  { slug:'hotel-las-marias', nombre:'Hotel Las Marías', ciudad:'Tilcara, Jujuy', region:'norte', precio:'Desde USD 203' },
  { slug:'grace-cafayate', nombre:'Grace Cafayate', ciudad:'Cafayate, Salta', region:'norte', precio:'' },
  { slug:'atamisque', nombre:'Atamisque Wine Lodge', ciudad:'Valle de Uco', region:'cuyo', precio:'Desde USD 187' },
  { slug:'la-caballeriza', nombre:'La Caballeriza', ciudad:'San Rafael, Mendoza', region:'cuyo', precio:'' },
  { slug:'piatelli-wine-resort', nombre:'Piatelli Wine Resort', ciudad:'Cafayate, Salta', region:'norte', precio:'Desde USD 258' },
  { slug:'el-casco-art-hotel', nombre:'El Casco Art Hotel', ciudad:'Bariloche', region:'patagonia', precio:'' },
  { slug:'galileo-base-catedral', nombre:'Galileo Base Cerro Catedral', ciudad:'Base Catedral, Bariloche', region:'patagonia', precio:'Desde USD 260' },
  { slug:'estancia-villa-maria', nombre:'Estancia Villa María', ciudad:'Ezeiza, Buenos Aires', region:'buenosaires', precio:'Desde ARS 360.000' },
  { slug:'casa-de-uco', nombre:'Casa de Uco', ciudad:'Tunuyán, Mendoza', region:'cuyo', precio:'Desde USD 470' },
  { slug:'club-tapiz', nombre:'Club Tapiz', ciudad:'Maipú, Mendoza', region:'cuyo', precio:'Desde USD 150' },
  { slug:'los-cauquenes-resort-spa', nombre:'Los Cauquenes Resort & Spa', ciudad:'Ushuaia', region:'patagonia', precio:'Desde USD 293' },
  { slug:'el-transito', nombre:'El Tránsito', ciudad:'Esteros del Iberá, Corrientes', region:'litoral', precio:'' },
  { slug:'estancia-colome', nombre:'Estancia Colomé', ciudad:'Molinos, Salta', region:'norte', precio:'' },
  { slug:'rincon-del-socorro', nombre:'Rincón del Socorro', ciudad:'Esteros del Iberá, Corrientes', region:'litoral', precio:'Desde USD 400' },
  { slug:'urban-suites', nombre:'Urban Suites', ciudad:'Recoleta, Buenos Aires', region:'buenosaires', precio:'Desde USD 199' },
  { slug:'hotel-mio', nombre:'Hotel Mio', ciudad:'Recoleta, Buenos Aires', region:'buenosaires', precio:'Desde USD 212' },
  { slug:'estancia-el-colibri', nombre:'Estancia El Colibrí', ciudad:'Santa Catalina, Córdoba', region:'cuyo', precio:'Desde USD 720' },
  { slug:'kkala', nombre:'Kkala', ciudad:'Tres Cerritos, Salta', region:'norte', precio:'Desde USD 175' },
  { slug:'estancia-ibera', nombre:'Estancia Iberá', ciudad:'Colonia Carlos Pellegrini, Corrientes', region:'litoral', precio:'Desde USD 250' },
  { slug:'posada-la-matilde', nombre:'Posada La Matilde', ciudad:'San Javier, Traslasierra, Córdoba', region:'cuyo', precio:'Desde ARS 318.000' },
  { slug:'chanarmuyo-bodega-casa-de-huespedes', nombre:'Chañarmuyo Bodega & Casa de Huéspedes', ciudad:'Chañarmuyo, La Rioja', region:'cuyo', precio:'' },
  { slug:'estancia-las-carreras', nombre:'Estancia Las Carreras', ciudad:'Tafí del Valle, Tucumán', region:'norte', precio:'' },
  { slug:'villa-vicuna-salta', nombre:'Villa Vicuña Salta', ciudad:'Salta Ciudad', region:'norte', precio:'Desde USD 178' },
  { slug:'la-merced-del-alto', nombre:'La Merced del Alto', ciudad:'Cachi, Salta', region:'norte', precio:'Desde ARS 252.000' },
  { slug:'algodon-wine-estates', nombre:'Algodon Wine Estates', ciudad:'San Rafael, Mendoza', region:'cuyo', precio:'Desde USD 160' },
  { slug:'hotel-del-casco', nombre:'Hotel Del Casco', ciudad:'San Isidro, Buenos Aires', region:'buenosaires', precio:'Desde USD 185' },
  { slug:'challhuaquen-lodge', nombre:'Challhuaquen Lodge', ciudad:'Trevelin, PN Los Alerces', region:'patagonia', precio:'Desde USD 250' },
  { slug:'posada-el-olivo', nombre:'Posada El Olivo', ciudad:'Nonogasta, La Rioja', region:'cuyo', precio:'' },
  { slug:'lares-de-chacras', nombre:'Lares de Chacras', ciudad:'Chacras de Coria, Mendoza', region:'cuyo', precio:'' },
  { slug:'alpasion-wine-lodge', nombre:'Alpasión Wine & Lodge', ciudad:'Tunuyán, Valle de Uco', region:'cuyo', precio:'Desde USD 350' },
  { slug:'apart-amonite', nombre:'Apart Amonite', ciudad:'San Martín de los Andes, Patagonia', region:'patagonia', precio:'Desde ARS 270.000' },
  { slug:'hotel-iruya', nombre:'Hotel Iruya', ciudad:'Iruya, Salta', region:'norte', precio:'Desde ARS 210.000' },
  { slug:'house-by-casa-septem', nombre:'House by Casa Septem', ciudad:'Tupungato, Valle de Uco', region:'cuyo', precio:'Desde USD 2.500' },
  { slug:'casa-toledo', nombre:'Casa Toledo', ciudad:'La Cumbre, Córdoba', region:'cuyo', precio:'Desde USD 150' },
  { slug:'estancia-la-paz', nombre:'Estancia La Paz', ciudad:'Ascochinga, Córdoba', region:'cuyo', precio:'Desde ARS 460.000' },
  { slug:'pristine-salinas', nombre:'Pristine Salinas', ciudad:'Salinas, Jujuy', region:'norte', precio:'Desde USD 669' },
  { slug:'duque-hotel', nombre:'Duque Hotel', ciudad:'Palermo Soho, Buenos Aires', region:'buenosaires', precio:'Desde USD 188' },
  { slug:'art-hotel-a-hotel', nombre:'Art Hotel (A Hotel)', ciudad:'Recoleta, Buenos Aires', region:'buenosaires', precio:'Desde USD 60' },
  { slug:'estancia-la-bandada', nombre:'Estancia La Bandada', ciudad:'San Miguel del Monte, Buenos Aires', region:'buenosaires', precio:'Desde USD 314' },
  { slug:'hotel-villa-victoria', nombre:'Hotel Villa Victoria', ciudad:'Tigre, Buenos Aires', region:'buenosaires', precio:'Desde ARS 146.000' },
  { slug:'purobaires-hotel-boutique', nombre:'PuroBaires Hotel Boutique', ciudad:'Palermo Soho, Buenos Aires', region:'buenosaires', precio:'Desde USD 130' },
  { slug:'hotel-casa-calma', nombre:'Hotel Casa Calma', ciudad:'Centro, Buenos Aires', region:'buenosaires', precio:'Desde USD 188' },
  { slug:'hotel-ilum-experience-home', nombre:'Hotel Ilum Experience Home', ciudad:'Palermo Hollywood, Buenos Aires', region:'buenosaires', precio:'Desde USD 200' },
  { slug:'hotel-legado-mitico', nombre:'Hotel Legado Mítico Buenos Aires', ciudad:'Palermo Soho, Buenos Aires', region:'buenosaires', precio:'Desde USD 290' },
  { slug:'aldebaran-hotel-spa', nombre:'Aldebarán Hotel & SPA', ciudad:'Bariloche, Río Negro', region:'patagonia', precio:'' },
  { slug:'eolo-patagonia', nombre:'EOLO Patagonia', ciudad:'El Calafate, Santa Cruz', region:'patagonia', precio:'Desde USD 1.200' },
  { slug:'la-casa-de-eugenia', nombre:'La Casa de Eugenia', ciudad:'San Martín de los Andes, Neuquén', region:'patagonia', precio:'Desde USD 180' },
  { slug:'las-balsas', nombre:'Las Balsas', ciudad:'Villa La Angostura, Neuquén', region:'patagonia', precio:'Desde USD 599' },
  { slug:'patios-de-cafayate', nombre:'Patios de Cafayate', ciudad:'Cafayate, Salta', region:'norte', precio:'Desde USD 199' },
  { slug:'loi-suites-iguazu', nombre:'Loi Suites Iguazú', ciudad:'Puerto Iguazú, Misiones', region:'litoral', precio:'Desde USD 350' },
  { slug:'puerto-valle', nombre:'Puerto Valle', ciudad:'Esteros del Iberá, Corrientes', region:'litoral', precio:'Desde USD 791' },
  { slug:'entre-cielos', nombre:'Entre Cielos', ciudad:'Luján de Cuyo, Mendoza', region:'cuyo', precio:'Desde USD 640' },
];

// Alias de región para matchear lo que escribe el interesado. Regiones = las
// categorías reales del sitio (Salta/Jujuy/Tucumán, Córdoba/Mendoza/La Rioja/San
// Juan, Patagonia, Buenos Aires, Litoral).
const REGION_ALIAS = {
  norte: ['norte', 'jujuy', 'salta', 'tucuman', 'purmamarca', 'cafayate', 'quebrada', 'altiplano'],
  cuyo: ['cuyo', 'mendoza', 'san juan', 'cordoba', 'la rioja', 'valle de uco', 'barreal', 'cordillera', 'montaña', 'montana', 'vino', 'bodega', 'wine'],
  patagonia: ['patagonia', 'bariloche', 'neuquen', 'ushuaia', 'calafate', 'sur', 'lagos', 'nieve', 'esqui', 'esquí'],
  buenosaires: ['buenos aires', 'caba', 'recoleta', 'palermo', 'tigre', 'san isidro', 'areco', 'pueblo', 'estancia', 'campo', 'historico', 'histórico'],
  litoral: ['litoral', 'iguazu', 'iguazú', 'misiones', 'corrientes', 'ibera', 'iberá', 'cataratas'],
};

const CONTACTO = {
  telefono: '+54 9 11 5471-1420',
  email: 'info@boutiquehotelsargentina.com',
};
