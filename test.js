// Merge 2 []

function merge(a, b, newArr) {
  if (a.length || b.length) {
    item = arguments[a.length ? 0 : 1].shift();
    newArr.push(item);
    merge(a, b, newArr);
    return newArr;
  }
}

// console.log(merge([1, 2, 3, 6], [4, 5, 6, 7, 8, 9, 0], []));

const buffer = Buffer.from("Mohamed", "utf-8");
console.log(buffer.toJSON().data);
buffer.write("New");
console.log(buffer.toString());
console.log(buffer.toJSON().data);
