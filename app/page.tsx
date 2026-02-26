import Image from "next/image";
import Link from "next/link";
import calculatorImage from '../public/Old fashioned calculator.jpg';
import KarenImage from '../public/KarenWithCat_closeup.jpg';

export default function Home() {
  return (
    <>
      <div className="paragraph-container">
        <div className="image-left">
          <Image
            src={KarenImage}
            alt="Karen with cat photo"
            style={{ height: '200px', width: 'auto' }}
          />
        </div>
      </div>

      <p>Hello, welcome to my site; my name is Karen Law.</p>
      <p>
        I am a senior Python developer with extensive experience designing and building scalable
        full-stack solutions, internal platforms, and automation tools. I have delivered
        enterprise-grade solutions at Apple, Airbus, and Western Digital, with deep expertise
        in Python, APIs, data processing, and CI/CD.
      </p>
      <p>
        Based in the San Francisco Bay Area, I focus on building reliable, maintainable systems
        that improve performance, streamline workflows, and enhance developer productivity.
      </p>
      <p>
        Here is my <Link href="/resume">resume</Link> for your consideration.
      </p>

      <div className="image-container">
        <Image
          src={calculatorImage}
          alt="Old fashion calculator"
          width={300}
        />
      </div>
    </>
  );
}
