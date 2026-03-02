import Image from "next/image";
//import bannerImage from '../../public/cellarius-seasons-banner.png';
import bannerImage from '../../public/Astronomicum Caesasreum.png'
export default function Resume() {
  return (
    <>
      <h2>Resume</h2>

      <div className="container">
        <Image
          src={bannerImage}
          alt="Pādishāhnāmah page border"
          width={300}
        />

      <iframe
        src="/Karen Law Resume Feb 26.pdf#zoom=100"
        width="FitW"
        height="auto"
        style={{ border: "2px solid black" }}
        className="pdf-container"
      />
	  </div>
	  <p/>
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
