import React from "react";
import { Html } from "@react-three/drei";
import { Button } from "antd";
export const HotspotItem = ({
  name,
  position,
  onClick,
  id,
}: {
  name: string;
  position: any;
  onClick: any;
  id: number;
}) => {
  return (
    <group dispose={null} position={position} onClick={onClick}>
      <Html center>
        <button
          className="icon-hotspot"
          onClick={onClick}
          id={`${id}`}
          data-name={name}
        />
      </Html>
    </group>
  );
};
const ListHotspot = ({
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
        (item: any, index: number) =>
          item.sceneId === sceneId && (
            <HotspotItem
              key={index}
              id={item.id}
              name={item.name}
              position={item.position}
              onClick={() => onClick(item.linkToSceneId)}
            />
          )
      )}
    </>
  );
};
export default ListHotspot;
