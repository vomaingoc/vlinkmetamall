import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Image } from "antd";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
export default function Loading(props: any) {
  const { open } = props;
  const myRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (open) {
        gsap.from(".loading", {
          duration: 0.5,
          opacity: 0,
          display: "block",
        });
      } else {
        gsap.to(".loading", {
          duration: 1,
          opacity: 0,
          display: "none",
        });
      }
    }, myRef);

    return () => ctx.revert();
  }, [open]);
  return (
    <>
      <div ref={myRef}>
        <div
          className="loading"
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
          <div className="spin3">
            <div className="c1"></div>
            <div className="c2"></div>
            <div className="c3"></div>
            <Image
              src="https://i.ibb.co/w672CFX/Logo-Meta-Mall-01.png"
              alt=""
              preview={false}
              width={100}
            />
          </div>
        </div>
      </div>
    </>
  );
}
