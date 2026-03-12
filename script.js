import * as THREE from 'https://unpkg.com/three@0.128.0/build/three.module.js';

// --- Setup ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0a0a0f);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 20;

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// --- Code Snippets ---
const codeStrings = [
  'const', 'let', 'var', 'function', '() =>', '=>', '{}', '[]', 'if', 'else', 'for',
  'while', 'return', 'import', 'export', 'default', 'class', 'extends', 'this', 'super',
  'try', 'catch', 'finally', 'throw', 'new', 'delete', 'typeof', 'instanceof',
  'React', 'useState', 'useEffect', 'component', 'props', 'state', 'render',
  'HTML', 'CSS', 'JSX', 'Node', 'npm', 'yarn', 'git', 'push', 'pull',
  '<div>', '</div>', '<span>', '<h1>', '<p>', 'href', 'src', 'alt',
  'backgroundColor:', 'display:', 'flex', 'grid', 'margin:', 'padding:',
  'function name()', 'console.log', '=> { }', '...spread', 'await', 'async',
  'Promise', 'then', 'catch', 'try { }', 'import { }', 'export default',
  'Three.js', 'WebGL', 'canvas', 'animation', 'requestFrame',
  '0', '1', '01', '10', 'true', 'false', 'null', 'undefined', 'NaN'
];

const colors = [
  '#a78bfa', '#8b5cf6', '#7c3aed', '#6d28d9', '#5b21b6',
  '#60a5fa', '#3b82f6', '#2563eb', '#1d4ed8',
  '#2dd4bf', '#14b8a6', '#0d9488',
  '#ffffff', '#e2e8f0', '#cbd5e1'
];

const codeGroup = new THREE.Group();
const spriteCount = 200; // slightly reduced

for (let i = 0; i < spriteCount; i++) {
  const text = codeStrings[Math.floor(Math.random() * codeStrings.length)];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.font = 'Bold 48px "Fira Code", "Courier New", monospace';
  ctx.fillStyle = color;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = color;
  ctx.shadowBlur = 15;
  ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  
  const texture = new THREE.CanvasTexture(canvas);
  // Use NormalBlending with low opacity
  const material = new THREE.SpriteMaterial({ 
    map: texture, 
    transparent: true, 
    depthWrite: false, 
    blending: THREE.NormalBlending,
    opacity: 0.3  // lower opacity
  });
  const sprite = new THREE.Sprite(material);
  
  const radius = 12;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos(2 * Math.random() - 1);
  const x = radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.sin(phi) * Math.sin(theta);
  const z = radius * Math.cos(phi);
  sprite.position.set(x, y, z);
  
  const scale = 1 + Math.random() * 2;
  sprite.scale.set(scale * 1.5, scale * 0.75, 1);
  
  codeGroup.add(sprite);
}

scene.add(codeGroup);

// --- Faint lines ---
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x7c3aed, opacity: 0.05, transparent: true }); // lower opacity
for (let j = 0; j < 30; j++) {
  const points = [];
  for (let k = 0; k < 5; k++) {
    const angle = (k / 5) * Math.PI * 2 + j;
    const r = 10 + Math.sin(j * 2) * 3;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle * 2) * 4;
    const z = Math.sin(angle) * r * 0.5;
    points.push(new THREE.Vector3(x, y, z));
  }
  const geometry = new THREE.BufferGeometry().setFromPoints(points);
  const line = new THREE.Line(geometry, lineMaterial);
  scene.add(line);
}

// --- Animation ---
function animate() {
  requestAnimationFrame(animate);
  
  const elapsedTime = performance.now() / 1000;
  
  codeGroup.rotation.y = elapsedTime * 0.1;
  codeGroup.rotation.x = elapsedTime * 0.05;
  codeGroup.rotation.z = elapsedTime * 0.02;
  
  renderer.render(scene, camera);
}

animate();

// --- Resize handler ---
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});