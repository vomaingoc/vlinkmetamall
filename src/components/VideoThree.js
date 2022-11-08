import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useAspect, useVideoTexture, useTexture } from "@react-three/drei";

export default function VideoThree() {
  return (
    <Canvas orthographic>
      <Scene />
    </Canvas>
  );
}

function Scene() {
  const size = useAspect(800, 600);
  return (
    <mesh scale={size}>
      <planeGeometry />
      <Suspense fallback={<FallbackMaterial url="/files/logo.png" />}>
        <VideoMaterial url="/files/videos/video.mp4" />
      </Suspense>
    </mesh>
  );
}

function VideoMaterial({ url }) {
  const texture = useVideoTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}

function FallbackMaterial({ url }) {
  const texture = useTexture(url);
  return <meshBasicMaterial map={texture} toneMapped={false} />;
}
