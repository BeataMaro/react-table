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
  text-align: center;
  display: flex;
  flex-direction: column;

  img {
    border-radius: 50%;
  }
  svg {
    margin-right: .5rem;
  }
`;

const StyledProfileImage = styled.img`
  width: 10rem;
`;

export default function UserInfo({ username, details }: { username: string; details?: boolean }) {
  const [user, setUser] = useState<IUser>();

  console.log(username);
  const { data, error, isLoading } = useGetUserByUsernameQuery(username);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(updateUserResult(data));
      setUser(data);
    }
  }, [data, dispatch]);

  return (
    <section>
      <button onClick={() => navigate(-1)}>Back</button>
      {isLoading && <Spinner />}
      {error && <ErrorPage />}
      <StyledUserInfo>
        {user && !error && (
          <>
            <h2>{user?.username}</h2>
            <h3>
              {user?.first_name} {user?.last_name}
            </h3>
            <Link to={`/${user?.username}`}>
              <StyledProfileImage
                src={user?.profile_image?.large}
                alt="author's profile image"
              ></StyledProfileImage>
            </Link>
            {details ? <p>BIO: {user?.bio}</p> : undefined}
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
      </StyledUserInfo>
    </section>
  );
}
