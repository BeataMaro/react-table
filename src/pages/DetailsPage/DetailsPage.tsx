import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPhotosByUsernameQuery } from '../../services/api.service';
import { styled } from 'styled-components';
import { IPhoto } from '../../models/photo.model';
import { updatePortfolioResults } from '../../services/portfolioSlice';
import UserInfo from '../../components/UserInfo/UserInfo';

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

  const { data, error, isLoading } = useGetPhotosByUsernameQuery(username);


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
      <UserInfo username={username} />
      <StyledUserPortfolio>
        {portfolio.length && (
          <>
            <h4>Other images by this author</h4>
            <br />
            {portfolio?.map((photo) => (
              <img src={photo.urls?.regular} alt={photo.alt_description} key={photo.id} />
            ))}
          </>
        )}
      </StyledUserPortfolio>
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
