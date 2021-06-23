"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/api/index"));
const app = express_1.default();
const port = process.env.port || 3000;
//middleware to allow express to read incoming request object as a JSON object
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
//routes will began with /api/
app.use('/api', index_1.default);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`);
});
