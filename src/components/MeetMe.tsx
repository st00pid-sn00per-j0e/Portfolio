import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment, Center } from "@react-three/drei";
import * as THREE from "three";

const modelPath = "/3d-model/base_basic_shaded.glb";

function Model() {
  const { scene } = useGLTF(modelPath);
  const groupRef = useRef<THREE.Group>(null!);

  // Gentle idle bobbing
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.003;
      groupRef.current.position.y =
        Math.sin(state.clock.elapsedTime * 0.8) * 0.05;
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
    <section id="meet-me" className="relative py-32 px-6 overflow-hidden">
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[36rem] h-[36rem] rounded-full bg-primary/10 blur-[160px] pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="grid lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-16 items-center">
          {/* Text side */}
          <div className="text-center lg:text-left">
            <p className="font-mono text-sm text-primary mb-4 tracking-widest uppercase">
              // Meet Me
            </p>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              How it is like to{" "}
              <span className="font-serif italic text-gradient">meet me,</span>
            </h2>
            <p className="text-2xl md:text-3xl text-muted-foreground leading-relaxed mb-8">
              well, ask{" "}
              <span className="text-foreground font-bold">low-poly me</span>{" "}
              <span className="font-serif italic text-gradient">:</span>
            </p>
            <div className="flex flex-wrap items-center gap-3 justify-center lg:justify-start">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                Drag to rotate
              </span>
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-mono text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: "0.5s" }} />
                Scroll to zoom
              </span>
            </div>
          </div>

          {/* 3D Canvas side */}
          <div className="relative mx-auto lg:mx-0 w-full max-w-lg lg:max-w-none">
            {/* Glow ring behind canvas */}
            <div className="absolute -inset-3 bg-gradient-primary opacity-20 blur-3xl rounded-3xl animate-pulse-glow pointer-events-none" />

            <div className="relative glass rounded-3xl overflow-hidden p-1">
              {/* Gradient border effect */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-border opacity-50 pointer-events-none" />

              <div className="relative aspect-square md:aspect-[4/5] rounded-[1.3rem] overflow-hidden bg-background/40">
                <Suspense fallback={<LoadingSpinner />}>
                  <Canvas
                    camera={{ position: [0, 0.3, 4], fov: 45 }}
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
                      enableZoom={true}
                      minDistance={2.5}
                      maxDistance={7}
                      minPolarAngle={Math.PI / 4}
                      maxPolarAngle={Math.PI / 1.8}
                      autoRotate={false}
                      autoRotateSpeed={1.5}
                    />

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
