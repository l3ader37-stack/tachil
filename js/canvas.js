(function () {
  const canvas = document.getElementById('fxCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let sparkles = [];
  let foamTrail = [];
  const themeRGB = '0, 168, 232';

  function resize() {
    width = canvas.width = canvas.offsetWidth;
    height = canvas.height = canvas.offsetHeight;
  }
  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (y < 0 || y > height) return;

    for (let i = 0; i < 2; i++) {
      foamTrail.push({
        x: x + (Math.random() - 0.5) * 20,
        y: y + (Math.random() - 0.5) * 20,
        r: Math.random() * 7 + 3,
        vx: (Math.random() - 0.5) * 0.8,
        vy: -Math.random() * 1.1 - 0.3,
        alpha: 0.65
      });
    }
  });

  class CleanSparkle {
    constructor(initial = false) { this.reset(initial); }
    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.r = Math.random() * 11 + 5;
      this.vy = Math.random() * 0.45 + 0.15;
      this.phase = Math.random() * Math.PI * 2;
      this.isStar = Math.random() > 0.55;
    }
    update() {
      this.phase += 0.03;
      this.y -= this.vy;
      this.x += Math.sin(this.phase) * 0.25;
      if (this.y < -20) this.reset(false);
    }
    draw() {
      ctx.save();
      const pulse = 0.55 + Math.sin(this.phase * 1.8) * 0.45;
      if (this.isStar) {
        const s = this.r * 1.1 * pulse;
        ctx.translate(this.x, this.y);
        ctx.fillStyle = `rgba(255, 255, 255, ${0.95 * pulse})`;
        ctx.shadowColor = `rgba(${themeRGB}, 0.6)`;
        ctx.shadowBlur = 12;
        ctx.beginPath();
        ctx.moveTo(0, -s);
        ctx.quadraticCurveTo(0, 0, s, 0);
        ctx.quadraticCurveTo(0, 0, 0, s);
        ctx.quadraticCurveTo(0, 0, -s, 0);
        ctx.quadraticCurveTo(0, 0, 0, -s);
        ctx.fill();
      } else {
        const grad = ctx.createRadialGradient(this.x - this.r * 0.3, this.y - this.r * 0.3, 1, this.x, this.y, this.r);
        grad.addColorStop(0, 'rgba(255, 255, 255, 0.9)');
        grad.addColorStop(0.65, `rgba(${themeRGB}, 0.12)`);
        grad.addColorStop(1, `rgba(${themeRGB}, 0.42)`);
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  const count = window.innerWidth < 768 ? 20 : 40;
  for (let i = 0; i < count; i++) sparkles.push(new CleanSparkle(true));

  function animate() {
    ctx.clearRect(0, 0, width, height);
    sparkles.forEach((s) => { s.update(); s.draw(); });

    for (let i = foamTrail.length - 1; i >= 0; i--) {
      const f = foamTrail[i];
      f.x += f.vx;
      f.y += f.vy;
      f.alpha -= 0.016;
      if (f.alpha <= 0) { foamTrail.splice(i, 1); continue; }

      ctx.save();
      ctx.beginPath();
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${f.alpha})`;
      ctx.strokeStyle = `rgba(${themeRGB}, ${f.alpha * 0.6})`;
      ctx.lineWidth = 1;
      ctx.fill();
      ctx.stroke();
      ctx.restore();
    }
    requestAnimationFrame(animate);
  }
  animate();
})();