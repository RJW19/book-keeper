// pages/book/[id].jsx
import React from 'react';
import { useRouter } from 'next/router';

const BookDetail = ({ book }) => {
  if (!book) {
    return <div>Book not found</div>;
  }
  const Key = AIzaSyBiHFShC_vTEsA0FEabESTE1VHzd7ah7fw;

  const isGoogleBooksResult = !!book.volumeInfo;
  const thumbnail = isGoogleBooksResult
    ? book.volumeInfo?.imageLinks?.thumbnail
    : book.cover_i
    ? `http://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`
    : '/images/defaultThumbnail.png';
  const title = isGoogleBooksResult ? book.volumeInfo?.title : book.title;
  const author = isGoogleBooksResult ? book.volumeInfo?.authors?.[0] : book.author_name?.[0];

  return (
    <div className="book-detail">
      <img src={thumbnail} alt={`Cover art for ${title}`} />
      <h1>{title}</h1>
      <h2>{author}</h2>
      {/* Add more details as needed */}
    </div>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  // Fetch data from your web service
  const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${id}&key=${Key}&maxResults=30`);
  const book = await res.json();

  return {
    props: { book },
  };
}

export default BookDetail;
