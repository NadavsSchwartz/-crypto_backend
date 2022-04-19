import { promisify } from 'util';
import { createClient } from 'redis';

import config from 'config';

const url = config.get<string>('redisURL');
export const client = createClient({ url: url, legacyMode: true });
client.connect();

client.on('connect', () => {
  console.log('connected');
});

client.on('error', (err) => {
  console.log('error', err.message);
});

export const get: (key: string) => Promise<any> = promisify(client.get).bind(
  client
);

export const set: (
  key: string,
  value: string,
  ex?: string,
  exValue?: number
) => Promise<any> = promisify(client.set).bind(client);
