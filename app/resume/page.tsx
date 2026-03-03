import Image from "next/image";
import bannerImage from '../../public/Astronomicum Caesasreum.png';

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
        src="/Karen_Law_Resume_Mar26.pdf#zoom=100"
        width="FitW"
        height="auto"
        style={{ border: "2px solid black" }}
        className="pdf-container"
      />
	  </div>
	  <p/>
      <div className="button-container">
        <a
          href="/Karen_Law_Resume_Mar26.pdf"
          download="Karen_Law_Resume_Mar26.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button>Download</button>
        </a>
      </div>
    </>
  );
}
