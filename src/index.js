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

var urlParams = new URLSearchParams(window.location.search);
var session_id = urlParams.get('session_id');

class Circle extends React.Component {
  handleClick (i){
    alert('Thanks for voting ' + i);
  }

  render() {
    var thisClass="col-xl text-light btn btn-dark btn-circle btn-xl " + colors[this.props.value-1]
    const {onClick} = this.props;
    return (
      <button
        className={thisClass}
        onClick={onClick}
      >
        {this.props.value}
      </button>
    );
  }
}

class Options extends React.Component {
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

  componentDidMount() {
    fetch("https://s2cahw9tya.execute-api.eu-west-1.amazonaws.com/dev/info/get_session?id=" + session_id)
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            items: result[0]
          });
      console.log(result[0])
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error:
              {message: "Can't retrive sessions data"},
          });
        }
      )
  }

  handleChildClick(a, i) {
    this.setState({hide: true});
    this.setState({score: a});

    fetch('https://s2cahw9tya.execute-api.eu-west-1.amazonaws.com/dev/info/store_feedback', {
        method: 'POST',
        headers : new Headers(),
        body:JSON.stringify({user_id:user_id, session_id:session_id, score:a})
    }).then((res) => res.json())
    .then((data) =>  console.log(data))
    .catch((err)=>console.log(err))
  }

  renderOptions(i) {
    return <Circle
      value={i}
      onClick={this.handleChildClick.bind(this, i , this.state.items)}
      />;
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
        <div className="row justify-content-center"><h2>Feedback System</h2></div>
        <div className="row justify-content-center"><h3>{items['Session_name']} by {items['Speaker']}</h3></div>
        <div className="row justify-content-center"><h6>({items['DateTime']['Date']}, {items['DateTime']['Time']})</h6></div>
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

class Vote extends React.Component {
  render() {
    return (
      <div className="vote">
        <div className="voting-options">
          <Options />
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Vote />,
  document.getElementById('root')
);
