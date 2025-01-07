import * as THREE from "three";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const geometry = new THREE.BoxGeometry(1, 1, 1);
// const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
// const mesh = new THREE.Mesh(geometry, material);
// mesh.position.set(0.7, -0.6, 1);

// // scale
// mesh.scale.set(2, 0.5, 0.5);

// // rotation
// mesh.rotation.reorder("YXZ");
// mesh.rotation.y = Math.PI * 0.25;
// mesh.rotation.x = Math.PI * 0.25;
// scene.add(mesh);

const group = new THREE.Group();
group.position.y = 1;
group.scale.y = 2;
group.scale.y = 2;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0xff0000 })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.7, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 0.7, 1),
  new THREE.MeshBasicMaterial({ color: 0x0000ff })
);
cube2.position.x = -1.5;
cube3.position.x = 1.5;
group.add(cube1);
group.add(cube2);
group.add(cube3);

// axis helper
const axisHelper = new THREE.AxesHelper();
scene.add(axisHelper);

/**
 * Sizes
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
camera.position.z = 3;

scene.add(camera);

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
