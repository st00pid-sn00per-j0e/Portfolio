import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { AdaptiveDpr, Center, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

const modelPath = "/3d-model/base_basic_shaded.glb";

function Model() {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle idle bobbing — using delta instead of deprecated THREE.Clock
  const timeRef = useRef(0);

  useFrame((_state, delta) => {
    if (groupRef.current) {
      timeRef.current += delta;
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y =
        Math.sin(timeRef.current * 0.8) * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <primitive object={scene} scale={1.8} />
      </Center>
    </group>
  );
}

function LoadingSpinner() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
        <span className="text-sm font-mono text-muted-foreground animate-pulse">
          Loading 3D model...
        </span>
      </div>
    </div>
  );
}

export function MeetMe() {
  return (
    <section id="meet-me" className="relative overflow-hidden px-4 py-16 sm:px-6 md:py-28">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[28rem] w-[28rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[140px] sm:h-[36rem] sm:w-[36rem]" />

      <div className="container mx-auto max-w-6xl">
        <div className="grid min-w-0 items-center gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14">
          {/* Text side */}
          <div className="min-w-0 text-center lg:text-left">
            <p className="mb-4 font-mono text-sm uppercase tracking-widest text-primary">
              // Meet Me
            </p>
            <h2 className="mx-auto mb-5 max-w-[18rem] text-[clamp(2.15rem,10vw,3rem)] font-bold leading-[1.08] text-foreground sm:max-w-[34rem] md:text-5xl lg:mx-0">
              How it is like to{" "}
              <span className="inline-block whitespace-nowrap font-serif italic text-gradient">
                meet me,
              </span>
            </h2>
            <p className="mx-auto mb-7 max-w-[20rem] text-xl leading-relaxed text-muted-foreground sm:max-w-[32rem] sm:text-2xl md:text-3xl lg:mx-0">
              well, ask{" "}
              <span className="font-bold text-foreground">low-poly me</span>{" "}
              <span className="font-serif italic text-gradient">:</span>
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <span className="glass inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 py-2 font-mono text-xs text-muted-foreground sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-primary animate-pulse" />
                Drag to rotate
              </span>
              <span className="glass inline-flex min-h-10 items-center gap-2 rounded-full px-3.5 py-2 font-mono text-xs text-muted-foreground sm:text-sm">
                <span className="h-2 w-2 shrink-0 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                Smooth on touch
              </span>
            </div>
          </div>

          {/* 3D Canvas side */}
          <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-lg lg:mx-0 lg:max-w-none">
            {/* Glow ring behind canvas */}
            <div className="pointer-events-none absolute -inset-3 rounded-3xl bg-gradient-primary opacity-20 blur-3xl animate-pulse-glow" />

            <div className="glass relative overflow-hidden rounded-3xl p-1">
              {/* Gradient border effect */}
              <div className="pointer-events-none absolute inset-0 rounded-3xl bg-gradient-border opacity-50" />

              <div className="relative aspect-[1/1.08] overflow-hidden rounded-[1.3rem] bg-background/40 sm:aspect-square md:aspect-[4/5]">
                <Suspense fallback={<LoadingSpinner />}>
                  <Canvas
                    camera={{ position: [0, 0.3, 4], fov: 45 }}
                    dpr={[1, 1.5]}
                    gl={{ antialias: true, alpha: true }}
                    style={{ background: "transparent" }}
                  >
                    {/* Lighting */}
                    <ambientLight intensity={0.6} />
                    <directionalLight
                      position={[3, 5, 4]}
                      intensity={1.2}
                      color="#a8f0c6"
                    />
                    <directionalLight
                      position={[-3, 3, -2]}
                      intensity={0.4}
                      color="#7dd3a8"
                    />
                    <pointLight
                      position={[0, 2, 3]}
                      intensity={0.5}
                      color="#b8f5d4"
                    />

                    <Model />

                    <OrbitControls
                      enablePan={false}
                      enableZoom={false}
                      minDistance={2.5}
                      maxDistance={7}
                      minPolarAngle={Math.PI / 4}
                      maxPolarAngle={Math.PI / 1.8}
                      autoRotate={false}
                      autoRotateSpeed={1.5}
                    />

                    <AdaptiveDpr />
                    <Environment preset="city" />
                  </Canvas>
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
