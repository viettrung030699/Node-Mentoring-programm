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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSuggestUsers = exports.deleteUser = exports.updateUser = exports.createUser = exports.getAllUsers = exports.getUserById = void 0;
const users = [
    { id: '1', login: 'user_1', password: 'user123', age: 19, isDeleted: false },
    { id: '2', login: 'user_2', password: 'user123', age: 18, isDeleted: false },
    { id: '3', login: 'user_3', password: 'user123', age: 22, isDeleted: false },
    { id: '4', login: 'user_4', password: 'user123', age: 23, isDeleted: false },
];
const getAutoSuggestUsers = (substring, limit) => {
    console.log({ suggestUsers: users });
    return users;
};
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users.find((user) => user.id === req.params.id);
    if (!user) {
        res.status(400).json({ 404: Error });
    }
    res.status(200).json({ user: user });
});
exports.getUserById = getUserById;
const getAllUsers = (req, res) => {
    res.status(200).json({ users: users });
};
exports.getAllUsers = getAllUsers;
const createUser = (req, res) => {
    const _id = req.body.id;
    if (!_id) {
        res.status(400).send({ message: 'Not valid' });
    }
    const newUser = Object.assign({}, req.body);
    users.push(newUser);
    res.status(200).json({ user: users });
};
exports.createUser = createUser;
const updateUser = (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: 'Not Valid' });
    }
    const targetIndex = users.findIndex((user) => {
        return user.id === id;
    });
    if (targetIndex === -1) {
        res.status(400).send({ message: `Invalid userId ${id}` });
    }
    users[targetIndex] = req.body;
    res
        .status(200)
        .json({ user: users, message: `Update successed user: ${id}` });
};
exports.updateUser = updateUser;
const deleteUser = (req, res) => {
    const { id } = req.params;
    if (!id) {
        res.status(400).send({ message: 'Not Valid' });
    }
    const targetIndex = users.findIndex((user) => {
        return user.id === id;
    });
    if (targetIndex === -1) {
        res.status(400).send({ message: `Invalid userId ${id}` });
    }
    users[targetIndex].isDeleted = true;
    res.status(200).send({ users: users, message: `User ${id} changed` });
};
exports.deleteUser = deleteUser;
const getSuggestUsers = (req, res) => {
    const LIMIT_USERS = 5;
    const { substring } = req.params;
    console.log(req);
    const suggestUsers = getAutoSuggestUsers(substring, LIMIT_USERS);
    res.status(200).send({ suggestUsers: suggestUsers, message: `Suggest Users test subString: ${substring}` });
};
exports.getSuggestUsers = getSuggestUsers;
