"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
__exportStar(require("./classes"), exports);
__exportStar(require("./models"), exports);
const classes_1 = require("./classes");
const functions_1 = require("./functions");
const date = (...args) => new classes_1.PyDate(...args);
const time = (...args) => new classes_1.PyTime(...args);
const timedelta = (...args) => new classes_1.PyTimedelta(...args);
const datetime = (...args) => new classes_1.PyDatetime(...args);
datetime.now = () => (0, functions_1.now)();
datetime.utcnow = () => (0, functions_1.utcnow)();
datetime.utc = (...args) => (0, functions_1.utc)(...args);
datetime.combine = (...args) => (0, functions_1.combine)(...args);
datetime.strptime = (...args) => (0, functions_1.strptime)(...args);
const dt = {
    date,
    time,
    timedelta,
    datetime,
};
exports.default = dt;
