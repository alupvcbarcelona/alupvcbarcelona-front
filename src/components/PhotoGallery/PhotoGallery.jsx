import { useCallback, useEffect, useRef, useState } from "react";
import { images } from "./content";
import "./PhotoGallery.css";

const PhotoGallery = () => {
  const [selected, setSelected] = useState(null);

  const galleryRef = useRef(null);
  const step = useRef(0);

  const calculateSizes = useCallback(() => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    const item = gallery.querySelector(".photo-gallery__item");

    if (!item) return;

    const gap = parseFloat(getComputedStyle(gallery).gap);

    step.current = item.getBoundingClientRect().width + gap;
  }, []);

  useEffect(() => {
    calculateSizes();

    window.addEventListener("resize", calculateSizes);

    return () => {
      window.removeEventListener("resize", calculateSizes);
    };
  }, [calculateSizes]);

  const scroll = (direction) => {
    const gallery = galleryRef.current;

    if (!gallery) return;

    gallery.scrollBy({
      left: direction === "left" ? -step.current : step.current,
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="photo-gallery-wrapper">
        <button
          className="photo-gallery__arrow photo-gallery__arrow--left"
          onClick={() => scroll("left")}
        >
          ❮
        </button>

        <div className="photo-gallery" ref={galleryRef}>
          {images.map((image) => (
            <div
              key={image.id}
              className="photo-gallery__item"
              onClick={() => setSelected(image)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="photo-gallery__image"
                draggable={false}
              />
            </div>
          ))}
        </div>

        <button
          className="photo-gallery__arrow photo-gallery__arrow--right"
          onClick={() => scroll("right")}
        >
          ❯
        </button>
      </div>

      {selected && (
        <div
          className="photo-gallery__lightbox"
          onClick={() => setSelected(null)}
        >
          <button
            className="photo-gallery__close"
            onClick={(e) => {
              e.stopPropagation();
              setSelected(null);
            }}
          >
            ✕
          </button>

          <img
            className="photo-gallery__lightbox-image"
            src={selected.src}
            alt={selected.alt}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </>
  );
};

export default PhotoGallery;
