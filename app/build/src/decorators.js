"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var Person = /** @class */ (function () {
    function Person() {
        this.firstName = "Mohamed";
        this.value = "Mohamed Hussein";
    }
    Object.defineProperty(Person.prototype, "formateed", {
        get: function () {
            return "First name is " + this.firstName;
        },
        enumerable: true,
        configurable: true
    });
    Person.prototype.log = function (value) {
        console.log(this.firstName);
    };
    Person.prototype.logError = function () {
        throw new Error("Error");
    };
    __decorate([
        __param(0, testDecorator("")),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [String]),
        __metadata("design:returntype", void 0)
    ], Person.prototype, "log", null);
    __decorate([
        logErrorDec("That is an error"),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Person.prototype, "logError", null);
    Person = __decorate([
        classDecorator("Post"),
        __metadata("design:paramtypes", [])
    ], Person);
    return Person;
}());
var person = new Person();
function logErrorDec(value) {
    return function (target, key, prop) {
        var method = prop.value;
        prop.value = function () {
            try {
                method();
            }
            catch (error) {
                console.log(value, error);
            }
        };
    };
}
function testDecorator(value) {
    return function (target, key, index) {
        console.log(value);
    };
}
function classDecorator(method) {
    return function (target) {
        if (method === "Get") {
            console.log("That a get method");
        }
        else {
            console.log("That is a post method");
        }
    };
}
