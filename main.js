import * as THREE from "three";

const fov = 95;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 1000;

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const sphere = {
    geometry: new THREE.SphereGeometry(15),
    material: new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    object: null,
};

sphere.object = new THREE.Mesh(sphere.geometry, sphere.material);
scene.add(sphere.object);

camera.position.z = 40;

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

animate();
