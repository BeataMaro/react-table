import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../../store/store';
import UserInfo from './UserInfo';
import { waitFor } from '@testing-library/react';

describe('UserInfo component', () => {
  it('renders user info component', () => {
    waitFor(() =>
      render(
        <Provider store={store}>
          <BrowserRouter>
            <UserInfo username="mike" details={true} />
          </BrowserRouter>
        </Provider>
      )
    );

    // Assert that the back button is present
    waitFor(() => expect(screen.getByRole('button', { name: /back/i })).toBeInTheDocument());

    // Assert that the spinner component disapears
    waitFor(() => expect(screen.queryByTestId('spinner')).toBeNull());

    //   // Assert that the error page component is not rendered
    //   const errorPage = screen.queryByTestId('error-page');
    //   expect(errorPage).toBeNull();
    waitFor(() => expect(screen.queryByTestId('error-page')).toBeNull());


    // Assert that the user profile image is rendered
    waitFor(() => expect(screen.getByAltText(/author's profile image/i)).toBeInTheDocument());

    // Assert that the user firstname and lastname are rendered
    waitFor(() => expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument());

    // Assert that the pin icon is rendered
    waitFor(() => expect(screen.getByRole('img', { name: /location pin/i })).toBeInTheDocument());

    waitFor(() => expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument());
  });
});
