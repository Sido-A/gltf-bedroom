import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "./OrbitControls";
import Bedroom from "./assets/bedroom.v3.gltf";

const canvas = document.querySelector("#bedroom-gltf");
const scene = new THREE.Scene();
const loader = new GLTFLoader();

loader.load(Bedroom, function (gltf) {
  scene.add(gltf.scene);
  const root = gltf.scene;
  root.scale.set(0.5, 0.5, 0.5);
});
const size = {
  width: innerWidth,
  height: innerHeight,
};

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(2, 2, 5);
scene.add(light);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
backLight.position.set(-2, -2, -1);
scene.add(backLight);

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000
);
camera.position.set(0, 0.5, 2);
// camera.position.z = 5;
scene.add(camera);

const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
// renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(devicePixelRatio);
renderer.gammaOutput = true;
new OrbitControls(camera, renderer.domElement);

const animate = () => {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

const onWindowResize = () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
};
window.addEventListener("resize", onWindowResize, false);
animate();
