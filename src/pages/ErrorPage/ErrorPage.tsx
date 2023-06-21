import { Link, isRouteErrorResponse, useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <h2>Something went wrong!</h2>
        <p>Error status {error?.status}</p>
        <p>{error.error?.message}</p>
        <Link to='/'>Back to home</Link>
      </div>
    );
  }
};

export default ErrorPage;
