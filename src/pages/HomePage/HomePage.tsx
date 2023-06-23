import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetPhotoByKeywordQuery } from '../../services/api.service';
import { updateSearchResults } from '../../services/resultsSlice';
import Table from '../../components/Table/Table';
import Spinner from '../../components/Spinner/Spinner';
import ErrorPage from '../ErrorPage/ErrorPage';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// const InitialPhotoState: IPhoto = {
//   id: '',
//   slug: '',
//   color: '',
//   urls: {
//     full: '',
//     regular: '',
//     raw: '',
//     small: '',
//     thumb: '',
//   },
//   blur_hash: '',
//   description: undefined,
//   alt_description: undefined,
//   user: {
//     id: '',
//     username: '',
//     name: '',
//     first_name: '',
//     profile_image: {
//       small: '',
//     },
//   },
//   likes: 0,
//   width: 0,
//   height: 0,
//   current_user_collections: [],
//   links: {
//     self: '',
//     html: '',
//     download: '',
//     download_location: '',
//   },
// };

export default function HomePage() {
  const [query, setQuery] = useState<string>('');
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetPhotoByKeywordQuery(query || 'nordic');

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
