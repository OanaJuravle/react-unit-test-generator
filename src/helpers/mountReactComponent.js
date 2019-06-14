import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

export default function mountReactComponent(Component, props) {
  return mount(
    <MemoryRouter>
      <Component {...props} />
    </MemoryRouter>,
  );
}
