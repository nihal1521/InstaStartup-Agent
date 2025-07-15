// Public API & Webhooks

import express from 'express';
const router = express.Router();

router.post('/webhook', async (req: any, res: any) => {
  // TODO: Validate signature and process webhook payload
  console.log('Webhook received', req.body);
  res.sendStatus(200);
});

router.get('/status', (req: any, res: any) => {
  res.json({ status: 'ok' });
});

export default router;
