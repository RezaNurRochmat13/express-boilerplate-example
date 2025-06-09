// src/jobs/sms/queue.ts
import { Queue } from 'bullmq';
import { connection } from '../../config/redis.config';
import { SmsJobData } from './types';

export const smsQueue = new Queue<SmsJobData>('smsQueue', { connection });

