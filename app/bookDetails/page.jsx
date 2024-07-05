// pages/book/[id].jsx
import React from 'react';
import { useRouter } from 'next/router';
import fs from 'fs';
import path from 'path';

const BookDetail = ({ book }) => {
  if (!book) {
    return <div>Book not found</div>;
  }

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

export async function getStaticPaths() {
  // Load your results here
  const filePath = path.join(process.cwd(), 'data', 'results.json');
  const jsonData = fs.readFileSync(filePath);
  const results = JSON.parse(jsonData);

  const paths = results.map((book) => ({
    params: { id: book.id || book.key },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  // Load your results here
  const filePath = path.join(process.cwd(), 'data', 'results.json');
  const jsonData = fs.readFileSync(filePath);
  const results = JSON.parse(jsonData);

  const book = results.find(b => (b.id || b.key) === params.id);

  return { props: { book } };
}

export default BookDetail;
