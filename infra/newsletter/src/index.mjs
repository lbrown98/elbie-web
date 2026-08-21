import { DynamoDBClient, PutItemCommand } from '@aws-sdk/client-dynamodb';

const db = new DynamoDBClient();
const TABLE_NAME = process.env.TABLE_NAME;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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

  if (parsed.company) {
    return { statusCode: 200, body: JSON.stringify({ message: 'Subscribed' }) };
  }

  const email = typeof parsed.email === 'string' ? parsed.email.trim().toLowerCase() : '';
  if (!email || email.length > 254 || !EMAIL_RE.test(email)) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Invalid email' }) };
  }

  try {
    await db.send(new PutItemCommand({
      TableName: TABLE_NAME,
      Item: {
        email: { S: email },
        subscribedAt: { S: new Date().toISOString() },
      },
      ConditionExpression: 'attribute_not_exists(email)',
    }));
  } catch (err) {
    if (err.name !== 'ConditionalCheckFailedException') throw err;
  }

  return { statusCode: 200, body: JSON.stringify({ message: 'Subscribed' }) };
}
