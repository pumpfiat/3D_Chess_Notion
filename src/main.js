import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
import { createMenu } from './menu.js';

let scene, camera, renderer;

function init() {
  // Scene setup
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  document.body.appendChild(renderer.domElement);

  // Dramatic lighting
  const ambient = new THREE.AmbientLight(0x404040, 0.6);
  scene.add(ambient);
  
  const dirLight = new THREE.DirectionalLight(0xffddaa, 1.2);
  dirLight.position.set(10, 15, 10);
  scene.add(dirLight);

  camera.position.set(0, 8, 12);
  camera.lookAt(0, 0, 0);

  // Start with menu
  createMenu(document.getElementById('menu'), scene, camera, renderer);

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  animate();
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

init();