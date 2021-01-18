# Shopify Image Repository Challenge

Summer 2021 Backend Developer & Infrastructure/Site Reliability Engineering Intern Challenge

# Table of Contents
1. [Requirements/Features](#Requirements/Features)
2. [Installation](#Installation)
3. [Start](#Start)
4. [Tools](#Tools)
5. [How It Works](#How-It-Works)
6. [Other](#Other)

## Requirements/Features

I chose to fulfill the following [challenge](https://docs.google.com/document/d/1ZKRywXQLZWOqVOHC4JkF3LqdpO3Llpfk_CkZPR8bjak/edit) requirement:
                  
- ADD image(s) to the repository
  - one / bulk / enormous amount of images
  - private or public (permissions)
  - secure uploading and stored images

## Installation

npm install

## Start

npm start

## Visit

(https://localhost:3000)

## Tools

 AWS (S3, Cognito, Lambda), React, Amplify, JavaScript
 
## How It Works

In direct reference to the [Requirements/Features](#Requirements/Features) we should describe how the logic tree of the app works:
 
- When Repository/Bucket is Public
  - permitted to upload one / bulk / enormous amount of images
  - S3 secure uploading and stored images
  
- When Repository/Bucket is Private
  - (User must login!)
    - permitted one / bulk / enormous amount of images (User has validated JWToken!)
    - S3 secure uploading and stored images (User has validated JWToken!)
  - (Create Account!)
    - (User must login!)
      - permitted one / bulk / enormous amount of images (User has validated JWToken!)
      - S3 secure uploading and stored images (User has validated JWToken!)
  - (User does NOT Login/Create Account!)
    - No permission for one / bulk / enormous amount of images
    - No uploading and storing of images (User has no validated JWToken!)    
  
## Other

- I shared the Lambda files from AWS that otherwise would have been unviewable. 
- I emphasized functionality not UI since it is for a Backend Developer + Infrastructure/Site Reliability Engineering challenge :)
