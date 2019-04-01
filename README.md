# Session Feedback Demo System

## Installation instructions

- Fork the repository into your account.
- For your frontend:
  - Set a new Amazon Amplify Console app in your account and point it to your repo.
- For your backend
  - Go to [/serverless](https://github.com/ziniman/aws-session-feedback/tree/master/serverless) folder.
  - Update the API Gateway endpoint in [/src/index.js](https://github.com/ziniman/aws-session-feedback/blob/master/src/index.js) in the ```Options``` Class ```componentDidMount()``` and ```handleChildClick()``` functions.
  - Deploy your serverless backend with ```sl deploy``` from the serverless folder
- Final stage
  - Commit and push your code to your repo so Amazon Amplify will push an updated version of your code to the front end.
