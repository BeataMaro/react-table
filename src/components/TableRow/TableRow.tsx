import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { updateSearchResults } from '../../services/resultsSlice';
import { IPhoto } from '../../models/photo.model';
import styled from 'styled-components';

interface props {
  bgcolor: string;
}

const StyledRow = styled.tr<props>`
  background-color: ${({ bgcolor }) => bgcolor};
  letter-spacing: 2px;
  color: lightgrey;
  text-shadow: 1px 1px rgba(0, 0, 0, 0.8);
  transition: 0.3s ease;

  a {
    display: block;
    width: 100%;

    .link-cell {
      color: lightgrey;
      height: 14rem;
      display: grid;
      place-items: center;
    }
  }

  &:hover {
    background-color: grey;
    box-shadow: 1px 1px 12px rgba($black, 0.4);
    cursor: pointer;
  }

  & .image-cell {
    display: flex;
    place-items: center;
  }

  & td img.image-thumb {
    width: 25rem;
    height: 15rem;
    object-fit: cover;
  }
`;

export default function TableRow() {
  const apiResults = useSelector((state: RootState) => state.searchResults?.searchResults);

  useEffect(() => {
    if (apiResults) {
      updateSearchResults(apiResults);
    }
  }, [apiResults]);

  return (
    <>
      {apiResults?.map(({ id, color, user, alt_description, likes, urls }: IPhoto) => (
        <StyledRow bgcolor={color} key={id}>
          <td>
            <Link to={`${user.username}/${id}`}>
              <p className="link-cell">{id}</p>
            </Link>
          </td>
          <td>
            <Link to={`${user.username}/${id}`}>
              <p className="link-cell">{user.first_name}</p>
            </Link>
          </td>
          <td>
            <Link to={`${user.username}/${id}`}>
              <p className="link-cell">{likes}</p>
            </Link>
          </td>
          <td className="image-cell">
            <Link to={`${user.username}/${id}`}>
              <img src={urls.small} alt={alt_description} className="image-thumb" />
            </Link>
          </td>
        </StyledRow>
      ))}
    </>
  );
}
