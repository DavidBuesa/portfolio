# 🎮 Portfolio 3D — David Buesa Lorente

Portfolio interactivo con una habitación lowpoly en Three.js.  
Haz clic en los objetos de la escena para explorar cada sección.

## 🗂 Estructura

```
portfolio_david_buesa/
├── index.html              ← Punto de entrada
├── README.md
└── assets/
    ├── css/
    │   └── styles.css      ← Estilos de la UI (modal, header, tooltip…)
    └── js/
        └── scene.js        ← Escena 3D completa (Three.js)
```

## 🖱 Objetos interactuables

| Objeto | Sección |
|---|---|
| 💻 Monitor | Experiencia laboral (Accenture) |
| ☕ Taza de café | Sobre mí / Formación / Idiomas |
| 📚 Estantería | Stack técnico (Backend, Frontend, DevOps, Mobile) |
| 🏆 Trofeo | Proyectos personales (Color Contrast Checker, WCAG Auditor, Cinematch, Tactix) |
| 🖼 Póster | Soft Skills |
| 🐙 Tarjeta (escritorio) | GitHub & VS Code Marketplace |
| ⚽ Balón de fútbol | Entrenador de fútbol (Prebenjamín / Infantil) |

## 🎥 Vistas de cámara

Usa los tres puntos en la parte inferior para cambiar entre:
- **Vista principal** — perspectiva frontal con balanceo suave
- **Vista lateral** — ángulo desde la derecha

## 🚀 Cómo abrirlo

Abre `index.html` directamente en el navegador.  
> ⚠️ Requiere conexión a internet para cargar Three.js y las fuentes Google.

## 🛠 Tecnologías

- [Three.js r128](https://threejs.org/) — motor 3D WebGL
- Vanilla JS / HTML5 / CSS3
- Google Fonts: Space Grotesk + JetBrains Mono
