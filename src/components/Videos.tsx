import React, { Suspense } from "react";
import { Html } from "@react-three/drei";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button, Image } from "antd";
import { ModelVideo } from "models";
import { useLoader } from "@react-three/fiber";
import * as THREE from "three";
import Loading from "./Loading";
import { useVideoTexture, useTexture } from "@react-three/drei";

export const VideoItem = (props: any) => {
  const { item, onClick } = props;
  const maps: any = useLoader(
    THREE.TextureLoader,
    item.imagePath ? item.imagePath : "/files/logo.png"
  );
  // const mapsvideo: any = useVideoTexture(
  //   item.imagePath ? item.imagePath : "/files/video.mp4",
  //   {
  //     unsuspend: "canplay",
  //     start: true,
  //   }
  // );

  const newSize = item.size.map((x: any) => {
    return x * item.scale;
  });
  return (
    <>
      {item.imagePath && (
        <>
          <mesh
            castShadow
            position={item.position}
            rotation-y={item.rotation_y ? item.rotation_y : 0}
          >
            <boxGeometry
              attach="geometry"
              args={[newSize[0] + 1, newSize[1] + 1, item.depth - 1]}
            />
            <meshStandardMaterial
              attach="material"
              color={"#cccccc"}
              opacity={0}
              transparent
            />
          </mesh>
          <mesh
            castShadow
            position={item.position}
            onClick={onClick}
            rotation-y={item.rotation_y}
          >
            <boxGeometry
              attach="geometry"
              args={[newSize[0], newSize[1], item.depth]}
            />

            <meshBasicMaterial
              map={maps}
              toneMapped={false}
              side={THREE.DoubleSide}
              opacity={1}
              transparent
            />

            <Html center>
              <Button
                shape="circle"
                className="icon-video"
                onClick={onClick}
                id={`${item.id}`}
                type="text"
              >
                <div
                  className="dot"
                  style={{ top: newSize[1] / 2 - 17, opacity: 0.6 }}
                >
                  <PlayCircleOutlined />
                </div>
              </Button>
            </Html>
          </mesh>
        </>
      )}
      {!item.imagePath && (
        <group position={item.position} onClick={onClick}>
          <Html center>
            <Button
              shape="circle"
              className="icon-video"
              onClick={onClick}
              id={`${item.id}`}
              type="text"
            >
              <div className="dot">
                <PlayCircleOutlined />
              </div>
            </Button>
          </Html>
        </group>
      )}
    </>
  );
};
const ListVideo = ({
  sceneId,
  data,
  onClick,
}: {
  sceneId: number;
  data: Array<ModelVideo>;
  onClick: any;
}) => {
  return (
    <Suspense
      fallback={
        <Html
          className="loading "
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "#081429",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 99999999999998,
          }}
        >
          <Loading />
        </Html>
      }
    >
      {data?.map(
        (item, index) =>
          item.sceneId === sceneId && (
            <VideoItem key={index} onClick={() => onClick(item)} item={item} />
          )
      )}
    </Suspense>
  );
};
export default ListVideo;
