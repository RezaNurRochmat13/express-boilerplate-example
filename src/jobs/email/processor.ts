import { Job } from 'bullmq';
import { EmailJobData } from './types';

export const processEmailJob = async (job: Job<EmailJobData>) => {
  const { email } = job.data;

  console.log(`📬 Sending email to: ${email}`);
  await new Promise(resolve => setTimeout(resolve, 1000)); // simulate delay
  console.log(`✅ Email sent to: ${email}`);
};
