/* eslint-disable react/no-unknown-property */
import { useEffect, useMemo, useRef, useState, Suspense } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { useGLTF, useTexture, Environment, Lightformer } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';

extend({ MeshLineGeometry, MeshLineMaterial });

// 1x1 transparent pixel
const BLANK_PIXEL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

const FRONT_UV_RECT = { x: 0, y: 0, w: 0.5, h: 0.755 };
const BACK_UV_RECT = { x: 0.5, y: 0, w: 0.5, h: 0.757 };

const CARD_GLB_URL = '/lanyard/card.glb';
const DEFAULT_LANYARD_TEXTURE = '/lanyard/lanyard-custom.png';
const DEFAULT_FRONT_IMAGE = '/lanyard/id-front.png';
const DEFAULT_BACK_IMAGE = '/lanyard/id-back.png';

export interface LanyardProps {
  position?: [number, number, number];
  gravity?: [number, number, number];
  fov?: number;
  transparent?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardScale?: number;
  className?: string;
}

export default function Lanyard({
  position = [0, 0, 18],
  gravity = [0, -38, 0],
  fov = 20,
  transparent = true,
  frontImage = DEFAULT_FRONT_IMAGE,
  backImage = DEFAULT_BACK_IMAGE,
  imageFit = 'cover',
  lanyardImage = DEFAULT_LANYARD_TEXTURE,
  lanyardWidth = 1.3,
  cardScale = 2.45,
  className = ''
}: LanyardProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 1024);
  const [isInView, setIsInView] = useState(true);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { rootMargin: '50px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={wrapperRef} className={`lanyard-wrapper relative ${className}`}>
      {/* 2D Top Subtle Base Mount Header */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center pointer-events-none">
        <div className="w-12 h-2.5 bg-gradient-to-b from-neutral-800 via-neutral-900 to-neutral-950 rounded-b-md border-b border-x border-white/15 shadow-[0_4px_12px_rgba(0,0,0,0.5)]" />
        <div className="w-4 h-1 bg-emerald-500/80 rounded-full blur-[1px] mt-0.5" />
      </div>

      <Suspense fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-56 h-80 rounded-2xl bg-neutral-900/10 dark:bg-white/5 border border-black/10 dark:border-white/10 animate-pulse" />
        </div>
      }>
        <Canvas
          camera={{ position: position, fov: fov }}
          dpr={[1, isMobile ? 1.0 : 1.5]}
          frameloop={isInView ? 'always' : 'never'}
          gl={{ alpha: transparent, antialias: !isMobile, powerPreference: 'high-performance' }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
        >
          <ambientLight intensity={Math.PI * 0.9} />
          <directionalLight position={[6, 12, 6]} intensity={2.0} />
          <directionalLight position={[-6, -6, -4]} intensity={0.6} color="#38bdf8" />
          <Physics gravity={gravity} timeStep={isMobile ? 1 / 24 : 1 / 60}>
            <Band
              isMobile={isMobile}
              frontImage={frontImage}
              backImage={backImage}
              imageFit={imageFit}
              lanyardImage={lanyardImage}
              lanyardWidth={lanyardWidth}
              cardScale={cardScale}
            />
          </Physics>
          <Environment blur={0.5}>
            <Lightformer
              intensity={2.8}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={4}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={4}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={14}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </Suspense>
    </div>
  );
}

function Band({
  maxSpeed = 50,
  minSpeed = 0,
  isMobile = false,
  frontImage = DEFAULT_FRONT_IMAGE,
  backImage = DEFAULT_BACK_IMAGE,
  imageFit = 'cover',
  lanyardImage = DEFAULT_LANYARD_TEXTURE,
  lanyardWidth = 1.3,
  cardScale = 2.45
}: {
  maxSpeed?: number;
  minSpeed?: number;
  isMobile?: boolean;
  frontImage?: string | null;
  backImage?: string | null;
  imageFit?: 'cover' | 'contain';
  lanyardImage?: string | null;
  lanyardWidth?: number;
  cardScale?: number;
}) {
  const band = useRef<any>(null);
  const fixed = useRef<any>(null);
  const j1 = useRef<any>(null);
  const j2 = useRef<any>(null);
  const j3 = useRef<any>(null);
  const card = useRef<any>(null);

  const vec = useMemo(() => new THREE.Vector3(), []);
  const dir = useMemo(() => new THREE.Vector3(), []);
  const ang = useMemo(() => new THREE.Vector3(), []);
  const rot = useMemo(() => new THREE.Vector3(), []);

  const segmentProps = { type: 'dynamic' as const, canSleep: true, colliders: false as const, angularDamping: 3.5, linearDamping: 3.5 };
  const { nodes, materials } = useGLTF(CARD_GLB_URL) as any;
  const texture = useTexture(lanyardImage || DEFAULT_LANYARD_TEXTURE);
  const frontTex = useTexture(frontImage || BLANK_PIXEL);
  const backTex = useTexture(backImage || BLANK_PIXEL);

  // Composite front/back images into high-resolution texture atlas
  const cardMap = useMemo(() => {
    const baseMap = materials?.base?.map;
    if (!baseMap) return null;
    if (!frontImage && !backImage) return baseMap;

    const baseImg = baseMap.image;
    const W = 2048;
    const H = 2048;
    const canvas = document.createElement('canvas');
    canvas.width = W;
    canvas.height = H;
    const ctx = canvas.getContext('2d');
    if (!ctx) return baseMap;

    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';

    if (baseImg) {
      ctx.drawImage(baseImg, 0, 0, W, H);
    }

    const drawFitted = (img: HTMLImageElement, rect: { x: number; y: number; w: number; h: number }) => {
      const rx = rect.x * W;
      const ry = rect.y * H;
      const rw = rect.w * W;
      const rh = rect.h * H;
      const pick = imageFit === 'contain' ? Math.min : Math.max;
      const scale = pick(rw / img.width, rh / img.height);
      const dw = img.width * scale;
      const dh = img.height * scale;
      const dx = rx + (rw - dw) / 2;
      const dy = ry + (rh - dh) / 2;
      ctx.save();
      ctx.beginPath();
      ctx.rect(rx, ry, rw, rh);
      ctx.clip();
      ctx.drawImage(img, dx, dy, dw, dh);
      ctx.restore();
    };

    if (frontImage && frontTex?.image) drawFitted(frontTex.image, FRONT_UV_RECT);
    if (backImage && backTex?.image) drawFitted(backTex.image, BACK_UV_RECT);

    const composite = new THREE.CanvasTexture(canvas);
    composite.colorSpace = THREE.SRGBColorSpace;
    composite.flipY = baseMap.flipY;
    composite.anisotropy = 16;
    composite.minFilter = THREE.LinearMipmapLinearFilter;
    composite.magFilter = THREE.LinearFilter;
    composite.generateMipmaps = true;
    composite.needsUpdate = true;
    return composite;
  }, [frontImage, backImage, imageFit, frontTex, backTex, materials]);

  const [curve] = useState(
    () =>
      new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()])
  );
  const [dragged, drag] = useState<any>(false);
  const [hovered, hover] = useState(false);

  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1.3]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1.3]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1.3]);
  useSphericalJoint(j3, card, [
    [0, 0, 0],
    [0, 1.45, 0]
  ]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    }
    if (fixed.current) {
      [j1, j2].forEach(ref => {
        if (!ref.current.lerped) ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
        const clampedDistance = Math.max(0.1, Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())));
        ref.current.lerped.lerp(
          ref.current.translation(),
          delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed))
        );
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy(j2.current.lerped);
      curve.points[2].copy(j1.current.lerped);
      curve.points[3].copy(fixed.current.translation());
      if (band.current?.geometry) {
        band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
      }
      if (card.current) {
        ang.copy(card.current.angvel());
        rot.copy(card.current.rotation());
        card.current.setAngvel({ x: ang.x, y: ang.y - rot.y * 0.25, z: ang.z });

        // No ambient impulse — let physics settle naturally for better perf
      }
    }
  });

  curve.curveType = 'chordal';
  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

  return (
    <>
      {/* Top Realistic Wall/Ceiling Mounting Base & Suspension Bracket */}
      <group position={[0, 4.88, 0]}>
        {/* Mounting Base Plate */}
        <mesh position={[0, 0.22, -0.08]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.38, 0.42, 0.12, 32]} />
          <meshStandardMaterial
            color="#27272a"
            metalness={0.9}
            roughness={0.2}
            envMapIntensity={2.0}
          />
        </mesh>
        {/* Chrome Central Screw / Fastener */}
        <mesh position={[0, 0.22, -0.01]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[0.16, 0.16, 0.06, 16]} />
          <meshStandardMaterial
            color="#e4e4e7"
            metalness={0.95}
            roughness={0.1}
          />
        </mesh>
        {/* Polished Chrome Anchor Swivel Ring */}
        <mesh position={[0, 0.05, 0]} rotation={[0, 0, 0]}>
          <torusGeometry args={[0.24, 0.05, 16, 32]} />
          <meshStandardMaterial
            color="#ffffff"
            metalness={1.0}
            roughness={0.05}
            envMapIntensity={3.0}
          />
        </mesh>
        {/* Anchor Clamp Collar Fitting */}
        <mesh position={[0, -0.12, 0]}>
          <boxGeometry args={[0.34, 0.16, 0.12]} />
          <meshStandardMaterial
            color="#09090b"
            metalness={0.85}
            roughness={0.25}
          />
        </mesh>
      </group>

      {/* Top Fixed Anchor Positioned at Top of Canvas */}
      <group position={[0, 4.9, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[2, 0, 0]} ref={card} {...segmentProps} type={dragged ? 'kinematicPosition' : 'dynamic'}>
          <CuboidCollider args={[0.9, 1.25, 0.01]} />
          <group
            scale={cardScale}
            position={[0, -1.2, -0.05]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => {
              (e.target as HTMLElement)?.releasePointerCapture?.(e.pointerId);
              drag(false);
            }}
            onPointerDown={e => {
              (e.target as HTMLElement)?.setPointerCapture?.(e.pointerId);
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
            }}
          >
            {nodes?.card?.geometry && (
              <mesh geometry={nodes.card.geometry}>
                <meshPhysicalMaterial
                  map={cardMap || undefined}
                  map-anisotropy={16}
                  clearcoat={1.0}
                  clearcoatRoughness={0.08}
                  roughness={0.25}
                  metalness={0.05}
                  reflectivity={0.9}
                />
              </mesh>
            )}
            {nodes?.clip?.geometry && (
              <mesh 
                geometry={nodes.clip.geometry} 
                material={materials?.metal} 
                material-roughness={0.1}
                material-metalness={0.95} 
              />
            )}
            {nodes?.clamp?.geometry && (
              <mesh 
                geometry={nodes.clamp.geometry} 
                material={materials?.metal}
                material-roughness={0.1}
                material-metalness={0.95} 
              />
            )}
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        <meshLineGeometry />
        <meshLineMaterial
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          useMap
          map={texture}
          repeat={[-2, 1]}
          lineWidth={lanyardWidth}
        />
      </mesh>
    </>
  );
}

useGLTF.preload(CARD_GLB_URL);
