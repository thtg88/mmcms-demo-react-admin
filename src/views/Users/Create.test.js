import React from 'react';
import ReactDOM from 'react-dom';
import Create from './Users/Create';

it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Create />, div);
    ReactDOM.unmountComponentAtNode(div);
});
