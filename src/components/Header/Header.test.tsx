import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Header from './Header';
import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';

const mockStore = configureMockStore();
const store = mockStore({});

test('Header Component', () => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </Provider>
  );

  // Assert that the unsplash logo is present
  const unsplashLogo = screen.getByAltText('unsplash.com logo');
  expect(unsplashLogo).toBeInTheDocument();

  // Assert that the heading text is present
  const heading = screen.getByText('Dynamic Table');
  expect(heading).toBeInTheDocument();
});
