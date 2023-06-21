import { useState, useEffect } from 'react';
import './App.css';
import { IApi } from './models/api.model';
import Table from './components/Table/Table';
import spinner from './assets/spinner.svg';

const initialApiResponse: IApi = {
  results: [],
  total: 0,
  total_pages: 0,
};

function App() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [photos, setPhotos] = useState<IApi>(initialApiResponse);

  const API = `https://api.unsplash.com/search/photos?query=scandinavia&page=${page}&orientation=landscape&per_page=4&client_id=${
    import.meta.env.VITE_ACCESS_KEY
  }`;

  const fetchPhotos = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos(data);
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };
  function handlePrevPage() {
    if (page > 0) setPage((prev) => (prev -= 1));
  }

  function handleNextPage() {
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    fetchPhotos(API);
  }, [page]);
  return (
    <>
      {isLoading ? (
        <div className="spinner-wrapper">
          <svg
            className="pl"
            viewBox="0 0 64 64"
            width="64px"
            height="64px"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#000" />
                <stop offset="100%" stopColor="#fff" />
              </linearGradient>
              <mask id="grad-mask">
                <rect x="0" y="0" width="64" height="64" fill="url(#grad)" />
              </mask>
            </defs>
            <circle
              className="pl__ring"
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="hsl(223,90%,55%)"
              strokeWidth="12"
              strokeDasharray="169.65 169.65"
              strokeDashoffset="-127.24"
              strokeLinecap="round"
              transform="rotate(135)"
            />
            <g fill="hsl(223,90%,55%)">
              <circle className="pl__ball1" cx="32" cy="45" r="6" transform="rotate(14)" />
              <circle className="pl__ball2" cx="32" cy="48" r="3" transform="rotate(-21)" />
            </g>
            <g mask="url(#grad-mask)">
              <circle
                className="pl__ring"
                cx="32"
                cy="32"
                r="26"
                fill="none"
                stroke="hsl(283,90%,55%)"
                strokeWidth="12"
                strokeDasharray="169.65 169.65"
                strokeDashoffset="-127.24"
                strokeLinecap="round"
                transform="rotate(135)"
              />
              <g fill="hsl(283,90%,55%)">
                <circle className="pl__ball1" cx="32" cy="45" r="6" transform="rotate(14)" />
                <circle className="pl__ball2" cx="32" cy="48" r="3" transform="rotate(-21)" />
              </g>
            </g>
          </svg>
        </div>
      ) : (
        <main>
          <Table photos={photos} />
          <button onClick={handlePrevPage} disabled={page === 1 ? true : false}>
          &larr;	
          </button>
          <button onClick={handleNextPage}>&rarr;	</button>
        </main>
      )}
    </>
  );
}

export default App;
