"use client";

import { useState, React } from "react";
import axios from "axios";
import { Grid } from "@material-ui/core";
import { maxWidth } from "@mui/system";

const page = () => {
  const [book, setBook] = useState("");
  const [result, setResult] = useState([]);
  const [apiKey, setApiKey] = useState(
    "AIzaSyBiHFShC_vTEsA0FEabESTE1VHzd7ah7fw"
  );

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

  return (
    <div
      className="container"
      style={{ textAlign: "center", width: "maxWidth" }}
    >
      <h1>Book Search</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            onChange={handleChange}
            className="form-control mt-10"
            placeholder="Search"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>
      <div className="grid grid-cols-4 gap-4">
        {result.map((book) => {
          const thumbnail = book.volumeInfo?.imageLinks?.thumbnail;
          const title = book.volumeInfo?.title;
          const author = book.volumeInfo?.authors?.[0];
          return (
            <div className="card" key={book.id}>
              <img
                width={128}
                height={192}
                src={thumbnail}
                alt={
                  "The cover art for " + title + " is currently unavailable" ||
                  "Book Image"
                }
              />
              <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Author: {author}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default page;
