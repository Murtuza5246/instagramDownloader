import dynamic from "next/dynamic";
const Videodownloader = dynamic(
  () => {
    return import("../old_pages/Video/Video");
  },
  { ssr: true }
);

const VideodownloaderPage = () => {
  return <Videodownloader />;
};
export default VideodownloaderPage;