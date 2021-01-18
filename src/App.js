import React from "react";
import "./App.css";
import PrivateBucket from "./Components/PrivateBucket";
import PublicBucket from "./Components/PublicBucket";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      permission: true,
      status: "Private",
    };
  }

  changePermission() {
    if (this.state.status == "Private") {
      this.setState({
        status: "Public",
      });
    } else {
      this.setState({
        status: "Private",
      });
    }
    this.setState({
      permission: !this.state.permission,
    });
  }

  render() {
    const data = this.state.status;
    let display;
    if (this.state.permission) {
      display = <PrivateBucket parentState={data} />;
    } else {
      display = <PublicBucket parentState={data} />;
    }
    return (
      <div className="appContainer">
        <button onClick={this.changePermission.bind(this)}>
          Bucket Permission: {this.state.status}
        </button>
        {display}
      </div>
    );
  }
}
