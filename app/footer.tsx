export default function Footer() {
  return (
    <footer>
      <div className="footer">
        <div className="container bottom_border">
          <div className="row">
            <div className="col-sm-4 col-md col-sm-4 col-12 col">
              <h5 className="headin5_amrc col About">About</h5>
              <p className="mb10">
                Senior Python developer with a proven track record of delivering
                enterprise-grade solutions that solve complex, real-world business problems.
              </p>
            </div>
            <div className="col-sm-4 col-md col Contact">
              <h5 className="headin5_amrc col_white_amrc pt2">Contact</h5>
              <ul className="footer_ul_amrc">
                <li>
                  <a href="mailto:karenlaw@engineerbyprofession.com">
                    karenlaw@engineerbyprofession.com
                  </a>
                </li>
                <li>(408) 813-5342</li>
              </ul>
            </div>
          </div>
          <p className="text-center">Copyright Karen Law © 2026</p>
        </div>
      </div>
    </footer>
  );
}
