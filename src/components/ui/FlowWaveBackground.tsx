import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

const SNOISE = `
vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159 - 0.85373472095314 * r;}
float snoise(vec3 v){
  const vec2 C = vec2(1.0/6.0, 1.0/3.0); const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
  vec3 i = floor(v + dot(v, C.yyy)); vec3 x0 = v - i + dot(i, C.xxx);
  vec3 g = step(x0.yzx, x0.xyz); vec3 l = 1.0 - g;
  vec3 i1 = min(g.xyz, l.zxy); vec3 i2 = max(g.xyz, l.zxy);
  vec3 x1 = x0 - i1 + 1.0 * C.xxx; vec3 x2 = x0 - i2 + 2.0 * C.xxx; vec3 x3 = x0 - 1.0 + 3.0 * C.xxx;
  i = mod(i, 289.0);
  vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
  float n_ = 1.0/7.0; vec3 ns = n_ * D.wyz - D.xzx;
  vec4 j = p - 49.0 * floor(p * ns.z *ns.z);
  vec4 x_ = floor(j * ns.z); vec4 y_ = floor(j - 7.0 * x_);
  vec4 x = x_ *ns.x + ns.yyyy; vec4 y = y_ *ns.x + ns.yyyy; vec4 h = 1.0 - abs(x) - abs(y);
  vec4 b0 = vec4(x.xy, y.xy); vec4 b1 = vec4(x.zw, y.zw);
  vec4 s0 = floor(b0)*2.0 + 1.0; vec4 s1 = floor(b1)*2.0 + 1.0; vec4 sh = -step(h, vec4(0.0));
  vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy; vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
  vec3 p0 = vec3(a0.xy,h.x); vec3 p1 = vec3(a0.zw,h.y); vec3 p2 = vec3(a1.xy,h.z); vec3 p3 = vec3(a1.zw,h.w);
  vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2, p2), dot(p3,p3)));
  p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
  vec4 m = max(0.5 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0); m = m * m;
  return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const FinalPassShader = {
  uniforms: {
    iTime: { value: 0 },
    tDiffuse: { value: null },
    bloomTexture: { value: null },
    uBg: { value: new THREE.Vector3() },
    uFlameA: { value: new THREE.Vector3() },
    uFlameB: { value: new THREE.Vector3() },
    uFlameAmt: { value: 0.2 },
    uIsLight: { value: 0 },
  },
  vertexShader: `
    varying vec2 vUv;
    void main(){ vUv = uv; gl_Position = vec4(position, 1.0); }
  `,
  fragmentShader: `
    uniform float iTime;
    uniform sampler2D tDiffuse;
    uniform sampler2D bloomTexture;
    uniform vec3 uBg;
    uniform vec3 uFlameA;
    uniform vec3 uFlameB;
    uniform float uFlameAmt;
    uniform float uIsLight;
    varying vec2 vUv;
    vec3 warp3d(vec3 pos, float t){ float curv=.8,a=1.9,b=0.7; pos*=2.;
      pos.x+=curv*sin(t+a*pos.y)+t*b; pos.y+=curv*cos(t+a*pos.x);
      pos.y+=curv*sin(t+a*pos.z)+t*b; pos.z+=curv*cos(t+a*pos.y);
      pos.z+=curv*sin(t+a*pos.x)+t*b; pos.x+=curv*cos(t+a*pos.z);
      return 0.5+0.5*cos(pos.xyz+vec3(1,2,4)); }
    void main(){
      vec2 uv = 2.*vUv - 1.;
      vec3 w = pow(warp3d(vec3(uv.x, sin(uv.y), uv.y), iTime*1.5), vec3(1.5));
      vec3 flame = 1.5*uFlameA*w.x; flame*=w.y; flame += uFlameB*w.z;
      flame *= smoothstep(0.25, 1., abs(uv.y));
      float md = smoothstep(-0.7, 1., -uv.y*uv.x); flame *= md*md;
      vec3 mainTex = texture2D(tDiffuse, vUv).xyz;
      vec3 bloomTex = texture2D(bloomTexture, vUv).xyz;

      if (uIsLight > 0.5) {
        // High-contrast Light Mode compositing (#EAEBED bg with deep Ocean Blue particle wave contrast)
        vec3 bg = uBg * (1.0 - 0.08 * length(uv));
        vec3 waveColor = mainTex * 1.4 + bloomTex * 0.8;
        gl_FragColor = vec4(bg - waveColor * 0.85 + flame * uFlameAmt * 0.2, 1.0);
      } else {
        // High-contrast Dark Mode compositing (#090909 bg with Cyber Orange glow)
        vec3 bg = uBg * (1.0 - 0.4 * length(uv));
        gl_FragColor = vec4(bg + flame*uFlameAmt + bloomTex + mainTex, 1.0);
      }
    }
  `,
};

const Lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v));
function hexToVec3(hex: string) {
  const n = parseInt(hex.slice(1), 16);
  return new THREE.Vector3(((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255);
}

export function FlowWaveBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const checkIsLight = () => document.documentElement.classList.contains("light");
    let isLight = checkIsLight();

    // Studio Palette Color Configs optimized for Dark & Light Themes
    const darkParams = {
      bgColor: "#090909",
      flameColor: "#FF6A00",
      flameColor2: "#FF9E00",
      atmoColor: "#FF8C00",
      colorLow: "#090909",
      colorHigh: "#FF6A00",
    };

    const lightParams = {
      bgColor: "#F8FAFC",
      flameColor: "#0284C7",
      flameColor2: "#38BDF8",
      atmoColor: "#0284C7",
      colorLow: "#0F172A",
      colorHigh: "#0284C7",
    };

    let params = isLight ? lightParams : darkParams;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(params.bgColor);
    scene.fog = new THREE.Fog(params.bgColor, 0, 15);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 400);
    camera.position.set(0, 7, 16);
    scene.add(camera);

    const isMobile = window.innerWidth < 768;
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(isMobile ? 1 : Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    // Optimized Single Bloom + Final Composite Pipeline for 60FPS / 120FPS
    const renderPass = new RenderPass(scene, camera);

    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      isLight ? 0.2 : 0.35,
      0.4,
      0
    );

    const bloomComposer = new EffectComposer(renderer);
    bloomComposer.renderToScreen = false;
    bloomComposer.addPass(renderPass);
    bloomComposer.addPass(bloomPass);

    const finalPass = new ShaderPass(FinalPassShader);
    finalPass.uniforms.uBg.value = hexToVec3(params.bgColor);
    finalPass.uniforms.uFlameA.value = hexToVec3(params.flameColor);
    finalPass.uniforms.uFlameB.value = hexToVec3(params.flameColor2);
    finalPass.uniforms.uFlameAmt.value = isLight ? 0.15 : 0.25;
    finalPass.uniforms.uIsLight.value = isLight ? 1 : 0;
    finalPass.uniforms.bloomTexture.value = bloomComposer.renderTarget1.texture;

    const finalComposer = new EffectComposer(renderer);
    finalComposer.addPass(renderPass);
    finalComposer.addPass(finalPass);

    // Optimized Geometry Segments for silky 60FPS / 120FPS rendering
    // Desktop: 90x240 = 21.6k points (Ultra smooth 120fps)
    // Mobile: 45x110 = 4.95k points (Rock solid 60/120fps on mobile)
    const pointsGeo = new THREE.SphereGeometry(
      4.2,
      isMobile ? 45 : 90,
      isMobile ? 110 : 240
    );

    const waveMat = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uStream: { value: 0 },
        uAppear: { value: 0 },
        uColLow: { value: hexToVec3(params.colorLow) },
        uColHigh: { value: hexToVec3(params.colorHigh) },
        uOpacity: { value: isLight ? 0.95 : 0.28 },
        uSize: { value: isMobile ? 4.0 : 5.2 },
        uBrightness: { value: isLight ? 1.3 : 0.5 },
        uWaveHeight: { value: 3 },
        uFlow: { value: 1 },
        uScale: { value: 0.275 },
        uCursor: { value: new THREE.Vector3() },
        uRepelRadius: { value: 7.0 },
        uRepelStrength: { value: 0.9 },
        uActivity: { value: 0 },
      },
      vertexShader: `
        uniform float uTime; uniform float uStream; uniform float uSize; uniform float uWaveHeight; uniform float uFlow; uniform float uScale;
        uniform vec3 uColLow; uniform vec3 uColHigh;
        uniform vec3 uCursor; uniform float uRepelRadius; uniform float uRepelStrength; uniform float uActivity;
        varying float vFade; varying vec3 vColor;
        ${SNOISE}
        void main() {
          vec3 wp = vec3(position.x * 13.0, 0.0, position.z * 25.0);
          wp.x += position.y * 6.0;
          float zc = wp.z + uStream;
          float wn = snoise(vec3(wp.x * 0.08, zc * 0.08, uTime * 0.15 * uFlow)) * 2.0;
          wn += snoise(vec3(wp.x * 0.16, zc * 0.16, uTime * 0.3 * uFlow)) * 0.8;
          wp.y += wn * uWaveHeight;

          vec3 finalPos = wp * uScale;
          vec4 modelPosition = modelMatrix * vec4(finalPos, 1.0);
          vec3 toP = modelPosition.xyz - uCursor;
          float cd = length(toP);
          float fall = smoothstep(uRepelRadius, 0.0, cd);
          modelPosition.xyz += normalize(toP + vec3(0.0001)) * fall * uRepelStrength * uActivity;
          vec4 mvPosition = viewMatrix * modelPosition;

          float colMix = smoothstep(-3.0, 3.0, position.y + position.x * 0.5);
          vColor = mix(uColLow, uColHigh, clamp(colMix, 0.0, 1.0));
          vFade = 1.0;

          gl_PointSize = uSize * (10.0 / -mvPosition.z);
          gl_PointSize = max(gl_PointSize, 1.5);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        uniform float uOpacity; uniform float uBrightness; uniform float uAppear;
        varying float vFade; varying vec3 vColor;
        void main() {
          vec2 xy = gl_PointCoord - 0.5;
          float ll = length(xy);
          if (ll > 0.5) discard;
          float a = smoothstep(0.5, 0.1, ll);
          gl_FragColor = vec4(vColor * uBrightness, vFade * a * uOpacity * uAppear);
        }
      `,
    });

    const pointsMesh = new THREE.Points(pointsGeo, waveMat);
    pointsMesh.frustumCulled = false;

    const waveGroup = new THREE.Group();
    waveGroup.add(pointsMesh);
    scene.add(waveGroup);

    // Floating Particles
    const atmoCount = isMobile ? 80 : 200;
    const atmoGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(atmoCount * 3);
    const sizes = new Float32Array(atmoCount);
    const seeds = new Float32Array(atmoCount);

    for (let i = 0; i < atmoCount; i++) {
      positions[i * 3] = 2 * Math.random() - 1;
      positions[i * 3 + 1] = 2 * Math.random() - 1;
      positions[i * 3 + 2] = 2 * Math.random() - 1;
      sizes[i] = 24 * (0.4 + Math.random());
      seeds[i] = Math.random();
    }

    atmoGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    atmoGeo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    atmoGeo.setAttribute("seed", new THREE.BufferAttribute(seeds, 1));

    const atmoMat = new THREE.ShaderMaterial({
      transparent: true,
      blending: isLight ? THREE.NormalBlending : THREE.AdditiveBlending,
      depthWrite: false,
      depthTest: false,
      uniforms: {
        uTime: { value: 0 },
        uColor: { value: hexToVec3(params.atmoColor) },
        uRes: {
          value: new THREE.Vector2(
            window.innerWidth * renderer.getPixelRatio(),
            window.innerHeight * renderer.getPixelRatio()
          ),
        },
      },
      vertexShader: `
        attribute float size; attribute float seed; uniform float uTime; uniform vec2 uRes;
        varying float vA;
        vec3 warp(vec3 p, float t){ float c=0.9,a=1.9,b=0.02,s=0.05; p*=2.;
          p.x+=c*sin(s*t+a*p.y)+t*b; p.y+=c*cos(s*t+a*p.x); p.y+=c*sin(s*t+a*p.z)+t*b;
          p.z+=c*cos(s*t+a*p.y); p.z+=c*sin(s*t+a*p.x)+t*b; p.x+=c*cos(s*t+a*p.z);
          return cos(p+vec3(1,2,4)); }
        void main(){
          vec3 v = position*4.0 + warp(position, uTime)*1.2;
          vec4 mv = modelViewMatrix * vec4(v, 1.0);
          float r = length(v); float farF = 1.0 - smoothstep(5.0, 6.5, r); float nearF = smoothstep(0.0, 0.5, -mv.z);
          vA = farF * nearF;
          gl_PointSize = size * uRes.y / 900.0 / -mv.z; gl_PointSize = max(gl_PointSize, 1.0);
          gl_Position = projectionMatrix * mv;
        }
      `,
      fragmentShader: `
        uniform vec3 uColor; varying float vA;
        void main(){ vec2 p = gl_PointCoord - 0.5; float l = length(p); if (l > 0.5) discard;
          float tex = smoothstep(0.5, 0.0, l); gl_FragColor = vec4(uColor * tex, tex * vA * 0.6); }
      `,
    });

    const atmoPoints = new THREE.Points(atmoGeo, atmoMat);
    atmoPoints.frustumCulled = false;
    scene.add(atmoPoints);

    // Scroll & Mouse lerping
    let scrollTarget = 0;
    let scrollSmooth = 0;
    let scrollCurrent = 0;

    const mouseTarget = { x: 0, y: 0 };
    const mouse = { x: 0, y: 0 };

    const POINTER = {
      world: new THREE.Vector3(),
      activity: 0,
      active: false,
      lastMove: performance.now(),
    };

    const handleScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollTarget = max > 0 ? clamp(window.scrollY / max, 0, 1) : 0;
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseTarget.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseTarget.y = -((e.clientY / window.innerHeight) * 2 - 1);
      POINTER.active = true;
      POINTER.lastMove = performance.now();
    };

    const handleMouseLeave = () => {
      POINTER.active = false;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const _ndc = new THREE.Vector3();
    const _dir = new THREE.Vector3();
    const _tgt = new THREE.Vector3();

    function updatePointerWorld() {
      _tgt.set(0, 0, 0);
      if (POINTER.active) {
        _ndc.set(mouse.x, mouse.y, 0.5).unproject(camera);
        _dir.copy(_ndc).sub(camera.position).normalize();
        const dn = _dir.z;
        if (Math.abs(dn) > 1e-4) {
          const tt = -camera.position.z / dn;
          if (tt > 0 && Number.isFinite(tt)) _tgt.copy(camera.position).addScaledVector(_dir, tt);
        }
      }
      POINTER.world.lerp(_tgt, 0.12);
      const idle = (performance.now() - POINTER.lastMove) / 1000;
      POINTER.activity += ((POINTER.active && idle < 3 ? 1 : 0) - POINTER.activity) * 0.06;
    }

    let stream = 0;
    const appearStart = performance.now();
    let t0 = performance.now() / 1000;

    let animId: number;
    let isIntersecting = true;

    // Viewport Intersection Observer
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);
      if (!isIntersecting) return;

      // Dynamic theme update check
      const currentLight = checkIsLight();
      if (currentLight !== isLight) {
        isLight = currentLight;
        params = isLight ? lightParams : darkParams;

        scene.background = new THREE.Color(params.bgColor);
        scene.fog = new THREE.Fog(params.bgColor, 0, 15);
        finalPass.uniforms.uBg.value.copy(hexToVec3(params.bgColor));
        finalPass.uniforms.uFlameA.value.copy(hexToVec3(params.flameColor));
        finalPass.uniforms.uFlameB.value.copy(hexToVec3(params.flameColor2));
        finalPass.uniforms.uFlameAmt.value = isLight ? 0.15 : 0.25;
        finalPass.uniforms.uIsLight.value = isLight ? 1 : 0;
        bloomPass.strength = isLight ? 0.2 : 0.35;

        waveMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
        waveMat.needsUpdate = true;
        waveMat.uniforms.uColLow.value.copy(hexToVec3(params.colorLow));
        waveMat.uniforms.uColHigh.value.copy(hexToVec3(params.colorHigh));
        waveMat.uniforms.uOpacity.value = isLight ? 0.95 : 0.28;
        waveMat.uniforms.uBrightness.value = isLight ? 1.3 : 0.5;

        atmoMat.blending = isLight ? THREE.NormalBlending : THREE.AdditiveBlending;
        atmoMat.needsUpdate = true;
        atmoMat.uniforms.uColor.value.copy(hexToVec3(params.atmoColor));
      }

      scrollSmooth = Lerp(scrollSmooth, scrollTarget, 0.1);
      scrollCurrent = Lerp(scrollCurrent, scrollSmooth, 0.06);
      mouse.x = Lerp(mouse.x, mouseTarget.x, 0.06);
      mouse.y = Lerp(mouse.y, mouseTarget.y, 0.06);

      const t = performance.now() / 1000;
      const dt = Math.min(0.033, t - t0);
      t0 = t;

      waveMat.uniforms.uTime.value = t;
      stream += dt * 4.0;
      waveMat.uniforms.uStream.value = stream;
      waveMat.uniforms.uWaveHeight.value = 3 * (1 + scrollCurrent * 1.0);

      const ea = Math.min(scrollCurrent / 0.35, 1.0);
      const e = ea * ea * (3 - 2 * ea);
      const camY = Lerp(7, 0.8, e);
      const camZ = Lerp(16, -2, e);
      camera.position.set(mouse.x * 1.2, camY + mouse.y * 1.2 * 0.3, camZ);
      camera.lookAt(mouse.x * 1.2 * 0.5, Lerp(0.0, 0.6, e), Lerp(2, -16, e));
      waveGroup.rotation.x = 0;
      waveGroup.rotation.y = 0;

      updatePointerWorld();
      waveMat.uniforms.uCursor.value.copy(POINTER.world);
      waveMat.uniforms.uActivity.value = POINTER.activity;

      const elapsed = (performance.now() - appearStart) / 1000;
      waveMat.uniforms.uAppear.value = Math.max(0, Math.min(1, (elapsed - 0.2) / 1.4));

      atmoMat.uniforms.uTime.value = t * 8.0;
      atmoPoints.position.copy(camera.position);
      finalPass.uniforms.iTime.value = t;

      bloomComposer.render();
      finalComposer.render();
    };

    renderLoop();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = window.innerWidth < 768 ? 1 : Math.min(window.devicePixelRatio, 1.5);
      renderer.setPixelRatio(dpr);
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();

      bloomComposer.setPixelRatio(dpr);
      bloomComposer.setSize(w, h);
      finalComposer.setPixelRatio(dpr);
      finalComposer.setSize(w, h);

      atmoMat.uniforms.uRes.value.set(w * dpr, h * dpr);
      handleScroll();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="absolute inset-0 pointer-events-none z-0 overflow-hidden" />;
}
