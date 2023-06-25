import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useGetUserByUsernameQuery } from '../../services/api.service';
import { updateUserResult } from '../../services/userSlice';
import { IUser } from '../../models/user.model';
import { styled } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faLocationPin, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import Spinner from '../Spinner/Spinner';

const StyledUserInfo = styled.article`
  padding: 2rem;
  display: flex;
  gap: 0.5rem;
  flex-direction: column;

  svg {
    margin-right: 0.5rem;
  }

  strong {
    color: grey;
    font-weight: 100;
    font-style: italic;
  }
`;

const StyledProfileImage = styled.img`
  border-radius: 50%;
  width: 8rem;
  box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.4);
  transition: 0.3s ease;
  &:hover {
    box-shadow: 1px 1px 12px rgba(0, 0, 0, 0.7);
  }
`;

export default function UserInfo({ username, details }: { username: string; details?: boolean }) {
  const [user, setUser] = useState<IUser>();
  const { data, error, isLoading } = useGetUserByUsernameQuery(username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      dispatch(updateUserResult(data));
      setUser(data);
    }
  }, [data, dispatch]);

  return (
    <section>
      {details && <button onClick={() => navigate(-1)}>Back</button>}
      {isLoading && <Spinner data-testid="spinner" />}
      {error && <ErrorPage data-testid="error-page" />}
      <StyledUserInfo>
        {user && !error && (
          <>
            <Link to={`/${user?.username}`}>
              <StyledProfileImage
                src={user?.profile_image?.large}
                alt="author's profile image"
              ></StyledProfileImage>
            </Link>
            <h3>{user?.username}</h3>

            {details && (
              <>
                <h2>
                  {user?.first_name} {user?.last_name}
                </h2>
                <strong>BIO: {user?.bio}</strong>
                {user.location && (
                  <>
                    <FontAwesomeIcon icon={faLocationPin} />
                    <strong>location: {user.location}</strong>
                  </>
                )}
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
          </>
        )}
      </StyledUserInfo>
    </section>
  );
}
