import React from 'react';
import renderer from 'react-test-renderer';
import Simple from "./fixtures/simple";


test('Simple', () => {
  
  const component = renderer.create(<Simple />);
  
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});