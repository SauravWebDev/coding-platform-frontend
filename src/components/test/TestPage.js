import React from "react";

class Test extends React.Component {
  state = {
    flag: 0
  };
  componentDidMount() {
    alert("mounted");
    this.setState({ flag: 1 });
  }
  componentDidUpdate() {
    alert("updated");
    this.setState({ flag: 0 });
  }
  render() {
    return <h1>React Life cycles</h1>;
  }
}

export default Test;
