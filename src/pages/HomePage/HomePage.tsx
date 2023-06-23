import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useGetPhotoByKeywordQuery } from '../../services/api.service';
import { updateSearchResults } from '../../services/resultsSlice';
import Table from '../../components/Table/Table';

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
  const dispatch = useDispatch();

  const { data, error, isLoading } = useGetPhotoByKeywordQuery('world');

  useEffect(() => {
    if (data?.results) {
      console.log(data);
      dispatch(updateSearchResults(data?.results));
    }
  }, [data, dispatch]);

  return (
    <>
      <main>{!error && !isLoading && data && <Table photos={data} />}</main>
      {/* {loading && <p>loading...</p>}
        {error && <ErrorPage />}
        {!error && !loading && (
          <div className="cards-container">
            <h2>Dogs!</h2>
            {data ? (
              <Table photos={data} />)
            : (
              <p>0 results. Please, try to search for another word.</p>
            )}
          </div>
        )} */}
    </>
  );
}
