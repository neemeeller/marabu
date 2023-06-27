import { postData } from './helper';

const WEBHOOK_URL = 'https://eons8c22uunpb5u.m.pipedream.net';

export default async function handler(req, res) {
  const formData = req.body;
  console.log('formData', formData);
  const result = await postData(WEBHOOK_URL, formData);
  console.log('result', result);
  res.status(result.status).json({done: true});
}