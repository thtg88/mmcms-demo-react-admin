import React from 'react';
import ReactDOM from 'react-dom';
import Roles from './Roles';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Roles />, div);
    ReactDOM.unmountComponentAtNode(div);
});
