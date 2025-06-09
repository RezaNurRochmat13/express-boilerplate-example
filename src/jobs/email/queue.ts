import { Queue } from 'bullmq';
import { connection } from '../../config/redis.config';
import { EmailJobData } from './types';

export const emailQueue = new Queue<EmailJobData>('emailQueue', {
  connection,
});
