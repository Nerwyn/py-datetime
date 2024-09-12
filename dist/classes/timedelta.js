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
exports.PyTimedelta = void 0;
const d3TimeFormat = __importStar(require("d3-time-format"));
const models_1 = require("../models");
class PyTimedelta {
    constructor(days, seconds, milliseconds, minutes, hours, weeks) {
        let args = {
            days: days,
            seconds,
            milliseconds,
            minutes,
            hours,
            weeks,
        };
        if (days != null && typeof days != 'number') {
            // we have a dict
            args = days;
        }
        else if (Math.abs(days) > 900) {
            // we have millis, let's deconstruct into weeks, days, hours, minutes, seconds, milliseconds
            let totalMillis = days ?? 0;
            args = {};
            models_1.TimedeltaIntervals.forEach((key) => {
                const multiplier = models_1.toMillis[key];
                const val = Math.floor(totalMillis / multiplier);
                if (val) {
                    args[key] = val;
                    totalMillis -= val * multiplier;
                }
            });
        }
        models_1.TimedeltaIntervals.forEach((key) => {
            this[key] = args[key] || 0;
        });
    }
    get __totalMillis() {
        let millis = models_1.TimedeltaIntervals.map((field) => this[field] *
            models_1.toMillis[field]);
        return millis.reduce((total, current) => total + current);
    }
    str() {
        return d3TimeFormat.timeFormat('%H:%M:%S.%f')(new Date(this));
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
    totalSeconds() {
        return this.__totalMillis / 1000;
    }
}
exports.PyTimedelta = PyTimedelta;
