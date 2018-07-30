import React, { Component } from 'react';
import Routes from '../../routes';

// import logo from './logo.svg';
import './App.scss';
// import logo from './logo_light_blue.png';
// import PropTypes from 'prop-types';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = { username: null };
  }

  // componentDidMount() {
  //   fetch('/api/getUsername')
  //     .then(res => res.json())
  //     .then(user => this.setState({ username: user.username }));
  // }

  render() {
    return <Routes />;

    // return (
    //   <div className="App">
    //     <header className="App-header">
    //       <img src={logo} className="App-logo" alt="logo" />
    //       <h1 className="App-title">Welcome to React</h1>
    //     </header>
    //     <p className="App-intro">
    //       To get started, edit
    //       <code>src/App.js</code>
    //       and save to reload.
    //     </p>
    //     <div>
    //       {this.state.username ? (
    //         <h1>Hello {this.state.username}</h1>
    //       ) : (
    //           <h1>Loading.. please wait!</h1>
    //         )}
    //     </div>
    //     <span className="badge badge-pill badge-primary">Primary</span>
    //     <span className="badge badge-pill badge-secondary">Secondary</span>
    //     <span className="badge badge-pill badge-success">Success</span>
    //     <span className="badge badge-pill badge-danger">Danger</span>
    //     <span className="badge badge-pill badge-warning">Warning</span>
    //     <span className="badge badge-pill badge-info">Info</span>
    //     <span className="badge badge-pill badge-light">Light</span>
    //     <span className="badge badge-pill badge-dark">Dark</span>
    //     <button type="button" className="btn btn-outline-primary">Primary</button>
    //     <button type="button" className="btn btn-outline-secondary">Secondary</button>
    //     <button type="button" className="btn btn-outline-success">Success</button>
    //     <button type="button" className="btn btn-outline-danger">Danger</button>
    //     <button type="button" className="btn btn-outline-warning">Warning</button>
    //     <button type="button" className="btn btn-outline-info">Info</button>
    //     <button type="button" className="btn btn-outline-light">Light</button>
    //     <button type="button" className="btn btn-outline-dark">Dark</button>

    //     <div className="btn-group">
    //       <button type="button" className="btn btn-danger dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    //         Action
    //       </button>
    //       <div className="dropdown-menu">
    //         <a className="dropdown-item" href="#">Action</a>
    //         <a className="dropdown-item" href="#">Another action</a>
    //         <a className="dropdown-item" href="#">Something else here</a>
    //         <div className="dropdown-divider"></div>
    //         <a className="dropdown-item" href="#">Separated link</a>
    //       </div>
    //     </div>
    //   </div>
    // );
  }
}

export default App;
