import { Typography } from "@mui/material";
import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
// import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
// const details = async () => {
//   try {
//     const res = await axios("https://randomuser.me/api/");
//     return res.data.results;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// };

const Person = () => {
  // const url="https:/randomuser.me/api/portraits/thumb/men/22.jpg";
  const [personData, setPersonData] = useState(null);
  const [page, setPage] = useState(1);
  const [resultsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios(
          `https://randomuser.me/api/?results=${resultsPerPage}&page=${page}`
        );
        console.log(response.data); // Log the API response
        setPersonData(response.data.results);
        setLoading(false);
        // Assuming the API response provides the total number of results
        const totalResults = 100; // You may need to update this according to your actual API response.
        // const totalResults = response.data.info.results;
        setTotalPages(Math.ceil(totalResults / resultsPerPage));
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, [page, resultsPerPage]);

  const handlePageClick = (pageNum) => {
    setPage(pageNum);
  };

  // const handleNextPage = () => setPage((prevPage) => prevPage + 1);
  // const handlePrevPage = () => setPage((prevPage) => prevPage - 1); // Empty dependency array ensures this runs only once after the component mounts
  const handlePrevious = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages) setPage(page + 1);
  };

  const renderPagination = () => {
    let pages = [];
    const totalNumbersToShow = 10;

    const start = Math.max(1, page - 2); // Show at least 2 numbers before the current page
    const end = Math.min(totalPages, start + totalNumbersToShow - 1);

    // Add first page and ellipsis if needed
    if (start > 1) {
      pages.push(
        <button
          key={1}
          onClick={() => handlePageClick(1)}
          className="pagination-number"
        >
          1
        </button>
      );
      if (start > 2) pages.push(<span key="start-ellipsis">...</span>);
    }

    // Add current range of pages
    for (let i = start; i <= end; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => handlePageClick(i)}
          className={`pagination-number ${page === i ? "active" : ""}`}
        >
          {i}
        </button>
      );
    }

    // Add ellipsis and last page if needed
    if (end < totalPages - 1) {
      pages.push(<span key="end-ellipsis">...</span>);
    }
    if (end < totalPages) {
      pages.push(
        <button
          key={totalPages}
          onClick={() => handlePageClick(totalPages)}
          className="pagination-number"
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!personData) {
    return <div>Loading...</div>; // Show loading state while data is being fetched
  }

  return (
    <div className="person-list">
      <h1>Person Data:</h1>
      {/* <pre>{JSON.stringify(personData, null, 2)}</pre> */}
      <h1>People List:</h1>
      {personData.length > 0 ? (
        <>
          <div className="card-container">
            {personData.map((person) => (
              <div key={person.login.uuid} className="person-card">
                <img
                  src={person.picture.medium}
                  alt={`${person.name.first} ${person.name.last}`}
                  className="person-image"
                />
                <div className="person-info">
                  <h2>
                    {person.name.first} {person.name.last}
                  </h2>
                  <p>Email: {person.email}</p>
                  <p>
                    Location: {person.location.city}, {person.location.country}
                  </p>
                </div>
              </div>
            ))}
          </div>
          {/* <div className="pagination-controls">
              <button
                onClick={handlePrevPage}
                disabled={page === 1}
                className="pagination-button"
              >
                Previous
              </button>
              <button onClick={handleNextPage} className="pagination-button">
                Next
              </button>
            </div> */}
          <div className="pagination-controls">
            <button
              onClick={handlePrevious}
              disabled={page === 1}
              className="pagination-nav"
            >
              {/* Previous */}
              {/* <ArrowBackIcon /> */}
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>

            {renderPagination()}

            <button
              onClick={handleNext}
              disabled={page === totalPages}
              className="pagination-nav"
            >
              {/* Next */}
              {/* <ArrowForwardIcon /> */}
              <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>
        </>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
};

const PersonList1 = () => {
  return <Person></Person>;
};

const PersonList = () => {
  return (
    <>
      <PersonList1 />
    </>
  );
};
export default PersonList;
