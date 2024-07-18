import "./styles.css";
import Header from "./Components/Header";
import ImageGallery from "./Components/Image_gallery";
import VideoGallery from "./Components/Video_gallery";
import { useState, useEffect } from "react";

export default function App() {
  const apiKey = "44750123-6ca5675a94e435b868d1d1638";
  const apiEndpoint = "https://pixabay.com/api/";
  const IMAGES_PER_PAGE = 20;
  const VIDEOS_PER_PAGE = 20;

  const [searchText, setSearchText] = useState("");
  const [searchHistory, setSearchHistory] = useState([]);
  const [images, setImages] = useState([]);
  const [videos, setVideos] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [query, setQuery] = useState("boy");
  const [searchType, setSearchType] = useState("Images");

  useEffect(() => {
    if (query !== "") {
      if (searchType === "Videos") {
        fetchVideos(query);
      } else {
        fetchImages(query);
      }
    }
  }, [query, page, searchType]);

  const fetchVideos = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const apiUrl = `https://pixabay.com/api/videos/?key=${apiKey}&q=${encodedQuery}&page=${page}&per_page=${VIDEOS_PER_PAGE}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log(data);
      setVideos(data.hits);
      setTotalPages(Math.ceil(data.totalHits / VIDEOS_PER_PAGE));
    } catch (error) {
      console.log(error);
    }
  };

  const fetchImages = async (query) => {
    try {
      const encodedQuery = encodeURIComponent(query);
      const apiUrl = `${apiEndpoint}?key=${apiKey}&q=${encodedQuery}&page=${page}&per_page=${IMAGES_PER_PAGE}`;
      const response = await fetch(apiUrl);
      const data = await response.json();
      setImages(data.hits);
      setTotalPages(Math.ceil(data.totalHits / IMAGES_PER_PAGE));
    } catch (error) {
      console.log(error);
    }
  };

  const handleDownload = (imageUrl) => {
    fetch(imageUrl)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${imageUrl}`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        window.URL.revokeObjectURL(url);
      })
      .catch(console.error);
  };

  return (
    <>
      <Header
        searchText={searchText}
        setSearchText={setSearchText}
        setQuery={setQuery}
        setSearchType={setSearchType}
        setPage={setPage}
        setSearchHistory={setSearchHistory}
        searchHistory={searchHistory}
      />
      {searchType === "Videos" ? (
        <VideoGallery
          videos={videos}
          totalPages={totalPages}
          page={page}
          setPage={setPage}
        />
      ) : (
        <ImageGallery
          images={images}
          page={page}
          totalPages={totalPages}
          handleDownload={handleDownload}
          setPage={setPage}
        />
      )}
    </>
  );
}
