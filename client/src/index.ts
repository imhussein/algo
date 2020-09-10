import { User } from "./models/User";

const user = User.buildUser({ id: 1 });
user.on("change", function (data) {
  console.log(data);
});
user.on("save", function (props) {
  console.log("Save", user);
});
user.fetch();
user.save();
