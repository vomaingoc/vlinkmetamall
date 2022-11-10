import { Button, Col, Row, Image, Badge } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  EnvironmentOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
import React, { useEffect, useState } from "react";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
import Sound from "components/Sound";
import { ModelProcduct } from "models";
export default function Footer(props: any) {
  const {
    onMenuClick,
    loading,
    started,
    isModalOpenVideo,
    isShowCart,
    listCart,
  } = props;
  const [showCart, setShowCart] = useState<Boolean>(isShowCart);
  const handleClickShowCart = () => {
    setShowCart((prev) => !prev);
  };
  const handleClick = (e: string) => {
    onMenuClick(e);
  };
  const myRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (!loading) {
        gsap.from(".row1", {
          bottom: -300,
          opacity: 0.6,
          duration: 3,
        });
      } else {
        gsap.to(".row1", {
          opacity: 0,
          duration: 1,
        });
      }
    }, myRef);

    return () => ctx.revert();
  }, [loading]);
  const [total, setTotal] = useState(0);
  useEffect(() => {
    setShowCart(isShowCart);
    let sum = listCart.reduce(function (prev: number, current: any) {
      return prev + current.price2;
    }, 0);
    setTotal(sum);
  }, [isShowCart, listCart]);

  return (
    <div className="footer">
      <Row className="row1">
        <Col>
          <Row className="row11" gutter={24}>
            <Col>
              <div className="logo">
                <Image
                  src="/files/logo.png"
                  alt=""
                  preview={false}
                  width={150}
                />
              </div>
            </Col>
          </Row>
        </Col>
        <Col>
          <div className="tool-right">
            <Row gutter={24}>
              <Col>
                <Sound
                  started={started}
                  loading={loading}
                  isModalOpenVideo={isModalOpenVideo}
                />
              </Col>
              <Col>
                <Button
                  style={{
                    border: 0,
                    fontSize: "1.5em",
                    padding: 0,
                    position: "relative",
                  }}
                  size="large"
                  ghost
                  onClick={() => handleClick("MAP")}
                >
                  <EnvironmentOutlined />
                </Button>
              </Col>
              <Col>
                <Badge
                  count={listCart.length}
                  size="small"
                  status="default"
                  offset={[0, 0]}
                >
                  <Button
                    style={{
                      border: 0,
                      fontSize: "1.5em",
                      padding: 0,
                      position: "relative",
                    }}
                    size="large"
                    ghost
                    onClick={handleClickShowCart}
                  >
                    <ShoppingOutlined />
                  </Button>
                </Badge>
              </Col>
              <Col>
                <Button
                  style={{
                    border: 0,
                    fontSize: "1.5em",
                    padding: 0,
                    marginRight: 24,
                  }}
                  size="large"
                  ghost
                  onClick={() => handleClick("LOGIN")}
                >
                  <UserOutlined />
                </Button>
              </Col>

              {showCart && (
                <Col>
                  <Button
                    style={{
                      border: 0,
                      fontSize: "1.5em",
                      padding: 0,
                      marginRight: 24,
                    }}
                    size="large"
                    ghost
                    onClick={handleClickShowCart}
                  >
                    <CloseSquareOutlined />
                  </Button>
                </Col>
              )}
            </Row>
          </div>
        </Col>
      </Row>
      {showCart && (
        <div className="cart">
          <Row className="row2">
            {listCart?.map((item: ModelProcduct, index: number) => (
              <Col md={4} sm={8} xs={24} key={index}>
                <div className="item-product">
                  <Image
                    src={item.imagePath}
                    alt=""
                    preview={false}
                    style={{ width: "100%" }}
                  />
                  <div className="title">{item?.name}</div>
                  <div className="price">${item.price2?.toFixed(2)}</div>
                </div>
              </Col>
            ))}
          </Row>
          <Row className="row3" gutter={36}>
            <Col>
              Total: <b>${total.toFixed(2)}</b>
            </Col>
            <Col>
              <Button
                type="primary"
                shape="round"
                size={"large"}
                onClick={() => handleClick("PAYMENT")}
              >
                PROCEED TO PAYMENT
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
