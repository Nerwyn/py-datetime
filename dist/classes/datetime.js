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
exports.PyDatetime = void 0;
const d3TimeFormat = __importStar(require("d3-time-format"));
const _1 = require(".");
const models_1 = require("../models");
class PyDatetime {
    constructor(year, month, day, hour, minute, second, millisecond, utc) {
        let args = {};
        this.utc = utc;
        if (typeof year == 'number' && !month && !day) {
            // while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
            // much more unlikely than having gotten an epoch passed in. convert that to date
            year = new Date(year);
        }
        if (year?.year &&
            year?.month &&
            year?.day) {
            const ts = year;
            models_1.DatetimeIntervals.forEach((field) => {
                args[field] = ts[field];
            });
            if (ts.utc) {
                args.utc = ts.utc;
            }
        }
        else if (year instanceof Date) {
            const ts = year;
            args = {
                year: ts.getFullYear(),
                month: ts.getMonth() + 1,
                day: ts.getDate(),
                hour: ts.getHours(),
                minute: ts.getMinutes(),
                second: ts.getSeconds(),
                millisecond: ts.getMilliseconds(),
            };
        }
        else {
            args = {
                year: year,
                month,
                day,
                hour,
                minute,
                second,
                millisecond,
            };
        }
        Object.assign(this, args);
    }
    replace(year, month, day, hour, minute, second, millisecond) {
        // returns new date with updated values
        let args = {};
        if (year && typeof year != 'number') {
            args = year;
        }
        else {
            args = { year, month, day, hour, minute, second, millisecond };
        }
        const newTs = new PyDatetime(this);
        Object.entries(args).forEach(([key, val]) => {
            if (val) {
                newTs[key] = val;
            }
        });
        return newTs;
    }
    get jsDate() {
        if (this.utc) {
            return new Date(this.valueOf());
        }
        else {
            return new Date(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
    }
    str() {
        return this.strftime('%Y-%m-%d %H:%M:%S.%f');
    }
    valueOf() {
        if (this.utc) {
            return Date.UTC(this.year, this.month - 1, this.day || 1, this.hour || 0, this.minute || 0, this.second || 0, this.millisecond || 0);
        }
        else {
            return this.jsDate.getTime();
        }
    }
    toString() {
        return this.str();
    }
    toJSON() {
        return this.str();
    }
    strftime(format) {
        if (this.utc) {
            return d3TimeFormat.utcFormat(format)(this.jsDate);
        }
        else {
            return d3TimeFormat.timeFormat(format)(this.jsDate);
        }
    }
    time() {
        return new _1.PyTime(this.hour, this.minute, this.second, this.millisecond);
    }
    date() {
        return new _1.PyDate(this.year, this.month, this.day);
    }
    weekday() {
        // javascript week starts on sunday, while python one starts on monday
        return this.date().weekday();
    }
    isoweekday() {
        return this.weekday() + 1;
    }
}
exports.PyDatetime = PyDatetime;
