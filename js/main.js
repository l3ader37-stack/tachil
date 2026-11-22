const CONTACTS_CONFIG = {
  whatsappPhone: '99312595457',  // Номер WhatsApp без "+"
  telegramUser: 'tachil_export', // Username в Telegram без "@"
  email: 'export@tachil.com'     // Почта экспорта
};

document.addEventListener('DOMContentLoaded', () => {
  // 1. Lenis + GSAP
  let lenis = null;
  if (typeof Lenis !== 'undefined' && typeof gsap !== 'undefined') {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true
    });
    if (typeof ScrollTrigger !== 'undefined') {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.registerPlugin(ScrollTrigger);
    }
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  // 2. Световой блик за курсором и липкая шапка
  const cursorGlow = document.getElementById('cursorGlow');
  if (cursorGlow && typeof gsap !== 'undefined') {
    window.addEventListener('mousemove', (e) => {
      gsap.to(cursorGlow, { x: e.clientX, y: e.clientY, duration: 0.4, ease: 'power2.out' });
    });
  }

  const header = document.getElementById('header');
  if (header && !header.classList.contains('is-scrolled')) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('is-scrolled', window.scrollY > 40);
    });
  }

  // 3. Боковая скролл-система «Шкала чистоты» (главная)
  const purityScroll = document.getElementById('purityScroll');
  const purityLiquid = document.getElementById('purityLiquid');
  const purityPercent = document.getElementById('purityPercent');
  const purityMobileFill = document.getElementById('purityMobileFill');
  const purityDots = document.querySelectorAll('.purity-dot');
  const sections = ['#hero', '#showcase', '#certificates', '#b2b']
    .map((sel) => document.querySelector(sel))
    .filter(Boolean);

  function updatePurityMeter() {
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? Math.min(Math.max(window.scrollY / docHeight, 0), 1) : 0;
    const pct = Math.round(progress * 100);

    if (purityLiquid) purityLiquid.style.height = `${pct}%`;
    if (purityPercent) purityPercent.textContent = `${pct}%`;
    if (purityMobileFill) purityMobileFill.style.width = `${pct}%`;
    if (purityScroll) purityScroll.classList.toggle('is-pure', pct >= 95);

    const scrollMid = window.scrollY + window.innerHeight * 0.4;
    sections.forEach((sec, idx) => {
      const top = sec.offsetTop;
      const bottom = top + sec.offsetHeight;
      if (scrollMid >= top && scrollMid < bottom && purityDots[idx]) {
        purityDots.forEach((d) => d.classList.remove('is-active'));
        purityDots[idx].classList.add('is-active');
      }
    });
  }

  window.addEventListener('scroll', updatePurityMeter, { passive: true });
  updatePurityMeter();

  purityDots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const target = document.querySelector(dot.dataset.target);
      if (!target) return;
      lenis ? lenis.scrollTo(target) : target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // 4. Анимация первого экрана
  if (document.querySelector('.line-reveal') && typeof gsap !== 'undefined') {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    tl.from('.line-reveal', { yPercent: 110, duration: 0.9, stagger: 0.12 })
      .from('.reveal-fade', { y: 24, opacity: 0, duration: 0.75, stagger: 0.1 }, '-=0.5');
  }

  // ==============================================================
  // 5. КОРЗИНА-ЗАЯВКА (DRAWER + СИНХРОНИЗАЦИЯ МЕЖДУ СТРАНИЦАМИ)
  // ==============================================================
  let specCart = JSON.parse(localStorage.getItem('tachil_cart') || '[]').map((item) => ({
    id: item.id,
    title: item.title,
    variantName: item.variantName || (item.variants?.[0]?.name || ''),
    image: item.image,
    qty: item.qty || 1
  }));

  const cartDrawer = document.getElementById('cartDrawer');
  const cartDrawerItems = document.getElementById('cartDrawerItems');
  const cartDrawerFooter = document.getElementById('cartDrawerFooter');

  function saveCart() {
    localStorage.setItem('tachil_cart', JSON.stringify(specCart));
    updateCartUI();
  }

  function addToCart(product, variantObj) {
    const vName = variantObj?.name || product.variants[0]?.name || '';
    const vImg = variantObj?.img || product.image;
    const existing = specCart.find((i) => i.id === product.id && i.variantName === vName);
    if (existing) {
      existing.qty += 1;
    } else {
      specCart.push({
        id: product.id,
        title: product.title,
        variantName: vName,
        image: vImg,
        qty: 1
      });
    }
    saveCart();
  }

  function updateCartUI() {
    const totalQty = specCart.reduce((sum, item) => sum + (item.qty || 1), 0);
    const countEl = document.getElementById('cartCount');
    if (countEl) countEl.textContent = totalQty;

    const b2bSelected = document.getElementById('b2bSelectedInfo');
    if (b2bSelected) {
      if (specCart.length > 0) {
        b2bSelected.style.display = 'block';
        b2bSelected.textContent = `В заявку добавлено позиций из каталога: ${totalQty} кор.`;
      } else {
        b2bSelected.style.display = 'none';
      }
    }

    if (cartDrawerItems) {
      if (specCart.length === 0) {
        cartDrawerItems.innerHTML = `
          <div class="cart-empty">
            <span>📦</span>
            <p>Список заявки пока пуст</p>
            <small>Добавьте нужные товары из каталога, чтобы сформировать оптовый запрос.</small>
          </div>
        `;
        if (cartDrawerFooter) cartDrawerFooter.style.display = 'none';
      } else {
        if (cartDrawerFooter) cartDrawerFooter.style.display = 'block';
        cartDrawerItems.innerHTML = specCart.map((item, idx) => `
          <div class="cart-item">
            <img src="${item.image}" alt="${item.title}" class="cart-item__img" />
            <div class="cart-item__info">
              <div class="cart-item__title">${item.title}</div>
              ${item.variantName ? `<div class="cart-item__variant">${item.variantName}</div>` : ''}
              <div class="cart-item__controls">
                <button type="button" class="qty-btn" data-qty-minus="${idx}">−</button>
                <span class="qty-val">${item.qty} кор.</span>
                <button type="button" class="qty-btn" data-qty-plus="${idx}">+</button>
              </div>
            </div>
            <button type="button" class="cart-item__remove" data-remove-idx="${idx}" aria-label="Удалить">✕</button>
          </div>
        `).join('');
      }
    }
  }
  updateCartUI();

  // Открытие/закрытие Drawer
  const closeDrawer = () => cartDrawer?.classList.remove('is-open');
  document.getElementById('cartDrawerClose')?.addEventListener('click', closeDrawer);
  document.getElementById('cartDrawerBg')?.addEventListener('click', closeDrawer);

  document.getElementById('cartTrigger')?.addEventListener('click', () => {
    if (cartDrawer) {
      cartDrawer.classList.add('is-open');
    } else {
      const b2bEl = document.getElementById('b2b');
      if (b2bEl) {
        lenis ? lenis.scrollTo(b2bEl) : b2bEl.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.location.href = 'index.html#b2b';
      }
    }
  });

  // Управление количеством и удалением внутри Drawer
  cartDrawerItems?.addEventListener('click', (e) => {
    const minus = e.target.dataset.qtyMinus;
    const plus = e.target.dataset.qtyPlus;
    const rem = e.target.dataset.removeIdx;

    if (minus !== undefined) {
      const idx = Number(minus);
      if (specCart[idx].qty > 1) specCart[idx].qty -= 1;
      else specCart.splice(idx, 1);
      saveCart();
    } else if (plus !== undefined) {
      specCart[Number(plus)].qty += 1;
      saveCart();
    } else if (rem !== undefined) {
      specCart.splice(Number(rem), 1);
      saveCart();
    }
  });

  // Отправка заявки из Drawer
  document.querySelectorAll('[data-drawer-send]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = document.getElementById('drawerName')?.value.trim();
      const phone = document.getElementById('drawerPhone')?.value.trim();
      const status = document.getElementById('drawerStatus');

      if (!name || !phone) {
        if (status) {
          status.style.color = '#e11d48';
          status.textContent = 'Укажите имя/компанию и телефон.';
        }
        return;
      }

      const itemsText = specCart
        .map((p, i) => `${i + 1}. ${p.title}${p.variantName ? ' (' + p.variantName + ')' : ''} — ${p.qty} кор.`)
        .join('\n');

      const message =
        `Здравствуйте, TäçHil! Оптовая заявка из каталога:\n` +
        `Имя/Компания: ${name}\n` +
        `Телефон: ${phone}\n\n` +
        `Выбранные позиции:\n${itemsText}`;

      const encoded = encodeURIComponent(message);
      const ch = btn.dataset.drawerSend;

      if (ch === 'whatsapp') {
        window.open(`https://wa.me/${CONTACTS_CONFIG.whatsappPhone}?text=${encoded}`, '_blank');
      } else if (ch === 'telegram') {
        window.open(`https://t.me/${CONTACTS_CONFIG.telegramUser}?text=${encoded}`, '_blank');
      } else if (ch === 'email') {
        window.location.href = `mailto:${CONTACTS_CONFIG.email}?subject=${encodeURIComponent('Оптовая заявка TäçHil — ' + name)}&body=${encoded}`;
      }

      if (status) {
        status.style.color = '#15459c';
        status.textContent = 'Открываем выбранный канал связи...';
      }
    });
  });

  // ==============================================================
  // 6. РЕНДЕР КАТАЛОГА, ПОИСК И ФИЛЬТРАЦИЯ (catalog.html)
  // ==============================================================
  const productsGrid = document.getElementById('productsGrid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('catalogSearch');
  let activeFilter = 'all';
  let searchQuery = '';

  function renderProducts() {
    if (!productsGrid || typeof PRODUCTS_DB === 'undefined') return;

    const q = searchQuery.toLowerCase().trim();
    const filtered = PRODUCTS_DB.filter((item) => {
      const matchCat = activeFilter === 'all' || item.category === activeFilter;
      if (!matchCat) return false;
      if (!q) return true;
      const inTitle = item.title.toLowerCase().includes(q);
      const inBrand = item.brand.toLowerCase().includes(q);
      const inDesc = item.desc.toLowerCase().includes(q);
      const inVariants = item.variants.some((v) => v.name.toLowerCase().includes(q));
      return inTitle || inBrand || inDesc || inVariants;
    });

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div class="catalog-empty">
          <h3>Ничего не найдено</h3>
          <p>Попробуйте изменить запрос или выберите категорию «Все товары».</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map((item) => `
      <article class="product-card tilt-card" data-product-id="${item.id}">
        <div>
          <div class="product-card__top">
            <span class="product-card__brand">${item.brand}</span>
            <span class="product-card__badge">${item.badge}</span>
          </div>
          <div class="product-card__visual" data-view="${item.id}" style="background: linear-gradient(145deg, ${item.colorAccent}12, ${item.colorAccent}28); cursor: pointer;">
            <img src="${item.image}" alt="${item.title}" class="product-card__img" loading="lazy" />
            ${item.variants.length > 1 ? `<span class="swipe-pill">⇄ ${item.variants.length} вкусов</span>` : ''}
          </div>
          <h3 class="product-card__title">${item.title}</h3>
          <p class="product-card__desc">${item.desc}</p>
          <div class="product-card__variants">
            ${item.variants.map((v, idx) => `
              <button type="button" class="variant-chip ${idx === 0 ? 'is-active' : ''}" data-img="${v.img}" data-vname="${v.name}">
                ${v.name}
              </button>
            `).join('')}
          </div>
        </div>
        <div class="product-card__footer">
          <button class="btn-card btn-card--outline" data-view="${item.id}">Вкусы и B2B</button>
          <button class="btn-card btn-card--add" data-add="${item.id}">+ В заявку</button>
        </div>
      </article>
    `).join('');

    initTiltCards();
  }

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeFilter = btn.dataset.filter;
      renderProducts();
    });
  });

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    renderProducts();
  });

  if (productsGrid) {
    const urlParams = new URLSearchParams(window.location.search);
    activeFilter = urlParams.get('cat') || 'all';
    filterBtns.forEach((b) => {
      b.classList.toggle('is-active', b.dataset.filter === activeFilter);
    });
    renderProducts();
  }

  // ==============================================================
  // 7. ИНТЕРАКТИВНАЯ МОДАЛКА ТОВАРА С СЕНСОРНЫМ СВАЙПОМ ВКУСОВ
  // ==============================================================
  const modal = document.getElementById('productModal');
  const modalBody = document.getElementById('modalBody');
  const closeModal = () => modal?.classList.remove('is-open');

  document.getElementById('modalCloseBtn')?.addEventListener('click', closeModal);
  document.getElementById('modalCloseBg')?.addEventListener('click', closeModal);

  function openSwipeModal(product, startIndex = 0) {
    if (!modal || !modalBody) return;
    let currentIdx = startIndex;
    const total = product.variants.length;

    modalBody.innerHTML = `
      <div class="modal-head-meta">
        <span class="product-card__brand">${product.brand}</span>
        <span class="product-card__badge">${product.badge}</span>
      </div>
      <h2 class="modal-title">${product.title}</h2>

      <!-- Сенсорная сцена перелистывания вкусов -->
      <div class="modal-stage" id="modalStage" style="background: linear-gradient(145deg, ${product.colorAccent}12, ${product.colorAccent}28);">
        ${total > 1 ? `<button type="button" class="modal-arrow modal-arrow--prev" id="modalPrev" aria-label="Предыдущий">‹</button>` : ''}
        <div class="modal-stage__viewport">
          <img src="${product.variants[currentIdx].img}" alt="${product.title}" class="modal-stage__img" id="modalStageImg" draggable="false" />
        </div>
        ${total > 1 ? `<button type="button" class="modal-arrow modal-arrow--next" id="modalNext" aria-label="Следующий">›</button>` : ''}
        ${total > 1 ? `<div class="modal-swipe-hint">⇄ Свайпайте фото, чтобы менять вкус</div>` : ''}
      </div>

      <div class="modal-variant-bar">
        <span class="modal-variant-current" id="modalVariantName">${product.variants[currentIdx].name}</span>
        ${total > 1 ? `
          <div class="modal-dots" id="modalDots">
            ${product.variants.map((_, i) => `<span class="modal-dot ${i === currentIdx ? 'is-active' : ''}" data-dot-idx="${i}"></span>`).join('')}
          </div>
        ` : ''}
      </div>

      ${total > 1 ? `
        <div class="modal-chips" id="modalChips">
          ${product.variants.map((v, i) => `
            <button type="button" class="variant-chip ${i === currentIdx ? 'is-active' : ''}" data-chip-idx="${i}">${v.name}</button>
          `).join('')}
        </div>
      ` : ''}

      <p class="modal-desc">${product.desc}</p>

      <strong style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-muted);">Логистические параметры (B2B / Опт):</strong>
      <table class="logistics-table">
        <tr><td>Фасовка единицы</td><td>${product.logistics.unitWeight}</td></tr>
        <tr><td>Количество в коробке</td><td>${product.logistics.pcsInBox}</td></tr>
        <tr><td>Вес брутто коробки</td><td>${product.logistics.boxGrossWeight}</td></tr>
        <tr><td>Объём коробки</td><td>${product.logistics.boxVolume}</td></tr>
      </table>

      <button type="button" class="btn btn--primary btn--full" id="modalAddBtn">
        + Добавить «${product.variants[currentIdx].name}» в заявку
      </button>
    `;

    const stage = document.getElementById('modalStage');
    const stageImg = document.getElementById('modalStageImg');
    const variantNameEl = document.getElementById('modalVariantName');
    const addBtn = document.getElementById('modalAddBtn');
    const dots = modalBody.querySelectorAll('.modal-dot');
    const chips = modalBody.querySelectorAll('[data-chip-idx]');

    function switchVariant(newIdx, dir = 0) {
      if (total <= 1) return;
      currentIdx = (newIdx + total) % total;
      const v = product.variants[currentIdx];

      // Плавная анимация перелистывания
      stageImg.style.transition = 'transform 0.16s ease, opacity 0.16s ease';
      stageImg.style.opacity = '0';
      stageImg.style.transform = `translateX(${dir >= 0 ? -35 : 35}px) scale(0.92)`;

      setTimeout(() => {
        stageImg.src = v.img;
        stageImg.style.transition = 'none';
        stageImg.style.transform = `translateX(${dir >= 0 ? 35 : -35}px) scale(0.92)`;

        requestAnimationFrame(() => {
          stageImg.style.transition = 'transform 0.28s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.25s ease';
          stageImg.style.opacity = '1';
          stageImg.style.transform = 'translateX(0) scale(1)';
        });
      }, 150);

      variantNameEl.textContent = v.name;
      addBtn.textContent = `+ Добавить «${v.name}» в заявку`;
      dots.forEach((d, i) => d.classList.toggle('is-active', i === currentIdx));
      chips.forEach((c, i) => c.classList.toggle('is-active', i === currentIdx));
    }

    // Кнопки-стрелки, точки и чипсы
    document.getElementById('modalPrev')?.addEventListener('click', () => switchVariant(currentIdx - 1, -1));
    document.getElementById('modalNext')?.addEventListener('click', () => switchVariant(currentIdx + 1, 1));
    dots.forEach((d) => d.addEventListener('click', () => switchVariant(Number(d.dataset.dotIdx), 1)));
    chips.forEach((c) => c.addEventListener('click', () => {
      const idx = Number(c.dataset.chipIdx);
      switchVariant(idx, idx >= currentIdx ? 1 : -1);
    }));

    // Сенсорный свайп (телефон) + перетаскивание мышкой (ПК)
    if (total > 1 && stage) {
      let startX = 0;
      let deltaX = 0;
      let isDragging = false;

      const onStart = (x) => {
        isDragging = true;
        startX = x;
        deltaX = 0;
        stageImg.style.transition = 'none';
      };

      const onMove = (x) => {
        if (!isDragging) return;
        deltaX = x - startX;
        stageImg.style.transform = `translateX(${deltaX * 0.65}px) rotate(${deltaX * 0.04}deg)`;
      };

      const onEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        if (deltaX < -42) {
          switchVariant(currentIdx + 1, 1);
        } else if (deltaX > 42) {
          switchVariant(currentIdx - 1, -1);
        } else {
          stageImg.style.transition = 'transform 0.25s ease';
          stageImg.style.transform = 'translateX(0) rotate(0deg)';
        }
      };

      stage.addEventListener('touchstart', (e) => onStart(e.touches[0].clientX), { passive: true });
      stage.addEventListener('touchmove', (e) => onMove(e.touches[0].clientX), { passive: true });
      stage.addEventListener('touchend', onEnd);

      stage.addEventListener('mousedown', (e) => {
        if (e.target.closest('button')) return;
        onStart(e.clientX);
      });
      window.addEventListener('mousemove', (e) => onMove(e.clientX));
      window.addEventListener('mouseup', onEnd);
    }

    // Добавление выбранного вкуса в заявку
    addBtn.addEventListener('click', () => {
      addToCart(product, product.variants[currentIdx]);
      addBtn.textContent = '✓ Добавлено в заявку!';
      setTimeout(() => {
        addBtn.textContent = `+ Добавить «${product.variants[currentIdx].name}» в заявку`;
      }, 1200);
    });

    modal.classList.add('is-open');
  }

  // Клики по карточкам в каталоге
  productsGrid?.addEventListener('click', (e) => {
    // 1. Быстрая смена вкуса прямо на карточке
    const variantBtn = e.target.closest('.variant-chip');
    if (variantBtn) {
      const card = variantBtn.closest('.product-card');
      const imgEl = card?.querySelector('.product-card__img');
      if (imgEl && variantBtn.dataset.img) {
        card.querySelectorAll('.variant-chip').forEach((c) => c.classList.remove('is-active'));
        variantBtn.classList.add('is-active');
        imgEl.style.opacity = '0.2';
        imgEl.style.transform = 'scale(0.92)';
        setTimeout(() => {
          imgEl.src = variantBtn.dataset.img;
          imgEl.style.opacity = '1';
          imgEl.style.transform = 'scale(1)';
        }, 130);
      }
      return;
    }

    // 2. Открытие сенсорной модалки (клик по картинке или кнопке «Вкусы и B2B»)
    const viewTrigger = e.target.closest('[data-view]');
    if (viewTrigger) {
      const product = PRODUCTS_DB.find((p) => p.id === viewTrigger.dataset.view);
      if (!product) return;
      const card = viewTrigger.closest('.product-card');
      const activeChip = card?.querySelector('.variant-chip.is-active');
      const startIdx = activeChip
        ? Math.max(0, product.variants.findIndex((v) => v.name === activeChip.dataset.vname))
        : 0;
      openSwipeModal(product, startIdx);
      return;
    }

    // 3. Быстрое добавление в заявку с карточки
    const addBtn = e.target.closest('[data-add]');
    if (addBtn) {
      const product = PRODUCTS_DB.find((p) => p.id === addBtn.dataset.add);
      if (!product) return;
      const card = addBtn.closest('.product-card');
      const activeChip = card?.querySelector('.variant-chip.is-active');
      const chosenVariant = activeChip
        ? product.variants.find((v) => v.name === activeChip.dataset.vname) || product.variants[0]
        : product.variants[0];

      addToCart(product, chosenVariant);
      addBtn.textContent = '✓ Добавлено';
      setTimeout(() => { addBtn.textContent = '+ В заявку'; }, 1200);
    }
  });

  // 8. 3D-Tilt для карточек
  function initTiltCards() {
    if (!window.matchMedia('(hover: hover)').matches || typeof gsap === 'undefined') return;
    document.querySelectorAll('.tilt-card').forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotateY: x * 7,
          rotateX: -y * 7,
          transformPerspective: 900,
          duration: 0.35,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.5, ease: 'power2.out' });
      });
    });
  }
  initTiltCards();

  // 9. Магнитные кнопки
  if (typeof gsap !== 'undefined') {
    document.querySelectorAll('.magnetic').forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.25, y: y * 0.25, duration: 0.3 });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.45, ease: 'elastic.out(1, 0.4)' });
      });
    });
  }

  // 10. Отправка B2B-заявки на главной (WhatsApp / Telegram / Email)
  document.querySelectorAll('[data-send]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = document.getElementById('clientName')?.value.trim();
      const phone = document.getElementById('clientPhone')?.value.trim();
      const type = document.getElementById('clientType')?.value || '';
      const city = document.getElementById('clientCity')?.value.trim() || 'Не указан';
      const status = document.getElementById('formStatus');

      if (!name || !phone) {
        if (status) {
          status.style.color = '#e11d48';
          status.textContent = 'Пожалуйста, укажите имя/компанию и номер телефона.';
        }
        return;
      }

      const itemsText = specCart.length
        ? '\nИнтересующие позиции:\n' + specCart.map((p, i) => `${i + 1}. ${p.title}${p.variantName ? ' (' + p.variantName + ')' : ''} — ${p.qty} кор.`).join('\n')
        : '\nЗапрос полного оптового прайс-листа.';

      const message =
        `Здравствуйте, TäçHil! Запрос оптового прайс-листа.\n` +
        `Имя/Компания: ${name}\n` +
        `Телефон: ${phone}\n` +
        `Направление: ${type}\n` +
        `Город/Страна: ${city}` +
        itemsText;

      const encoded = encodeURIComponent(message);
      const channel = btn.dataset.send;

      if (channel === 'whatsapp') {
        window.open(`https://wa.me/${CONTACTS_CONFIG.whatsappPhone}?text=${encoded}`, '_blank');
      } else if (channel === 'telegram') {
        window.open(`https://t.me/${CONTACTS_CONFIG.telegramUser}?text=${encoded}`, '_blank');
      } else if (channel === 'email') {
        window.location.href = `mailto:${CONTACTS_CONFIG.email}?subject=${encodeURIComponent('Запрос прайс-листа TäçHil — ' + name)}&body=${encoded}`;
      }

      if (status) {
        status.style.color = '#15459c';
        status.textContent = 'Готово! Открываем выбранный канал связи с заполненной заявкой.';
      }
    });
  });

  // 11. Lightbox для сертификатов
  const certLightbox = document.getElementById('certLightbox');
  const certLightboxBody = document.getElementById('certLightboxBody');
  const closeCertLightbox = () => certLightbox?.classList.remove('is-open');

  document.getElementById('certLightboxClose')?.addEventListener('click', closeCertLightbox);
  document.getElementById('certLightboxBg')?.addEventListener('click', closeCertLightbox);

  document.querySelectorAll('.cert-card').forEach((card) => {
    card.addEventListener('click', () => {
      if (!certLightbox || !certLightboxBody) return;
      const img = card.querySelector('img');
      const title = card.dataset.certTitle || 'Сертификат';

      if (img) {
        certLightboxBody.innerHTML = `<img src="${img.src}" alt="${title}">`;
      } else {
        certLightboxBody.innerHTML = `<div style="padding: 48px 24px; text-align: center; color: #15459c;"><h3>${title}</h3><p style="margin-top:8px; color:#526885;">Добавьте изображение в папку assets/img/certs/ — оно автоматически откроется здесь в полном размере.</p></div>`;
      }
      certLightbox.classList.add('is-open');
    });
  });

  // 12. Мобильное меню (бургер)
  const burger = document.getElementById('burger');
  const mobileMenu = document.getElementById('mobileMenu');

  if (burger && mobileMenu) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('is-open');
      mobileMenu.classList.toggle('is-open');
    });

    mobileMenu.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        burger.classList.remove('is-open');
        mobileMenu.classList.remove('is-open');
      });
    });
  }// 13. Перерисовка динамических блоков при смене языка
  window.addEventListener('tachil:langchange', () => {
    if (typeof renderProducts === 'function') renderProducts();
    updateCartUI();
  });
});