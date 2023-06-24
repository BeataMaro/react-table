import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPhotosByUsernameQuery, useGetPhotoByIdQuery } from '../../services/api.service';
import { styled } from 'styled-components';
import { IPhoto } from '../../models/photo.model';
import { updatePortfolioResults } from '../../services/portfolioSlice';
import UserInfo from '../../components/UserInfo/UserInfo';
import ErrorPage from '../ErrorPage/ErrorPage';
import Spinner from '../../components/Spinner/Spinner';
import { RootState } from '../../store/store';
import { updateSearchResults } from '../../services/resultsSlice';

const StyledUserPortfolio = styled.article`
  display: flex;
  flex-wrap: wrap;
  img {
    width: 30rem;
    border-radius: 2%;
  }
`;

export default function DetailsPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [portfolio, setPortfolio] = useState<IPhoto[]>([]);

  let url = location.pathname;
  const photoId = url.split('/')[2];
  const { data, error, isLoading } = useGetPhotosByUsernameQuery(username);

  const photo = useGetPhotoByIdQuery(photoId);

  console.log(photo.data);
  // const apiResults = useSelector((state: RootState) => state.photoApi);
  // console.log(apiResults)

  useEffect(() => {
    //  async function getPhoto() {
    //   if (photo.data) {
    //     await dispatch(updateSearchResults(photo.data));
    //   }
    //  }

    async function getUsername() {
      let user = await url.substring(url.indexOf('/') + 1, url.lastIndexOf('/'));
      await console.log(user);
      await setUsername(user);
    }

    async function getPortfolio() {
      if (data) {
        await console.log(data);
        await dispatch(updatePortfolioResults(data));
        await setPortfolio(data);
      }
    }
    getUsername();
    getPortfolio();
  }, [data, dispatch]);

  return (
    <section>
      {isLoading && <Spinner />}
      {error && <ErrorPage />}
      {photo.data && <img src={photo.data?.urls.regular} alt={photo.data.alt_description} />}
      {username && !error && !isLoading && <UserInfo username={username} />}
      <StyledUserPortfolio>
        {portfolio.length && !error && (
          <>
            <h4>Other images by this author</h4>
            <section>
              {portfolio?.map((photo) => (
                <img src={photo.urls?.regular} alt={photo.alt_description} key={photo.id} />
              ))}
            </section>
          </>
        )}
      </StyledUserPortfolio>
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
