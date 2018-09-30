'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Foo from 'components/foo';

class App extends React.Component {
    
    render() {
        
        return (
            <div>
                App.
                <Foo />
            </div>
        );
        
    }
    
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);