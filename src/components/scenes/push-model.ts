// Illustrative only: maps the demo's traffic slider to how long the queue is and how many workers run.
export const MAX_JOBS = 12;
export const MAX_WORKERS = 6;
export const DEFAULT_TRAFFIC = 50;

export const jobsFor = (traffic: number) => Math.round(2 + (traffic / 100) * (MAX_JOBS - 2));
export const workersFor = (traffic: number) => Math.round(2 + (traffic / 100) * (MAX_WORKERS - 2));
export const readout = (traffic: number) => `${jobsFor(traffic)} jobs queued · ${workersFor(traffic)} workers`;
