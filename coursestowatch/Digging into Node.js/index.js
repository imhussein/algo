#!/usr/bin/env node
var minimist = require("minimist");
var { resolve } = require("path");
var { createReadStream } = require("fs");
var getStdin = require("get-stdin");
var util = require("util");
var args = minimist(process.argv.slice(2), {
  boolean: ["help", "in"],
  string: ["file"],
});
var { Transform } = require("stream");
var { createGunzip, createGzip } = require("zlib");

function printHelp() {
  console.log("Usage.....");
}

if (process.env.NAME) {
  console.log(process.env.NAME);
}

if (args.help) {
  printHelp();
} else if (args.file) {
  let stream = createReadStream(resolve(args.file));
  processFile(stream);
} else if (args.in || args._.in.includes("-")) {
  processFile(process.stdin);
} else {
  error("Incorrect Usage");
}

function error(message, inludeHelp = false) {
  console.error(message);
  if (inludeHelp) {
    console.log("");
    printHelp();
  }
}

function processFile(inStream) {
  var outputStream;
  var upperStream = new Transform({
    transform(chunk, encoding, next) {
      this.push(chunk.toString().toUpperCase());
      next();
    },
  });
  var gzipStream = createGzip();
  outputStream = inStream.pipe(upperStream);
  outputStream = outputStream.pipe(gzipStream);
  var targetStream = process.stdout;
  outputStream.pipe(targetStream);
}
