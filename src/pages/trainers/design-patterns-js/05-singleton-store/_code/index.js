// Usage:
import MySingleton from './store';

const singleA = new MySingleton();
const singleB = new MySingleton();

console.log(singleA.getRandomNumber() === singleB.getRandomNumber());
// true
