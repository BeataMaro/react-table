import { useState, useEffect } from 'react';
import './App.css';
import { IPhoto } from './models/photo.model';

function App() {
  const [page, setPage] = useState<number>(1);
  const [photos, setPhotos] = useState<IPhoto[]>([]);

  const API = `https://api.unsplash.com/photos?page=${page}&orientation=landscape&per_page=5&client_id=${
    import.meta.env.VITE_ACCESS_KEY
  }`;
  const fetchPhotos = async (url: string) => {
    try {
      const res = await fetch(url);
      const data = await res.json();
      setPhotos(data);
    } catch (e) {
      throw new Error();
    }
  };

  function handleNextClick() {
    setPage((prev) => (prev += 1));
  }

  useEffect(() => {
    fetchPhotos(API);
  }, [page]);
  return (
    <>
      {photos.length && (
        <div>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Author</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {photos.map((photo) => (
                <tr key={photo.id}>
                  <td>{photo.id}</td>
                  <td>{photo.user.first_name}</td>
                  <td>
                    <img src={photo.urls.small} alt={photo.alt_description} className="image-thumb" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button onClick={handleNextClick}>Next</button>
        </div>
      )}
    </>
  );
}

export default App;
