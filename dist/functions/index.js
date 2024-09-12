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
exports.now = now;
exports.utcnow = utcnow;
exports.utc = utc;
exports.combine = combine;
exports.strptime = strptime;
const classes_1 = require("../classes");
const d3TimeFormat = __importStar(require("d3-time-format"));
function now() {
    return new classes_1.PyDatetime(new Date());
}
function utcnow() {
    return utc(new Date());
}
function utc(ts) {
    if (typeof ts == 'number') {
        // while a dt.datetime(2020) is perfectly valid, it's quite unlikely.
        // much more unlikely than having gotten an epoch passed in. convert that to date
        ts = new Date(ts);
    }
    else if (ts instanceof classes_1.PyDatetime) {
        ts = ts.jsDate;
    }
    return new classes_1.PyDatetime(ts.getUTCFullYear(), ts.getUTCMonth() + 1, ts.getUTCDate(), ts.getUTCHours(), ts.getUTCMinutes(), ts.getUTCSeconds(), ts.getUTCMilliseconds(), true);
}
function combine(date, time) {
    const dt = new classes_1.PyDatetime(date);
    Object.assign(dt, time);
    return dt;
}
function strptime(dateString, format, is_utc = false) {
    const parser = is_utc ? d3TimeFormat.utcParse : d3TimeFormat.timeParse;
    const parsed = parser(format)(dateString);
    if (!parsed) {
        throw `ValueError: time data '${dateString}' does not match format '${format}'`;
    }
    return is_utc ? utc(parsed) : new classes_1.PyDatetime(parsed);
}
