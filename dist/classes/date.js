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
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyDate = void 0;
const d3TimeFormat = __importStar(require("d3-time-format"));
class PyDate {
    constructor(year, month, day) {
        Object.assign(this, { year, month, day });
    }
    get jsDate() {
        return new Date(this.year, this.month - 1, this.day);
    }
    str() {
        return d3TimeFormat.timeFormat('%Y-%m-%d')(this.jsDate);
    }
    weekday() {
        // javascript week starts on sunday, while python one starts on monday
        return (this.jsDate.getDay() + 6) % 7;
    }
    isoweekday() {
        return this.weekday() + 1;
    }
    get __totalMillis() {
        return this.jsDate.getTime();
    }
    valueOf() {
        return this.__totalMillis;
    }
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
    }
}
exports.PyDate = PyDate;
