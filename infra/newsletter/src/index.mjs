import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';
import { SNSClient, PublishCommand } from '@aws-sdk/client-sns';

const db = new DynamoDBClient();
const sns = new SNSClient();
const TABLE_NAME = process.env.TABLE_NAME;
const TOPIC_ARN = process.env.TOPIC_ARN;
const EMAIL_RE = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function handler(event) {
  const body = event.body ?? '';
  if (Buffer.byteLength(body, 'utf8') > 1024) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Payload too large' }) };
  }

  let parsed;
  try {
    parsed = JSON.parse(body);
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (!parsed || typeof parsed !== 'object') {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid JSON' }) };
  }

  if (parsed.company) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Subscribed' }) };
  }

  const email = typeof parsed.email === 'string' ? parsed.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
  }

  const subscribedAt = new Date().toISOString();
  let isNewSubscriber = true;

  try {
    await db.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        email: { S: email },
        subscribedAt: { S: subscribedAt },
      },
      ConditionExpression: 'attribute_not_exists(email)',
    }));
  } catch (err) {
    if (err.name !== 'ConditionalCheckFailedException') throw err;
    isNewSubscriber = false;
  }

  if (isNewSubscriber && TOPIC_ARN) {
    try {
      await sns.send(new PublishCommand({
        TopicArn: TOPIC_ARN,
        Subject: 'new elbie subscriber',
        Message: `${email}\n\nsubscribed at ${subscribedAt}`,
      }));
    } catch (err) {
      console.error('SNS publish failed:', err);
    }
  }

  return { statusCode: 200, body: JSON.stringify({ message: 'Subscribed' }) };
}
