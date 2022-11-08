import React from "react";
import * as THREE from "three";

const SceneItem = ({
  texture,
  scene,
  isDev,
  radius,
}: {
  texture: any;
  scene: any;
  isDev: any;
  radius: any;
}) => {
  let myradius = radius;
  const handleSceneClick = (e: any) => {
    if (isDev) {
      const { x, y, z } = e.camera.position;
      console.log("camera position", `${x},${y},${z}`);
      console.log(
        "target position",
        `[${e.point.x},${e.point.y},${e.point.z}]`
      );
    }
  };

  return (
    <mesh onClick={handleSceneClick}>
      <sphereBufferGeometry
        args={[myradius, 64, 32, 0, Math.PI * 2, 0, Math.PI]}
      />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
};

export default SceneItem;
