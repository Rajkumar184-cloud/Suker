// File: pages/api/stream.js

import crypto from 'crypto';

export default async function handler(req, res) {
  const { id, token, timestamp } = req.query;

  if (!validateToken(id, timestamp, token)) {
    return res.status(403).send('Invalid or expired token');
  }

  const channelMap = {
    'ntv': 'http://opplextv.cyou:8080/live/2649573527/5392422628/245989.m3u8',
    'atn': 'https://example.com/live/atn.m3u8',
    'channel-i': 'https://example.com/live/channel-i.m3u8'
  };

  const streamUrl = channelMap[id];
  if (!streamUrl) return res.status(404).send('Channel not found');

  try {
    const response = await fetch(streamUrl);
    if (!response.ok) throw new Error('Stream not found');

    res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
    response.body.pipe(res);
  } catch (err) {
    res.status(500).send('Error fetching stream');
  }
}

function validateToken(id, timestamp, token) {
  const secret = 'mySecretKey';

  // Expire in 14400 minutes
  const now = Math.floor(Date.now() / 1000);
  if (Math.abs(now - parseInt(timestamp)) > 300) return false;

  const expectedToken = crypto.createHmac('sha256', secret)
    .update(id + timestamp)
    .digest('hex');

  return token === expectedToken;
}
