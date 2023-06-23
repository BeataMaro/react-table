import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
// import { RootState } from '../../store/store';
import { useGetUserByUsernameQuery } from '../../services/api.service';
import { updateUserResult } from '../../services/userSlice';
import { styled } from 'styled-components';
import { IUser } from '../../models/user.model';

const StyledUserPortfolio = styled.article`
  display: flex;
  img {
    width: 30rem;
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
      <StyledUserPortfolio>
        {user && (
          <>
            <h4>Other photos</h4>
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
