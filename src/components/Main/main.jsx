import React, { useEffect, useState } from "react";
import axios from "axios";
import dotenv from "dotenv";
import Loader from "../Loader/loader";
import Paginate from "../Paginate/paginate";
import styles from "./main.module.css";
dotenv.config();

const Main = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [search, setSearch] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const res = await axios("https://api.giphy.com/v1/gifs/trending", {
          params: {
            api_key: process.env.REACT_APP_GIPHY_API_KEY,
            limit: 50,
          },
        });
        setData(res.data.data);
      } catch (err) {
        setError(true);
        setTimeout(() => setError(false), 3000);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(false);
    setLoading(true);

    try {
      const res = await axios("https://api.giphy.com/v1/gifs/search", {
        params: {
          api_key: process.env.REACT_APP_GIPHY_API_KEY,
          q: search,
          limit: 50,
        },
      });
      setData(res.data.data);
    } catch (err) {
      setError(true);
      setTimeout(() => setError(false), 3000);
    }
    setLoading(false);
  };

  const pageSelected = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="m-2">
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          Unable to get Gifs, please try again in a few minutes.
        </div>
      )}
      <form className="form-inline justify-content-center m-2">
        <input
          className="form-control"
          type="text"
          placeholder="search"
          onChange={handleSearchChange}
          value={search}
        />
        <button
          onClick={handleSubmit}
          type="submit"
          className="btn btn-primary mx-2"
        >
          Go
        </button>
      </form>
      <Paginate
        pageSelected={pageSelected}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        totalItems={data.length}
      />
      <div className="container gifs">
        {!loading &&
          currentItems.map((el) => (
            <div key={el.id} className="gif">
              <img src={el.images.fixed_height.url} alt={el.title} />
            </div>
          ))}
        {loading && <Loader />}
      </div>
    </div>
  );
};

export default Main;
