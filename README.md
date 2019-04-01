# Session Feedback Demo System

## Installation instructions

- Fork the repository into your account.
- For your backend
  - Go to [/serverless](https://github.com/ziniman/aws-session-feedback/tree/master/serverless) folder.
  - Deploy your serverless backend with ```sls deploy``` from the serverless folder
- For your frontend:
  - Set a new Amazon Amplify Console app in your account and point it to your repo.
  - Configure the environment variable ```REACT_APP_BACKEND_API``` with the API domain and prefix (e.g. ```https://xxx.execute-api.eu-west-1.amazonaws.com/dev```)
