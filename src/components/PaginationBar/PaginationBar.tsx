import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { useGetPhotosByPageQuery } from '../../services/api.service';
import { updateSearchResults } from '../../services/resultsSlice';

export default function PaginationBar() {
  const [page, setPage] = useState<number>(1);
  const dispatch = useDispatch();
  const apiResults = useSelector((state: RootState) => state.searchResults.searchResults);
  const { data, error, isLoading } = useGetPhotosByPageQuery(String(page));

  useEffect(() => {
    if (data) {
      dispatch(updateSearchResults(data?.results));
      console.log(data);
    }
  }, [page, dispatch]);

  // if (apiResults) {
  //   [...Array(data).keys()].map((el) => console.log(el));
  // }

  function handlePrevPage() {
    if (page > 0) setPage((prev) => (prev -= 1));
  }

  function handlePage(pageNum: number) {
    setPage(pageNum);
  }

  function handleNextPage() {
    setPage((prev) => (prev += 1));
  }

  return (
    <div className="pagination-bar">
      <button onClick={handlePrevPage} disabled={page === 1 ? true : false}>
        &larr;
      </button>
      {[...Array(apiResults).keys()].slice(1).map((numb: number) => (
        <button onClick={() => handlePage(numb)} key={numb}>
          {numb}
        </button>
      ))}
      <button onClick={handleNextPage}>&rarr; </button>
    </div>
  );
}
