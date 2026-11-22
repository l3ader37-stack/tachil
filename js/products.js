const IMG_DIR = 'assets/img/products/';

const PRODUCTS_DB = [
  {
    id: 'tac-detergent-135',
    category: 'laundry',
    brand: 'Täç',
    title: 'Гель-кондиционер для стирки Täç',
    badge: 'Хит продаж',
    colorAccent: '#15459c',
    image: IMG_DIR + '1.png',
    desc: 'Жидкое средство с эффектом восстановления волокон (Dikeldiş). Подходит для автоматической и ручной стирки.',
    variants: [
      { name: 'White', img: IMG_DIR + '1.png' },
      { name: 'Color', img: IMG_DIR + '2.png' },
      { name: 'Delicate', img: IMG_DIR + '3.png' },
      { name: 'Black', img: IMG_DIR + '4.png' }
    ],
    packSizes: ['1.35 kg', '2.35 kg', '3.75 kg', '5 kg'],
    logistics: { unitWeight: '1.35 кг', pcsInBox: '6 шт', boxGrossWeight: '13.0 кг', boxVolume: '0.0247 м³' }
  },
  {
    id: 'tac-hdpe-5kg',
    category: 'laundry',
    brand: 'Täç • 5 KG',
    title: 'Гель для стирки Täç (Канистра 5 кг)',
    badge: 'Выгодно / HoReCa',
    colorAccent: '#0284c7',
    image: IMG_DIR + '5.png',
    desc: 'Экономичная канистра HDPE/PET на 100 стирок для больших семей, прачечных и оптовых поставок.',
    variants: [
      { name: 'Color 5 кг', img: IMG_DIR + '5.png' },
      { name: 'White 5 кг', img: IMG_DIR + '6.png' }
    ],
    packSizes: ['5 kg (HDPE / PET)'],
    logistics: { unitWeight: '5.0 кг', pcsInBox: '4 шт', boxGrossWeight: '21.5 кг', boxVolume: '0.0225 м³' }
  },
  {
    id: 'tac-baby-3kg',
    category: 'laundry',
    brand: 'Täç Baby',
    title: 'Детский гель-кондиционер Täç Baby',
    badge: '0+ Гипоаллергенно',
    colorAccent: '#10b981',
    image: IMG_DIR + '7.png',
    desc: 'Бережная формула на 60 стирок для детского белья. Полностью выполаскивается, не раздражает кожу.',
    variants: [
      { name: 'Baby 3 кг', img: IMG_DIR + '7.png' }
    ],
    packSizes: ['3 kg'],
    logistics: { unitWeight: '3.0 кг', pcsInBox: '6 шт', boxGrossWeight: '20.0 кг', boxVolume: '0.0537 м³' }
  },
  {
    id: 'tachil-dish-3x',
    category: 'dish',
    brand: 'Täç Hil',
    title: 'Средство для посуды Täç Hil 3X',
    badge: '3X Güýçli Formula',
    colorAccent: '#f59e0b',
    image: IMG_DIR + '8.png',
    desc: 'Усиленная формула свежести для идеального блеска посуды. Доступно в флаконах 500 мл, 750 мл, 1 кг и канистрах 5 л.',
    variants: [
      { name: 'Яблоко 750мл', img: IMG_DIR + '8.png' },
      { name: 'Апельсин 750мл', img: IMG_DIR + '10.png' },
      { name: 'Лимон 750мл', img: IMG_DIR + '12.png' },
      { name: 'Яблоко 1кг', img: IMG_DIR + '17.png' },
      { name: 'Лимон 1кг', img: IMG_DIR + '18.png' },
      { name: 'Апельсин 1кг', img: IMG_DIR + '19s.png' },
      { name: '5L Яблоко', img: IMG_DIR + '16.png' },
      { name: '5L Лимон', img: IMG_DIR + '15.png' },
      { name: '5L Апельсин', img: IMG_DIR + '14.png' }
    ],
    packSizes: ['500 ml', '750 ml', '1 kg', '5 L'],
    logistics: { unitWeight: '750 мл / 500 мл', pcsInBox: '16 шт', boxGrossWeight: '12.8 кг / 8.8 кг', boxVolume: '0.0243 м³' }
  },
  {
    id: 'glim-ultra-clean',
    category: 'dish',
    brand: 'Glim',
    title: 'Glim Ultra Clean 5+ & Parlak',
    badge: 'Густая пена',
    colorAccent: '#16a34a',
    image: IMG_DIR + '24.png',
    desc: 'Ультра-концентрированное средство для мытья посуды с 5 активными компонентами. Мгновенно расщепляет жир.',
    variants: [
      { name: 'Апельсин 1кг', img: IMG_DIR + '24.png' },
      { name: 'Лимон 1кг', img: IMG_DIR + '25.png' },
      { name: 'Яблоко 1кг', img: IMG_DIR + '26.png' },
      { name: 'Алоэ 1кг', img: IMG_DIR + '27.png' },
      { name: 'Гранат 1кг', img: IMG_DIR + '28.png' },
      { name: 'Parlak 500мл', img: IMG_DIR + '23.png' }
    ],
    packSizes: ['1 kg', '500 ml (Parlak)'],
    logistics: { unitWeight: '1.0 кг', pcsInBox: '12 шт', boxGrossWeight: '12.8 кг', boxVolume: '0.0243 м³' }
  },
  {
    id: 'anbar-foam-soap',
    category: 'foam-soap',
    brand: 'TäçHil Anbar',
    title: 'Парфюмированное мыло-пенка Anbar',
    badge: 'Premium Aroma',
    colorAccent: '#7e22ce',
    image: IMG_DIR + '35s.png',
    desc: 'Нежная воздушная пенка с восточными парфюмерными композициями: Emerald, Violet и Night Orchid.',
    variants: [
      { name: 'Emerald / Violet / Orchid', img: IMG_DIR + '35s.png' }
    ],
    packSizes: ['400 ml'],
    logistics: { unitWeight: '400 мл', pcsInBox: '12 шт', boxGrossWeight: '5.5 кг', boxVolume: '0.0109 м³' }
  },
  {
    id: 'tac-liquid-soap',
    category: 'liquid-soap',
    brand: 'Täç Hil',
    title: 'Жидкое мыло Täç Hil с дозатором',
    badge: '5 ароматов',
    colorAccent: '#0284c7',
    image: IMG_DIR + '34.png',
    desc: 'Мягкое жидкое мыло с сочными ароматами черники, зелёной оливы, кокосового молока, вишни и ежевики.',
    variants: [
      { name: 'Вся линейка 400мл', img: IMG_DIR + '34.png' }
    ],
    packSizes: ['400 ml'],
    logistics: { unitWeight: '400 мл', pcsInBox: '12 шт', boxGrossWeight: '5.6 кг', boxVolume: '0.0124 м³' }
  },
  {
    id: 'liora-liquid-soap',
    category: 'moisturizing-soap',
    brand: 'Liora',
    title: 'Увлажняющее крем-мыло Liora Sensitive',
    badge: 'Moisturizing Care',
    colorAccent: '#ec4899',
    image: IMG_DIR + '29.png',
    desc: 'Деликатное крем-мыло с увлажняющим комплексом для ежедневного ухода за кожей рук.',
    variants: [
      { name: 'Pearl Glow', img: IMG_DIR + '29.png' },
      { name: 'Ocean Breeze', img: IMG_DIR + '30.png' },
      { name: 'Sweet Berries', img: IMG_DIR + '31.png' },
      { name: 'Milky Honey', img: IMG_DIR + '32.png' },
      { name: 'Fresh Aloe', img: IMG_DIR + '33.png' }
    ],
    packSizes: ['1 kg'],
    logistics: { unitWeight: '1.0 кг', pcsInBox: '12 шт', boxGrossWeight: '13.0 кг', boxVolume: '0.0255 м³' }
  },
  {
    id: 'brilliant-wipes-120',
    category: 'wipes',
    brand: 'TAÇ Hil',
    title: 'Влажные салфетки Brilliant 120 с клапаном',
    badge: '0% Спирта',
    colorAccent: '#1d4ed8',
    image: IMG_DIR + '45.png',
    desc: 'Плотные салфетки 18×15 см с защитным пластиковым клапаном. Без спирта и парабенов.',
    variants: [
      { name: 'Blue 120', img: IMG_DIR + '45.png' },
      { name: 'Silver 120', img: IMG_DIR + '43.png' },
      { name: 'Red 120', img: IMG_DIR + '44.png' },
      { name: 'Green 120', img: IMG_DIR + '46.png' }
    ],
    packSizes: ['120 шт (18×15 см)'],
    logistics: { unitWeight: '120 шт', pcsInBox: '24 пачки', boxGrossWeight: '13.9 кг', boxVolume: '0.0452 м³' }
  },
  {
    id: 'family-wipes-series',
    category: 'wipes',
    brand: 'TAÇ Hil',
    title: 'Семейные салфетки Körpejik / Awaza / Hello',
    badge: '64–120 шт',
    colorAccent: '#0ea5e9',
    image: IMG_DIR + '36.png',
    desc: 'Большие упаковки влажных салфеток для всей семьи, детей и ежедневной гигиены.',
    variants: [
      { name: 'Körpejik 120', img: IMG_DIR + '36.png' },
      { name: 'Awaza 120', img: IMG_DIR + '37.png' },
      { name: 'Ýüpek Ýoly 100', img: IMG_DIR + '38.png' },
      { name: 'Hello Family 120', img: IMG_DIR + '41.png' },
      { name: 'Limon 100', img: IMG_DIR + '47.png' },
      { name: 'Kebelek 64', img: IMG_DIR + '49.png' }
    ],
    packSizes: ['64 / 72 / 100 / 120 шт'],
    logistics: { unitWeight: '100–120 шт', pcsInBox: '24 пачки', boxGrossWeight: '12.2–13.9 кг', boxVolume: '0.0421–0.0452 м³' }
  },
  {
    id: 'pocket-wipes-series',
    category: 'wipes',
    brand: 'TAÇ Hil',
    title: 'Карманные салфетки Bagt Ýoly / Gül / Jenap',
    badge: '15–25 шт',
    colorAccent: '#e11d48',
    image: IMG_DIR + '61.png',
    desc: 'Компактные упаковки для дороги, мероприятий и снятия макияжа (Make-Up Cleanser 25).',
    variants: [
      { name: 'Gül 15', img: IMG_DIR + '61.png' },
      { name: 'Bagt Ýoly 15', img: IMG_DIR + '56.png' },
      { name: 'Jenap Smoking 15', img: IMG_DIR + '54s.png' },
      { name: 'Jenap Jeans 15', img: IMG_DIR + '55.png' },
      { name: 'Make-Up 25', img: IMG_DIR + '52.png' }
    ],
    packSizes: ['15 шт (144 в коробе)', '25 шт (56 в коробе)'],
    logistics: { unitWeight: '15 шт', pcsInBox: '144 пачки', boxGrossWeight: '7.8 кг', boxVolume: '0.0290 м³' }
  },
  {
    id: 'titi-glass-cleaner',
    category: 'window',
    brand: 'Titi',
    title: 'Спрей для стёкол и зеркал Titi',
    badge: 'Без разводов',
    colorAccent: '#00a8e8',
    image: IMG_DIR + '64.png',
    desc: 'Очиститель с курковым распылителем для окон, зеркал, витрин и автостёкол.',
    variants: [
      { name: 'Ocean 750мл', img: IMG_DIR + '64.png' },
      { name: 'Lemon 750мл', img: IMG_DIR + '65.png' }
    ],
    packSizes: ['750 ml'],
    logistics: { unitWeight: '750 мл', pcsInBox: '16 шт', boxGrossWeight: '12.8 кг', boxVolume: '0.0351 м³' }
  },
  {
    id: 'zir-zibil-bags',
    category: 'bags',
    brand: 'TäçHil',
    title: 'Антибактериальные пакеты Zir-zibil torbasy',
    badge: 'Antibakterial Gorag',
    colorAccent: '#16a34a',
    image: IMG_DIR + '66.png',
    desc: 'Особо прочные пакеты для мусора с антибактериальной защитой: классические и с завязками (ýüpli).',
    variants: [
      { name: 'Классические (10–120L)', img: IMG_DIR + '66.png' },
      { name: 'С завязками Ýüpli (30–70L)', img: IMG_DIR + '69.png' }
    ],
    packSizes: ['10L / 30L / 50L / 70L / 90L / 120L'],
    logistics: { unitWeight: 'Рулон 15–20 шт', pcsInBox: 'Оптовый короб', boxGrossWeight: 'По объёму', boxVolume: 'Индивидуально' }
  }
];