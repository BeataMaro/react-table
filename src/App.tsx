import { useState, useEffect } from 'react';
import './App.css';
import { IApi } from './models/api.model';
import Table from './components/Table/Table';
import Layout from './Layout/Layout';

const initialApiResponse: IApi = {
  results: [],
  total: 0,
  total_pages: 0,
};

function App() {
  const [page, setPage] = useState<number>(1);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [photos, setPhotos] = useState<IApi>(initialApiResponse);

  const API = `https://api.unsplash.com/search/photos?query=scandinavia&page=${page}&orientation=landscape&per_page=4&client_id=${
    import.meta.env.VITE_ACCESS_KEY
  }`;
  // const API = `https://api.unsplash.com/search/photos?query=scandinavia&page=${page}&orientation=landscape&per_page=4&client_id=bubu
  // `;
  const fetchPhotos = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos(data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
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
        <p>Loading...</p>
      ) : (
        <div>
          <Table photos={photos} />
          <button onClick={handlePrevPage} disabled={page === 1 ? true : false}>
            Prev
          </button>
          <button onClick={handleNextPage}>Next</button>
        </div>
      )}
    </>
  );
}

export default App;
