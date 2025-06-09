import { Worker } from 'bullmq';
import { connection } from '../../config/redis.config';
import { processEmailJob } from '../../jobs/email/processor';
import { EmailJobData } from '../../jobs/email/types';

const emailWorker = new Worker<EmailJobData>('emailQueue', processEmailJob, {
  connection,
});

emailWorker.on('completed', job => {
  console.log(`🎉 Job ${job.id} completed`);
});

emailWorker.on('failed', (job, err) => {
  console.error(`❌ Job ${job?.id} failed:`, err);
});

export default emailWorker;
