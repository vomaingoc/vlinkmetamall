export interface ModelVideo {
  id: number;
  url: string;
  position: any;
  sceneId: number;
  name: string;
}
export interface ModelProcduct {
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
  type: string;
}
export interface ModelPicture extends ModelProcduct {
  size: any;
  scale: number;
  depth: number;
  border_width: number;
  border_color_hex: string;
  rotation_y: number;
}
export interface ModelCreditCard {
  cardNumber: string; //demo 4242 x 4
  cardExpirationDate: string; //tương lai
  cardCode: string; //pass là 123 hay 111 cũng đc
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  zip: string;
}
