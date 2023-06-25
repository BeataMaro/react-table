import configureMockStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Layout from './Layout';

const mockStore = configureMockStore();
const store = mockStore({});

describe('Layout Component', () => {
  it('Render Header and Footer', () => {
    const layout = render(
      <Provider store={store}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
      </Provider>
    );
    expect(layout.baseElement).toBeInTheDocument();
  });
});
