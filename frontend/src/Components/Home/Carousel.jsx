import { useState, useEffect, useCallback } from "react";
import {
  BsFillArrowRightCircleFill,
  BsFillArrowLeftCircleFill,
} from "react-icons/bs";

function Carousel({ slides, autoSlideInterval = 3000 }) {
  const [current, setCurrent] = useState(0);

  const previousSlide = () => {
    setCurrent(current === 0 ? slides.length - 1 : current - 1);
  };

  const nextSlide = useCallback(() => {
    setCurrent((current) => (current === slides.length - 1 ? 0 : current + 1));
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(nextSlide, autoSlideInterval);

    return () => clearInterval(interval);
  }, [nextSlide, autoSlideInterval]);

  return (
    <div className="overflow-hidden relative rounded-sm">
      <div
        className="flex transition ease-out duration-500"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((s, index) => (
          <img key={index} src={s} alt={`Slide ${index}`} />
        ))}
      </div>

      <div className="absolute top-0 h-full w-full flex justify-between items-center text-white px-10 text-3xl">
        <button onClick={previousSlide} aria-label="Previous Slide">
          <BsFillArrowLeftCircleFill className="scale-90 hover:scale-105 ease-in duration-500" />
        </button>
        <button onClick={nextSlide} aria-label="Next Slide">
          <BsFillArrowRightCircleFill className="scale-90 hover:scale-105 ease-in duration-500" />
        </button>
      </div>

      <div className="absolute bottom-0 py-4 flex justify-center gap-3 w-full">
        {slides.map((s, t) => (
          <div
            key={t}
            onClick={() => setCurrent(t)}
            className={`rounded-lg w-4 h-1 cursor-pointer scale-90 hover:scale-150 ease-in duration-500 ${
              t === current ? "bg-white" : "bg-gray-500"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export default Carousel;
