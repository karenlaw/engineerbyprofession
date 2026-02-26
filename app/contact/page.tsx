import Image from "next/image";
import bannerImage from '../../public/abacus_small.png';

export default function Contact() {
  return (
    <>
      <h2>Contact</h2>

      <div className="image-container">
        <Image
          src={bannerImage}
          alt="abacus image"
          width={300}
        />
      </div>
      <p />

      <p>
        Email Karen at{" "}
        <a href="mailto:karenlaw@engineerbyprofession.com">
          karenlaw@engineerbyprofession.com
        </a>
      </p>
      <p>You can also call her mobile phone at +1(408) 813-5342</p>
      <p>
        Karen is also on{" "}
        <a href="https://www.linkedin.com/in/karen-law-b89a1b5/">LinkedIn</a>
      </p>
    </>
  );
}
