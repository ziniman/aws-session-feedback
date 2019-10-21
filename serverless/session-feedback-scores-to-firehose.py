import os
import json
import boto3

from boto3.dynamodb.conditions import Key, Attr


firehose_client = boto3.client('firehose', region_name="eu-west-1")
FIREHOSE_STREAM = 'session-feedbacks'

dynamodb = boto3.resource('dynamodb')
scores_table = dynamodb.Table('sessions-feedback-dev-Scores')
sessions_table = dynamodb.Table('sessions-feedback-dev-Sessions')

#Get resource table for local mapping
print("Get sessions")
session_list = {}

sessions = sessions_table.scan()
for session in sessions["Items"]:
    session_list[session["session_id"]]={}
    session_list[session["session_id"]]['location'] = session["location"]
    session_list[session["session_id"]]['event_name'] = session["event_name"] if "event_name" in session else "None"
    session_list[session["session_id"]]['date_time'] = session["date_time"]
    session_list[session["session_id"]]['speaker'] = session["speaker"]
    session_list[session["session_id"]]['session_name'] = session["session_name"]

print(session_list)

response = ""

def lambda_handler(event, context):

    print (json.dumps(event))

    try:
        for rec in event["Records"]:
            if(rec["eventName"] == "INSERT" or rec["eventName"] == "MODIFY"):

                score_data = {}

                score_data['session_id'] = rec["dynamodb"]["NewImage"]["session_id"]["S"]
                score_data['time_stamp'] =  rec["dynamodb"]["NewImage"]["time_stamp"]["S"]
                score_data['user_id'] =  rec["dynamodb"]["NewImage"]["user_id"]["S"]
                score_data['score'] =  rec["dynamodb"]["NewImage"]["score"]["N"]

                # enrich with session data
                score_data['location'] = session_list[score_data['session_id']]["location"]
                score_data['event_name'] = session_list[score_data['session_id']]["event_name"]
                score_data['date_time'] = session_list[score_data['session_id']]["date_time"]
                score_data['speaker'] = session_list[score_data['session_id']]["speaker"]
                score_data['session_name'] = session_list[score_data['session_id']]["session_name"]

                response = firehose_client.put_record(DeliveryStreamName=FIREHOSE_STREAM,
                                Record={ 'Data': json.dumps(score_data) + "\n" } )
    except Exception as e:
        print( e )

    return ''
