from __future__ import print_function

import boto3
import json
import logging
import os
import decimal
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

from datetime import datetime

# Helper class to convert a DynamoDB item to JSON.
class DecimalEncoder(json.JSONEncoder):
    def default(self, o):
        if isinstance(o, decimal.Decimal):
            if o % 1 > 0:
                return float(o)
            else:
                return int(o)
        return super(DecimalEncoder, self).default(o)

logger = logging.getLogger()
logger.setLevel(logging.INFO)

region_name=os.environ['AWS_REGION']

dynamodb = boto3.resource('dynamodb', region_name)
sessions_table = dynamodb.Table('sessions-feedback-dev-Sessions')
scores_table = dynamodb.Table('sessions-feedback-dev-Scores')

def get_session(event, context):
    logger.info('Received event: ' + json.dumps(event))

    session_id = event['queryStringParameters']['id']

    try:
	response = sessions_table.query(
	    KeyConditionExpression=Key('session_id').eq(session_id)
    )

    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        #return event
        raise SystemExit
    else:
        if (int(json.dumps(response[u'Count']))>0):
            items = json.dumps(response[u'Items'], cls=DecimalEncoder)
            print (items)

            return {
                'statusCode': 200,
                'headers': { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
                'body': items
            }
        else:
            return {
                'statusCode': 404,
                'headers': { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
            }

def write_feedback(event, context):
    logger.info('Received event: ' + json.dumps(event))

    session_id = event['body']['session_id']
    user_id = event['body']['user_id']
    score = event['body']['score']
    time_stamp = datetime.utcnow()
    time_stamp = time_stamp.strftime("%Y-%m-%d %H:%M:%S")

    response = scores_table.put_item(
        Item={
                'session_id': session_id,
                'user_id': user_id,
                'score': score,
                'time_stamp': time_stamp
                }
        )

    print("PutItem succeeded:")
    print(json.dumps(response))

    return {
        'statusCode': 200,
        'headers': { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
        'body': 'OK'
    }
