import { useNavigate } from 'react-router-dom';
import { IPhoto } from '../../models/photo.model';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import styled from 'styled-components';

interface props {
  bgcolor: string;
}

const StyledRow = styled.tr<props>`
  background-color: ${({ bgcolor }) => bgcolor};
  transition: 0.3s ease;

  &:hover {
    background-color: grey;
    box-shadow: 1px 1px 12px rgba($black, 0.4);
    cursor: pointer;
  }

  & .image-cell {
    padding: 0;
    display: flex;
    place-items: center;
    transition: 0.3s ease;
  }

  & td img.image-thumb {
    width: 25rem;
    height: 15rem;
    object-fit: cover;
  }
`;

export default function PhotoRow() {

  const navigate = useNavigate();
  const apiResults = useSelector((state: RootState) => state.searchResults.searchResults);

  function handleRowClick(username: string) {
    navigate(`/${username}`);
  }
  return (
    <>
      {apiResults.map(({ id, color, user, alt_description, likes, urls }: IPhoto) => (
        <StyledRow bgcolor={color} key={id} onClick={() => handleRowClick(user.username)}>
          <td>{id}</td>
          <td>{user.first_name}</td>
          <td>{likes}</td>
          <td className="image-cell">
            <img src={urls.small} alt={alt_description} className="image-thumb" />
          </td>
        </StyledRow>
      ))}
    </>
  );
}
