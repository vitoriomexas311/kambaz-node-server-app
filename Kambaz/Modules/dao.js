import modules from "../modules.js";
import { v4 as uuidv4 } from "uuid";

export function findModulesForCourse(courseId) {
    return modules.filter((module) => module.course === courseId);
}

export function createModule(module) {
    const newModule = { ...module, _id: uuidv4() };
    modules.push(newModule);
    return newModule;
}

export function deleteModule(moduleId) {
    const index = modules.findIndex((module) => module._id === moduleId);
    if (index !== -1) {
        modules.splice(index, 1);
        return { success: true };
    }
    return { success: false };
}
export function updateModule(moduleId, moduleUpdates) {
    const { modules } = Database;
    const module = modules.find((module) => module._id === moduleId);
    Object.assign(module, moduleUpdates);
    return module;
}
