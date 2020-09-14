self.postMessage({ data: "Mohamed" });
self.addEventListener("message", ({ data }) => {
  console.log(data.data.name.data);
});
console.log(self);
