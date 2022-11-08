// import React from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import { ModelPicture } from "models";
import { Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
const PictureItem = (props: any) => {
  const {
    position,
    imagePath,
    rotation_y,
    size,
    scale,
    depth,
    border_width,
    border_color_hex,
    name,
  } = props.item;
  const { onClick } = props;
  const maps: any = useLoader(THREE.TextureLoader, imagePath);

  const newSize = size.map((x: any) => {
    return x * scale;
  });

  let f_w = newSize[0];
  var reg = /^#([0-9a-f]{3}){1,2}$/i;
  let initColorCode = reg.test(border_color_hex) ? border_color_hex : "#888888";

  return (
    <>
      <mesh castShadow position={position} rotation-y={rotation_y}>
        <boxGeometry
          attach="geometry"
          args={[f_w + border_width, newSize[1] + border_width, depth - 2]}
        />
        <meshStandardMaterial
          attach="material"
          color={initColorCode}
          opacity={0.1}
          transparent
        />
      </mesh>

      <mesh
        castShadow
        position={position}
        rotation-y={rotation_y}
        onClick={onClick}
      >
        <boxGeometry attach="geometry" args={[f_w, newSize[1], depth]} />
        {maps && (
          <meshBasicMaterial
            map={maps}
            toneMapped={false}
            side={THREE.DoubleSide}
            opacity={1}
            transparent
          />
        )}
        <Html center>
          <Button
            shape="circle"
            className="icon-product2 icon-product2-2"
            onClick={onClick}
            data-name={name}
            type="text"
            style={{ position: "relative", top: newSize[1] * 0.7 * -1 }}
          >
            <div className="dot">
              <PlusOutlined />
            </div>
          </Button>
        </Html>
      </mesh>
    </>
  );
};

const ListPicture = ({
  sceneId,
  data,
  onClick,
}: {
  sceneId: number;
  data: any;
  onClick: any;
}) => {
  return (
    <>
      {data?.map(
        (item: ModelPicture, index: any) =>
          item.imagePath &&
          item.sceneId &&
          item.sceneId == sceneId && (
            <PictureItem
              key={index}
              item={item}
              onClick={() => onClick(item)}
            />
          )
      )}
    </>
  );
};

export default ListPicture;
