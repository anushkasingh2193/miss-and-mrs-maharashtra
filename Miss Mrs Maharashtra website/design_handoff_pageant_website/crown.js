import * as THREE from 'https://unpkg.com/three@0.184.0/build/three.module.js';

const GOLD = 0xC9A24A;
const ROSE = 0xB0567A;
const PEARL = 0xFFF6F2;

function buildCrown() {
  const group = new THREE.Group();
  group.name = 'crown';

  const gold = new THREE.MeshStandardMaterial({ name: 'gold', color: GOLD, metalness: 0.95, roughness: 0.24 });
  const goldDark = new THREE.MeshStandardMaterial({ name: 'goldDark', color: 0xA5813A, metalness: 0.95, roughness: 0.38 });
  const rose = new THREE.MeshStandardMaterial({ name: 'roseGem', color: ROSE, metalness: 0.2, roughness: 0.12 });
  const pearl = new THREE.MeshStandardMaterial({ name: 'pearl', color: PEARL, metalness: 0.05, roughness: 0.3 });

  const R = 1;

  const band = new THREE.Mesh(new THREE.CylinderGeometry(R, R * 1.02, 0.42, 64, 1, true), gold);
  band.name = 'band';
  band.position.y = 0.21;
  group.add(band);

  [0.015, 0.405].forEach((y, i) => {
    const rim = new THREE.Mesh(new THREE.TorusGeometry(R * (i ? 1 : 1.02), 0.042, 14, 72), goldDark);
    rim.name = 'rim' + i;
    rim.rotation.x = Math.PI / 2;
    rim.position.y = y;
    group.add(rim);
  });

  const SPIKES = 8;
  for (let i = 0; i < SPIKES; i++) {
    const a = (i / SPIKES) * Math.PI * 2;
    const tall = i % 2 === 0;
    const h = tall ? 0.78 : 0.5;
    const spike = new THREE.Mesh(new THREE.ConeGeometry(tall ? 0.15 : 0.12, h, 4), gold);
    spike.name = 'spike' + i;
    spike.position.set(Math.cos(a) * R * 0.99, 0.42 + h / 2, Math.sin(a) * R * 0.99);
    spike.rotation.y = -a;
    group.add(spike);

    const tip = new THREE.Mesh(new THREE.SphereGeometry(tall ? 0.075 : 0.06, 24, 18), pearl);
    tip.name = 'tip' + i;
    tip.position.set(Math.cos(a) * R * 0.99, 0.42 + h + 0.05, Math.sin(a) * R * 0.99);
    group.add(tip);

    const gem = new THREE.Mesh(new THREE.OctahedronGeometry(0.082, 0), i % 2 === 0 ? rose : pearl);
    gem.name = 'gem' + i;
    gem.position.set(Math.cos(a) * R * 1.02, 0.21, Math.sin(a) * R * 1.02);
    gem.rotation.y = -a;
    group.add(gem);
  }

  for (let i = 0; i < 2; i++) {
    const arch = new THREE.Mesh(new THREE.TorusGeometry(R * 0.86, 0.038, 12, 60, Math.PI), goldDark);
    arch.name = 'arch' + i;
    arch.position.y = 0.42;
    arch.rotation.y = i * Math.PI / 2;
    group.add(arch);
  }

  const orb = new THREE.Mesh(new THREE.SphereGeometry(0.13, 32, 24), rose);
  orb.name = 'orb';
  orb.position.y = 0.42 + R * 0.86 + 0.08;
  group.add(orb);

  const finial = new THREE.Mesh(new THREE.SphereGeometry(0.055, 20, 16), pearl);
  finial.name = 'finial';
  finial.position.y = orb.position.y + 0.17;
  group.add(finial);

  const stem = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.16, 12), gold);
  stem.name = 'stem';
  stem.position.y = orb.position.y + 0.09;
  group.add(stem);

  return group;
}

class CrownStage extends HTMLElement {
  connectedCallback() {
    if (this._up) return;
    this._up = true;
    this.style.display = 'block';
    this.style.pointerEvents = 'none';

    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'display:block;width:100%;height:100%';
    this.appendChild(canvas);

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio || 1));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
    camera.position.set(0, 1.3, 4.5);
    camera.lookAt(0, 0.85, 0);

    scene.add(new THREE.HemisphereLight(0xffffff, 0xE8CBD3, 0.85));
    const key = new THREE.DirectionalLight(0xffffff, 2.1);
    key.position.set(2.4, 3.2, 2.6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xFFD9C2, 0.9);
    fill.position.set(-3, 1.2, 1.5);
    scene.add(fill);
    const rimLight = new THREE.DirectionalLight(0xB0567A, 1.1);
    rimLight.position.set(-1.2, 0.6, -3);
    scene.add(rimLight);

    const crown = buildCrown();
    crown.position.y = -0.55;
    scene.add(crown);

    this._crown = crown;
    this._camera = camera;
    this._key = key;
    this._p = 0;

    const resize = () => {
      const w = this.clientWidth || 320;
      const h = this.clientHeight || 320;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    this._ro = new ResizeObserver(resize);
    this._ro.observe(this);

    let t0 = performance.now();
    const tick = (now) => {
      const dt = Math.min(64, now - t0);
      t0 = now;
      const p = this._p;
      crown.rotation.y += dt * 0.00022;
      crown.rotation.y += (p * 2.4 - (this._pApplied || 0) * 2.4);
      this._pApplied = p;
      crown.rotation.x = -0.08 + p * 0.42;
      crown.position.y = -0.55 - p * 0.35;
      camera.position.z = 4.5 - p * 0.7;
      camera.updateProjectionMatrix();
      const a = now * 0.00035;
      this._key.position.set(Math.cos(a) * 3.2, 3.2, Math.sin(a) * 3.2 + 1.4);
      renderer.render(scene, camera);
      this._raf = requestAnimationFrame(tick);
    };
    this._raf = requestAnimationFrame(tick);
  }

  disconnectedCallback() {
    if (this._raf) cancelAnimationFrame(this._raf);
    if (this._ro) this._ro.disconnect();
  }

  setProgress(p) {
    this._p = Math.max(0, Math.min(1, p || 0));
  }
}

if (!customElements.get('crown-stage')) customElements.define('crown-stage', CrownStage);
