import emailWorker from './email/email.worker';
import smsWorker from './sms/sms.worker';

const allWorkers = [emailWorker, smsWorker];

function setupWorkerListeners(worker: any, name: string) {
  worker.on('completed', (job: any) => {
    console.log(`[${name}] 🎉 Job ${job.id} completed`);
  });

  worker.on('failed', (job: any, err: Error) => {
    console.error(`[${name}] ❌ Job ${job?.id} failed:`, err);
  });

  worker.on('error', (err: Error) => {
    console.error(`[${name}] ⚠️ Worker error:`, err);
  });
}

allWorkers.forEach((worker, index) => {
  const workerName = worker.name || `worker#${index + 1}`;
  setupWorkerListeners(worker, workerName);
});

