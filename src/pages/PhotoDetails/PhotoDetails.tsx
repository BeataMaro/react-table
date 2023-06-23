import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { RootState } from '../../store/store';
import { useGetUserByUsernameQuery } from '../../services/api.service';
import { updateUserResult } from '../../services/userSlice';
import { styled } from 'styled-components';
import { IUser } from '../../models/user.model';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const StyledUserInfo = styled.article`
  text-align: center;
  .profile-image {
    border-radius: 50%;
  }
`;

const StyledUserPortfolio = styled.article`
  display: flex;
  img {
    width: 30rem;
    border-radius: 2%;
  }
`;

export default function PhotoDetails() {
  const navigate = useNavigate();
  const [user, setUser] = useState<IUser>();

  const dispatch = useDispatch();
  const userName = window.location.pathname.substring(1);
  const { data, error, isLoading } = useGetUserByUsernameQuery(userName);

  // const userResults = useSelector((state: RootState) => state);

  useEffect(() => {
    if (data) {
      console.log(data);
      dispatch(updateUserResult(data));
      setUser(data);
    }
  }, [data, dispatch]);

  return (
    <section>
      <StyledUserInfo>
        {user && (
          <>
            <h3>{user?.username}</h3>
            <img
              src={user?.profile_image?.large}
              alt="author's profile image"
              className="profile-image"
            />
            <p>BIO: {user?.bio}</p>
            <strong>location: {user.location}</strong>
            <strong>portfolio: {user.portfolio_url}</strong>
            <span>Total photos: {user.total_photos}</span>
            <div className="social-media">
              <h4>Social</h4>
              <FontAwesomeIcon icon={faInstagram} />
              <strong> {user?.instagram_username}</strong>
              <FontAwesomeIcon icon={faTwitter} />
              <strong> {user?.social?.twitter_username}</strong>
            </div>
          </>
        )}
      </StyledUserInfo>
      <StyledUserPortfolio>
        {user && (
          <>
            <h4>Other images by this author</h4>
            <br />
            {user?.photos.map((photo) => (
              <img src={photo.urls?.regular} alt={userName} key={photo.id} />
            ))}
          </>
        )}
      </StyledUserPortfolio>
      <button onClick={() => navigate(-1)}>Back</button>
    </section>
  );
}
