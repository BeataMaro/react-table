import { useNavigate } from 'react-router-dom';
import { IApi } from '../../models/api.model';
import { IPhoto } from '../../models/photo.model';
import './PhotoRow.scss';

const PhotoRow = (props: { photos: IApi }) => {
  const {
    photos: { results },
  } = props;
  console.log(results);

  const navigate = useNavigate();

  function handleRowClick(slug: string) {
    navigate(`/${slug}`);
  }

  return (
    <>
      {results.map(({ slug, id, user, alt_description, likes, urls }: IPhoto) => (
        <tr key={id} onClick={() => handleRowClick(slug)} className="photo-row">
          <td>{id}</td>
          <td>{user.first_name}</td>
          <td>{likes}</td>
          <td className="image-cell">
            <img src={urls.small} alt={alt_description} className="image-thumb" />
          </td>
        </tr>
      ))}
    </>
  );
};

export default PhotoRow;
