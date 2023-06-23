import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useGetPhotosByUsernameQuery, useGetUserByUsernameQuery } from '../../services/api.service';
import { updateUserResult } from '../../services/userSlice';
import { styled } from 'styled-components';
import { IUser } from '../../models/user.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { updateSearchResults } from '../../services/resultsSlice';
import { IPhoto } from '../../models/photo.model';
import { updatePortfolioResults } from '../../services/portfolioSlice';

const StyledUserInfo = styled.article`
  padding: 2rem;
  text-align: center;
  .profile-image {
    border-radius: 50%;
  }
`;

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
  const [user, setUser] = useState<IUser>();
  const [portfolio, setPortfolio ] = useState<IPhoto[]>([]);
 
  const dispatch = useDispatch();
  const userName = window.location.pathname.substring(1);
  // separate user component
  // const { data, error, isLoading } = useGetUserByUsernameQuery(userName);
  const { data, error, isLoading } = useGetPhotosByUsernameQuery(userName);

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(updatePortfolioResults(data));
      setPortfolio(data);
    }
  }, [data, dispatch]);

  return (
    <section>
      <StyledUserInfo>
        {user && (
          <>
            <h2>{user?.username}</h2>
            <h3>
              {user?.first_name} {user?.last_name}
            </h3>
            <a href={user.links.html} target="_blank" rel="no-refferer">
              <img
                src={user?.profile_image?.large}
                alt="author's profile image"
                className="profile-image"
              />
            </a>
            {user.bio && <p>BIO: {user?.bio}</p>}
            {user.location && <strong>location: {user.location}</strong>} <br />
            {user.portfolio_url && (
              <a href={user.portfolio_url} target="_blank" rel="no-refferer">
                <strong>Portfolio</strong>
              </a>
            )}
            <p>Total photos: {user.total_photos}</p>
            <p>
              <FontAwesomeIcon icon={faThumbsUp} />
              {user.total_likes}
            </p>
            <div className="social-media">
              {user.instagram_username && (
                <>
                  <FontAwesomeIcon icon={faInstagram} />
                  <strong> {user?.instagram_username} </strong>
                </>
              )}
              {user?.social?.twitter_username && (
                <>
                  <FontAwesomeIcon icon={faTwitter} />
                  <strong> {user?.social?.twitter_username}</strong>
                </>
              )}
            </div>
          </>
        )}
      </StyledUserInfo>

      <StyledUserPortfolio>
        {portfolio && (
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
