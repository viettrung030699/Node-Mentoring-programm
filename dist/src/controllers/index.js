"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = void 0;
const users = [
    { id: '1', login: 'user_1', password: 'user123', age: 19, isDeleted: false },
    { id: '2', login: 'user_2', password: 'user123', age: 18, isDeleted: false },
    { id: '3', login: 'user_3', password: 'user123', age: 22, isDeleted: false },
    { id: '4', login: 'user_4', password: 'user123', age: 23, isDeleted: false },
];
const getUserById = (req, res) => {
    const user = users.find(user => user.id === req.params.id);
    if (!user) {
        res.json({ 404: Error });
    }
    res.json(user);
};
exports.getUserById = getUserById;
