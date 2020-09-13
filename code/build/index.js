"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumbersCollection_1 = require("./NumbersCollection");
var sorter = new NumbersCollection_1.NumbersCollection([12, 4, 5]);
sorter.sort();
console.log(sorter.data);
