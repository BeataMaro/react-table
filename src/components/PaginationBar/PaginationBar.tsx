import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetPhotosByPageQuery } from '../../services/api.service';
import { updateSearchResults } from '../../services/resultsSlice';

export default function PaginationBar() {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const { data } = useGetPhotosByPageQuery(String(page));
  
  useEffect(() => {
    if (data) {
      dispatch(updateSearchResults(data));
    }
  }, [page, dispatch]);

  function handlePrevPage() {
    if (page > 0) setPage((prev) => (prev -= 1));
  }

  function handleNextPage() {
    setPage((prev) => (prev += 1));
  }

  return (
    <div className="pagination-bar">
      <button role="button" onClick={handlePrevPage} disabled={page === 1 ? true : false}>
        &larr;
      </button>
      <button role="button" onClick={handleNextPage}>&rarr; </button>
    </div>
  );
}
