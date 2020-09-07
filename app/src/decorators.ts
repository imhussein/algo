import "reflect-metadata";

@classDecorator("Post")
class Person {
  firstName: string = "Mohamed";
  public value: string;

  constructor() {
    this.value = "Mohamed Hussein";
  }

  get formateed() {
    return `First name is ${this.firstName}`;
  }

  log(@testDecorator<string>("") value: string) {
    console.log(this.firstName);
  }

  @logErrorDec<string>("That is an error")
  logError() {
    throw new Error("Error");
  }
}

const person = new Person();
function logErrorDec<K>(value: K) {
  return function (target: any, key: string, prop: PropertyDescriptor) {
    const method = prop.value;
    prop.value = function () {
      try {
        method();
      } catch (error) {
        console.log(value, error);
      }
    };
  };
}

function testDecorator<T>(value: T) {
  return function (target: string, key: string, index: number) {
    console.log(value);
  };
}

function classDecorator(method: string) {
  return function (target: Function) {
    if (method === "Get") {
      console.log("That a get method");
    } else {
      console.log("That is a post method");
    }
  };
}
