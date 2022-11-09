import React, {
  Suspense,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  lazy,
} from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import LayoutThree from "./components/LayoutThree";
import Hotspot from "./components/Hotspot";
const SceneItem = lazy(() => import("./components/Scene"));
// import Sound from "./Sound";
const Slide360View = lazy(() => import("components/Slide360View"));
import { PlusOutlined, MinusOutlined } from "@ant-design/icons";
import ListProduct from "./components/Product";
import { Button, Col, Modal, Row, InputNumber, Tag, Image } from "antd";
import Footer from "components/Footer";
import Loading from "components/Loading";
import { gsap } from "gsap";
import { products, hotspot, videos, productPicture } from "data";
import {
  ModelCreditCard,
  ModelPicture,
  ModelProcduct,
  ModelVideo,
} from "models";
import ListVideo from "components/Videos";
const Banner = lazy(() => import("components/Banner"));
import VideoThree from "components/VideoThree";
import ListPicture from "components/PictureItem";
import ModalPaymentCreditCard from "components/ModalPaymentCreditCard";
import ModalLogin from "components/ModalLogin";
interface ModelScene {
  id: number;
  url: string;
  radius: number;
}

export default function App() {
  const dev = 1;
  const radiusDemo = dev ? 480 : 500;

  const [listSceneOfRoom] = useState<Array<ModelScene>>([
    { id: 1, url: "https://i.ibb.co/8gts64P/loby.jpg", radius: radiusDemo },
    { id: 2, url: "https://i.ibb.co/8sZ8TPH/rolex.jpg", radius: radiusDemo },
    { id: 3, url: "/files/store.jpg", radius: radiusDemo },
  ]);
  const [mysceneIndex, setMysceneIndex] = useState(0);
  const [listHotspotOfRoom] = useState(hotspot);
  const [listVideo] = useState<Array<ModelVideo>>(videos);
  const [product, setProduct] = useState<ModelProcduct>();
  const [listProduct] = useState<Array<ModelProcduct>>(products);
  const [listPictureOfRoom] = useState<Array<ModelPicture>>(productPicture);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2D, setIsModalOpen2D] = useState(false);
  const [loading, setLoading] = useState(true);
  const [started, setStarted] = useState(false);
  const [isModalOpenMap, setIsModalOpenMap] = useState(true);
  const [isModalOpenVideo, setIsModalOpenVideo] = useState(false);
  const [video, setVideo] = useState<ModelVideo>();
  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  const handleCancel = () => {
    setIsModalOpen(false);
    const obj: any = undefined;
    setProduct(obj);
  };
  const handleHotspotClick = (linkToSceneId: number) => {
    callLoading();
    const index = listSceneOfRoom.findIndex((x) => x.id === linkToSceneId);
    setMysceneIndex(index);
  };
  const handleProductClick = (product: ModelProcduct) => {
    console.log(product);
    setProduct(product);
    if (product.type === "3D") {
      showModal();
    } else if (product.type === "2D") {
      setIsModalOpen2D(true);
    }
  };
  function handlePictureClick(id: number, index: number) {
    console.log("picture customer id", id);
    console.log("picture customer index", index);
  }
  const handleVideoClick = (video: ModelVideo) => {
    setVideo(video);
    setIsModalOpenVideo(true);
  };
  const Portals = () => {
    const { id, radius } = listSceneOfRoom[mysceneIndex];
    const maps = useLoader(
      THREE.TextureLoader,
      listSceneOfRoom.map((entry: any) => `${entry.url}`)
    );

    return (
      <group>
        <SceneItem
          texture={maps[mysceneIndex]}
          scene={id}
          isDev={1}
          radius={radius}
        />
        {/* <Sound url={"./music.mp3"} /> */}
        <Hotspot
          sceneId={listSceneOfRoom[mysceneIndex].id}
          data={listHotspotOfRoom}
          onClick={handleHotspotClick}
        />
        <ListVideo
          sceneId={listSceneOfRoom[mysceneIndex].id}
          data={listVideo}
          onClick={handleVideoClick}
        />
        <ListProduct
          sceneId={listSceneOfRoom[mysceneIndex].id}
          data={listProduct}
          onClick={handleProductClick}
        />

        <ListPicture
          sceneId={listSceneOfRoom[mysceneIndex].id}
          data={listPictureOfRoom}
          onClick={handleProductClick}
        />
      </group>
    );
  };

  const boxRefMap = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      gsap.from(".box", {
        y: -250,
        rotationY: 50,
        rotationX: 20,
        duration: 1.5,
        opacity: 0,
      });
    }, boxRefMap);

    return () => ctx.revert();
  }, [isModalOpenMap, loading]);

  const handleMenuClick = (e: string) => {
    if (e === "MAP") {
      setIsModalOpenMap(true);
    } else if (e === "PAYMENT") {
      handleShowModalCreditCard();
    } else if (e === "LOGIN") {
      handleShowModalLogin();
    }
  };

  const handleCancelModalMap = () => {
    setIsModalOpenMap(false);
  };
  const handleCancelModalVideo = () => {
    setIsModalOpenVideo(false);
  };
  const [pointName, setPointName] = useState("_");
  const handleClickPointMap = (sceneId: number) => {
    callLoading();
    const index = listSceneOfRoom.findIndex((x) => x.id === sceneId);
    setMysceneIndex(index);
    setIsModalOpenMap(false);
  };
  const handleHoverPointMap = (e: string) => {
    if (e) setPointName(e);
    else {
      setPointName(" ");
    }
  };
  const handleCancel2D = () => {
    setIsModalOpen2D(false);
  };

  function callLoading() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }
  const handleStart = () => {
    setStarted(true);
    callLoading();
  };
  const [isVisibleModalCreditCard, setIsVisibleModalCreditCard] =
    useState(false);
  const handleChangeModalCreditCard = (e: any) => {
    setIsVisibleModalCreditCard(e.target.visible);
  };
  const handleShowModalCreditCard = () => {
    setIsVisibleModalCreditCard(true);
  };

  const [isVisibleModalLogin, setIsVisibleModalLogin] = useState(false);
  const handleChangeModalLogin = (e: any) => {
    setIsVisibleModalLogin(e.target.visible);
  };
  const handleShowModalLogin = () => {
    setIsVisibleModalLogin(true);
  };
  const handlePaymentByCreditCard = (values: ModelCreditCard) => {};
  return (
    <>
      {/* <VideoThree /> */}
      <Suspense fallback={null}>
        {!started && !loading && (
          <Banner onStart={handleStart} loading={!loading} />
        )}
        {!loading && started && (
          <>
            <div className="banner">
              <div className="images">
                <LayoutThree>
                  <Portals />
                </LayoutThree>
              </div>
            </div>
            <Modal
              open={isModalOpen}
              onCancel={handleCancel}
              footer={null}
              centered={true}
              width={1000}
              destroyOnClose
            >
              <Row gutter={24}>
                <Col span={14}>
                  <div className="content-view">
                    <div className="slider">
                      {product && (
                        <Slide360View
                          url={product?.url}
                          imageFilenamePrefix={product?.imageName}
                          type={product?.imagesFiletype}
                          amount={product?.amount}
                          imageInitialIndex={product?.imageInitialIndex}
                          width={product?.width}
                          height={product?.height}
                        />
                      )}
                    </div>
                  </div>
                </Col>
                <Col span={10}>
                  <h1 className="name">{product?.name}</h1>
                  <p className="number">(Quantity 10 slots)</p>
                  <p className="price1">Price $898.75</p>

                  <Row gutter={16}>
                    <Col>
                      <p className="price2">Sales $719</p>
                    </Col>
                    <Col>
                      <Tag
                        style={{ padding: "8px 16px", fontSize: 24 }}
                        color="#f50"
                      >
                        -20%
                      </Tag>
                    </Col>
                  </Row>

                  <div className="desc">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </div>
                  <Row gutter={6} className="row1">
                    <Col>
                      <div className="quality">Quantity</div>
                    </Col>
                    <Col>
                      <Button size="large" icon={<MinusOutlined />} />
                    </Col>
                    <Col>
                      <InputNumber
                        min={1}
                        max={100}
                        defaultValue={1}
                        size="large"
                      />
                    </Col>
                    <Col>
                      <Button size="large" icon={<PlusOutlined />} />
                    </Col>
                  </Row>

                  <Row className="row2" gutter={8}>
                    <Col>
                      <Button
                        type="primary"
                        size="large"
                        style={{
                          width: "100%",
                          marginTop: 24,
                          borderRadius: 8,
                        }}
                      >
                        Order now
                      </Button>
                    </Col>
                    <Col>
                      <div className="vlg">Requested amount : 50 VLG</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal>

            <Modal
              open={isModalOpen2D}
              onCancel={handleCancel2D}
              footer={null}
              centered={true}
              width={1000}
              destroyOnClose
            >
              <Row gutter={24}>
                <Col span={14}>
                  <div className="content-view">
                    <div className="avatar">
                      <Image src={product?.imagePath} />
                    </div>
                  </div>
                </Col>
                <Col span={10}>
                  <h1 className="name">{product?.name}</h1>
                  <p className="number">(Quantity 10 slots)</p>
                  <p className="price1">Price $898.75</p>

                  <Row gutter={16}>
                    <Col>
                      <p className="price2">Sales $719</p>
                    </Col>
                    <Col>
                      <Tag
                        style={{ padding: "8px 16px", fontSize: 24 }}
                        color="#f50"
                      >
                        -20%
                      </Tag>
                    </Col>
                  </Row>

                  <div className="desc">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text ever since the 1500s, when an unknown
                    printer took a galley of type and scrambled it to make a
                    type specimen book. It has survived not only five centuries,
                    but also the leap into electronic typesetting, remaining
                    essentially unchanged. It was popularised in the 1960s with
                    the release of Letraset sheets containing Lorem Ipsum
                    passages, and more recently with desktop publishing software
                    like Aldus PageMaker including versions of Lorem Ipsum.
                  </div>
                  <Row gutter={6} className="row1">
                    <Col>
                      <div className="quality">Quantity</div>
                    </Col>
                    <Col>
                      <Button size="large" icon={<MinusOutlined />} />
                    </Col>
                    <Col>
                      <InputNumber
                        min={1}
                        max={100}
                        defaultValue={1}
                        size="large"
                      />
                    </Col>
                    <Col>
                      <Button size="large" icon={<PlusOutlined />} />
                    </Col>
                  </Row>

                  <Row className="row2" gutter={8}>
                    <Col>
                      <Button
                        type="primary"
                        size="large"
                        style={{
                          width: "100%",
                          marginTop: 24,
                          borderRadius: 8,
                        }}
                      >
                        Order now
                      </Button>
                    </Col>
                    <Col>
                      <div className="vlg">Requested amount : 50 VLG</div>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Modal>
            <Modal
              open={isModalOpenMap}
              footer={null}
              centered={true}
              width={1000}
              onCancel={handleCancelModalMap}
              className="ant-modal-map"
              wrapClassName="ant-modal-map"
              focusTriggerAfterClose={false}
              destroyOnClose
            >
              <h2 className="h2map">{pointName}</h2>
              <div ref={boxRefMap}>
                <div className="box">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    // xmlns:xlink="http://www.w3.org/1999/xlink"
                    x="0px"
                    y="0px"
                    viewBox="0 0 721.8 426.7"
                    fill="new 0 0 721.8 426.7;"
                    // style={{ enableBackground: "new 0 0 721.8 426.7;" }}
                    // xml:space="preserve"
                  >
                    <polygon
                      id="shop1map"
                      className="st0 open"
                      points="329.1,175.8 406.2,131.3 354.2,101.3 277.2,145.8 	"
                      onMouseEnter={() => handleHoverPointMap("Stote 1")}
                      onClick={() => handleClickPointMap(3)}
                    />
                    <polygon
                      id="shop2map"
                      className="st0 open"
                      points="312.7,216.3 354.2,192.3 275.4,146.8 233.9,170.8 	"
                      onMouseEnter={() => handleHoverPointMap("Lobby")}
                      onClick={() => handleClickPointMap(1)}
                    />
                    <polygon
                      id="shop3map"
                      className="st0 "
                      points="59.8,331.3 120.4,296.3 113.5,292.3 53.7,274.8 7.8,301.3 	"
                    />
                    <polygon
                      id="shop4map"
                      className="st0 open"
                      points="356,191.3 395.8,168.3 370.7,153.8 330.8,176.8 	"
                      onMouseEnter={() => handleHoverPointMap("Stote 2")}
                      onClick={() => handleClickPointMap(2)}
                    />
                    <polygon
                      id="shop5map "
                      className="st0"
                      points="289.3,229.8 310.9,217.3 284.1,201.8 262.4,214.3 	"
                    />
                    <polygon
                      id="shop6map"
                      className="st0"
                      points="397.5,167.3 433,146.8 407.9,132.3 372.4,152.8 	"
                    />
                    <polygon
                      id="shop7map"
                      className="st0"
                      points="420.9,122.8 497.1,78.8 445.2,48.8 369,92.8 	"
                    />
                    <polygon
                      id="shop8map"
                      className="st0"
                      points="447.8,138.3 524,94.3 498.9,79.8 422.6,123.8 	"
                    />
                    <polygon
                      id="shop9map"
                      className="st0"
                      points="551.7,198.3 629.6,153.3 604.5,138.8 526.6,183.8 	"
                    />
                    <polygon
                      id="shop10map"
                      className="st0"
                      points="392.3,290.3 458.2,252.3 432.2,237.3 366.4,275.3 	"
                    />
                    <polygon
                      id="shop11map"
                      className="st0"
                      points="252.9,370.8 282.3,353.8 257.2,339.3 227.8,356.3 	"
                    />
                    <polygon
                      id="shop12map"
                      className="st0"
                      points="650.4,141.3 714.5,104.3 662.5,74.3 598.4,111.3 	"
                    />
                    <polygon
                      id="shop13map"
                      className="st0"
                      points="179.3,262.3 202.7,248.8 229.5,264.3 257.2,248.3 178.4,202.8 127.3,232.3 	"
                    />
                    <polygon
                      id="shop14map"
                      className="st0"
                      points="125.6,233.3 74.5,262.8 180.2,292.8 227.8,265.3 202.7,250.8 179.3,264.3 	"
                    />
                    <polygon
                      id="shop15map"
                      className="st0"
                      points="524,182.3 602.2,137.5 567.4,117.2 539.6,116.3 474.6,153.8 	"
                    />
                    <polygon
                      id="shop16map"
                      className="st0"
                      points="501.5,227.3 550,199.3 498,169.3 472.9,183.8 447.8,169.3 424.4,182.8 	"
                    />
                    <polygon
                      id="shop17map"
                      className="st0"
                      points="459.9,251.3 499.7,228.3 422.6,183.8 382.8,206.8 	"
                    />
                    <polygon
                      id="shop18map"
                      className="st0"
                      points="364.6,274.3 430.4,236.3 381.1,207.8 315.3,245.8 	"
                    />
                    <polygon
                      className="st1"
                      points="233.9,292.8 257.2,306.3 257.2,317.6 233.9,304.1 	"
                    />
                    <polygon
                      id="shop19map"
                      className="st0"
                      points="284.1,352.8 377.6,298.8 324.8,268.3 231.3,322.3 	"
                    />
                    <polygon
                      id="shop20map"
                      className="st0"
                      points="226.1,355.3 255.5,338.3 205.3,309.3 175.8,326.3 	"
                    />
                    <polygon
                      id="shop21map"
                      className="st0"
                      points="256.4,305.8 323.1,267.3 300.5,254.3 233.9,292.8 	"
                    />
                    <polygon
                      id="shop22map"
                      className="st0"
                      points="472.9,181.8 496.3,168.3 472.9,154.8 449.5,168.3 	"
                    />
                    <polygon
                      id="shop23map"
                      className="st0"
                      points="446.9,47.8 525.7,93.3 531.8,89.8 531.8,24.8 509.2,11.8 	"
                    />
                    <polygon
                      id="shop24map"
                      className="st0"
                      points="660.9,73.3 566.4,18.8 552.6,26.8 552.6,84.8 596.8,110.3 	"
                    />
                    <polygon
                      id="shop25map"
                      className="st0"
                      points="251.2,371.8 174.1,327.3 167.2,331.3 167.2,393.3 190.6,406.8 	"
                    />
                    <polygon
                      id="shop26map"
                      className="st0"
                      points="61.5,332.3 127.3,370.3 147.2,358.8 147.3,311.8 122.1,297.3 	"
                    />
                    <polygon
                      id="shop27map"
                      className="st0"
                      points="282.4,200.8 259,214.3 287.5,230.8 259,247.3 180.2,201.8 232.1,171.8 	"
                    />
                    <polygon
                      className="st2"
                      points="714.5,115.7 650.4,152.7 650.4,141.3 714.5,104.3 	"
                    />
                    <polygon
                      className="st2"
                      points="629.6,164.6 392.3,301.6 392.3,290.2 629.6,153.2 	"
                    />
                    <polygon
                      className="st2"
                      points="433,158.1 180.2,304.1 180.2,292.8 433,146.8 	"
                    />
                    <polygon
                      className="st2"
                      points="531.8,101.1 447.8,149.6 447.8,138.2 531.8,89.7 	"
                    />
                    <polygon
                      className="st2"
                      points="377.6,310.1 190.6,418.1 190.6,406.7 377.6,298.7 	"
                    />
                    <polygon
                      className="st2"
                      points="147.3,370.2 127.3,381.7 127.3,370.4 147.3,358.9 	"
                    />
                    <polygon
                      className="st1"
                      points="552.5,84.8 650.4,141.3 650.4,152.7 552.5,96.2 	"
                    />
                    <polygon
                      className="st1"
                      points="315.3,245.7 392.3,290.2 392.3,301.6 315.3,257.1 	"
                    />
                    <polygon
                      className="st1"
                      points="369,92.7 447.8,138.2 447.8,149.6 369,104.1 	"
                    />
                    <polygon
                      className="st1"
                      points="7.8,301.4 127.3,370.4 127.3,381.7 7.8,312.7 	"
                    />
                    <polygon
                      className="st1"
                      points="74.5,262.8 180.2,292.8 180.2,304.1 74.5,272.5 	"
                    />
                    <polygon
                      className="st1"
                      points="167.2,393.2 190.6,406.7 190.6,418.1 167.2,404.6 	"
                    />
                  </svg>
                </div>
              </div>
            </Modal>

            <Modal
              open={isModalOpenVideo}
              footer={null}
              centered={true}
              width={1000}
              onCancel={handleCancelModalVideo}
              wrapClassName="ant-modal-video"
              focusTriggerAfterClose={false}
              destroyOnClose
            >
              <div className="container-video">
                <div className="video">
                  {video && (
                    <iframe
                      width="800"
                      height="450"
                      src="https://www.youtube.com/embed/_jd4Qa9ZNLs?autoplay=1&mute=0"
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; muted; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  )}
                </div>

                {video && (
                  <h2 style={{ textAlign: "center" }}>{video?.name}</h2>
                )}
              </div>
            </Modal>
            <Footer loading={!loading} onMenuClick={handleMenuClick} />
            <ModalPaymentCreditCard
              isVisible={isVisibleModalCreditCard}
              onChange={handleChangeModalCreditCard}
              onSubmit={handlePaymentByCreditCard}
            />
            <ModalLogin
              isVisible={isVisibleModalLogin}
              onChange={handleChangeModalLogin}
            />
          </>
        )}
      </Suspense>
      <Loading open={loading} />
    </>
  );
}
