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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArticleRepository = ArticleRepository;
const database_config_1 = __importDefault(require("../config/database.config"));
function ArticleRepository() {
    function all() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_config_1.default.article.findMany();
        });
    }
    function findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_config_1.default.article.findUnique({
                where: {
                    id: parseInt(id)
                }
            });
        });
    }
    function create(title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_config_1.default.article.create({
                data: {
                    title: title,
                    description: description
                }
            });
        });
    }
    function update(id, title, description) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_config_1.default.article.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    title: title,
                    description: description
                }
            });
        });
    }
    function destroy(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield database_config_1.default.article.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    deletedAt: new Date()
                }
            });
        });
    }
    return {
        all,
        findById,
        create,
        update,
        destroy
    };
}
