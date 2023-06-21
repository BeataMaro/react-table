import { IApi } from "../../models/api.model";
import PhotoRow from "../PhotoRow/PhotoRow";
import './Table.scss';

const Table = (props: {photos: IApi}) => {
    return (<table>
        {/* <caption><h1>Photos made in Scandinavia - unsplash.com </h1></caption> */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Author</th>
            <th>Description</th>
            <th>Likes</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          <PhotoRow photos={props.photos} />
        </tbody>
      </table>)
}

export default Table;