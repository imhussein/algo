import { MatchResult } from "./index";
declare type Union = [Date, string, string, number, number, MatchResult, string];
export declare class CSVFileReader {
    filename: string;
    data: Union[];
    constructor(filename: string);
    read(): void;
}
export {};
