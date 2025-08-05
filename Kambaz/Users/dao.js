import users from "../users.js";
import { v4 as uuidv4 } from "uuid";
let usersArray = [...users];
export const createUser = (user) => {
    const newUser = { ...user, _id: uuidv4() };
    usersArray = [...usersArray, newUser];
    return newUser;
};
export const findAllUsers = () => usersArray;
export const findUserById = (userId) => usersArray.find((user) => user._id === userId);
export const findUserByUsername = (username) => usersArray.find((user) => user.username === username);
export const findUserByCredentials = (username, password) =>
    usersArray.find((user) => user.username === username && user.password === password);
export const updateUser = (userId, user) => (usersArray = usersArray.map((u) => (u._id === userId ? user : u)));
export const deleteUser = (userId) => (usersArray = usersArray.filter((u) => u._id !== userId));