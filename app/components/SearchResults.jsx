// "use client";

// import React, { useState, useEffect } from 'react';
// import './SearchResults.css'; // Import the CSS file

// const defaultThumbnail = '/images/defaultThumbnail.png'; // Path to the default thumbnail image
// const placeholderThumbnail = '/images/defaultThumbnail.png'; // Path to the placeholder image

// const SearchResults = ({ results }) => {
//   const [loadingStates, setLoadingStates] = useState({});

//   const handleImageLoad = (id) => {
//     setLoadingStates((prev) => ({ ...prev, [id]: true }));
//   };

//   const handleImageError = (e) => {
//     e.target.src = defaultThumbnail; // Fallback to default thumbnail on error
//   };

//   const handleBuyClick = (title) => {
//     const formattedTitle = title.split(' ').join('+');
//     const url = `https://uk.bookshop.org/search?keywords=${formattedTitle}`;
//     window.open(url, '_blank');
//   };
  

//   return (
//     <div className="results-grid">
//       {results.map((book, index) => {
//         const isGoogleBooksResult = !!book.volumeInfo;
//         const thumbnail = isGoogleBooksResult
//           ? book.volumeInfo?.imageLinks?.thumbnail
//           : book.cover_i
//           ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
//           : defaultThumbnail;
//         const title = isGoogleBooksResult ? book.volumeInfo?.title : book.title;
//         const author = isGoogleBooksResult ? book.volumeInfo?.authors?.[0] : book.author_name?.[0];
//         const isLoaded = loadingStates[book.id || book.key];
//         const key = book.id || book.key || index; // Use book.id, book.key, or index as key

//         return (
//           <div className="card" key={key}>
//             <img
//               width={128}
//               height={192}
//               src={isLoaded ? thumbnail : placeholderThumbnail}
//               alt={`The cover art for ${title} is currently unavailable`}
//               onLoad={() => handleImageLoad(book.id || book.key)}
//               onError={handleImageError}
//             />
//             <div className="card-body">
//               <h5 className="card-title" data-full-title={title}>{title}</h5>
//               <p className="card-text">Author: {author}</p>
//               <button>Add to Library</button>
//               <button onClick={() => handleBuyClick(title)} className="btn btn-primary">Buy</button>
//             </div>
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default SearchResults;

// SearchResults.jsx
"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import './SearchResults.css';

const defaultThumbnail = '/images/defaultThumbnail.png';
const placeholderThumbnail = '/images/defaultThumbnail.png';

const SearchResults = ({ results }) => {
  const [loadingStates, setLoadingStates] = useState({});

  const handleImageLoad = (id) => {
    setLoadingStates((prev) => ({ ...prev, [id]: true }));
  };

  const handleImageError = (e) => {
    e.target.src = defaultThumbnail;
  };

  return (
    <div className="results-grid">
      {results.map((book, index) => {
        const isGoogleBooksResult = !!book.volumeInfo;
        const thumbnail = isGoogleBooksResult
          ? book.volumeInfo?.imageLinks?.thumbnail
          : book.cover_i
          ? `http://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : defaultThumbnail;
        const title = isGoogleBooksResult ? book.volumeInfo?.title : book.title;
        const author = isGoogleBooksResult ? book.volumeInfo?.authors?.[0] : book.author_name?.[0];
        const isLoaded = loadingStates[book.id || book.key];
        const key = book.id || book.key || index;

        return (
          <Link href={`/book/${key}`} key={key}>
            
              <div className="card">
                <img
                  width={128}
                  height={192}
                  src={isLoaded ? thumbnail : placeholderThumbnail}
                  alt={`The cover art for ${title} is currently unavailable`}
                  onLoad={() => handleImageLoad(book.id || book.key)}
                  onError={handleImageError}
                />
                <div className="card-body">
                  <h5>{title}</h5>
                  <p>{author}</p>
                </div>
              </div>
            
          </Link>
        );
      })}
    </div>
  );
};

export default SearchResults;
