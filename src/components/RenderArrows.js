import { ButtonBase } from "@mui/material";
import { ArrowLeft, ArrowRight } from "@mui/icons-material";
import { useRef } from "react";

const RenderArrows = () => {
  const sliderRef = useRef(null);
  return (
    <div className="slider-arrow">
      <ButtonBase
        className="arrow-btn prev bg-black text-white rounded-circle"
        onClick={() => sliderRef.current.slickPrev()}
      >
        <ArrowLeft />
      </ButtonBase>
      <ButtonBase
        className="arrow-btn next bg-black text-white rounded-circle"
        onClick={() => sliderRef.current.slickNext()}
      >
        <ArrowRight />
      </ButtonBase>
    </div>
  );
};

export default RenderArrows;
