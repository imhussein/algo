export declare abstract class Sorter {
    abstract compare(leftIndex: number, rightIndex: number): boolean;
    abstract swap(leftIndex: number, rightIndex: number): void;
    abstract length: number;
    sort(): void;
}
