"use client";

import { useState } from "react";
import axios from "axios";
import SearchBar from "../components/SearchBar";
import SearchResults from "../components/SearchResults";
import NavBar from "../components/NavBar";

const Page = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // Track if a search is in progress
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if a search has been performed
  const apiKey = "AIzaSyBiHFShC_vTEsA0FEabESTE1VHzd7ah7fw";

  const searchGoogleBooks = () => {
    setError(null);
    setLoading(true);
    setSearchPerformed(true);

    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}&maxResults=30`
      )
      .then((data) => {
        setLoading(false);
        if (data.data.items) {
          setResults(data.data.items);
          console.log(data.data.items);
        } else {
          searchOpenLibrary();
        }
      })
      .catch((error) => {
        setLoading(false);
        searchOpenLibrary();
      });
  };

  const searchOpenLibrary = () => {
    axios
      .get(`https://openlibrary.org/search.json?q=${query}`)
      .then((response) => {
        setLoading(false);
        if (response.data.docs && response.data.docs.length > 0) {
          setResults(response.data.docs);
          console.log(response.data.docs);
        } else {
          searchByISBN(query);
        }
      })
      .catch((error) => {
        setLoading(false);
        searchByISBN(query);
      });
  };

  const searchByISBN = (isbn) => {
    setError(null);
    setLoading(true);
    setSearchPerformed(true);

    axios
      .get(`http://localhost:3001/api/volumes/brief/isbn/${isbn}`)
      .then((response) => {
        setLoading(false);
        if (
          response.data.records &&
          Object.keys(response.data.records).length > 0
        ) {
          const results = Object.values(response.data.records).map(
            (record) => record.data
          );
          setResults(results);
          console.log(results);
        } else {
          setResults([]);
          setError("No results found.");
        }
      })
      .catch((error) => {
        setLoading(false);
        setResults([]);
        setError("An error occurred while fetching data.");
      });
  };

  const handleSearch = () => {
    if (/^\d{13}$/.test(query)) {
      searchByISBN(query);
    } else {
      searchGoogleBooks();
    }
  };
  return (
    <div>
      <NavBar />
      <SearchBar
        query={query}
        setQuery={setQuery}
        handleSearch={handleSearch}
      />
      {loading && <div></div>}
      {!loading && error && <div>{error}</div>}
      {!loading && searchPerformed && results.length === 0 && (
        <div>No results found</div>
      )}
      <SearchResults results={results} />
    </div>
  );
};

export default Page;
