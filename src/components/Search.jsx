import { useState, useEffect } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

import Card from "./cards/Card";
import InfoText from "./cards/Info";

const SearchImg = () => {
  const [results, setResults] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [clicked, setClicked] = useState(false);
  const [oneCard, setOneCard] = useState({});

  const fetchImages = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://api.unsplash.com/photos?client_id=EJSdK-CjVWCZWlG0FIdfOdhGjDGgKxorTHGxXjOdwqM&page=${page}`
      );

      const currentSet = new Set(results.map((item) => item.id));

      const uniqueResults = response.data.filter(
        (item) => !currentSet.has(item.id)
      );

      setResults((prevResults) => [...prevResults, ...uniqueResults]);
      setPage((prevPage) => prevPage + 1);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  const handleFetchMore = () => {
    if (search.trim() === "") {
      fetchImages();
    } else {
      handleSearch();
    }
  };

  const handleSearch = () => {
    if (search.trim() === "") {
      setPage(1);
      fetchImages();
    } else {
      const searched = search.toLowerCase();
      axios
        .get(`https://api.unsplash.com/search/photos`, {
          params: {
            query: searched,
            per_page: 50,
            client_id: "9YXdcE1dzAW_eAiSHOUMpItCVUgiTtQwidbGQ33hD50",
            page: 1,
          },
        })
        .then((response) => {
          setResults(response.data.results);
        })
        .catch((error) => {
          setError(error);
        });
    }
  };
  console.log(results);
  const handleChange = (event) => {
    setSearch(event.target.value);
  };
  const handleSwitch = () => {
    setClicked(true);
  };
  const handleBack = () => {
    setClicked(false);
  };
  const getId = (id) => {
    const filtered = results.filter((item) => item.id === id);
    setOneCard(filtered);
  };
  return (
    <div>
      {clicked ? (
        <>
          <div className="flex justify-between p-2 mx-8">
            <h1 className="text-2xl font-semibold text-black">
            GeekGallery-Unsplash
            </h1>
            <div>
              <input
                onChange={handleChange}
                value={search}
                placeholder="Search"
                className="p-2 border-none rounded-tl-md rounded-bl-md bg-slate-300"
              />
              <button
                onClick={handleSearch}
                className="p-2 text-white bg-gray-700 border border-black cursor-pointer hover:bg-gray-600 rounded-tr-md rounded-br-md"
              >
                Search
              </button>
            </div>
          </div>
          <InfoText item={oneCard[0]} clicked={handleBack} />
        </>
      ) : (
        <>
          <div className="flex justify-between p-2 mx-8">
            <h1 className="text-2xl font-semibold text-black">
            GeekGallery-Unsplash
            </h1>
            <div>
              <input
                onChange={handleChange}
                value={search}
                placeholder="Search"
                className="p-2 border-none rounded-tl-md rounded-bl-md bg-slate-300"
              />
              <button
                onClick={handleSearch}
                className="p-2 text-white bg-gray-700 border-none cursor-pointer hover:bg-gray-600 rounded-tr-md rounded-br-md"
              >
                Search Images
              </button>
            </div>
          </div>
          {error && <p>Error: {error.message}</p>}
          <InfiniteScroll
            dataLength={results.length}
            next={handleFetchMore}
            hasMore={true}
            loader={<h4>Loading...</h4>}
          >
            <div className="gap-8 mx-8 columns-2xs">
              {results.map((result) => (
                <Card
                  handleClick={getId}
                  key={result.id}
                  result={result}
                  handleSwitch={handleSwitch}
                />
              ))}
            </div>
          </InfiniteScroll>
        </>
      )}
    </div>
  );
};

export default SearchImg;