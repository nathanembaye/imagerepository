import React from "react";
import "../Styles/AddImage.css";
import Auth from "@aws-amplify/auth";

export default class AddImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      token: null,
      bucketPermission: this.props.parentState2,
    };
  }

  //when upload button is clicked each image is formatted for PUT request
  submitImages() {
    for (let i = 0; i < this.state.photos.length; i++) {
      this.formatImage(this.state.photos[i]);
    }

    alert("Upload of images was successful! Check S3!");

    //reset current photo album and file input
    this.setState({ photos: [] });
    document.getElementById("fileSubmission").value = "";
  }

  //append image to photo album from state
  appendToImageList(image) {
    var newList = this.state.photos.concat(image);
    this.setState({ photos: newList });
    document.getElementById("fileSubmission").value = "";
  }

  //acceptable data format for S3
  formatImage(image) {
    var data;
    let reader = new FileReader();
    reader.onload = (e) => {
      data = e.target.result;
      let binary = atob(data.split(",")[1]);
      let array = [];
      for (var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
      }
      let blobData = new Blob([new Uint8Array(array)], { type: "image/jpeg" });
      this.getPresignedURL(blobData);
    };
    reader.readAsDataURL(image);
  }

  checkSelectedImage(e) {
    var image = e.target.files[0];

    //check if image is correct type
    if ("image/jpeg" !== image.type && "image/png" !== image.type) {
      alert("Wrong type, .jpg files only!");
      //reset input if not
      document.getElementById("fileSubmission").value = "";
      return;
    }

    //check if image is correct size
    if (image.size >= 1000000) {
      alert("Image too large, pick something smaller!");

      //reset input if not
      document.getElementById("fileSubmission").value = "";
      return;
    }

    //put in array if past tests
    this.appendToImageList(image);
  }

  //Retreives PUT presignedURL
  getPresignedURL(formattedImage) {
    //Private bucket PUT
    if (this.state.bucketPermission === "Private") {
      //get token for authorization of signed in user
      var jwToken;
      Auth.currentSession().then((res) => {
        var accessToken = res.getAccessToken();
        jwToken = accessToken.getJwtToken();
        fetch(
          //commented link out
          "/postPresignedURL",
          {
            headers: {
              Authorization: jwToken,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            console.log("Succesfully acquired Private Bucket PresignedURL");
            alert(
              "Copy+Paste Image Key —> " +
                data["Key"].split(".")[0] +
                " <— to GET from S3 later"
            );
            this.uploadImage(formattedImage, data["uploadURL"]);
          })
          .catch((error) => {
            console.error(
              "The error was a -->" +
                error +
                " please check Authorization JWToken"
            );
          });
      });
    }

    //Public bucket PUT
    else {
      fetch(
        //commented link out
        "/publicPostPresignedURL"
      )
        .then((response) => response.json())
        .then((data) => {
          console.log("Succesfully acquired Public Bucket PresignedURL");
          alert(
            "Copy+Paste Image Key —> " +
              data["Key"].split(".")[0] +
              " <— to GET from S3 later"
          );
          this.uploadImage(formattedImage, data["uploadURL"]);
        })
        .catch((error) => {
          console.error("Error:" + error);
        });
    }
  }

  //sends image to S3 via POST presignedURL
  uploadImage(formattedImage, postPresignedURL) {
    fetch(postPresignedURL, {
      method: "PUT",
      body: formattedImage,
    })
      .then((response) => response)
      .then((data) => {
        console.log("Successfully uploaded image to S3:");
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  getImage(presignedURl) {
    var outside;
    fetch(presignedURl)
      .then((response) => response.blob())
      .then((images) => {
        //checks if Key used returned image, or error XML Page
        if (images["type"] !== "image/jpeg") {
          alert(
            "Image NOT found. Check spelling/spaces for input and verify image was uploaded!"
          );
          return;
        }
        outside = URL.createObjectURL(images);
        window.location.href = outside;
      });
  }

  getImagePresignedURL() {
    var imageKey = document.getElementById("search").value;
    imageKey = imageKey + ".jpg";
    //commented link out
    var url =
      "/getPresignedURL?objectKey=";
    url = url.concat(imageKey);
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        var getPresignedURL = data["url"];
        this.getImage(getPresignedURL);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  render() {
    return (
      <div className="addImageContainer">
        <form onSubmit={this.onFormSubmit}></form>
        <input
          id="fileSubmission"
          type="file"
          onChange={this.checkSelectedImage.bind(this)}
        />
        <button onClick={this.submitImages.bind(this)}>Upload</button>
        <p>Upload Count: {this.state.photos.length}</p>
        <br />
        <label>
          Image Key:
          <input id="search" type="text" name="name" />
          <button onClick={this.getImagePresignedURL.bind(this)}>Get</button>
        </label>
      </div>
    );
  }
}
