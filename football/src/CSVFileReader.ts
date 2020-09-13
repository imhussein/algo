import fs from "fs";
import path from "path";
import { dateStringToDate } from "./utils";
import { MatchResult } from "./index";
type Union = [Date, string, string, number, number, MatchResult, string];

export class CSVFileReader {
  public data: Union[] = [];

  constructor(public filename: string) {}

  read(): void {
    this.data = fs
      .readFileSync(path.join(process.cwd(), this.filename), {
        encoding: "utf-8",
      })
      .split("\n")
      .map((matches: string): string[] => {
        return matches.split(",");
      })
      .map(
        (row: string[]): Union => {
          return [
            dateStringToDate(row[0]),
            row[1],
            row[2],
            +row[3],
            +row[4],
            row[5] as MatchResult,
            row[6],
          ];
        }
      );
  }
}
