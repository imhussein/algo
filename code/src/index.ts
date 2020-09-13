import { NumbersCollection } from "./NumbersCollection";

const sorter = new NumbersCollection([12, 4, 5]);
sorter.sort();
console.log(sorter.data);
