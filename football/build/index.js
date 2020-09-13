"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var CSVFileReader_1 = require("./CSVFileReader");
var reader = new CSVFileReader_1.CSVFileReader("football.csv");
reader.read();
var manWins = 0;
var MatchResult;
(function (MatchResult) {
    MatchResult["Draw"] = "D";
    MatchResult["HomeWin"] = "H";
    MatchResult["AwayWin"] = "A";
})(MatchResult = exports.MatchResult || (exports.MatchResult = {}));
for (var _i = 0, _a = reader.data; _i < _a.length; _i++) {
    var match = _a[_i];
    if (match[1] == "Man United" && match[5] === MatchResult.HomeWin) {
        manWins++;
    }
    else if (match[2] === "Man United" && match[5] === MatchResult.AwayWin) {
        manWins++;
    }
}
console.log(manWins);
