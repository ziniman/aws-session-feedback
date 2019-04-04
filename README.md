# Session Feedback Demo System

## Installation instructions

- Fork the repository into your account.
- For your backend
  - Go to [/serverless](https://github.com/ziniman/aws-session-feedback/tree/master/serverless) folder.
  - Deploy your serverless backend with ```sls deploy``` from the serverless folder
- For your frontend:
  - Set a new Amazon Amplify Console app in your account and point it to your repo.
  - Go to Environment variables setup of your new app and add a new variable named ```REACT_APP_BACKEND_API``` with the API domain and prefix (e.g. ```https://xxx.execute-api.eu-west-1.amazonaws.com/dev```)
- Final stage
  - Commit and push your code to your repo so Amazon Amplify will push an updated version of your code to the front end.

## Sessions Table - DB Structure
(Primary partition key - session_id )
~~~~
{
  "date_time": {
    "S": "March 13, 2019, 15:50"
  },
  "event_name": {
    "S": "AWS Summit"
  },
  "location": {
    "S": Berlin, Germany"
  },
  "session_id": {
    "S": "0488ED90FECC482115B0D3C7F54E272B"
  },
  "session_name": {
    "S": "How Websites go Serverless"
  },
  "speaker": {
    "S": "Boaz Ziniman"
  },
  "ttl": {
    "N": "1584021000"
  }
}
~~~~

## URL Structure
https://[AMPLIFY URL]?session_id=[session_id]
