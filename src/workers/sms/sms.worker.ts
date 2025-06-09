import { Worker } from 'bullmq';
import { connection } from '../../config/redis.config';
import { processSmsJob } from '../../jobs/sms/processor';
import { SmsJobData } from '../../jobs/sms/types';

const smsWorker = new Worker<SmsJobData>('smsQueue', processSmsJob, {
  connection,
});

smsWorker.on('completed', job => {
  console.log(`🎉 SMS Job ${job.id} completed`);
});

smsWorker.on('failed', (job, err) => {
  console.error(`❌ SMS Job ${job?.id} failed:`, err);
});

export default smsWorker;
