import React, { useState, useEffect } from "react";
import Loader from "./Loader";

export default function ImageGallery({
  images,
  page,
  totalPages,
  handleDownload,
  setPage,
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [images]);

  const handlePrevious = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const handleNext = () => {
    if (page < totalPages) {
      setPage(page + 1);
    }
  };

  return (
    <div className="image_container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {images.length > 0 ? (
            <>
              {images.map((image, index) => (
                <div className="image_box" key={index}>
                  <div
                    className="download_btn"
                    onClick={() => handleDownload(image.webformatURL)}
                  >
                    Download
                  </div>
                  <img src={image.webformatURL} alt="" />
                </div>
              ))}
              <div className="nav_buttons">
                {page > 1 && <button onClick={handlePrevious}>Previous</button>}
                {page < totalPages && (
                  <button onClick={handleNext}>Next</button>
                )}
              </div>
            </>
          ) : (
            <h1 className="result">No results found</h1>
          )}
        </>
      )}
    </div>
  );
}
