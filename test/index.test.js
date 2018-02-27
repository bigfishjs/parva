import React from 'react';
import renderer from 'react-test-renderer';
import Simple from "./fixtures/simple";


test('Simple', async () => {
  
  const component = renderer.create(<Simple />);
  await new Promise(r => setTimeout(r, 100));
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();

});