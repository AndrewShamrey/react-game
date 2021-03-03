import { useRef, useCallback } from "react";
import { useSelector } from "react-redux";

import "./backSetting.css";
import Close from "../../assets/images/close.svg";
import back1 from "../../assets/images/back1.jpg";
import back2 from "../../assets/images/back2.png";
import back3 from "../../assets/images/back3.jpg";
import back4 from "../../assets/images/back4.jpg";
import back5 from "../../assets/images/back5.png";

const BackSetting = ({ handleClickImage, onClickClose }) => {
  const backIndex = useSelector((rootState) => rootState.control.backIndex);
  const backgrounds = [back1, back2, back3, back4, back5];
  const img1 = useRef(null);
  const img2 = useRef(null);
  const img3 = useRef(null);
  const img4 = useRef(null);
  const img5 = useRef(null);  

  const images = [img1, img2, img3, img4, img5];

  const clickOnImage = useCallback((e) => {
    handleClickImage(e);
    const index = e.target.getAttribute("index");
    for (let i = 0; i < images.length; i++) {
      if (i === +index) {
        images[i].current.className = 'selected-back';
      } else {
        images[i].current.className = '';
      }
    }
  }, []);

  return (
    <div className="back-setting-wrapper">
      <img className="back-setting-btn-close" src={Close} alt="close" title="Cancel" onClick={onClickClose} />
      <h2 className="back-setting-title">Select background</h2>
      <div className="backgrounds-container">
        {Array(backgrounds.length).fill().map((item, index) => {
          let selectedClass;
          if (index === backIndex) {
            selectedClass = 'selected-back';
          } else {
            selectedClass = '';
          }
          return <img ref={images[index]} key={index} index={index} className={selectedClass} src={backgrounds[index]} alt="back" onClick={clickOnImage} />
        })}
      </div>
    </div>
  );
};

export default BackSetting;
