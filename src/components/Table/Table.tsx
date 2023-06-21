import { IApi } from '../../models/api.model';
import PhotoRow from '../PhotoRow/PhotoRow';
import './Table.scss';

const Table = (props: { photos: IApi }) => {
  return (
    <div className="table-wrapper">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Likes</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <PhotoRow photos={props.photos} />
        </tbody>
      </table>
    </div>
  );
};

export default Table;
