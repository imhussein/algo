import "reflect-metadata";

@classDecorator
class Person {
  firstName: string = "Mohamed";
  @markFunction("123")
  log() {
    console.log(this.firstName);
  }
}

function classDecorator(target: any) {
  Reflect.getMetadata("secret", target, "log");
}

function markFunction(value: string) {
  return function (target: any, key: string, prop: PropertyDescriptor) {
    Reflect.defineMetadata("secret", value, target, key);
  };
}

const secret = Reflect.getMetadata("secret", Person.prototype, "log");
console.log(secret);
