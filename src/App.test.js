import React from 'react';
import { mount } from 'enzyme';
import { findByTestAttr } from '../test/testUtils';
import { ContextProvider } from './contexts/Context';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const setup = () => {
  return mount(
    <ContextProvider>
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    </ContextProvider>
  );
};

describe('<App />', () => {
  const wrapper = setup();

  test('renders without crashing', () => {
    const appComponent = findByTestAttr(wrapper, 'component-app');
    expect(appComponent.length).toBe(1);
  });

  test('renders header component', () => {
    const headerComponent = findByTestAttr(wrapper, 'component-header');
    expect(headerComponent.length).toBe(1);
  });

  test('renders footer component', () => {
    const footerComponent = findByTestAttr(wrapper, 'component-footer');
    expect(footerComponent.length).toBe(1);
  });

  test('invalid path redirects to 404 page', () => {
    const featuredComponent = findByTestAttr(wrapper, 'component-featured');
    const NotFoundComponent = findByTestAttr(wrapper, 'component-not-found');

    expect(featuredComponent.length).toBe(0);
    expect(NotFoundComponent.length).toBe(1);
  });
});


