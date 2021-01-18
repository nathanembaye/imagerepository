import React from "react";
import "../Styles/PublicBucket.css";
import AddImage from "./AddImage.js";

export default class PublicBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="publicBucketContainer">
        <AddImage parentState2={this.props.parentState} />
      </div>
    );
  }
}
