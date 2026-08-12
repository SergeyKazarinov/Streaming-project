// require импорт из документации https://www.npmjs.com/package/device-detector-js
// eslint-disable-next-line @typescript-eslint/no-require-imports
import DeviceDetector = require('device-detector-js');
import type { Request } from 'express';
import { lookup } from 'geoip-lite';
import * as countries from 'i18n-iso-countries';
import enLocale from 'i18n-iso-countries/langs/en.json';

import type { SessionMetadata } from '../types/session-metadata.types';

import { IS_DEV_ENV } from './is-dev';

countries.registerLocale(enLocale);

const getUserIp = (req: Request) => {
  if (IS_DEV_ENV) return '173.166.164.121';

  if (Array.isArray(req.headers['cf-connecting-ip'])) return req.headers['cf-connecting-ip'][0];

  if (req.headers['cf-connecting-ip']) return req.headers['cf-connecting-ip'];

  if (typeof req.headers['x-forwarded-for'] === 'string') return req.headers['x-forwarded-for'].split(',')[0];

  return req.ip;
};

export const getSessionMetadata = (req: Request, userAgent: string): SessionMetadata => {
  const ip = getUserIp(req);

  const device = new DeviceDetector().parse(userAgent);

  const location = ip ? lookup(ip) : null;

  return {
    location: {
      country: countries.getName(location?.country || '', 'en') || 'Неизвестно',
      city: location?.city || 'Неизвестно',
      latidute: location?.ll[0] || 0,
      longitude: location?.ll[1] || 0,
    },
    device: {
      browser: device?.client?.name || 'Неизвестно',
      os: device?.os?.name || 'Неизвестно',
      type: device?.device?.type || 'Неизвестно',
    },
    ip: ip || 'Неизвестно',
  };
};
