import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { createMenu } from './menu.js';

const sceneRoot = document.getElementById('scene-root');
const menuRoot = document.getElementById('menu-root');
const bootOverlay = document.getElementById('boot-overlay');

const sceneThemes = {
  colosseum: {
    fog: 0x06080b,
    background: 0x06080b,
    key: 0xffdcb3,
    rim: 0x85a5ff,
    ground: 0x121417,
    ring: 0x3a2f1f,
  },
  nature: {
    fog: 0x0b1110,
    background: 0x0b1110,
    key: 0xc4ffd1,
    rim: 0x88d9ff,
    ground: 0x1a2a23,
    ring: 0x315244,
  },
};

let renderer;
let scene;
let camera;
let clock;
let animationFrame = 0;

let ground;
let ring;
let keyLight;
let rimLight;
let helpPanel;

init();

function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(9.5, 8.3, 11.5);
  camera.lookAt(0, 1.4, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setPixelRatio(getTargetPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
  sceneRoot.appendChild(renderer.domElement);

  addLighting();
  addEnvironment();
  applySceneTheme('colosseum');

  clock = new THREE.Clock();

  const menu = createMenu(menuRoot, {
    onChange: (state) => {
      applySceneTheme(state.scene);
    },
    onStart: (state) => {
      console.info('[Colosseum Clash] Start request:', state);
      showToast(`Starting ${state.scene} arena as ${state.side} with ${state.faction} faction.`);
    },
    onHowToPlay: showHowToPlay,
  });
  // Ensure visual + state baseline are synchronized.
  menu.setState({ scene: 'colosseum' });

  window.addEventListener('resize', onResize, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  requestAnimationFrame(() => {
    bootOverlay?.classList.add('fade-out');
  });

  animate();
}

function addLighting() {
  const ambient = new THREE.AmbientLight(0x9bb2ff, 0.13);
  scene.add(ambient);

  keyLight = new THREE.DirectionalLight(0xffdcb3, 1.5);
  keyLight.position.set(14, 20, 10);
  keyLight.castShadow = true;
  keyLight.shadow.mapSize.set(1024, 1024);
  keyLight.shadow.camera.near = 1;
  keyLight.shadow.camera.far = 80;
  keyLight.shadow.camera.left = -18;
  keyLight.shadow.camera.right = 18;
  keyLight.shadow.camera.top = 18;
  keyLight.shadow.camera.bottom = -18;
  keyLight.shadow.bias = -0.00035;
  scene.add(keyLight);

  rimLight = new THREE.DirectionalLight(0x85a5ff, 0.45);
  rimLight.position.set(-10, 7, -14);
  scene.add(rimLight);
}

function addEnvironment() {
  ground = new THREE.Mesh(
    new THREE.PlaneGeometry(220, 220),
    new THREE.MeshStandardMaterial({
      color: 0x121417,
      roughness: 0.92,
      metalness: 0.04,
    }),
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  const arenaCore = new THREE.Mesh(
    new THREE.CylinderGeometry(8.4, 10.2, 0.9, 44, 1, false),
    new THREE.MeshStandardMaterial({
      color: 0x2a2218,
      roughness: 0.82,
      metalness: 0.1,
    }),
  );
  arenaCore.position.y = 0.42;
  arenaCore.receiveShadow = true;
  arenaCore.castShadow = true;
  scene.add(arenaCore);

  ring = new THREE.Mesh(
    new THREE.TorusGeometry(10.6, 0.22, 20, 80),
    new THREE.MeshStandardMaterial({ color: 0x3a2f1f, roughness: 0.7, metalness: 0.15 }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.83;
  ring.castShadow = true;
  scene.add(ring);
}

function applySceneTheme(sceneName) {
  const theme = sceneThemes[sceneName] || sceneThemes.colosseum;
  scene.background = new THREE.Color(theme.background);
  scene.fog = new THREE.Fog(theme.fog, 16, 52);

  ground.material.color.setHex(theme.ground);
  ring.material.color.setHex(theme.ring);

  keyLight.color.setHex(theme.key);
  rimLight.color.setHex(theme.rim);
}

function showToast(message) {
  if (!message) return;

  const toast = document.createElement('div');
  toast.className =
    'pointer-events-none absolute left-1/2 top-6 z-30 -translate-x-1/2 rounded-md border border-[#EAB308]/35 bg-[#9F1239]/45 px-4 py-2 text-sm text-[#FDF4E3] shadow-lg shadow-black/35';
  toast.textContent = message;

  menuRoot.appendChild(toast);

  window.setTimeout(() => {
    toast.remove();
  }, 2800);
}

function showHowToPlay() {
  if (helpPanel) {
    helpPanel.remove();
  }

  helpPanel = document.createElement('aside');
  helpPanel.className =
    'absolute inset-x-4 bottom-4 z-30 rounded-xl border border-white/20 bg-[rgba(10,10,12,0.86)] p-4 text-sm text-[#F5F5F5] backdrop-blur-md sm:inset-x-auto sm:right-6 sm:w-[28rem]';

  helpPanel.innerHTML = `
    <h3 class="text-xs uppercase tracking-[0.2em] text-[#EAB308]">How to Play Chess</h3>
    <ul class="mt-2 list-disc space-y-1 pl-5 text-[#E9E9EA]">
      <li>Checkmate the enemy king to win.</li>
      <li>Control central squares to improve mobility.</li>
      <li>Develop pieces early and keep your king protected.</li>
    </ul>
    <button type="button" id="close-help" class="mt-3 text-xs uppercase tracking-[0.12em] text-[#B8BCC8] hover:text-white">
      Close
    </button>
  `;

  menuRoot.appendChild(helpPanel);
  helpPanel.querySelector('#close-help')?.addEventListener('click', () => helpPanel?.remove());
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setPixelRatio(getTargetPixelRatio());
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function getTargetPixelRatio() {
  return Math.min(window.devicePixelRatio || 1, 1.75);
}

function onVisibilityChange() {
  if (document.hidden) {
    cancelAnimationFrame(animationFrame);
    return;
  }

  animate();
}

function animate() {
  animationFrame = requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  // Subtle cinematic idle motion.
  camera.position.x = 9.5 + Math.sin(t * 0.14) * 0.35;
  camera.position.y = 8.3 + Math.sin(t * 0.18 + 1.5) * 0.22;
  camera.lookAt(0, 1.4 + Math.sin(t * 0.16) * 0.08, 0);

  renderer.render(scene, camera);
}
