import { LoadingOutlined } from "@ant-design/icons";
import { Spin, Image } from "antd";
import React from "react";
import { gsap } from "gsap";
import { useLayoutEffect, useRef } from "react";
export default function Banner(props: any) {
  const { loading, onStart } = props;
  const myRef = useRef(null);
  useLayoutEffect(() => {
    let ctx = gsap.context(() => {
      if (loading) {
        gsap.from(".neon-button", {
          bottom: -300,
          opacity: 0.6,
          duration: 1,
        });
        gsap.from(".video", {
          opacity: 0.6,
        });
      } else {
        gsap.to(".neon-button", {
          opacity: 0,
          duration: 0.5,
        });
      }
    }, myRef);

    return () => ctx.revert();
  }, [loading]);
  return (
    <>
      <div className="hero" ref={myRef}>
        {/* <div className="logo-site">
          <Image
            src="/files/logo.png"
            alt=""
            preview={false}
            width={250}
            style={{ marginBottom: 24 }}
          />
        </div> */}
        <iframe
          width="800"
          height="450"
          src="https://www.youtube.com/embed/_jd4Qa9ZNLs?autoplay=1&mute=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; muted; encrypted-media; gyroscope; picture-in-picture;loop;"
          allowFullScreen
          id="videobanner"
        />
        {/* <video autoPlay loop muted id="video" className="video" controls>
          <source src={"/files/videos/video.mp4"} type="video/mp4" />
        </video> */}
        <div className="overlay">
          <h2 className="purple s1">Welcome to</h2>
          <h1 className="purple h1">VLINKMETA MALL</h1>
          <a href="#" onClick={onStart} className="neon-button">
            Start now
          </a>
        </div>
      </div>
    </>
  );
}
