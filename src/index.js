import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const API_ENDPOINT = process.env.REACT_APP_BACKEND_API;
const EVENT_NAME = process.env.REACT_APP_EVENT_NAME

if (!EVENT_NAME) {
  EVENT_NAME = 'AWS Events';
}

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
    fetch(API_ENDPOINT + "/info/get_session?id=" + session_id)
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

    fetch(API_ENDPOINT + '/info/store_feedback', {
        method: 'POST',
        headers : {'Content-Type': 'application/json'},
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
            <div className="row m-2 text-center justify-content-center"><h2>Thanks for your feedback!</h2></div>
            <div className="row m-2 text-center justify-content-center"><h4>We have recorded the score <b>{score}</b> for the session <b>{items['session_name']}</b>.</h4></div>
          </div>
        );
    }
    if (error) {
      return (
        <div className="container justify-content-center text-center">
          <div className="row badge badge-danger m-2 p-2"><h3>Error: {error.message}</h3></div>
        </div>
      );
    } else if (!isLoaded) {
      return <div className="loader"></div>;
    } else {
    return (
      <div className="container">
        <div className="row m-2 text-center justify-content-center"><h2>{EVENT_NAME}<br />Session Feedback</h2></div>
        <div className="row m-2 text-center justify-content-center"><h4>{items['session_name']}</h4></div>
        <div className="row m-2 text-center justify-content-center"><h6>({items['date_time']})</h6></div>
        <div className="row m-2 text-center justify-content-center">
          {this.renderOptions(1)}
          {this.renderOptions(2)}
          {this.renderOptions(3)}
          {this.renderOptions(4)}
          {this.renderOptions(5)}
        </div>
        <div className="row m-2 text-center justify-content-center"><h6>Rate from 1 to 5, where 1 is the lowest score and 5 is the highest.</h6></div>
      </div>
    );
    }
  }
}

class Vote extends React.Component {

  componentDidMount(){
    document.title = "Feedback System"
  }

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
