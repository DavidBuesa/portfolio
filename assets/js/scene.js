/* ================================================================
   Portfolio 3D — David Buesa Lorente
   Habitación lowpoly interactiva con Three.js r128
   ================================================================ */

const W = window.innerWidth, H = window.innerHeight;

/* ── Sistema de traducción i18n ── */
let currentLang = localStorage.getItem('portfolioLang') || 'en';

const translations = {
  en: {
    subtitle: 'Full Stack Developer · Tordera, Barcelona',
    hint: 'Click on objects to explore ↗',
    monitor: {
      label: '💻 Experience',
      title: 'Work Experience',
      subtitle: 'ACCENTURE · 2023 – PRESENT',
      items: [
        { dot: '#4dabf7', title: 'Backend Developer', period: 'Sep 2024 – Present', desc: 'Meliá Hotels Project. Java, Spring, Microservices, Kafka, Magnolia CMS, Docker, REST APIs.' },
        { dot: '#74c0fc', title: 'Frontend Developer', period: 'Nov 2023 – Aug 2024', desc: 'Bústia de Queixes — Ajuntament de Barcelona. Angular, TypeScript, SCSS, WCAG accessibility.' }
      ]
    },
    mug: {
      label: '☕ About Me',
      title: 'David Buesa Lorente',
      subtitle: 'FULL STACK DEVELOPER',
      html: `<p>Passionate developer creating quality digital experiences, based in Tordera, Barcelona.</p>
      <br>
      <p><strong>🎓 Education</strong></p>
      <p style="margin-top:6px">Higher Degree in Web Application Development — Dual Training · Institut Sa Palomera</p>
      <br>
      <p><strong>🌐 Languages</strong></p>
      <p style="margin-top:6px">Spanish · Catalan (native) &nbsp;|&nbsp; English B2</p>
      <br>
      <p><strong>🚗</strong> Driving License B · Own vehicle</p>`
    },
    github: {
      label: '🐙 GitHub',
      title: 'Portfolio & GitHub',
      subtitle: 'OPEN SOURCE',
      html: `<p>You can explore my projects and contributions at:</p>
      <br>
      <p><strong>GitHub:</strong><br><a href="https://github.com/DavidBuesa" target="_blank">↗ github.com/DavidBuesa</a></p>
      <br>
      <p><strong>VS Code Marketplace:</strong><br><a href="https://marketplace.visualstudio.com/publishers/DavidBuesaLorente" target="_blank">↗ DavidBuesaLorente</a></p>
      <br>
      <p style="margin-top:10px">Published projects on VS Code Marketplace with thousands of installations, including WCAG accessibility tools.</p>`
    },
    books: {
      label: '📚 Skills',
      title: 'Technologies',
      subtitle: 'TECH STACK',
      html: `
      <p style="margin-bottom:10px"><strong>Backend</strong></p>
      <span class="tag">Java</span><span class="tag">Spring</span><span class="tag">Microservices</span><span class="tag">Kafka</span><span class="tag">REST APIs</span><span class="tag">Magnolia CMS</span>
      <p style="margin:14px 0 10px"><strong>Frontend</strong></p>
      <span class="tag">Angular</span><span class="tag">React</span><span class="tag">Vite</span><span class="tag">TypeScript</span><span class="tag">JavaScript</span><span class="tag">HTML</span><span class="tag">SCSS</span>
      <p style="margin:14px 0 10px"><strong>DevOps & Tools</strong></p>
      <span class="tag">Docker</span><span class="tag">Git</span><span class="tag">CI/CD</span><span class="tag">Jira</span>
      <p style="margin:14px 0 10px"><strong>Mobile</strong></p>
      <span class="tag">Android</span><span class="tag">Capacitor</span>`
    },
    ball: {
      label: '⚽ Football',
      title: 'Football Coach',
      subtitle: 'SPORTS EXPERIENCE',
      html: `<p>Besides my career as a developer, I am a <strong>football coach</strong> with experience in training and developing young players.</p>
      <br>
      <div class="item"><div class="item-dot" style="background:#f59f00"></div><div><strong>Under-8 Category</strong><span class="period">Players aged 6–8</span>Introduction to football, coordination work, sports values and teamwork from the grassroots.</div></div>
      <div class="item"><div class="item-dot" style="background:#74c0fc"></div><div><strong>Under-14 Category</strong><span class="period">Players aged 12–14</span>Tactical development, technical training, group management and competition preparation.</div></div>
      <br>
      <p>Working with young athletes reinforces my <strong>leadership, communication and teamwork skills</strong> that I also apply in my day-to-day as a developer.</p>`
    },
    trophy: {
      label: '🏆 Projects',
      title: 'Personal Projects',
      subtitle: 'OPEN SOURCE PORTFOLIO',
      html: `
      <div class="item"><div class="item-dot" style="background:#74c0fc"></div><div>
        <strong>Color Contrast Checker</strong><span class="period">VS Code Extension · Web</span>
        Real-time accessible contrast checker. Instant WCAG compliance.<br>
        <span class="tag">TypeScript</span><span class="tag">VS Code API</span><span class="tag">WCAG</span><br>
        <a href="https://color-contrast-checker-hazel.vercel.app" target="_blank">↗ View project</a>
      </div></div>
      <div class="item"><div class="item-dot" style="background:#cc5de8"></div><div>
        <strong>WCAG Auditor</strong><span class="period">VS Code Extension · Web</span>
        Real-time WCAG auditor integrated into VS Code. Analyzes up to 6 file types and generates alerts.<br>
        <span class="tag">TypeScript</span><span class="tag">WCAG 2.1</span><span class="tag">Linting</span><br>
        <a href="https://wcag-auditor-pi.vercel.app" target="_blank">↗ View project</a>
      </div></div>
      <div class="item"><div class="item-dot" style="background:#f59f00"></div><div>
        <strong>Cinematch</strong><span class="period">Android App</span>
        Personal movie library with favorites, ratings and personalized recommendations.<br>
        <span class="tag">Android</span><span class="tag">Capacitor</span><span class="tag">REST API</span>
      </div></div>
      <div class="item"><div class="item-dot" style="background:#40c057"></div><div>
        <strong>Tactix</strong><span class="period">Android App · Sports Management</span>
        Platform for football teams: squad, training sessions, matches, statistics.<br>
        <span class="tag">Android</span><span class="tag">Capacitor</span><span class="tag">Firebase</span><span class="tag">Multi-role</span>
      </div></div>`
    },
    poster: {
      label: '✨ Soft Skills',
      title: 'Soft Skills',
      subtitle: 'PERSONAL ABILITIES',
      html: `
      <div class="item"><div class="item-dot" style="background:#74c0fc"></div><div><strong>Adaptability</strong><span class="period">Soft Skill</span>Ability to quickly adapt to new projects, technologies and work teams.</div></div>
      <div class="item"><div class="item-dot" style="background:#cc5de8"></div><div><strong>Creativity</strong><span class="period">Soft Skill</span>Innovative approach to solving technical problems and designing unique solutions.</div></div>
      <div class="item"><div class="item-dot" style="background:#f59f00"></div><div><strong>Empathy</strong><span class="period">Soft Skill</span>Understanding of end users and team members, essential for WCAG accessibility.</div></div>
      <div class="item"><div class="item-dot" style="background:#40c057"></div><div><strong>Analytical Thinking</strong><span class="period">Soft Skill</span>Breaking down complex problems into manageable and scalable solutions.</div></div>
      <div class="item"><div class="item-dot" style="background:#e03131"></div><div><strong>Teamwork</strong><span class="period">Soft Skill</span>Experience in agile teams at Accenture and as a sports coach.</div></div>`
    }
  },
  es: {
    subtitle: 'Desarrollador Full Stack · Tordera, Barcelona',
    hint: 'Haz clic en los objetos para explorar ↗',
    monitor: {
      label: '💻 Experiencia',
      title: 'Experiencia Laboral',
      subtitle: 'ACCENTURE · 2023 – ACTUALIDAD',
      items: [
        { dot: '#4dabf7', title: 'Desarrollador Backend', period: 'Sep 2024 – Actualidad', desc: 'Proyecto Meliá Hotels. Java, Spring, Microservicios, Kafka, Magnolia CMS, Docker, APIs REST.' },
        { dot: '#74c0fc', title: 'Desarrollador Frontend', period: 'Nov 2023 – Ago 2024', desc: 'Bústia de Queixes — Ajuntament de Barcelona. Angular, TypeScript, SCSS, accesibilidad WCAG.' }
      ]
    },
    mug: {
      label: '☕ Sobre mí',
      title: 'David Buesa Lorente',
      subtitle: 'DESARROLLADOR FULL STACK',
      html: `<p>Desarrollador apasionado por crear experiencias digitales de calidad, con base en Tordera, Barcelona.</p>
      <br>
      <p><strong>🎓 Formación</strong></p>
      <p style="margin-top:6px">CFGS Desarrollo de Aplicaciones Web — Formación Dual · Institut Sa Palomera</p>
      <br>
      <p><strong>🌐 Idiomas</strong></p>
      <p style="margin-top:6px">Español · Catalán (nativos) &nbsp;|&nbsp; Inglés B2</p>
      <br>
      <p><strong>🚗</strong> Carnet B · Vehículo propio</p>`
    },
    github: {
      label: '🐙 GitHub',
      title: 'Portfolio & GitHub',
      subtitle: 'CÓDIGO ABIERTO',
      html: `<p>Puedes explorar mis proyectos y contribuciones en:</p>
      <br>
      <p><strong>GitHub:</strong><br><a href="https://github.com/DavidBuesa" target="_blank">↗ github.com/DavidBuesa</a></p>
      <br>
      <p><strong>VS Code Marketplace:</strong><br><a href="https://marketplace.visualstudio.com/publishers/DavidBuesaLorente" target="_blank">↗ DavidBuesaLorente</a></p>
      <br>
      <p style="margin-top:10px">Proyectos publicados en el marketplace de VS Code con miles de instalaciones, incluyendo herramientas de accesibilidad WCAG.</p>`
    },
    books: {
      label: '📚 Skills',
      title: 'Tecnologías',
      subtitle: 'STACK TÉCNICO',
      html: `
      <p style="margin-bottom:10px"><strong>Backend</strong></p>
      <span class="tag">Java</span><span class="tag">Spring</span><span class="tag">Microservicios</span><span class="tag">Kafka</span><span class="tag">REST APIs</span><span class="tag">Magnolia CMS</span>
      <p style="margin:14px 0 10px"><strong>Frontend</strong></p>
      <span class="tag">Angular</span><span class="tag">React</span><span class="tag">Vite</span><span class="tag">TypeScript</span><span class="tag">JavaScript</span><span class="tag">HTML</span><span class="tag">SCSS</span>
      <p style="margin:14px 0 10px"><strong>DevOps & Tools</strong></p>
      <span class="tag">Docker</span><span class="tag">Git</span><span class="tag">CI/CD</span><span class="tag">Jira</span>
      <p style="margin:14px 0 10px"><strong>Mobile</strong></p>
      <span class="tag">Android</span><span class="tag">Capacitor</span>`
    },
    ball: {
      label: '⚽ Fútbol',
      title: 'Entrenador de Fútbol',
      subtitle: 'EXPERIENCIA DEPORTIVA',
      html: `<p>Además de mi carrera como desarrollador, soy <strong>entrenador de fútbol</strong> con experiencia en la formación y desarrollo de jóvenes jugadores.</p>
      <br>
      <div class="item"><div class="item-dot" style="background:#f59f00"></div><div><strong>Categoría Prebenjamín</strong><span class="period">Jugadores de 6–8 años</span>Iniciación al fútbol, trabajo de coordinación, valores deportivos y juego en equipo desde la base.</div></div>
      <div class="item"><div class="item-dot" style="background:#74c0fc"></div><div><strong>Categoría Infantil</strong><span class="period">Jugadores de 12–14 años</span>Desarrollo táctico, entrenamiento técnico, gestión de grupo y preparación para competición.</div></div>
      <br>
      <p>El trabajo con jóvenes deportistas refuerza mis habilidades de <strong>liderazgo, comunicación y trabajo en equipo</strong> que aplico también en mi día a día como desarrollador.</p>`
    },
    trophy: {
      label: '🏆 Proyectos',
      title: 'Proyectos Personales',
      subtitle: 'PORTFOLIO OPEN SOURCE',
      html: `
      <div class="item"><div class="item-dot" style="background:#74c0fc"></div><div>
        <strong>Color Contrast Checker</strong><span class="period">VS Code Extension · Web</span>
        Verificador de contraste accesible en tiempo real. Cumplimiento WCAG al instante.<br>
        <span class="tag">TypeScript</span><span class="tag">VS Code API</span><span class="tag">WCAG</span><br>
        <a href="https://color-contrast-checker-hazel.vercel.app" target="_blank">↗ Ver proyecto</a>
      </div></div>
      <div class="item"><div class="item-dot" style="background:#cc5de8"></div><div>
        <strong>WCAG Auditor</strong><span class="period">VS Code Extension · Web</span>
        Auditor WCAG en tiempo real integrado en VS Code. Analiza hasta 6 tipos de archivos y genera alertas.<br>
        <span class="tag">TypeScript</span><span class="tag">WCAG 2.1</span><span class="tag">Linting</span><br>
        <a href="https://wcag-auditor-pi.vercel.app" target="_blank">↗ Ver proyecto</a>
      </div></div>
      <div class="item"><div class="item-dot" style="background:#f59f00"></div><div>
        <strong>Cinematch</strong><span class="period">App Android</span>
        Librería personal de películas con favoritos, puntuación y recomendaciones personalizadas.<br>
        <span class="tag">Android</span><span class="tag">Capacitor</span><span class="tag">REST API</span>
      </div></div>
      <div class="item"><div class="item-dot" style="background:#40c057"></div><div>
        <strong>Tactix</strong><span class="period">App Android · Gestión Deportiva</span>
        Plataforma para equipos de fútbol: plantilla, entrenamientos, partidos, estadísticas.<br>
        <span class="tag">Android</span><span class="tag">Capacitor</span><span class="tag">Firebase</span><span class="tag">Multi-rol</span>
      </div></div>`
    },
    poster: {
      label: '✨ Soft Skills',
      title: 'Soft Skills',
      subtitle: 'HABILIDADES PERSONALES',
      html: `
      <div class="item"><div class="item-dot" style="background:#74c0fc"></div><div><strong>Adaptabilidad</strong><span class="period">Soft Skill</span>Capacidad de adaptarme rápidamente a nuevos proyectos, tecnologías y equipos de trabajo.</div></div>
      <div class="item"><div class="item-dot" style="background:#cc5de8"></div><div><strong>Creatividad</strong><span class="period">Soft Skill</span>Enfoque innovador para resolver problemas técnicos y diseñar soluciones únicas.</div></div>
      <div class="item"><div class="item-dot" style="background:#f59f00"></div><div><strong>Empatía</strong><span class="period">Soft Skill</span>Comprensión del usuario final y del equipo, fundamental para accesibilidad WCAG.</div></div>
      <div class="item"><div class="item-dot" style="background:#40c057"></div><div><strong>Pensamiento Analítico</strong><span class="period">Soft Skill</span>Descomposición de problemas complejos en soluciones manejables y escalables.</div></div>
      <div class="item"><div class="item-dot" style="background:#e03131"></div><div><strong>Trabajo en Equipo</strong><span class="period">Soft Skill</span>Experiencia en equipos ágiles en Accenture y como entrenador deportivo.</div></div>`
    }
  }
};

function t(key) {
  const keys = key.split('.');
  let value = translations[currentLang];
  for (const k of keys) value = value?.[k];
  return value || key;
}

function updateLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('portfolioLang', lang);
  document.documentElement.lang = lang;
  document.getElementById('subtitle-text').textContent = t('subtitle');
  document.getElementById('hint').textContent = t('hint');
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
  updateInteractablesLabels();
}

function updateInteractablesLabels() {
  interactables.forEach(obj => {
    const id = obj.userData.id;
    if (id && translations[currentLang][id]) {
      obj.userData.label = translations[currentLang][id].label;
      const content = translations[currentLang][id];
      obj.userData.content = {
        icon: obj.userData.content.icon,
        color: obj.userData.content.color,
        iconBg: obj.userData.content.iconBg,
        title: content.title,
        subtitle: content.subtitle,
        ...(content.html ? { html: content.html } : { items: content.items })
      };
    }
  });
}

/* ── Escena, cámara y renderer ── */
const scene  = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
camera.position.set(0, 4, 8);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({
  canvas: document.getElementById('canvas'),
  antialias: true,
  alpha: true
});
renderer.setSize(W, H);
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type    = THREE.PCFSoftShadowMap;
renderer.setClearColor(0x0a0a0f, 1);
renderer.toneMapping         = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.1;

/* ── Iluminación ── */
scene.add(new THREE.AmbientLight(0x1a1a2e, 2.5));

const dirLight = new THREE.DirectionalLight(0xffffff, 1.2);
dirLight.position.set(5, 8, 3);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = dirLight.shadow.mapSize.height = 2048;
scene.add(dirLight);

const pointBlue   = new THREE.PointLight(0x4dabf7, 1.5, 10);
const pointPurple = new THREE.PointLight(0xcc5de8, 1.0,  8);
const monitorGlow = new THREE.PointLight(0x74c0fc, 2.5,  3);
pointBlue.position.set(-3, 2, 0);
pointPurple.position.set(3, 1.5, 1);
monitorGlow.position.set(-1.5, 1.2, -1);
scene.add(pointBlue, pointPurple, monitorGlow);

const wGlow = new THREE.PointLight(0x74c0fc, 0.8, 5);
wGlow.position.set(2, 3, -3);
scene.add(wGlow);

/* ── Paleta de colores ── */
const C = {
  floor: 0x1a1a2e, wall: 0x0f0f1a, wallBack: 0x12121f,
  desk: 0x2d1b69, deskTop: 0x3d2b79,
  monitor: 0x1c1c28, monitorScreen: 0x74c0fc,
  chair: 0x1e3a5f,
  book1: 0xe03131, book2: 0x2f9e44, book3: 0xf59f00, book4: 0x1971c2,
  ball: 0xffffff, ballPatch: 0x1a1a2e,
  plant: 0x2f9e44, plantDark: 0x1a6b2a, pot: 0x8c6a4a,
  coffee: 0x5c3317, coffeeTop: 0x3e200e,
  keyboard: 0x2c2c3e,
  lamp: 0xffd43b, lampBase: 0x495057,
  shelf: 0x4a3520,
  rug: 0x862e9c,
  window: 0x74c0fc, windowFrame: 0x2c2c3e,
  trophy: 0xf59f00,
};

/* ── Helpers de geometría ── */
function flatMat(color, opts = {}) {
  return new THREE.MeshPhongMaterial({ color, shininess: 0, ...opts });
}
function mkBox(w, h, d, color, opts = {}) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), flatMat(color, opts));
}
function shadow(obj) {
  obj.traverse(m => { if (m.isMesh) { m.castShadow = true; m.receiveShadow = true; } });
  return obj;
}

const interactables = [];
const interactionIndicators = [];

/* ── Helper para crear indicadores de interacción ── */
function createInteractionIndicator(position, offsetY = 0.5) {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 96;
  const ctx = canvas.getContext('2d');
  
  // Bocadillo de diálogo
  ctx.fillStyle = 'rgba(116, 192, 252, 0.95)';
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.8)';
  ctx.lineWidth = 2;
  
  // Rectángulo redondeado del bocadillo
  const x = 20, y = 10, w = 88, h = 60, r = 12;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.arcTo(x + w, y, x + w, y + r, r);
  ctx.lineTo(x + w, y + h - r);
  ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
  ctx.lineTo(x + 50, y + h);
  ctx.lineTo(x + 40, y + h + 15); // Punta del bocadillo
  ctx.lineTo(x + 35, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.arcTo(x, y + h, x, y + h - r, r);
  ctx.lineTo(x, y + r);
  ctx.arcTo(x, y, x + r, y, r);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  
  // Icono de cursor/clic
  ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
  ctx.font = 'bold 28px Arial';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('👆', 64, 38);
  
  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  
  const spriteMat = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true,
    depthTest: false,
    depthWrite: false
  });
  const sprite = new THREE.Sprite(spriteMat);
  sprite.scale.set(0.8, 0.6, 1);
  sprite.position.copy(position);
  sprite.position.y += offsetY;
  sprite.userData.baseY = sprite.position.y;
  scene.add(sprite);
  interactionIndicators.push(sprite);
  return sprite;
}

/* ================================================================
   CONSTRUCCIÓN DE LA ESCENA
   ================================================================ */

/* ── Suelo ── */
const floor = mkBox(12, 0.1, 10, C.floor);
floor.position.set(0, -0.05, 1);
floor.receiveShadow = true;
scene.add(floor);

for (let i = -5; i <= 5; i++) {
  const g = new THREE.PlaneGeometry(12, 0.02);
  const m = new THREE.MeshBasicMaterial({ color: 0x1a2744, transparent: true, opacity: 0.5 });
  const mesh = new THREE.Mesh(g, m);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(0, 0, i);
  scene.add(mesh);
}
for (let i = -6; i <= 6; i++) {
  const g = new THREE.PlaneGeometry(0.02, 10);
  const m = new THREE.MeshBasicMaterial({ color: 0x1a2744, transparent: true, opacity: 0.5 });
  const mesh = new THREE.Mesh(g, m);
  mesh.rotation.x = -Math.PI / 2;
  mesh.position.set(i, 0, 1);
  scene.add(mesh);
}

/* ── Paredes y techo ── */
const backWall = mkBox(12, 7, 0.15, C.wallBack);
backWall.position.set(0, 3, -4); backWall.receiveShadow = true;
scene.add(backWall);
const leftWall  = mkBox(0.15, 7, 10, C.wall); leftWall.position.set(-6, 3, 1);
const rightWall = mkBox(0.15, 7, 10, C.wall); rightWall.position.set(6, 3, 1);
const ceiling   = mkBox(12, 0.1, 10, 0x0d0d18); ceiling.position.set(0, 7, 1);
scene.add(leftWall, rightWall, ceiling);

/* ── Ventana ── */
const wFrame = mkBox(2.5, 2.5, 0.2, C.windowFrame); wFrame.position.set(3, 3, -3.9); scene.add(wFrame);
const wGlass = mkBox(2.1, 2.1, 0.05, C.window, { transparent: true, opacity: 0.15 }); wGlass.position.set(3, 3, -3.82); scene.add(wGlass);
const wBarH  = mkBox(2.5, 0.08, 0.22, C.windowFrame); wBarH.position.set(3, 3, -3.88); scene.add(wBarH);
const wBarV  = mkBox(0.08, 2.5, 0.22, C.windowFrame); wBarV.position.set(3, 3, -3.88); scene.add(wBarV);

/* ── Escritorio ── */
const deskGroup = new THREE.Group();
const deskSurface = mkBox(4, 0.12, 1.6, C.deskTop); deskSurface.position.set(0, 0.06, 0); deskGroup.add(deskSurface);
[[-1.8,-0.55,-0.7],[1.8,-0.55,-0.7],[-1.8,-0.55,0.7],[1.8,-0.55,0.7]].forEach(([x,y,z]) => {
  const leg = mkBox(0.1, 1.0, 0.1, C.desk); leg.position.set(x, y, z); deskGroup.add(leg);
});
deskGroup.position.set(-1, 1, -2.5);
scene.add(shadow(deskGroup));

/* ── Monitor (interactuable: Experiencia) ── */
const monGroup = new THREE.Group();
const monBack   = mkBox(1.8, 1.1, 0.08, C.monitor); monGroup.add(monBack);
const monScreen = mkBox(1.65, 0.98, 0.05, C.monitorScreen, { transparent: true, opacity: 0.9, emissive: C.monitorScreen, emissiveIntensity: 0.3 });
monScreen.position.set(0, 0, 0.05); monGroup.add(monScreen);
for (let i = 0; i < 5; i++) {
  const line = mkBox(1.0 - i * 0.1, 0.04, 0.02, 0xffffff);
  line.material.transparent = true; line.material.opacity = 0.15;
  line.position.set(-0.2, 0.3 - i * 0.15, 0.09); monGroup.add(line);
}
const monNeck = mkBox(0.08, 0.35, 0.08, C.lampBase); monNeck.position.set(0, -0.72, 0); monGroup.add(monNeck);
const monBase = mkBox(0.5, 0.05, 0.3, C.lampBase);   monBase.position.set(0, -0.90, 0); monGroup.add(monBase);
monGroup.position.set(-1, 2.0, -2.9);
scene.add(shadow(monGroup));

const monHit = new THREE.Mesh(new THREE.BoxGeometry(1.9, 1.3, 0.3), new THREE.MeshBasicMaterial({ visible: false }));
monHit.position.set(-1, 1.6, -2.9);
monHit.userData = {
  id: 'monitor',
  label: t('monitor.label'),
  content: {
    icon: '💻', color: '#1971c2', iconBg: 'rgba(25,113,194,0.15)',
    title: t('monitor.title'),
    subtitle: t('monitor.subtitle'),
    items: t('monitor').items
  }
};
scene.add(monHit); interactables.push(monHit);
const monIndicator = createInteractionIndicator(monHit.position, 0.8);

/* ── Teclado ── */
const kb = mkBox(0.9, 0.04, 0.3, C.keyboard); kb.position.set(-1.1, 1.15, -2.4); kb.castShadow = true; scene.add(kb);
for (let r = 0; r < 3; r++) for (let c = 0; c < 10; c++) {
  const key = mkBox(0.07, 0.03, 0.07, 0x3a3a50);
  key.position.set(-1.5 + c * 0.09, 1.19, -2.32 + r * 0.09); scene.add(key);
}

/* ── Ratón ── */
const mouse = mkBox(0.12, 0.05, 0.2, 0x2c2c3e);
mouse.position.set(-0.5, 1.14, -2.4); mouse.castShadow = true; scene.add(mouse);

/* ── Taza de café (interactuable: Sobre mí) ── */
const mugGroup = new THREE.Group();
const mug = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.09, 0.22, 8), flatMat(C.coffee)); mug.castShadow = true; mugGroup.add(mug);
const mugTop = new THREE.Mesh(new THREE.CylinderGeometry(0.095, 0.095, 0.02, 8), flatMat(C.coffeeTop)); mugTop.position.y = 0.1; mugGroup.add(mugTop);
const handle = mkBox(0.06, 0.12, 0.03, C.coffee); handle.position.set(0.13, 0, 0); mugGroup.add(handle);
mugGroup.position.set(-0.3, 1.15, -2.55); scene.add(mugGroup);

const mugHit = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.35, 0.35), new THREE.MeshBasicMaterial({ visible: false }));
mugHit.position.copy(mugGroup.position);
mugHit.userData = {
  id: 'mug',
  label: t('mug.label'),
  content: {
    icon: '👋', color: '#f59f00', iconBg: 'rgba(245,159,0,0.15)',
    title: t('mug.title'),
    subtitle: t('mug.subtitle'),
    html: t('mug.html')
  }
};
scene.add(mugHit); interactables.push(mugHit);
createInteractionIndicator(mugHit.position, 0.4);

/* ── Tarjeta GitHub (interactuable: GitHub) ── */
const ghCard = mkBox(0.22, 0.28, 0.02, 0x1a1a2e); ghCard.position.set(-1.7, 1.14, -2.55); scene.add(ghCard);
const ghCardHit = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.4, 0.3), new THREE.MeshBasicMaterial({ visible: false }));
ghCardHit.position.copy(ghCard.position);
ghCardHit.userData = {
  id: 'github',
  label: t('github.label'),
  content: {
    icon: '🐙', color: '#868e96', iconBg: 'rgba(134,142,150,0.15)',
    title: t('github.title'),
    subtitle: t('github.subtitle'),
    html: t('github.html')
  }
};
scene.add(ghCardHit); interactables.push(ghCardHit);
createInteractionIndicator(ghCardHit.position, 0.4);

/* ── Estantería con libros (interactuable: Skills) ── */
const shelfGroup = new THREE.Group();
const shelfBoard = mkBox(2.2, 0.08, 0.35, C.shelf); shelfGroup.add(shelfBoard);
const bookColors = [C.book1, C.book2, C.book3, C.book4, 0x9b2226, 0x1864ab];
const bookWidths = [0.14, 0.18, 0.12, 0.16, 0.13, 0.15];
let bx = -1.0;
bookColors.forEach((bc, i) => {
  const bk = mkBox(bookWidths[i], 0.42 + i * 0.03, 0.28, bc);
  bk.position.set(bx + bookWidths[i] / 2, 0.26, 0); shelfGroup.add(bk);
  bx += bookWidths[i] + 0.02;
});
shelfGroup.position.set(-3.5, 2.6, -3.8);
scene.add(shadow(shelfGroup));

const shelfHit = new THREE.Mesh(new THREE.BoxGeometry(2.5, 0.9, 0.5), new THREE.MeshBasicMaterial({ visible: false }));
shelfHit.position.set(-3.5, 2.6, -3.8);
shelfHit.userData = {
  id: 'books',
  label: t('books.label'),
  content: {
    icon: '⚡', color: '#2f9e44', iconBg: 'rgba(47,158,68,0.15)',
    title: t('books.title'),
    subtitle: t('books.subtitle'),
    html: t('books.html')
  }
};
scene.add(shelfHit); interactables.push(shelfHit);
createInteractionIndicator(shelfHit.position, 0.8);

/* ── Silla ── */
const chairGroup = new THREE.Group();
const seat = mkBox(0.9, 0.08, 0.9, C.chair); chairGroup.add(seat);
const back = mkBox(0.9, 1.0, 0.1, C.chair); back.position.set(0, 0.54, -0.4); chairGroup.add(back);
const backPillow = mkBox(0.8, 0.6, 0.08, 0x1a4a6e); backPillow.position.set(0, 0.54, -0.36); chairGroup.add(backPillow);
[[0.35,0.35],[0.35,-0.35],[-0.35,0.35],[-0.35,-0.35]].forEach(([x, z]) => {
  const leg = mkBox(0.06, 0.55, 0.06, 0x364fc7); leg.position.set(x, -0.32, z); chairGroup.add(leg);
  const wheel = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), flatMat(0x1c1c28)); wheel.position.set(x, -0.6, z); chairGroup.add(wheel);
});
chairGroup.rotation.y = Math.PI;
chairGroup.position.set(-1, 0.65, -0.8);
scene.add(shadow(chairGroup));

/* ── Lámpara de escritorio ── */
const lampGroup = new THREE.Group();
lampGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.15, 0.06, 8), flatMat(C.lampBase)));
const lArm1 = mkBox(0.05, 0.5, 0.05, C.lampBase); lArm1.position.set(0, 0.28, 0); lampGroup.add(lArm1);
const lArm2 = mkBox(0.05, 0.4, 0.05, C.lampBase); lArm2.rotation.z = Math.PI / 6; lArm2.position.set(0.1, 0.6, 0); lampGroup.add(lArm2);
const lampHead = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.14, 0.12, 8), flatMat(C.lampBase)); lampHead.position.set(0.22, 0.8, 0); lampGroup.add(lampHead);
const lBulb = new THREE.Mesh(new THREE.SphereGeometry(0.06, 8, 8), new THREE.MeshBasicMaterial({ color: C.lamp })); lBulb.position.set(0.22, 0.75, 0); lampGroup.add(lBulb);
lampGroup.position.set(0.4, 1.12, -2.88);
scene.add(shadow(lampGroup));

/* ── Planta ── */
const plantGroup = new THREE.Group();
plantGroup.add(new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.14, 0.32, 8), flatMat(C.pot)));
const soil = new THREE.Mesh(new THREE.CylinderGeometry(0.17, 0.17, 0.04, 8), flatMat(0x2d1a10)); soil.position.y = 0.16; plantGroup.add(soil);
[[0,0.5,0],[0.3,0.2,0.1],[-0.3,0.2,-0.1],[0,0,0],
 [0,0.6,0],[0.15,0.25,-0.2],[-0.25,0.15,0.2],[0,0,0],
 [0,0.55,0],[0.35,0.1,0.05],[-0.1,0.3,0.25],[0,0,0]].reduce((acc, v, i) => {
  acc.push(v); if (acc.length === 4) {
    const [v0,v1,v2,v3] = acc;
    const gLeaf = new THREE.BufferGeometry();
    gLeaf.setAttribute('position', new THREE.BufferAttribute(new Float32Array([...v0,...v1,...v2,...v0,...v2,...v3,...v0,...v3,...v1]), 3));
    gLeaf.computeVertexNormals();
    const colors = [C.plant, C.plantDark, 0x40c057];
    const mLeaf = new THREE.Mesh(gLeaf, flatMat(colors[Math.floor(i/4)], { side: THREE.DoubleSide }));
    mLeaf.position.y = 0.32; plantGroup.add(mLeaf);
    return [];
  } return acc;
}, []);
plantGroup.position.set(4, 0.16, -3.5);
scene.add(shadow(plantGroup));

/* ── Balón de fútbol (interactuable: Entrenador) ── */
const ballGroup = new THREE.Group();
const ballMesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.28, 2), flatMat(C.ball)); ballMesh.castShadow = true; ballGroup.add(ballMesh);
for (let i = 0; i < 6; i++) {
  const patch = new THREE.Mesh(new THREE.CircleGeometry(0.07, 5), flatMat(C.ballPatch));
  const theta = i * Math.PI * 2 / 6, phi = Math.PI / 4;
  patch.position.set(0.28 * Math.cos(theta) * Math.sin(phi), 0.28 * Math.cos(phi), 0.28 * Math.sin(theta) * Math.sin(phi));
  patch.lookAt(0, 0, 0); patch.position.multiplyScalar(1.01); ballGroup.add(patch);
}
const topPatch = new THREE.Mesh(new THREE.CircleGeometry(0.07, 5), flatMat(C.ballPatch)); topPatch.position.set(0, 0.281, 0); topPatch.rotation.x = Math.PI / 2; ballGroup.add(topPatch);
ballGroup.position.set(2.5, 0.28, -1.5); scene.add(ballGroup);

const ballHit = new THREE.Mesh(new THREE.SphereGeometry(0.45, 8, 8), new THREE.MeshBasicMaterial({ visible: false }));
ballHit.position.copy(ballGroup.position);
ballHit.userData = {
  id: 'ball',
  label: t('ball.label'),
  content: {
    icon: '⚽', color: '#2f9e44', iconBg: 'rgba(47,158,68,0.15)',
    title: t('ball.title'),
    subtitle: t('ball.subtitle'),
    html: t('ball.html')
  }
};
scene.add(ballHit); interactables.push(ballHit);
const ballIndicator = createInteractionIndicator(ballHit.position, 0.6);
ballIndicator.userData.followsBall = true;

/* ── Trofeo (interactuable: Proyectos) ── */
const trophyGroup = new THREE.Group();
trophyGroup.add(mkBox(0.3, 0.06, 0.22, C.shelf));
const tPillar = mkBox(0.08, 0.2, 0.08, C.lampBase); tPillar.position.y = 0.13; trophyGroup.add(tPillar);
const tCup = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.08, 0.24, 8), flatMat(C.trophy)); tCup.position.y = 0.35; trophyGroup.add(tCup);
const tTop = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), flatMat(C.lamp)); tTop.position.y = 0.5; trophyGroup.add(tTop);
const th1 = mkBox(0.18, 0.08, 0.04, C.trophy); th1.position.set(0.15, 0.33, 0); trophyGroup.add(th1);
const th2 = mkBox(0.18, 0.08, 0.04, C.trophy); th2.position.set(-0.15, 0.33, 0); trophyGroup.add(th2);
trophyGroup.position.set(-2.4, 1.15, -2.7);
scene.add(shadow(trophyGroup));

const trophyHit = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.8, 0.5), new THREE.MeshBasicMaterial({ visible: false }));
trophyHit.position.set(-2.4, 1.45, -2.7);
trophyHit.userData = {
  id: 'trophy',
  label: t('trophy.label'),
  content: {
    icon: '🚀', color: '#f59f00', iconBg: 'rgba(245,159,0,0.15)',
    title: t('trophy.title'),
    subtitle: t('trophy.subtitle'),
    html: t('trophy.html')
  }
};
scene.add(trophyHit); interactables.push(trophyHit);
createInteractionIndicator(trophyHit.position, 0.6);

/* ── Póster decorativo ── */
const posterGroup = new THREE.Group();
posterGroup.add(mkBox(1.5, 2.0, 0.04, 0x1a1a2e));
const pBorder = mkBox(1.6, 2.1, 0.02, 0x364fc7); pBorder.position.set(0, 0, -0.03); posterGroup.add(pBorder);
[0x364fc7, 0x1864ab, 0x1971c2, 0x1c7ed6, 0x228be6].forEach((c, i) => {
  const b = mkBox(1.2, 0.22, 0.05, c); b.material.transparent = true; b.material.opacity = 0.6;
  b.position.set(0, 0.6 - i * 0.3, 0.03); posterGroup.add(b);
});
posterGroup.position.set(3, 2.8, -3.88); scene.add(posterGroup);

/* ── Libros en el suelo (interactuable: Soft Skills) ── */
const floorBooksGroup = new THREE.Group();
const fbColors = [0x364fc7, 0x1864ab, 0x1971c2, 0x228be6];
fbColors.forEach((color, i) => {
  const book = mkBox(0.35, 0.08, 0.5, color);
  book.rotation.y = Math.random() * 0.3 - 0.15;
  book.position.set(
    (Math.random() - 0.5) * 0.2,
    0.04 + i * 0.085,
    (Math.random() - 0.5) * 0.15
  );
  floorBooksGroup.add(book);
});
floorBooksGroup.position.set(-4.5, 0, -1);
scene.add(shadow(floorBooksGroup));

const floorBooksHit = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.1, 0.7), new THREE.MeshBasicMaterial({ visible: false }));
floorBooksHit.position.set(-4.5, 0.2, -1);
floorBooksHit.userData = {
  id: 'poster',
  label: t('poster.label'),
  content: {
    icon: '🧠', color: '#364fc7', iconBg: 'rgba(54,79,199,0.15)',
    title: t('poster.title'),
    subtitle: t('poster.subtitle'),
    html: t('poster.html')
  }
};
scene.add(floorBooksHit); interactables.push(floorBooksHit);
createInteractionIndicator(floorBooksHit.position, 0.5);

/* ── Alfombra ── */
const rug = new THREE.Mesh(new THREE.PlaneGeometry(3, 2.5), flatMat(C.rug, { transparent: true, opacity: 0.35 }));
rug.rotation.x = -Math.PI / 2; rug.position.set(1.5, 0.01, -0.5); scene.add(rug);

/* ── Decoración extra ── */
// Cable del monitor
const cable = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 1.2, 6), flatMat(0x1a1a1a));
cable.rotation.z = Math.PI / 8; cable.position.set(-1.2, 0.65, -2.7); scene.add(cable);

// Organizador de escritorio con lápices
const pencilHolder = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 0.18, 8), flatMat(0x2c3e50));
pencilHolder.position.set(-1.8, 1.20, -2.5); scene.add(shadow(pencilHolder));
[[0.03,0.3,0],[-0.03,0.28,0.02],[0,0.32,-0.03]].forEach(([x,h,z]) => {
  const pencil = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.008, h, 6), flatMat([0xffd700, 0x3498db, 0xe74c3c][Math.floor(Math.random() * 3)]));
  pencil.position.set(-1.8 + x, 1.20 + h/2, -2.5 + z); scene.add(pencil);
});

// Caja pequeña debajo del escritorio
const boxUnderDesk = mkBox(0.4, 0.3, 0.35, 0x2c2c3e);
boxUnderDesk.position.set(0, 0.15, -2.5); scene.add(shadow(boxUnderDesk));
const boxLabel = mkBox(0.35, 0.08, 0.02, 0x4a5568);
boxLabel.position.set(0, 0.25, -2.33); scene.add(boxLabel);

// Cuadros pequeños en la pared
const frame1 = mkBox(0.35, 0.45, 0.03, 0x2c3e50); frame1.position.set(-5, 2.5, -3.97); scene.add(frame1);
const frame1Inner = mkBox(0.30, 0.40, 0.02, 0x3498db); frame1Inner.material.opacity = 0.3; frame1Inner.material.transparent = true;
frame1Inner.position.set(-5, 2.5, -3.95); scene.add(frame1Inner);

const frame2 = mkBox(0.3, 0.3, 0.03, 0x2c3e50); frame2.position.set(5, 3.2, -3.97); scene.add(frame2);
const frame2Inner = mkBox(0.25, 0.25, 0.02, 0xe74c3c); frame2Inner.material.opacity = 0.3; frame2Inner.material.transparent = true;
frame2Inner.position.set(5, 3.2, -3.95); scene.add(frame2Inner);

// Papelera pequeña
const bin = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.15, 0.35, 8), flatMat(0x34495e));
bin.position.set(-2.5, 0.18, -1); scene.add(shadow(bin));

/* ── Partículas flotantes ── */
const partGeo = new THREE.BufferGeometry();
const partCount = 120;
const partPos = new Float32Array(partCount * 3);
for (let i = 0; i < partCount * 3; i += 3) {
  partPos[i]     = (Math.random() - 0.5) * 10;
  partPos[i + 1] = Math.random() * 6;
  partPos[i + 2] = (Math.random() - 0.5) * 8 - 1;
}
partGeo.setAttribute('position', new THREE.BufferAttribute(partPos, 3));
const particles = new THREE.Points(partGeo, new THREE.PointsMaterial({ color: 0x4dabf7, size: 0.04, transparent: true, opacity: 0.4 }));
scene.add(particles);

/* ================================================================
   INTERACCIÓN — Raycasting, modal, cámara
   ================================================================ */

const raycaster = new THREE.Raycaster();
const pointer   = new THREE.Vector2();
let hoveredObj  = null;
let currentCam  = 0;

const camViews = [
  { pos: [0, 4, 8],  look: [0, 0.5, 0] },
  { pos: [6, 3, 1],  look: [-1, 1, -2] },
];

const modal        = document.getElementById('modal');
const modalBackdrop= document.getElementById('modal-backdrop');
const modalTitle   = document.getElementById('modal-title');
const modalSubtitle= document.getElementById('modal-subtitle');
const modalContent = document.getElementById('modal-content');
const modalIcon    = document.getElementById('modal-icon');
const tooltip      = document.getElementById('tooltip');
const crosshair    = document.getElementById('crosshair');
let isModalOpen    = false;

function showModal(data) {
  const c = data.content;
  modalIcon.textContent  = c.icon;
  modalIcon.style.background = c.iconBg;
  modalTitle.textContent    = c.title;
  modalSubtitle.textContent = c.subtitle;
  let html = '';
  if (c.html) {
    html = c.html;
  } else if (c.items) {
    c.items.forEach(item => {
      html += `<div class="item"><div class="item-dot" style="background:${item.dot}"></div>
      <div><strong>${item.title}</strong><span class="period">${item.period}</span>${item.desc}</div></div>`;
    });
  }
  modalContent.innerHTML = html;
  modalContent.scrollTop = 0;
  modal.classList.add('visible');
  modalBackdrop.classList.add('visible');
  isModalOpen = true;
}

function closeModal() {
  modal.classList.remove('visible');
  modalBackdrop.classList.remove('visible');
  isModalOpen = false;
}

document.getElementById('modal-close').onclick = closeModal;
modalBackdrop.onclick = closeModal;

window.addEventListener('mousemove', e => {
  pointer.x = (e.clientX / W) * 2 - 1;
  pointer.y = -(e.clientY / H) * 2 + 1;
  crosshair.style.left = e.clientX + 'px';
  crosshair.style.top  = e.clientY + 'px';
  tooltip.style.left   = (e.clientX + 14) + 'px';
  tooltip.style.top    = (e.clientY - 8) + 'px';

  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactables);
  if (hits.length) {
    const obj = hits[0].object;
    if (obj !== hoveredObj) {
      hoveredObj = obj;
      tooltip.textContent  = obj.userData.label || '';
      tooltip.style.opacity = '1';
      document.body.style.cursor = 'pointer';
    }
  } else {
    hoveredObj = null;
    tooltip.style.opacity = '0';
    document.body.style.cursor = 'default';
  }
});

window.addEventListener('click', () => {
  if (isModalOpen) return;
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(interactables);
  if (hits.length) showModal(hits[0].object.userData);
});

/* ── Navegación por puntos ── */
const targetCamPos  = new THREE.Vector3(0, 4, 8);
const targetCamLook = new THREE.Vector3(0, 0.5, 0);

document.querySelectorAll('.dot').forEach((dot, i) => {
  dot.onclick = () => {
    document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
    currentCam = i;
    targetCamPos.set(...camViews[i].pos);
    targetCamLook.set(...camViews[i].look);
  };
});

/* ================================================================
   BUCLE DE ANIMACIÓN
   ================================================================ */

const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);
  const t = clock.getElapsedTime();

  /* Movimiento suave de cámara */
  if (currentCam === 0) {
    camera.position.x += (targetCamPos.x + Math.sin(t * 0.15) * 0.3 - camera.position.x) * 0.02;
    camera.position.y += (targetCamPos.y + Math.sin(t * 0.20) * 0.1 - camera.position.y) * 0.02;
    camera.position.z += (targetCamPos.z - camera.position.z) * 0.02;
  } else {
    camera.position.x += (targetCamPos.x - camera.position.x) * 0.04;
    camera.position.y += (targetCamPos.y - camera.position.y) * 0.04;
    camera.position.z += (targetCamPos.z - camera.position.z) * 0.04;
  }
  camera.lookAt(targetCamLook.x + (currentCam === 0 ? Math.sin(t * 0.1) * 0.2 : 0), targetCamLook.y, targetCamLook.z);

  /* Balón animado */
  ballGroup.rotation.x = t * 0.5;
  ballGroup.rotation.z = Math.sin(t * 0.3) * 0.2;
  ballGroup.position.y = 0.28 + Math.sin(t * 1.2) * 0.04;
  ballHit.position.copy(ballGroup.position);

  /* Actualizar indicadores de interacción */
  interactionIndicators.forEach((indicator, i) => {
    // Seguir al balón si es necesario
    if (indicator.userData.followsBall) {
      indicator.position.copy(ballHit.position);
      indicator.userData.baseY = ballHit.position.y + 0.6;
    }
    
    // Animación de flotación y pulsación
    const phase = i * 0.8;
    const baseY = indicator.userData.baseY;
    indicator.position.y = baseY + Math.sin(t * 2 + phase) * 0.04;
    indicator.material.opacity = 0.85 + Math.sin(t * 3 + phase) * 0.15;
  });

  /* Pulso del monitor */
  monitorGlow.intensity = 2.0 + Math.sin(t * 2) * 0.5;

  /* Partículas flotantes */
  const pa = particles.geometry.attributes.position.array;
  for (let i = 1; i < pa.length; i += 3) { pa[i] += 0.002; if (pa[i] > 7) pa[i] = 0; }
  particles.geometry.attributes.position.needsUpdate = true;

  /* Luces pulsantes */
  pointBlue.intensity   = 1.2 + Math.sin(t * 0.7) * 0.3;
  pointPurple.intensity = 0.8 + Math.sin(t * 0.5 + 1) * 0.3;

  renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
  const w = window.innerWidth, h = window.innerHeight;
  camera.aspect = w / h; camera.updateProjectionMatrix();
  renderer.setSize(w, h);
});

/* ── Cambio de idioma ── */
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    updateLanguage(btn.dataset.lang);
  });
});

// Aplicar idioma inicial
updateLanguage(currentLang);
