import usFlag from "@assets/images/us.png";
import faFlag from "@assets/images/fa.png";
import { useEffect, useRef, useState } from "react";
import { useAppContext } from "../context/app/app-context";
const ChangeLanguage = () => {
  const [show, setShow] = useState(false);
  const { language, changeLanguage } = useAppContext();
  const ref = useRef();

  useEffect(() => {
    const checkIfClickOutSide = (e) => {
      if (show && ref.current && !ref.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", checkIfClickOutSide);

    return () => {
      document.removeEventListener("mousedown", checkIfClickOutSide);
    };
  }, [show]);

  useEffect(() => {
    setShow(false);
  }, [language]);

  return (
    <section className="dropdown">
      <a className="nav-flag dropdown-toggle" onClick={() => setShow(true)}>
        <img src={language === "fa" ? faFlag : usFlag} alt="" />
      </a>
      <section
        ref={ref}
        className={`dropdown-menu dropdown-menu-end ${show ? "show" : ""}`}
      >
        <a
          className="dropdown-item fw-bolder align-items-center gap-2 d-flex"
          style={{ textAlign: language === "fa" ? "right" : "left" }}
          onClick={() => changeLanguage("fa")}
        >
          <img src={faFlag} width="20" className="ms-2" alt="" />
          <span className="align-middle">فارسی</span>
        </a>

        <a
          className="dropdown-item fw-bolder  align-items-center gap-2 d-flex"
          style={{ textAlign: language === "fa" ? "right" : "left" }}
          onClick={() => changeLanguage("en")}
        >
          <img src={usFlag} width="20" className="ms-2" alt="" />
          <span className="align-middle">انگلیسی</span>
        </a>
      </section>
    </section>
  );
};

export default ChangeLanguage;
