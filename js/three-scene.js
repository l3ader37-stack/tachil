(function () {
  const container = document.getElementById('webglContainer');
  if (!container || typeof THREE === 'undefined') return;

  const scene = new THREE.Scene();
  const width = window.innerWidth;
  const height = window.innerHeight;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 14);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Свет для 3D-кристаллов чистоты
  const ambient = new THREE.AmbientLight(0xffffff, 1.2);
  scene.add(ambient);

  const dirLight1 = new THREE.DirectionalLight(0x00a8e8, 2.2);
  dirLight1.position.set(6, 8, 10);
  scene.add(dirLight1);

  const dirLight2 = new THREE.DirectionalLight(0x15459c, 1.5);
  dirLight2.position.set(-8, -5, 6);
  scene.add(dirLight2);

  // ==============================================================
  // 1. КАСТОМНЫЙ GLSL-ШЕЙДЕР РЕАЛИСТИЧНЫХ РАДУЖНЫХ МЫЛЬНЫХ ПУЗЫРЕЙ
  // ==============================================================
  const bubbleVertexShader = `
    uniform float uTime;
    uniform float uSeed;
    varying vec3 vNormal;
    varying vec3 vViewPosition;
    varying vec3 vWorldPos;

    void main() {
      // Живое органическое «дыхание» (мягкая деформация мыльного пузыря)
      vec3 pos = position;
      float wobble = sin(pos.x * 3.0 + uTime * 2.2 + uSeed) * 0.045
                   + cos(pos.y * 3.2 - uTime * 1.8 + uSeed) * 0.045;
      pos += normal * wobble;

      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      vViewPosition = -mvPosition.xyz;
      vNormal = normalize(normalMatrix * normal);
      vWorldPos = (modelMatrix * vec4(pos, 1.0)).xyz;
      gl_Position = projectionMatrix * mvPosition;
    }
  `;

  const bubbleFragmentShader = `
    uniform float uTime;
    uniform float uSeed;
    varying vec3 vNormal;
    varying vec3 vViewPosition;

    void main() {
      vec3 normal = normalize(vNormal);
      vec3 viewDir = normalize(vViewPosition);

      // Эффект Френеля: прозрачный центр, яркий переливающийся край
      float fresnel = pow(1.0 - max(dot(viewDir, normal), 0.0), 2.3);

      // Радужный перелив мыльной плёнки (небесно-голубой, бирюза, нежный сиреневый, королевский синий)
      float iridescence = dot(normal, vec3(0.5, 0.8, 0.3)) * 3.5 + uTime * 0.8 + uSeed;
      vec3 colCyan   = vec3(0.0, 0.72, 0.96);
      vec3 colBlue   = vec3(0.08, 0.30, 0.68);
      vec3 colMint   = vec3(0.22, 0.88, 0.78);
      vec3 colLilac  = vec3(0.68, 0.52, 0.98);

      vec3 soapFilm = mix(colCyan, colMint, 0.5 + 0.5 * sin(iridescence));
      soapFilm = mix(soapFilm, colLilac, 0.35 * (0.5 + 0.5 * cos(iridescence * 1.4)));
      soapFilm = mix(soapFilm, colBlue, fresnel * 0.45);

      // Два резких студийных блика на поверхности пузыря
      vec3 lightDir1 = normalize(vec3(0.55, 0.75, 0.65));
      vec3 halfVec1 = normalize(lightDir1 + viewDir);
      float spec1 = pow(max(dot(normal, halfVec1), 0.0), 48.0);

      vec3 lightDir2 = normalize(vec3(-0.6, -0.4, 0.5));
      vec3 halfVec2 = normalize(lightDir2 + viewDir);
      float spec2 = pow(max(dot(normal, halfVec2), 0.0), 22.0);

      vec3 finalColor = mix(vec3(0.92, 0.98, 1.0), soapFilm, fresnel);
      finalColor += vec3(1.0) * (spec1 * 1.15 + spec2 * 0.45);

      float alpha = clamp(fresnel * 0.82 + spec1 * 0.95 + 0.1, 0.0, 0.92);
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  // ==============================================================
  // 2. СОЗДАНИЕ 3D-ПУЗЫРЕЙ И 3D-КРИСТАЛЛОВ ЧИСТОТЫ
  // ==============================================================
  const worldGroup = new THREE.Group();
  scene.add(worldGroup);

  const isMobile = window.innerWidth < 768;
  const bubbleCount = isMobile ? 22 : 42;
  const sphereGeo = new THREE.SphereGeometry(1, 36, 36);
  const bubbles = [];

  for (let i = 0; i < bubbleCount; i++) {
    const mat = new THREE.ShaderMaterial({
      vertexShader: bubbleVertexShader,
      fragmentShader: bubbleFragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uSeed: { value: Math.random() * 100 }
      },
      transparent: true,
      depthWrite: false
    });

    const mesh = new THREE.Mesh(sphereGeo, mat);
    // Разнообразные размеры: от крупных флагманских пузырей до мелкой пены
    const isHeroBubble = i < 6;
    const radius = isHeroBubble
      ? (isMobile ? 0.65 + Math.random() * 0.5 : 0.95 + Math.random() * 0.85)
      : (0.22 + Math.random() * 0.52);

    mesh.scale.setScalar(radius);

    // Расставляем по бокам и в глубине, чтобы не закрывать текст в центре
    let x = (Math.random() - 0.5) * (isMobile ? 11 : 22);
    if (isHeroBubble && Math.abs(x) < 3.5) {
      x = (x < 0 ? -1 : 1) * (4.2 + Math.random() * 4.5);
    }
    const y = (Math.random() - 0.5) * 14;
    const z = (Math.random() - 0.5) * 9 - 1.5;

    mesh.position.set(x, y, z);
    mesh.userData = {
      baseX: x,
      baseY: y,
      baseZ: z,
      vx: 0,
      vy: 0,
      radius: radius,
      speedY: 0.25 + Math.random() * 0.55,
      phase: Math.random() * Math.PI * 2,
      mat: mat
    };

    worldGroup.add(mesh);
    bubbles.push(mesh);
  }

  // 3D-Кристаллы свежести (вращающиеся грани чистоты)
  const crystals = [];
  const crystalGeo = new THREE.OctahedronGeometry(0.32, 0);
  crystalGeo.scale(0.65, 1.45, 0.65);

  const crystalMat = new THREE.MeshPhysicalMaterial({
    color: 0x00a8e8,
    emissive: 0x004c99,
    emissiveIntensity: 0.25,
    roughness: 0.08,
    metalness: 0.35,
    transparent: true,
    opacity: 0.65
  });

  const crystalCount = isMobile ? 8 : 16;
  for (let i = 0; i < crystalCount; i++) {
    const c = new THREE.Mesh(crystalGeo, crystalMat);
    const x = (Math.random() - 0.5) * (isMobile ? 10 : 21);
    const y = (Math.random() - 0.5) * 14;
    const z = (Math.random() - 0.5) * 8 - 2;
    c.position.set(x, y, z);
    c.scale.setScalar(0.5 + Math.random() * 0.9);
    c.userData = {
      rotSpeedX: (Math.random() - 0.5) * 0.02,
      rotSpeedY: 0.01 + Math.random() * 0.02,
      baseY: y,
      phase: Math.random() * Math.PI * 2
    };
    worldGroup.add(c);
    crystals.push(c);
  }

  // ==============================================================
  // 3. ИНТЕРАКТИВ: КУРСОР, КЛИК-ВОЛНА И СКРОЛЛ
  // ==============================================================
  const mouse3D = new THREE.Vector3(999, 999, 0);
  let normX = 0;
  let normY = 0;
  let scrollProgress = 0;
  let targetScroll = 0;

  window.addEventListener('mousemove', (e) => {
    normX = (e.clientX / window.innerWidth) * 2 - 1;
    normY = -(e.clientY / window.innerHeight) * 2 + 1;
    mouse3D.set(normX * 10, normY * 6, 0);
  });

  // Ударная волна свежести при клике
  window.addEventListener('click', (e) => {
    const cx = ((e.clientX / window.innerWidth) * 2 - 1) * 10;
    const cy = (-(e.clientY / window.innerHeight) * 2 + 1) * 6;
    bubbles.forEach((b) => {
      const dx = b.position.x - cx;
      const dy = b.position.y - cy;
      const dist = Math.hypot(dx, dy) + 0.1;
      if (dist < 6.5) {
        const force = (6.5 - dist) * 0.075;
        b.userData.vx += (dx / dist) * force;
        b.userData.vy += (dy / dist) * force;
      }
    });
  });

  window.addEventListener('scroll', () => {
    const maxScroll = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1);
    targetScroll = window.scrollY / maxScroll;
  });

  // ==============================================================
  // 4. АНИМАЦИОННЫЙ ЦИКЛ 60 FPS
  // ==============================================================
  const clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Плавная интерполяция скролла
    scrollProgress += (targetScroll - scrollProgress) * 0.06;

    // Обновляем пузыри
    bubbles.forEach((b) => {
      const u = b.userData;
      u.mat.uniforms.uTime.value = t;

      // Естественное всплытие + ускорение от скролла
      const floatX = Math.sin(t * 0.7 + u.phase) * 0.35;
      const floatY = Math.cos(t * u.speedY + u.phase) * 0.45;

      // Отталкивание от курсора
      const dx = b.position.x - mouse3D.x;
      const dy = b.position.y - mouse3D.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 3.2 && dist > 0.01) {
        const push = (3.2 - dist) * 0.012;
        u.vx += (dx / dist) * push;
        u.vy += (dy / dist) * push;
      }

      // Затухание импульса и возврат к траектории
      u.vx *= 0.94;
      u.vy *= 0.94;

      // Зацикленный подъём по скроллу (создаёт ощущение бесконечного полёта сквозь пену)
      let scrolledY = u.baseY + scrollProgress * 12;
      if (scrolledY > 8.5) scrolledY -= 17;

      b.position.x += ((u.baseX + floatX) - b.position.x) * 0.04 + u.vx;
      b.position.y += ((scrolledY + floatY) - b.position.y) * 0.06 + u.vy;
    });

    // Вращение кристаллов
    crystals.forEach((c) => {
      c.rotation.x += c.userData.rotSpeedX;
      c.rotation.y += c.userData.rotSpeedY;
      let cy = c.userData.baseY + scrollProgress * 9 + Math.sin(t + c.userData.phase) * 0.3;
      if (cy > 8.5) cy -= 17;
      c.position.y = cy;
    });

    // Плавный поворот камеры от курсора и глубины скролла
    camera.position.x += (normX * 0.9 - camera.position.x) * 0.04;
    camera.position.y += (normY * 0.5 - camera.position.y) * 0.04;
    camera.position.z = 14 - Math.sin(scrollProgress * Math.PI) * 2.2;
    camera.lookAt(0, 0, 0);

    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    const w = window.innerWidth;
    const h = window.innerHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });
})();