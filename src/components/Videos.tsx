import React from "react";
import { Html } from "@react-three/drei";
import { PlayCircleOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { ModelVideo } from "models";

export const VideoItem = ({
  position,
  onClick,
  id,
  url,
}: {
  position: any;
  onClick: any;
  id: number;
  url: string;
}) => {
  return (
    <group dispose={null} position={position} onClick={onClick}>
      <Html center>
        <Button
          shape="circle"
          className="icon-video"
          onClick={onClick}
          id={`${id}`}
          data-name={name}
          type="text"
        >
          <div className="dot">
            <PlayCircleOutlined />
          </div>
        </Button>
      </Html>
    </group>
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
    <>
      {data?.map(
        (item, index) =>
          item.sceneId === sceneId && (
            <VideoItem
              key={index}
              id={item.id}
              position={item.position}
              onClick={() => onClick(item)}
              url={item.url}
            />
          )
      )}
    </>
  );
};
export default ListVideo;
