(function () {
  var worker;
  var btn = document.getElementById("btn");
  var close = document.getElementById("close");
  btn.addEventListener("click", startSW);
  close.addEventListener("click", stopSW);

  function startSW(e) {
    worker = new Worker("./worker.js");
    worker.addEventListener("message", onMessage);
  }

  function onMessage(event) {
    if (worker) {
      worker.postMessage({ data: { name: event.data } });
    }
  }

  function stopSW() {
    worker.terminate();
  }
})();
