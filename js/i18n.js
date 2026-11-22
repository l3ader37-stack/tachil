window.TACHIL_I18N = (function () {
  const STORAGE_KEY = 'tachil_lang';

  const UI = {
    ru: {
      navShowcase: 'Продукция',
      navCatalog: 'Полный каталог',
      navCerts: 'Сертификаты',
      navB2b: 'Оптовикам и прайс',
      navContacts: 'Контакты',
      navHome: 'Главная',
      navCatalogShort: 'Каталог',
      navB2bShort: 'Оптовикам',
      cartBtn: 'Заявка',
      heroEyebrow: 'TäçHil • Производство в Туркменистане с 2006 года',
      heroTitle1: 'Кристальная чистота',
      heroTitle2: 'и <span class="text-gradient">свежесть</span> каждый день',
      heroSubtitle: 'Бытовая химия, средства для стирки, парфюмированное мыло и влажные салфетки мирового стандарта качества ISO.',
      heroBtn1: 'Выбрать категорию',
      heroBtn2: 'Открыть полный каталог',
      fact1Strong: '19+ лет', fact1Span: 'на рынке с 2006 года',
      fact2Strong: '120+', fact2Span: 'наименований продукции',
      fact3Strong: '8 ISO', fact3Span: 'стандартов качества',
      fact4Strong: 'EBRD #1', fact4Span: 'в Центральной Азии',
      purityLabel: 'чистоты',
      showcaseKicker: 'Виды продукции',
      showcaseTitle: 'Нажмите на категорию для перехода в каталог',
      showcaseCta: 'Смотреть все 120+ позиций с характеристиками',
      catSub1: 'Гели для стирки • Täç & Täç Baby',
      catSub2: 'Для мытья посуды • Glim & Täç Hil',
      catSub3: 'Парфюмированное мыло-пенка • Anbar',
      catSub4: 'Жидкое мыло • Täç Hil 400 ml',
      catSub5: 'Увлажняющее крем-мыло • Liora 1 kg',
      catSub6: 'Влажные салфетки • 15–120 шт',
      catSub7: 'Спрей для стёкол • Titi 750 ml',
      catSub8: 'Пакеты для мусора • Zir-zibil 10L–120L',
      certsKicker: 'Международные стандарты',
      certsTitle: 'Сертификаты качества TäçHil',
      certsSub: 'Продукция соответствует 8 международным стандартам качества ISO и отмечена наградой EBRD. Нажмите на документ, чтобы увеличить.',
      certZoom: 'Увеличить',
      certCap1: 'Сертификат соответствия ISO',
      certCap2: 'EBRD’s #1 Pride in Central Asia',
      certCap3: 'Сертификат безопасности',
      certCap4: 'Декларация соответствия',
      b2bKicker: 'B2B • Опт и Экспорт',
      b2bTitle: 'Получить оптовый прайс-лист TäçHil',
      b2bDesc: 'Прямые поставки от производителя для торговых сетей, дистрибьюторов и HoReCa. Выберите удобный канал связи — заявка сформируется автоматически.',
      b2bBadge1: '✓ Цены от завода',
      b2bBadge2: '✓ Логистика в м³ и брутто',
      b2bBadge3: '✓ Экспортные документы ISO',
      phName: 'Имя или компания *',
      phPhone: 'Ваш телефон *',
      phCity: 'Город / Страна доставки',
      b2bSendLabel: 'Отправить запрос и получить прайс через:',
      footerDesc: 'Ведущий производитель бытовой химии и средств гигиены в Туркменистане с 2006 года.',
      footerAddrTitle: 'Адрес производства',
      footerSalesTitle: 'Отдел продаж и экспорта',
      footerCopy: '© 2026 TäçHil. Все права защищены.',
      footerTagline: 'Чистота и качество, проверенные временем',
      // Каталог
      backHome: '← Вернуться на главную',
      catTitle: 'Каталог продукции TäçHil',
      catDesc: 'Нажмите на товар, чтобы листать вкусы свайпом и смотреть логистику коробок для оптовых заказов.',
      searchPh: 'Поиск по бренду, названию или вкусу (Täç, Glim, Лимон, 5 кг)...',
      filterAll: 'Все товары',
      btnDetails: 'Вкусы и B2B',
      btnAdd: '+ В заявку',
      btnAdded: '✓ Добавлено',
      swipeHint: '⇄ Свайпайте фото, чтобы менять вкус',
      flavorsCount: 'вкусов',
      logisticsHead: 'Логистические параметры (B2B / Опт):',
      logUnit: 'Фасовка единицы',
      logPcs: 'Количество в коробке',
      logWeight: 'Вес брутто коробки',
      logVol: 'Объём коробки',
      drawerTitle: 'Ваша оптовая заявка',
      drawerEmptyTitle: 'Список заявки пока пуст',
      drawerEmptyDesc: 'Добавьте нужные товары из каталога, чтобы сформировать оптовый запрос.',
      boxUnit: 'кор.'
    },

    en: {
      navShowcase: 'Products',
      navCatalog: 'Full Catalog',
      navCerts: 'Certificates',
      navB2b: 'Wholesale & Price',
      navContacts: 'Contacts',
      navHome: 'Home',
      navCatalogShort: 'Catalog',
      navB2bShort: 'Wholesale',
      cartBtn: 'Order',
      heroEyebrow: 'TäçHil • Manufactured in Turkmenistan since 2006',
      heroTitle1: 'Crystal purity',
      heroTitle2: 'and <span class="text-gradient">freshness</span> every day',
      heroSubtitle: 'Household chemicals, laundry gels, perfumed soaps, and wet wipes meeting international ISO quality standards.',
      heroBtn1: 'Choose category',
      heroBtn2: 'Open full catalog',
      fact1Strong: '19+ yrs', fact1Span: 'on the market since 2006',
      fact2Strong: '120+', fact2Span: 'product items',
      fact3Strong: '8 ISO', fact3Span: 'quality standards',
      fact4Strong: 'EBRD #1', fact4Span: 'in Central Asia',
      purityLabel: 'purity',
      showcaseKicker: 'Product Categories',
      showcaseTitle: 'Select a category to explore the catalog',
      showcaseCta: 'View all 120+ items with specifications',
      catSub1: 'Laundry gels • Täç & Täç Baby',
      catSub2: 'Dishwashing • Glim & Täç Hil',
      catSub3: 'Perfumed foam soap • Anbar',
      catSub4: 'Liquid soap • Täç Hil 400 ml',
      catSub5: 'Moisturizing cream soap • Liora 1 kg',
      catSub6: 'Wet wipes • 15–120 pcs',
      catSub7: 'Glass cleaner spray • Titi 750 ml',
      catSub8: 'Garbage bags • Zir-zibil 10L–120L',
      certsKicker: 'International Standards',
      certsTitle: 'TäçHil Quality Certificates',
      certsSub: 'Our products comply with 8 international ISO quality standards and received the EBRD award. Click a document to zoom.',
      certZoom: 'Zoom in',
      certCap1: 'ISO Compliance Certificate',
      certCap2: 'EBRD’s #1 Pride in Central Asia',
      certCap3: 'Safety Certificate',
      certCap4: 'Declaration of Conformity',
      b2bKicker: 'B2B • Wholesale & Export',
      b2bTitle: 'Get TäçHil Wholesale Price List',
      b2bDesc: 'Direct factory supplies for retail chains, distributors, and HoReCa. Choose your preferred channel — your request is generated automatically.',
      b2bBadge1: '✓ Factory prices',
      b2bBadge2: '✓ m³ & gross weight logistics',
      b2bBadge3: '✓ ISO export documents',
      phName: 'Name or company *',
      phPhone: 'Your phone *',
      phCity: 'Delivery city / country',
      b2bSendLabel: 'Send request and get price list via:',
      footerDesc: 'Leading manufacturer of household chemicals and hygiene products in Turkmenistan since 2006.',
      footerAddrTitle: 'Production Address',
      footerSalesTitle: 'Sales & Export Department',
      footerCopy: '© 2026 TäçHil. All rights reserved.',
      footerTagline: 'Purity and quality proven by time',
      // Catalog
      backHome: '← Back to Home',
      catTitle: 'TäçHil Product Catalog',
      catDesc: 'Tap any product to swipe through scents and view box logistics for wholesale orders.',
      searchPh: 'Search by brand, name or scent (Täç, Glim, Lemon, 5 kg)...',
      filterAll: 'All products',
      btnDetails: 'Scents & B2B',
      btnAdd: '+ Add',
      btnAdded: '✓ Added',
      swipeHint: '⇄ Swipe photo to switch scent',
      flavorsCount: 'scents',
      logisticsHead: 'Logistics parameters (B2B / Wholesale):',
      logUnit: 'Unit size',
      logPcs: 'Pcs per box',
      logWeight: 'Box gross weight',
      logVol: 'Box volume',
      drawerTitle: 'Your Wholesale Order',
      drawerEmptyTitle: 'Your order list is empty',
      drawerEmptyDesc: 'Add products from the catalog to build your wholesale request.',
      boxUnit: 'box'
    },

    tm: {
      navShowcase: 'Önümler',
      navCatalog: 'Doly katalog',
      navCerts: 'Şahadatnamalar',
      navB2b: 'Lomaý we bahalar',
      navContacts: 'Habarlaşmak',
      navHome: 'Baş sahypa',
      navCatalogShort: 'Katalog',
      navB2bShort: 'Lomaý',
      cartBtn: 'Sargyt',
      heroEyebrow: 'TäçHil • 2006-njy ýyldan bäri Türkmenistanda öndürilýär',
      heroTitle1: 'Aýna ýaly arassalyk',
      heroTitle2: 'we her gün <span class="text-gradient">täzelik</span>',
      heroSubtitle: 'Halkara ISO hil standartlaryna laýyk gelýän hojalyk himiýasy, kir ýuwujy geller, ysly sabynlar we çygly süpürgiçler.',
      heroBtn1: 'Kategoriýany saýlaň',
      heroBtn2: 'Doly katalogy açmak',
      fact1Strong: '19+ ýyl', fact1Span: '2006-njy ýyldan bäri bazarda',
      fact2Strong: '120+', fact2Span: 'önüm görnüşleri',
      fact3Strong: '8 ISO', fact3Span: 'hil standartlary',
      fact4Strong: 'EBRD #1', fact4Span: 'Merkezi Aziýada',
      purityLabel: 'arassalyk',
      showcaseKicker: 'Önüm görnüşleri',
      showcaseTitle: 'Kataloga geçmek üçin kategoriýany saýlaň',
      showcaseCta: 'Ähli 120+ önümi häsiýetnamalary bilen görmek',
      catSub1: 'Kir ýuwujy geller • Täç & Täç Baby',
      catSub2: 'Gap-gaç ýuwujy • Glim & Täç Hil',
      catSub3: 'Ysly köpük sabyn • Anbar',
      catSub4: 'Suwuk sabyn • Täç Hil 400 ml',
      catSub5: 'Nemlendiriji krem-sabyn • Liora 1 kg',
      catSub6: 'Çygly süpürgiçler • 15–120 sany',
      catSub7: 'Aýna arassalaýjy • Titi 750 ml',
      catSub8: 'Zir-zibil torbalary • 10L–120L',
      certsKicker: 'Halkara standartlar',
      certsTitle: 'TäçHil hil şahadatnamalary',
      certsSub: 'Önümlerimiz 8 sany halkara ISO hil standartyna laýyk gelýär we EBRD baýragyna mynasyp boldy. Ulaltmak üçin üstüne basyň.',
      certZoom: 'Ulaltmak',
      certCap1: 'ISO laýyklyk şahadatnamasy',
      certCap2: 'EBRD’s #1 Pride in Central Asia',
      certCap3: 'Howpsuzlyk şahadatnamasy',
      certCap4: 'Hil deklarasiýasy',
      b2bKicker: 'B2B • Lomaý we Eksport',
      b2bTitle: 'TäçHil lomaý bahalaryny almak',
      b2bDesc: 'Söwda ulgamlary, distribýutorlar we HoReCa üçin gönüden-göni zawoddan üpjünçilik. Amatly aragatnaşyk usulyny saýlaň.',
      b2bBadge1: '✓ Zawod bahalary',
      b2bBadge2: '✓ m³ we brutto logistika',
      b2bBadge3: '✓ ISO eksport resminamalary',
      phName: 'Adyňyz ýa-da kompaniýa *',
      phPhone: 'Telefon belgiňiz *',
      phCity: 'Eltip bermeli şäher / ýurt',
      b2bSendLabel: 'Sargydy ibermek we bahalary almak:',
      footerDesc: '2006-njy ýyldan bäri Türkmenistanda hojalyk himiýasyny we gigiýena serişdelerini öndüriji öňdebaryjy kärhana.',
      footerAddrTitle: 'Önümçilik salgysy',
      footerSalesTitle: 'Satuw we eksport bölümi',
      footerCopy: '© 2026 TäçHil. Ähli hukuklar goralan.',
      footerTagline: 'Wagt bilen synalan arassalyk we hil',
      // Katalog
      backHome: '← Baş sahypa dolanmak',
      catTitle: 'TäçHil önüm katalogy',
      catDesc: 'Yslary barmagyňyz bilen süýşürip görmek we lomaý guty ölçeglerini bilmek üçin önümiň üstüne basyň.',
      searchPh: 'Brend, at ýa-da ys boýunça gözleg (Täç, Glim, Limon, 5 kg)...',
      filterAll: 'Ähli önümler',
      btnDetails: 'Yslar we B2B',
      btnAdd: '+ Sargyda',
      btnAdded: '✓ Goşuldy',
      swipeHint: '⇄ Ysy çalyşmak üçin suraty süýşüriň',
      flavorsCount: 'görnüş',
      logisticsHead: 'Logistika görkezijileri (B2B / Lomaý):',
      logUnit: 'Birlik ölçegi',
      logPcs: 'Gutydaky sany',
      logWeight: 'Gutynyň brutto agramy',
      logVol: 'Gutynyň göwrümi',
      drawerTitle: 'Lomaý sargydyňyz',
      drawerEmptyTitle: 'Sargyt sanawyňyz häzir boş',
      drawerEmptyDesc: 'Lomaý sargyt döretmek üçin katalogdan gerekli önümleri goşuň.',
      boxUnit: 'guty'
    }
  };

  let currentLang = localStorage.getItem(STORAGE_KEY) || 'ru';
  if (!UI[currentLang]) currentLang = 'ru';

  function t(key) {
    return (UI[currentLang] && UI[currentLang][key]) || UI.ru[key] || key;
  }

  function setText(sel, key, isHtml = false) {
    const el = document.querySelector(sel);
    if (!el) return;
    if (isHtml) el.innerHTML = t(key);
    else el.textContent = t(key);
  }

  function applyTranslations() {
    document.documentElement.lang = currentLang;

    // Активная кнопка языка
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.classList.toggle('is-active', btn.dataset.langBtn === currentLang);
    });

    // Шапка и кнопка Заявка
    const cartSpan = document.querySelector('#cartTrigger span:first-child');
    if (cartSpan) cartSpan.textContent = t('cartBtn');

    // Навигация на главной
    if (document.body.classList.contains('page-home')) {
      const navLinks = document.querySelectorAll('.nav .nav__link');
      const mobLinks = document.querySelectorAll('.mobile-menu__link');
      const navKeys = ['navShowcase', 'navCatalog', 'navCerts', 'navB2b', 'navContacts'];
      navKeys.forEach((k, i) => {
        if (navLinks[i]) navLinks[i].textContent = t(k);
        if (mobLinks[i]) mobLinks[i].textContent = t(k);
      });

      // Hero
      setText('.hero__eyebrow', 'heroEyebrow');
      const lines = document.querySelectorAll('.hero__title .line-reveal');
      if (lines[0]) lines[0].textContent = t('heroTitle1');
      if (lines[1]) lines[1].innerHTML = t('heroTitle2');
      setText('.hero__subtitle', 'heroSubtitle');
      setText('.hero__actions .btn--primary span', 'heroBtn1');
      setText('.hero__actions .btn--white span', 'heroBtn2');

      const facts = document.querySelectorAll('.fact-box');
      [1, 2, 3, 4].forEach((n, i) => {
        if (!facts[i]) return;
        facts[i].querySelector('strong').textContent = t(`fact${n}Strong`);
        facts[i].querySelector('span').textContent = t(`fact${n}Span`);
      });

      setText('.purity-scroll__label', 'purityLabel');

      // Виды продукции
      setText('#showcase .section-kicker', 'showcaseKicker');
      setText('#showcase .section-title', 'showcaseTitle');
      setText('.showcase-cta .btn span', 'showcaseCta');
      document.querySelectorAll('.brand-banner__logo small').forEach((el, i) => {
        el.textContent = t(`catSub${i + 1}`);
      });

      // Сертификаты
      setText('#certificates .section-kicker', 'certsKicker');
      setText('#certificates .section-title', 'certsTitle');
      setText('.certs-subtitle', 'certsSub');
      document.querySelectorAll('.cert-zoom-badge').forEach((el) => { el.textContent = t('certZoom'); });
      document.querySelectorAll('.cert-caption').forEach((el, i) => { el.textContent = t(`certCap${i + 1}`); });

      // B2B
      setText('#b2b .section-kicker', 'b2bKicker');
      setText('#b2b .section-title', 'b2bTitle');
      setText('.b2b-card__desc', 'b2bDesc');
      document.querySelectorAll('.b2b-badges span').forEach((el, i) => { el.textContent = t(`b2bBadge${i + 1}`); });
      const nIn = document.getElementById('clientName'); if (nIn) nIn.placeholder = t('phName');
      const pIn = document.getElementById('clientPhone'); if (pIn) pIn.placeholder = t('phPhone');
      const cIn = document.getElementById('clientCity'); if (cIn) cIn.placeholder = t('phCity');
      setText('.b2b-send-label', 'b2bSendLabel');

      // Футер
      setText('.footer__desc', 'footerDesc');
      const fHeads = document.querySelectorAll('.footer h4');
      if (fHeads[0]) fHeads[0].textContent = t('footerAddrTitle');
      if (fHeads[1]) fHeads[1].textContent = t('footerSalesTitle');
      const fBot = document.querySelectorAll('.footer__bottom span');
      if (fBot[0]) fBot[0].textContent = t('footerCopy');
      if (fBot[1]) fBot[1].textContent = t('footerTagline');
    } else {
      // Страница каталога
      const navLinks = document.querySelectorAll('.nav .nav__link');
      const mobLinks = document.querySelectorAll('.mobile-menu__link');
      const catNavKeys = ['navHome', 'navCatalogShort', 'navCerts', 'navB2bShort'];
      catNavKeys.forEach((k, i) => {
        if (navLinks[i]) navLinks[i].textContent = t(k);
        if (mobLinks[i]) mobLinks[i].textContent = t(k);
      });

      setText('.back-link', 'backHome');
      setText('.catalog-hero__title', 'catTitle');
      setText('.catalog-hero__desc', 'catDesc');
      const sIn = document.getElementById('catalogSearch'); if (sIn) sIn.placeholder = t('searchPh');
      const allBtn = document.querySelector('.filter-btn[data-filter="all"]');
      if (allBtn) allBtn.textContent = t('filterAll');

      setText('.cart-drawer__head h3', 'drawerTitle');
      const dn = document.getElementById('drawerName'); if (dn) dn.placeholder = t('phName');
      const dp = document.getElementById('drawerPhone'); if (dp) dp.placeholder = t('phPhone');
    }

    // Уведомляем main.js, чтобы перерисовал карточки каталога и корзину
    window.dispatchEvent(new CustomEvent('tachil:langchange', { detail: { lang: currentLang } }));
  }

  function setLang(lang) {
    if (!UI[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    applyTranslations();
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('[data-lang-btn]').forEach((btn) => {
      btn.addEventListener('click', () => setLang(btn.dataset.langBtn));
    });
    applyTranslations();
  });

  return { t, setLang, getLang: () => currentLang };
})();