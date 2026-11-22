(function () {
  function startWipeHero() {
    const hero = document.getElementById('hero');
    const wipeCanvas = document.getElementById('wipeCanvas');
    const fxCanvas = document.getElementById('fxCanvas');
    const wipeHint = document.getElementById('wipeHint');
    const products = document.querySelectorAll('.hero-prod');

    if (!hero || !wipeCanvas || !fxCanvas) return;

    const wCtx = wipeCanvas.getContext('2d');
    const fCtx = fxCanvas.getContext('2d');

    let width = 0;
    let height = 0;
    let sparkles = [];
    let wipedDistance = 0;
    let lastX = null;
    let lastY = null;

    function initCanvases() {
      const rect = hero.getBoundingClientRect();
      width = wipeCanvas.width = fxCanvas.width = Math.max(rect.width, window.innerWidth);
      height = wipeCanvas.height = fxCanvas.height = Math.max(rect.height, window.innerHeight);
      drawFrostedGlass();
    }

    // Плотный, хорошо заметный слой запотевшего стекла с каплями конденсата
    function drawFrostedGlass() {
      wCtx.globalCompositeOperation = 'source-over';
      wCtx.clearRect(0, 0, width, height);

      // 1. Плотная прохладная дымка (закрывает флаконы, пока не протрёшь)
      const grad = wCtx.createLinearGradient(0, 0, width, height);
      grad.addColorStop(0, 'rgba(195, 222, 248, 0.94)');
      grad.addColorStop(0.5, 'rgba(222, 238, 255, 0.92)');
      grad.addColorStop(1, 'rgba(190, 220, 245, 0.94)');
      wCtx.fillStyle = grad;
      wCtx.fillRect(0, 0, width, height);

      // 2. Мягкие облака пара
      for (let i = 0; i < 18; i++) {
        const cx = Math.random() * width;
        const cy = Math.random() * height;
        const cr = Math.random() * 220 + 120;
        const fog = wCtx.createRadialGradient(cx, cy, 10, cx, cy, cr);
        fog.addColorStop(0, 'rgba(255, 255, 255, 0.35)');
        fog.addColorStop(1, 'rgba(255, 255, 255, 0)');
        wCtx.fillStyle = fog;
        wCtx.beginPath();
        wCtx.arc(cx, cy, cr, 0, Math.PI * 2);
        wCtx.fill();
      }

      // 3. Чёткие капли конденсата на стекле
      const dropCount = window.innerWidth < 768 ? 160 : 380;
      for (let i = 0; i < dropCount; i++) {
        const dx = Math.random() * width;
        const dy = Math.random() * height;
        const dr = Math.random() * 5 + 1.5;

        // Тень капли
        wCtx.beginPath();
        wCtx.arc(dx, dy + 1, dr, 0, Math.PI * 2);
        wCtx.fillStyle = 'rgba(21, 69, 156, 0.14)';
        wCtx.fill();

        // Тело капли
        wCtx.beginPath();
        wCtx.arc(dx, dy, dr, 0, Math.PI * 2);
        wCtx.fillStyle = 'rgba(255, 255, 255, 0.72)';
        wCtx.fill();

        // Блик внутри капли
        wCtx.beginPath();
        wCtx.arc(dx - dr * 0.3, dy - dr * 0.3, dr * 0.3, 0, Math.PI * 2);
        wCtx.fillStyle = 'rgba(255, 255, 255, 0.95)';
        wCtx.fill();
      }
    }

    // Стирание пара курсором / пальцем
    function wipeAt(x, y) {
      wCtx.globalCompositeOperation = 'destination-out';

      const brushRadius = window.innerWidth < 768 ? 70 : 105;
      const brush = wCtx.createRadialGradient(x, y, brushRadius * 0.2, x, y, brushRadius);
      brush.addColorStop(0, 'rgba(0, 0, 0, 1)');
      brush.addColorStop(0.65, 'rgba(0, 0, 0, 0.9)');
      brush.addColorStop(1, 'rgba(0, 0, 0, 0)');

      wCtx.fillStyle = brush;
      wCtx.beginPath();
      wCtx.arc(x, y, brushRadius, 0, Math.PI * 2);
      wCtx.fill();

      if (lastX !== null && lastY !== null) {
        const dist = Math.hypot(x - lastX, y - lastY);
        wipedDistance += dist;

        if (dist > 10) {
          wCtx.lineWidth = brushRadius * 1.45;
          wCtx.lineCap = 'round';
          wCtx.strokeStyle = 'rgba(0, 0, 0, 0.9)';
          wCtx.beginPath();
          wCtx.moveTo(lastX, lastY);
          wCtx.lineTo(x, y);
          wCtx.stroke();
        }
      }

      lastX = x;
      lastY = y;

      if (wipedDistance > 300 && wipeHint && !wipeHint.classList.contains('is-hidden')) {
        wipeHint.classList.add('is-hidden');
      }

      if (Math.random() > 0.3) {
        sparkles.push({
          x: x + (Math.random() - 0.5) * 70,
          y: y + (Math.random() - 0.5) * 70,
          size: Math.random() * 11 + 6,
          alpha: 1,
          vy: -Math.random() * 0.9 - 0.25,
          isStar: Math.random() > 0.25
        });
      }
    }

    // Слушаем движение мыши по всему окну (надежнее, чем только по hero)
    window.addEventListener('mousemove', (e) => {
      const rect = hero.getBoundingClientRect();
      if (e.clientY < rect.top || e.clientY > rect.bottom) return;

      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      wipeAt(x, y);

      const nx = (x / width - 0.5) * 2;
      const ny = (y / height - 0.5) * 2;
      products.forEach((img) => {
        const speed = parseFloat(img.dataset.speed) || 20;
        img.style.transform = `translate3d(${nx * speed}px, ${ny * speed}px, 0)`;
      });
    });

    hero.addEventListener('mouseleave', () => {
      lastX = null;
      lastY = null;
    });

    hero.addEventListener('touchmove', (e) => {
      if (!e.touches[0]) return;
      const rect = hero.getBoundingClientRect();
      wipeAt(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
    }, { passive: true });

    hero.addEventListener('touchend', () => {
      lastX = null;
      lastY = null;
    });

    function animateSparkles() {
      fCtx.clearRect(0, 0, width, height);

      for (let i = sparkles.length - 1; i >= 0; i--) {
        const s = sparkles[i];
        s.y += s.vy;
        s.alpha -= 0.022;
        if (s.alpha <= 0) {
          sparkles.splice(i, 1);
          continue;
        }

        fCtx.save();
        fCtx.translate(s.x, s.y);
        if (s.isStar) {
          const r = s.size * s.alpha;
          fCtx.fillStyle = `rgba(255, 255, 255, ${s.alpha})`;
          fCtx.shadowColor = 'rgba(0, 168, 232, 0.9)';
          fCtx.shadowBlur = 12;
          fCtx.beginPath();
          fCtx.moveTo(0, -r);
          fCtx.quadraticCurveTo(0, 0, r, 0);
          fCtx.quadraticCurveTo(0, 0, 0, r);
          fCtx.quadraticCurveTo(0, 0, -r, 0);
          fCtx.quadraticCurveTo(0, 0, 0, -r);
          fCtx.fill();
        } else {
          fCtx.beginPath();
          fCtx.arc(0, 0, s.size * 0.4, 0, Math.PI * 2);
          fCtx.strokeStyle = `rgba(0, 168, 232, ${s.alpha * 0.8})`;
          fCtx.lineWidth = 1.3;
          fCtx.stroke();
        }
        fCtx.restore();
      }

      requestAnimationFrame(animateSparkles);
    }

    window.addEventListener('resize', initCanvases);
    initCanvases();
    animateSparkles();
  }

  if (document.readyState === 'complete') {
    startWipeHero();
  } else {
    window.addEventListener('load', startWipeHero);
  }
})();