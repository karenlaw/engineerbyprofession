import Image from "next/image";
import phoneicon from '../public/phone.jpg';
import mailicon from '../public/mail.jpg';

export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container bottom_border">
          <div className="row">
            <div className="col About" style={{ width: "50%", padding: "1rem" }}>
              <h5 className="headin5_amrc col About">About</h5>
              <p className="mb10">
                Senior Python developer with a proven track record of delivering
                enterprise-grade solutions that solve complex, real-world business problems.
              </p>
            </div>
            <div className="col Contact" style={{ width: "50%", padding: "1rem" }}>
              <h5 className="headin5_amrc col_white_amrc pt2">Contact</h5>
              <ul className="footer_ul_amrc">
                <li>
 				  <img src="/mail.jpg" alt="mail icon" style={{ width: "16px", height: "16px", verticalAlign: "middle", marginRight: "8px" }} />
                  <a href="mailto:karenlaw@engineerbyprofession.com">
                    karenlaw@engineerbyprofession.com
                  </a>
                </li>
                <li>
 				  <img src="/phone.jpg" alt="phone icon" style={{ width: "16px", height: "16px", verticalAlign: "middle", marginRight: "6px" }} />
				  (408)813-5342
				</li>
              </ul>
            </div>
          </div>
          <p className="text-center">Copyright Karen Law © 2026</p>
        </div>
      </div>
    </footer>
  );
}
