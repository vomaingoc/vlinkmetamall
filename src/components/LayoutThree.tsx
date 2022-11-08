import React, { Suspense, useState, useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, Loader, Html } from "@react-three/drei";
import Loading from "./Loading";
function LayoutThree({ children }: { children: any }) {
  const ref = React.createRef<HTMLCanvasElement>();
  function downloadURI(uri: any, name: any) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  async function handleClickScapture() {
    if (ref.current != null) {
      let dataURL = await ref.current.toDataURL("image/png");
      downloadURI(dataURL, "image");
    }
  }

  return (
    <>
      <button onClick={handleClickScapture} className="capture-button"></button>
      <Canvas
        id="canvas2"
        camera={{ fov: 70 }}
        className="mycanvas"
        ref={ref}
        gl={{ preserveDrawingBuffer: true }}
      >
        <ambientLight />
        <pointLight position={[10, 200, 15]} />

        <Suspense
          fallback={
            <Html center>
              <Loading />
            </Html>
          }
        >
          <Preload all />
          {children}
        </Suspense>
        <OrbitControls
          enableDamping
          enableZoom={true}
          rotateSpeed={0.3}
          autoRotate={true}
          autoRotateSpeed={0.1}
        />
      </Canvas>
      {/* <Loader /> */}
    </>
  );
}

export default LayoutThree;
