import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";
import { FontLoader, TextGeometry } from "three/examples/jsm/Addons.js";

// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const matcapTexture = textureLoader.load("./textures/matcaps/8.png");
matcapTexture.colorSpace = THREE.SRGBColorSpace;

// Arrays to store text and donuts references
let text;
const donuts = [];

// Font loader and text creation
const fontLoader = new FontLoader();
fontLoader.load("fonts/helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello dev_Felz", {
    font,
    size: 0.5,
    depth: 0.2,
    curveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 3,
  });
  textGeometry.center();

  const material = new THREE.MeshMatcapMaterial();
  material.matcap = matcapTexture;

  text = new THREE.Mesh(textGeometry, material); // Store reference to the text
  scene.add(text);

  // Donut creation
  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);
  const donutMaterial = new THREE.MeshMatcapMaterial({
    matcap: matcapTexture,
  });

  for (let i = 0; i < 200; i++) {
    const donut = new THREE.Mesh(donutGeometry, donutMaterial);

    // Random positions
    donut.position.x = (Math.random() - 0.5) * 10;
    donut.position.y = (Math.random() - 0.5) * 10;
    donut.position.z = (Math.random() - 0.5) * 10;

    // Random rotations
    donut.rotation.x = Math.random() * Math.PI;
    donut.rotation.y = Math.random() * Math.PI;

    // Random scale
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);

    donuts.push(donut); // Store reference to each donut
    scene.add(donut);
  }
});

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Rotate the text
  // if (text) {
  //   text.rotation.y += 0.01; // Rotate text around the Y-axis
  // }

  // Rotate all the donuts
  donuts.forEach((donut) => {
    donut.rotation.x += 0.01; // Rotate around X-axis
    donut.rotation.y += 0.01; // Rotate around Y-axis
  });

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
