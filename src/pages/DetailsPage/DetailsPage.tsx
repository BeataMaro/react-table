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
      {isLoading && <Spinner />}
      {error && <ErrorPage />}
      {photo.data && <img src={photo.data?.urls.regular} alt={photo.data.alt_description} />}
      {username && !error && !isLoading && <UserInfo username={username} />}
      <UserPortfolio portfolio={portfolio} />
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
