const { default: Axios } = require("axios");

(function () {
  var form = document.querySelector("form");
  form.addEventListener("submit", onSubmit);
  function onSubmit(e) {
    e.preventDefault();
    Axios.post("http://localhost:3000/login", {
      name: document.forms[0][0].value,
    })
      .then((res) => {
        window.location.href = "/";
      })
      .catch((err) => {
        console.log(err);
      });
  }
})();
