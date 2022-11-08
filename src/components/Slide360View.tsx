import { React360Viewer } from "react-360-product-viewer";
export default function Slide360View(props: any) {
  const {
    url,
    imageFilenamePrefix,
    type,
    amount,
    imageInitialIndex,
    width,
    height,
  } = props;
  return (
    <React360Viewer
      imagesBaseUrl={url}
      imagesCount={amount}
      imagesFiletype={type}
      mouseDragSpeed={amount / 3}
      width={width}
      height={height}
      imageFilenamePrefix={imageFilenamePrefix}
      imageInitialIndex={imageInitialIndex}
      showRotationIconOnStartup={true}
    />
  );
}
