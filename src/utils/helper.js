import { Timestamp } from 'firebase/firestore';

export function userProgressGenerator(
  { starting, current, target },
  targetCallback,
) {
  const a = starting - current;
  const b = starting - target;

  let userProgress = Math.floor((a / b) * 100);
  if (userProgress > 100) {
    userProgress = 100;
  }
  if (userProgress == 100) {
    targetCallback && targetCallback();
  }
  if (userProgress < 0) {
    userProgress = 0;
  }
  return userProgress;
}

export function timestampToDate(timestamp) {
  return new Timestamp(timestamp.seconds, timestamp.nanoseconds).toDate();
}
