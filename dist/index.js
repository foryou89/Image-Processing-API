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
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var dotenv = __importStar(require("dotenv"));
var helmet_1 = __importDefault(require("helmet"));
var resize_1 = __importDefault(require("./classes/resize"));
var handle_errors_1 = __importDefault(require("./functions/handle_errors"));
var get_html_page_1 = __importDefault(require("./functions/get_html_page"));
//- .env config file
dotenv.config();
var PORT = parseInt(process.env.PORT) || 3000;
var outImgDir = process.env.OUT_IMG || 'resized-images';
//- create an instance server
var MyApp = (0, express_1.default)();
//- HTTP request logger middleware by morgan
MyApp.use((0, morgan_1.default)('dev'));
//- HTTP request logger middleware by helmet
MyApp.use((0, helmet_1.default)());
//- path for home page
MyApp.get('/', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, res.status(200).send((0, get_html_page_1.default)('index'))];
    });
}); });
//- path for api
MyApp.get('/api/images', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var filename, new_width, new_height, ri, output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.query.filename) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'Request api is not valid, It must contain the name of the image.'))];
                }
                if (!req.query.width) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'Request api is not valid, It must contain the width of the new image.'))];
                }
                if (!req.query.height) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'Request api is not valid, It must contain the height of the new image.'))];
                }
                if (req.query.filename == '') {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'Image name cannot be empty.'))];
                }
                if (!/^\d+$/.test(req.query.width)) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'The width of the new image must be a number.'))];
                }
                if (!/^\d+$/.test(req.query.height)) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'The height of the new image must be a number.'))];
                }
                if (parseInt(req.query.width) <= 0) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'New image width cannot be less than 1 pixel.'))];
                }
                if (parseInt(req.query.height) <= 0) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'New image height cannot be less than 1 pixel.'))];
                }
                filename = req.query.filename;
                new_width = parseInt(req.query.width);
                new_height = parseInt(req.query.height);
                ri = new resize_1.default(filename);
                //- check if file exists -> return -> true | false
                if (!ri.check_if_file_exists()) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'The file name does not exist.'))];
                }
                //- check if valid image -> return -> true | false
                if (!ri.check_if_valid_image()) {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'This image is invalid or unsupported.'))];
                }
                return [4 /*yield*/, ri.resize(new_width, new_height)];
            case 1:
                output = _a.sent();
                if (output == '') {
                    return [2 /*return*/, res
                            .status(400)
                            .send((0, get_html_page_1.default)('error', 'An error occurred while resizing the image, Try again.'))];
                }
                else {
                    //- load resized image
                    fs_1.default.readFile(__dirname + '/assets/' + outImgDir + '/' + output, function (err, content) {
                        if (err) {
                            return res
                                .status(400)
                                .send((0, get_html_page_1.default)('error', 'An error occurred while resizing the image, Try again.'));
                        }
                        var ext = output.split('.')[1];
                        res.setHeader('Content-Type', 'image/' + ext);
                        return res.status(200).send(content);
                    });
                }
                return [2 /*return*/];
        }
    });
}); });
//- error if other path
MyApp.use(function (_req, res) {
    return res
        .status(404)
        .send((0, get_html_page_1.default)('error', 'This page does not exist.'));
});
MyApp.use(handle_errors_1.default);
//- start server
MyApp.listen(PORT, function () {
    console.info('Server is starting now at port:' + PORT);
});
exports.default = MyApp;
