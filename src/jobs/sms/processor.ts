import { Job } from 'bullmq';
import { SmsJobData } from './types';

export const processSmsJob = async (job: Job<SmsJobData>) => {
  const { to, message, from } = job.data;

  console.log(`📬 Sending SMS to: ${to} with message: ${message} from: ${from}`);
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log(`✅ SMS sent to: ${to}`);
};
