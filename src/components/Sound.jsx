import * as THREE from "three";
import React, { useRef, useEffect, useState } from "react";
import { useThree, useLoader } from "@react-three/fiber";
function Sound({ url }) {
  const sound = useRef(null);
  const { camera } = useThree();
  const [listener] = useState(() => new THREE.AudioListener());
  const buffer = useLoader(THREE.AudioLoader, url);
  useEffect(() => {
    sound.current.setBuffer(buffer);
    sound.current.setRefDistance(1);
    sound.current.setLoop(true);
    sound.current.play();
    camera.add(listener);
    return () => camera.remove(listener);
  }, []);
  return <positionalAudio ref={sound} args={[listener]} />;
}
export default Sound;
