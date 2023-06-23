import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';
import './ErrorPage.scss';

export default function ErrorPage() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div className="error-wrapper" role="alert">
        <h2>Something went wrong!</h2>
        <p>Error status {error?.status}</p>
        <p>{error.error?.message}</p>
        <i>&larr;</i>
        <Link to="/">Back to home</Link>
      </div>
    );
  }
}
