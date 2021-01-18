import React from "react";
import "../Styles/PrivateBucket.css";
import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react";
import awsconfig from "../aws-exports";
import Amplify from "aws-amplify";
import AddImage from "./AddImage.js";

Amplify.configure(awsconfig);

export default class PrivateBucket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="privateBucketContainer">
        <AmplifyAuthenticator>
          <div>
            <AddImage parentState2={this.props.parentState} />
            <AmplifySignOut />
          </div>
        </AmplifyAuthenticator>
      </div>
    );
  }
}
