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
