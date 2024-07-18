import React, { useState, useEffect } from "react";
import Loader from "./Loader";

function Video({ videos, page, setPage, totalPages }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [videos]);

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

  const handleVideoDownload = (videoUrl) => {
    fetch(videoUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.blob();
      })
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "downloaded-video.mp4");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => {
        console.error("Error downloading video:", error);
      });
  };

  return (
    <div className="video_container">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          {videos && videos.length > 0 ? (
            <>
              {videos.map((video, index) => (
                <div className="video_box" key={index}>
                  <div
                    className="vid_download_btn"
                    onClick={() => handleVideoDownload(video.videos.large.url)}
                  >
                    Download
                  </div>
                  <video controls autoPlay muted>
                    <source src={video.videos.large.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
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

export default Video;
