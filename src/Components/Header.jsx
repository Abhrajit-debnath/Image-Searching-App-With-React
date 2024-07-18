import React, { useState } from "react";

function Header({
  searchText,
  setSearchText,
  setQuery,
  setSearchType,
  setPage,
  setSearchHistory,
  searchHistory,
}) {
  const [selectedOption, setSelectedOption] = useState("Images");

  const handleInputChange = (e) => {
    setSearchText(e.target.value);
  };

  const [isHistoryVisible, setIsHistoryVisible] = useState(false);

  const handleFocus = () => {
    setIsHistoryVisible(true);
  };

  const handleBlur = () => {
    setTimeout(() => {
      setIsHistoryVisible(false);
    }, 100);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
  };

  const handleSearchClick = () => {
    if (searchText !== "") {
      setQuery(searchText);
      setSearchType(selectedOption);
      setSearchHistory((prevHistory) => [...prevHistory, searchText]);
      setSearchText("");
      setPage(1);
    }
  };

  return (
    <div className="banner">
      <div>
        <h1>Search Anything You Want</h1>
        <div className="input-field">
          <select value={selectedOption} onChange={handleSelectChange}>
            <option value="Images">Images</option>
            <option value="Videos">Videos</option>
          </select>
          <input
            onFocus={handleFocus}
            onBlur={handleBlur}
            placeholder={`Search ${selectedOption}`}
            type="text"
            value={searchText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
          />
          <button onClick={handleSearchClick}>Search</button>
          {isHistoryVisible && searchHistory.length > 0 && (
            <div className="search-history">
              <ul>
                {searchHistory.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => {
                      setQuery(item);
                      setSearchText(item);
                      setIsHistoryVisible(false);
                    }}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
