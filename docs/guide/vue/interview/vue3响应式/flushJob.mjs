const jobQUeue = new Set();
let isFlushing = false;
const p = Promise.resolve();

function flushJob() {
  if(isFlushing) return;
  isFlushing = true;
  p.then(() => {
    jobQUeue.forEach(job => job());
  }).finally(() => {
    console.log('flushJob 执行完毕');
    isFlushing = false;
  })
}

export  {
  flushJob,
  jobQUeue
}