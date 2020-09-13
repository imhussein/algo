import { CSVFileReader } from "./CSVFileReader";
const reader = new CSVFileReader("football.csv");
reader.read();

let manWins = 0;

export enum MatchResult {
  Draw = "D",
  HomeWin = "H",
  AwayWin = "A",
}

for (let match of reader.data) {
  if (match[1] == "Man United" && match[5] === MatchResult.HomeWin) {
    manWins++;
  } else if (match[2] === "Man United" && match[5] === MatchResult.AwayWin) {
    manWins++;
  }
}

console.log(manWins);
