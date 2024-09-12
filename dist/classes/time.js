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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyTime = void 0;
const d3TimeFormat = __importStar(require("d3-time-format"));
const __1 = __importDefault(require(".."));
const models_1 = require("../models");
class PyTime {
    constructor(hour, minute, second, millisecond) {
        this.hour = 0;
        this.minute = 0;
        this.second = 0;
        this.millisecond = 0;
        let args = {
            hour: hour,
            minute,
            second,
            millisecond,
        };
        if (hour != null && typeof hour != 'number') {
            // we have a dict
            args = hour;
        }
        models_1.TimeIntervals.forEach((field) => {
            args[field] = args[field] || 0;
        });
        Object.assign(this, args);
    }
    str() {
        // we have to set the date to today to avoid any daylight saving nonsense
        const ts = __1.default.datetime.combine(__1.default.datetime.now(), this);
        return d3TimeFormat.timeFormat('%H:%M:%S.%f')(new Date(ts));
    }
    get __totalMillis() {
        return (this.hour * models_1.toMillis.hours +
            this.minute * models_1.toMillis.minutes +
            this.second * models_1.toMillis.seconds +
            this.millisecond);
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
exports.PyTime = PyTime;
