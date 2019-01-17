import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

if (!cookies.get('userID')) cookies.set('userID', guid(), { path: '/' });
var user_id = cookies.get('userID');

var colors = ['bg-danger', 'bg-info', 'bg-warning', 'bg-primary', 'bg-success']

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hide: false,
      error: null,
      isLoaded: false,
      items: [],
      score: null,
    };
  }

  render() {
    const {hide, items, isLoaded, error, score} = this.state;
    if (hide) {
        return (
          <div className="container">
            <div className="row justify-content-center"><h2>Thanks for your feedback!</h2></div>
            <div className="row justify-content-center"><h5>We have recorded the score <b>{score}</b> for the session <b>{items['Session_name']}</b> by {items['Speaker']}.</h5></div>
          </div>
        );
    }
    if (error) {
      return (
        <div className="container-fluid badge badge-danger">
          <div className="row justify-content-center"><h2>Error: {error.message}</h2></div>
        </div>
      );
    } else if (!isLoaded) {
      return <div className="row justify-content-center"><div className="loader"></div></div>;
    } else {
    return (
      <div className="container-fluid">
        <div className="row justify-content-center mr-15"><h2>Feedback System</h2></div>
        <div className="row justify-content-center mr-15"><h3>{items['Session_name']} by {items['Speaker']}</h3></div>
        <div className="row justify-content-center mr-15"><h6>({items['DateTime']['Date']}, {items['DateTime']['Time']})</h6></div>
        <div className="row justify-content-center">
          {this.renderOptions(1)}
          {this.renderOptions(2)}
          {this.renderOptions(3)}
          {this.renderOptions(4)}
          {this.renderOptions(5)}
        </div>
      </div>
    );
    }
  }
}

class Page extends React.Component {
  render() {
    return (
      <div className="page">
        <div className="login">
          <Login />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Page />,
  document.getElementById('root')
);
