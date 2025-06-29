import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function throttle<A extends Array<any>>(mainFunction: (...args: A) => void, delay: number) {
  let timerFlag: number | null = null; // Variable to keep track of the timer

  // Returning a throttled version 
  return (...args: A) => {
    if (timerFlag === null) { // If there is no timer currently running
      mainFunction(...args); // Execute the main function 
      timerFlag = setTimeout(() => { // Set a timer to clear the timerFlag after the specified delay
        timerFlag = null; // Clear the timerFlag to allow the main function to be executed again
      }, delay);
    }
  };
}

export function debounce<A extends Array<any>>(func: (...args: A) => void, timeout = 300){
  let timer: number | null = null;
  return (...args: A) => {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => { func(...args) }, timeout);
  };
}