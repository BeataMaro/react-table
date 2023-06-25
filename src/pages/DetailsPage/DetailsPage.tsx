import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPhotosByUsernameQuery, useGetPhotoByIdQuery } from '../../services/api.service';
import { updatePortfolioResults } from '../../services/portfolioSlice';
import UserInfo from '../../components/UserInfo/UserInfo';
import ErrorPage from '../ErrorPage/ErrorPage';
import Spinner from '../../components/Spinner/Spinner';
import { IPhoto } from '../../models/photo.model';
import UserPortfolio from '../../components/UserPortfolio/UserPortfolio';
import { styled } from 'styled-components';

const StyledImageDetails = styled.article`

  p {
    font-style: italic;
    color: grey; 
    font-weight: 200;
  }

  img {
    max-width: 60rem;
    height: 40rem;
    object-fit: cover;
    cursor: pointer;

    &.active {
      width: 100%;
      height: 100%;
    }
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

  const [isActive, setIsActive] = useState(false);

  function handleClick() {
    setIsActive((current) => !current);
  }

  useEffect(() => {
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
      <button onClick={() => navigate(-1)}>Back</button>
      {isLoading && <Spinner />}
      {error && <ErrorPage />}
      <StyledImageDetails onClick={handleClick}>
        {photo.data && (
          <img
            src={isActive ? photo.data?.urls.full : photo.data?.urls.regular}
            alt={photo.data.alt_description}
            className={isActive ? 'active' : ''}
          />
        )}
        {photo.data && <p>{photo.data?.description}</p>}
      </StyledImageDetails>
      {username && !error && !isLoading && <UserInfo username={username} />}
      <UserPortfolio portfolio={portfolio} />
    </section>
  );
}
