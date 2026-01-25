import { useState } from "react";

export default function CarouselChallenge() {
  const images = [
    {
      src: "https://picsum.photos/id/100/600/400",
      alt: "Forest",
    },
    {
      src: "https://picsum.photos/id/200/600/400",
      alt: "Forest",
    },
    {
      src: "https://picsum.photos/id/300/600/400",
      alt: "Forest",
    },
    {
      src: "https://picsum.photos/id/400/600/400",
      alt: "Forest",
    },
    {
      src: "https://picsum.photos/id/500/600/400",
      alt: "Forest",
    },
    {
      src: "https://picsum.photos/id/600/600/400",
      alt: "Forest",
    },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  //   const currentSlide = currentImg;
  const [isTransitioning, setIsTransitioning] = useState(false);

  const [bgSlide, setBgSlide] = useState("");

  function nextSlide() {
    setBgSlide(images[nextImage].src);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(nextImage);
      setBgSlide("");
      setIsTransitioning(false);
    }, 1000);
  }

  function prevSlide() {
    setBgSlide(images[prevImage].src);
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSlide(nextImage);
      setBgSlide("");
      setIsTransitioning(false);
    }, 1000);
  }

  const nextImage = currentSlide == images.length - 1 ? 0 : currentSlide + 1;
  const prevImage = currentSlide == 0 ? images.length - 1 : currentSlide - 1;

  return (
    <div className="relative max-w-fit">
      <div className="relative">
        <div
          className="h-[400px] w-[600px]"
          style={{ backgroundImage: `url(${bgSlide})` }}
        >
          <img
            src={images[currentSlide].src}
            alt={images[currentSlide].alt}
            style={{
              transitionDuration: bgSlide == "" ? "0ms" : "1000ms",
              transitionProperty: "opacity",
              opacity: bgSlide == "" ? "100" : "0",
            }}
          />
        </div>
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-0 bottom-0 my-auto text-2xl bg-neutral-600/50 h-10 aspect-square rounded-4xl flex pl-2.5 font-semibold"
      >
        {"<"}
      </button>

      <button
        onClick={() => {
          if (!isTransitioning) {
            nextSlide();
          }
        }}
        className="absolute right-4 top-0 bottom-0 my-auto text-2xl bg-neutral-600/30 h-10 aspect-square rounded-4xl flex pl-3 font-semibold"
      >
        {">"}
      </button>
    </div>
  );
}
