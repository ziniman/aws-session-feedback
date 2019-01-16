from __future__ import print_function

import boto3
import json
import logging
import os
from boto3.dynamodb.conditions import Key, Attr
from botocore.exceptions import ClientError

from datetime import datetime

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
            items = json.dumps(response[u'Items'])
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

    session_id = event['queryStringParameters']['id']

    try:
    	response = table.get_item(
        Key={
            'session_id': session_id
        }
    )

    except ClientError as e:
        logger.error(e.response['Error']['Message'])
        #return event
        raise SystemExit
    else:
        if (int(json.dumps(response[u'Count']))>0):
            items = json.dumps(response[u'Items'])
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
