import React from "react";
import { Html } from "@react-three/drei";
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import { Button } from "antd";
interface ModelProcduct {
  id: number;
  name: string;
  imagePath: string;
  position: any;
  sceneId: number;
  url: string;
  amount: number;
  imagesFiletype: string;
  imageName: string;
  imageInitialIndex: number;
  width: number;
  height: number;
}
export const ProductItem = ({
  name,
  position,
  onClick,
  id,
  imagePath,
}: {
  name: string;
  position: any;
  onClick: any;
  id: number;
  imagePath: string;
}) => {
  return (
    <group dispose={null} position={position} onClick={onClick}>
      <Html center>
        <Button
          shape="circle"
          className="icon-product2"
          onClick={onClick}
          id={`${id}`}
          data-name={name}
          type="text"
          // icon={<PlusOutlined />}
        >
          <div className="dot">
            <PlusOutlined />
          </div>
        </Button>
      </Html>
    </group>
  );
};
const ListProduct = ({
  sceneId,
  data,
  onClick,
}: {
  sceneId: number;
  data: Array<ModelProcduct>;
  onClick: any;
}) => {
  return (
    <>
      {data?.map(
        (item, index) =>
          item.sceneId === sceneId && (
            <ProductItem
              key={index}
              id={item.id}
              name={item.name}
              position={item.position}
              onClick={() => onClick(item)}
              imagePath={item.imagePath}
            />
          )
      )}
    </>
  );
};
export default ListProduct;
