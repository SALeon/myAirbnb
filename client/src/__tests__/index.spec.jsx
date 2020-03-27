import React from 'react';
import { shallow } from 'enzyme';

function Foo() {
  return <div>Ddd</div>;
}

it('render SearchField component', () => {
  const component = shallow(<Foo />);
  expect(component).toMatchSnapshot();
});
