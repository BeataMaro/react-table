import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetPhotoByKeywordQuery } from '../../services/api.service';
import { updateSearchResults } from '../../services/resultsSlice';
import Table from '../../components/Table/Table';
import Spinner from '../../components/Spinner/Spinner';
import ErrorPage from '../ErrorPage/ErrorPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

export default function HomePage() {
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetPhotoByKeywordQuery(query || 'scandinavian');

  useEffect(() => {
    if (data?.results) {
      dispatch(updateSearchResults(data?.results));
    }
  }, [data, dispatch]);

  function handleSearch(e: ChangeEvent<HTMLInputElement>) {
    e.preventDefault();
    setQuery(e.target.value);
  }

  return (
    <>
      <main>
        <input
          type="search"
          name="search"
          onChange={(e) => handleSearch(e)}
          placeholder="search..."
        />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        {isLoading && <Spinner />}
        {!error && !isLoading && data && <Table />}
      </main>
      {error && <ErrorPage />}
    </>
  );
}
