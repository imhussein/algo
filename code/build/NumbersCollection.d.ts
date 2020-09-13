import { Sorter } from "./Sorter";
export declare class NumbersCollection extends Sorter {
    data: number[];
    constructor(data: number[]);
    get length(): number;
    compare(leftIndex: number, rightIndex: number): boolean;
    swap(leftIndex: number, rightIndex: number): void;
}
