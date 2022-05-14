"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
var FetchApi = /** @class */ (function () {
    function FetchApi() {
    }
    /**
     * @inheritDoc
     */
    FetchApi.prototype.delete = function (url, data, headers) {
        if (data === void 0) { data = null; }
        if (headers === void 0) { headers = new Headers({}); }
        return FetchApi._fetch(url, 'DELETE', data, headers);
    };
    /**
     * @inheritDoc
     */
    FetchApi.prototype.get = function (url, data, headers) {
        if (data === void 0) { data = null; }
        if (headers === void 0) { headers = new Headers({}); }
        var params = [];
        if (data && data instanceof FormData) {
            data.forEach(function (value, key) {
                if (value instanceof Blob) {
                    throw new Error("A blob or a file cannot be passed as get parameters. Key=".concat(key));
                }
                params.push("".concat(key, "=").concat(value.toString()));
            });
        }
        var newUrl = "".concat(url, "?").concat(params.join(','));
        return FetchApi._fetch(newUrl, 'GET', null, headers);
    };
    /**
     * @inheritDoc
     */
    FetchApi.prototype.post = function (url, data, headers) {
        if (data === void 0) { data = null; }
        if (headers === void 0) { headers = new Headers({}); }
        return FetchApi._fetch(url, 'POST', data, headers);
    };
    /**
     * @inheritDoc
     */
    FetchApi.prototype.put = function (url, data, headers) {
        if (data === void 0) { data = null; }
        if (headers === void 0) { headers = new Headers({}); }
        return FetchApi._fetch(url, 'PUT', data, headers);
    };
    /**
     * Internal wrapper
     * @param url Url to fetch
     * @param methodName Method call
     * @param data Data to fetch
     * @param headers Headers for the request
     * @private
     */
    FetchApi._fetch = function (url, methodName, data, headers) {
        return __awaiter(this, void 0, void 0, function () {
            var response, error_1;
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 8, , 9]);
                        response = void 0;
                        if (!(data === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fetch(url, {
                                method: methodName,
                                headers: headers
                            })];
                    case 1:
                        response = _b.sent();
                        return [3 /*break*/, 6];
                    case 2:
                        if (!(data instanceof FormData)) return [3 /*break*/, 4];
                        return [4 /*yield*/, fetch(url, {
                                method: methodName,
                                headers: headers,
                                body: data
                            })];
                    case 3:
                        response = _b.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, fetch(url, {
                            method: methodName,
                            headers: headers,
                            body: JSON.stringify(data)
                        })];
                    case 5:
                        response = _b.sent();
                        _b.label = 6;
                    case 6:
                        _a = {
                            status: response.status
                        };
                        return [4 /*yield*/, (response.headers.get('Content-Type') === 'application/json;charset=utf-8' ? response.json() : response.text())];
                    case 7: return [2 /*return*/, (_a.data = _b.sent(),
                            _a.ok = function () {
                                return this.status >= 200 && this.status < 300;
                            },
                            _a)];
                    case 8:
                        error_1 = _b.sent();
                        return [2 /*return*/, {
                                status: 500,
                                data: error_1,
                                ok: function () {
                                    return false;
                                }
                            }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    return FetchApi;
}());
exports.default = new FetchApi();
//# sourceMappingURL=index.js.map