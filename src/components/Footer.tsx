import { Button, Col, Row, Image, Badge } from "antd";
import {
  ShoppingOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
export default function Footer(props: any) {
  const { onMenuClick, loading } = props;
  const [showCart, setShowCart] = useState(false);
  const handleClickShowCart = () => {
    setShowCart((prev) => !prev);
  };
  const handleClick = (e: string) => {
    onMenuClick(e);
  };
  const myRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (loading) {
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
            {/* <Col>
              <Button type="link" className="btn-nav">
                Home
              </Button>
              <Button type="link" className="btn-nav">
                Products
              </Button>
              <Button
                type="link"
                className="btn-nav"
                onClick={() => handleClick("MAP")}
              >
                Map
              </Button>
            </Col> */}
          </Row>
        </Col>
        <Col>
          <div className="tool-right">
            <Row gutter={24}>
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
                <Badge count={1} size="small" status="default" offset={[0, 0]}>
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

                <Button
                  style={{
                    border: 0,
                    fontSize: "1.5em",
                    padding: 0,
                    margin: "0 16px",
                  }}
                  size="large"
                  ghost
                >
                  <UserOutlined />
                </Button>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
      {showCart && (
        <div className="cart">
          <Row className="row2">
            <Col span={4}>
              <div className="item-product">
                <Image
                  src="https://media.dior.com/couture/ecommerce/media/catalog/product/1/d/1633627029_KCK337LRU_S09W_E02_GH.jpg"
                  alt=""
                  preview={false}
                  style={{ width: "100%" }}
                />
                <div className="title">Dior Vibe Sneaker</div>
                <div className="price">$1,190.00</div>
              </div>
            </Col>
          </Row>
          <Row className="row3" gutter={36}>
            <Col>
              Total: <b>$4,990.00</b>
            </Col>
            <Col>
              <Button type="primary" shape="round" size={"large"}>
                PROCEED TO CHECKOUT
              </Button>
            </Col>
          </Row>
        </div>
      )}
    </div>
  );
}
