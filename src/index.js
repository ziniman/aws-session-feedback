import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './index.css';

var colors = ['bg-danger', 'bg-info', 'bg-warning', 'bg-primary', 'bg-success']

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
      hide: false
    };
  }

  handleChildClick(a, i) {
    alert('Thanks for voting ' + a);
    this.setState({hide: true});
  }

  renderOptions(i) {
    return <Circle
      value={i+1}
      onClick={this.handleChildClick.bind(this, i+1)}
      />;
  }

  render() {
    const status = 'Session Name';
    const {hide} = this.state;
    if (hide) {
        return null;
    }
    return (
      <div className="container-fluid">
        <div className="row justify-content-center"><h2>Feedback System</h2></div>
        <div className="row justify-content-center"><h3>{status}</h3></div>
        <div className="row justify-content-center">
          {this.renderOptions(0)}
          {this.renderOptions(1)}
          {this.renderOptions(2)}
          {this.renderOptions(3)}
          {this.renderOptions(4)}

        </div>
      </div>
    );
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
