"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.composeHangul = exports.decomposeHangul = exports.delay = exports.isSpaceCharacter = exports.isInJongSung = exports.isDot = exports.isNewLine = exports.createTypeStream = void 0;
var typeStream_1 = require("./typeStream");
Object.defineProperty(exports, "createTypeStream", { enumerable: true, get: function () { return __importDefault(typeStream_1).default; } });
var typeStream_2 = require("./typeStream");
Object.defineProperty(exports, "isNewLine", { enumerable: true, get: function () { return typeStream_2.isNewLine; } });
Object.defineProperty(exports, "isDot", { enumerable: true, get: function () { return typeStream_2.isDot; } });
Object.defineProperty(exports, "isInJongSung", { enumerable: true, get: function () { return typeStream_2.isInJongSung; } });
Object.defineProperty(exports, "isSpaceCharacter", { enumerable: true, get: function () { return typeStream_2.isSpaceCharacter; } });
Object.defineProperty(exports, "delay", { enumerable: true, get: function () { return typeStream_2.delay; } });
var typeStream_3 = require("./typeStream");
Object.defineProperty(exports, "decomposeHangul", { enumerable: true, get: function () { return typeStream_3.decomposeHangul; } });
Object.defineProperty(exports, "composeHangul", { enumerable: true, get: function () { return typeStream_3.composeHangul; } });
