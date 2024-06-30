"use client";
import { useState, React } from "react";
import "./SearchBar.css";
import axios from "axios";


function handleChange(event) {
    const book = event.target.value;
    setBook(book);
  }

  function handleSubmit(event) {
    event.preventDefault();

    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=" +
          book +
          "&key=" +
          apiKey +
          "&maxResults=10"
      )
      .then((data) => {
        console.log(data.data.items);
        setResult(data.data.items);
      });
  }

const SearchBar = () => {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyBiHFShC_vTEsA0FEabESTE1VHzd7ah7fw"
  );
  return (
    <div className="input-wrapper">
        <input placeholder="Search for a book..."
        type="text"
        onChange={handleChange}
        className="form-control mt-10"
        autoComplete="off"
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
         

    </div>
  )
}

export default SearchBar


/* <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search"
            autoComplete="off"
          /> */