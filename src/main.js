import * as THREE from 'https://unpkg.com/three@0.164.1/build/three.module.js';
import { createMenu } from './menu.js';

const sceneRoot = document.getElementById('scene-root');
const menuRoot = document.getElementById('menu-root');
const bootOverlay = document.getElementById('boot-overlay');

let renderer;
let scene;
let camera;
let clock;
let ground;

init();

function init() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x06080b);
  scene.fog = new THREE.Fog(0x06080b, 16, 52);

  camera = new THREE.PerspectiveCamera(54, window.innerWidth / window.innerHeight, 0.1, 200);
  camera.position.set(9.5, 8.3, 11.5);
  camera.lookAt(0, 1.4, 0);

  renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 0.95;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);

  sceneRoot.appendChild(renderer.domElement);

  addLighting();
  addEnvironment();

  clock = new THREE.Clock();

  createMenu(menuRoot);

  window.addEventListener('resize', onResize, { passive: true });

  requestAnimationFrame(() => {
    bootOverlay?.classList.add('fade-out');
  });

  animate();
}

function addLighting() {
  const ambient = new THREE.AmbientLight(0x9bb2ff, 0.13);
  scene.add(ambient);

  const keyLight = new THREE.DirectionalLight(0xffdcb3, 1.5);
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

  const rimLight = new THREE.DirectionalLight(0x85a5ff, 0.45);
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

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(10.6, 0.22, 20, 80),
    new THREE.MeshStandardMaterial({ color: 0x3a2f1f, roughness: 0.7, metalness: 0.15 }),
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.83;
  ring.castShadow = true;
  scene.add(ring);
}

function onResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  requestAnimationFrame(animate);

  const t = clock.getElapsedTime();

  // Subtle cinematic idle motion.
  camera.position.x = 9.5 + Math.sin(t * 0.14) * 0.35;
  camera.position.y = 8.3 + Math.sin(t * 0.18 + 1.5) * 0.22;
  camera.lookAt(0, 1.4 + Math.sin(t * 0.16) * 0.08, 0);

  if (ground) {
    ground.material.color.offsetHSL(0, 0, Math.sin(t * 0.08) * 0.0008);
  }

  renderer.render(scene, camera);
}
