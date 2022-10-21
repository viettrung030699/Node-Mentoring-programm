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
    console.log('#c Hello', 'color: red;');
    if (!user) {
        res.status(400).json({ 404: Error });
    }
    res.status(200).json({ user: user });
};
exports.getUserById = getUserById;
