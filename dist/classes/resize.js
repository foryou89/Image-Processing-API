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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path = __importStar(require("path"));
var dotenv = __importStar(require("dotenv"));
var image_size_1 = __importDefault(require("image-size"));
var sharp_1 = __importDefault(require("sharp"));
//- list of allowed image extension
var allowedExtension = ['jpg', 'png', 'webp', 'gif'];
var RsizeImage = /** @class */ (function () {
    function RsizeImage(image_name) {
        dotenv.config();
        this.image_name = image_name;
        var srcImgDir = process.env.SRC_IMG || 'resized-images';
        this.image_path = path.join(__dirname, '/../assets/' + srcImgDir + '/' + image_name);
    }
    //- check if image exists in src folder
    RsizeImage.prototype.check_if_file_exists = function () {
        if (fs_1.default.existsSync(this.image_path)) {
            return true;
        }
        return false;
    };
    //- check if image is valid image
    RsizeImage.prototype.check_if_valid_image = function () {
        try {
            var img = (0, image_size_1.default)(this.image_path);
            if (allowedExtension.includes(img.type) &&
                img.width > 0 &&
                img.height > 0) {
                return true;
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
        }
        return false;
    };
    //- resize image by sharp
    //- if output is exists it will return this output (caching)
    RsizeImage.prototype.resize = function (new_width, new_height) {
        return __awaiter(this, void 0, void 0, function () {
            var output, outImgDir, filename, ext, new_filename, newfile_path, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        output = '';
                        outImgDir = process.env.OUT_IMG || 'resized-images';
                        filename = this.image_name.split('.')[0];
                        ext = this.image_name.split('.')[1];
                        new_filename = filename + '_w' + new_width + '_h' + new_height;
                        newfile_path = path.join(__dirname, '/../assets/' + outImgDir + '/' + new_filename + '.' + ext);
                        if (fs_1.default.existsSync(newfile_path)) {
                            return [2 /*return*/, new_filename + '.' + ext];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, (0, sharp_1.default)(this.image_path)
                                .resize({
                                fit: sharp_1.default.fit.fill,
                                width: new_width,
                                height: new_height,
                            })
                                .toFile(newfile_path)];
                    case 2:
                        _a.sent();
                        output = new_filename + '.' + ext;
                        return [3 /*break*/, 4];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1 instanceof Error) {
                            throw new Error(error_1.message);
                        }
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/, output];
                }
            });
        });
    };
    return RsizeImage;
}());
exports.default = RsizeImage;
