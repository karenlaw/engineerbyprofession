import Image from "next/image";
import bannerImage from '../../public/cellarius-seasons-banner.png';

export default function Resume() {
  return (
    <>
      <h2>Resume</h2>

      <div className="image-container">
        <Image
          src={bannerImage}
          alt="cellarius seasons banner"
          width={300}
        />
      </div>
      <p />

      <iframe
        src="/Karen Law Resume Feb 26.pdf"
        width="100%"
        height="640px"
        style={{ border: "2px solid black" }}
        className="pdf-container"
      />

      <div className="button-container">
        <a
          href="/Karen Law Resume Feb 26.pdf"
          download="Karen Law Resume Feb 26.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Download</button>
        </a>
      </div>
    </>
  );
}
