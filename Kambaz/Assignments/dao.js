import assignments from "../assignments.js";
import { v4 as uuidv4 } from "uuid";

let assignmentsArray = [...assignments];

export const createAssignment = (assignment) => {
    const newAssignment = { ...assignment, _id: uuidv4() };
    assignmentsArray = [...assignmentsArray, newAssignment];
    return newAssignment;
};

export const findAllAssignments = () => assignmentsArray;

export const findAssignmentById = (assignmentId) => 
    assignmentsArray.find((assignment) => assignment._id === assignmentId);

export const findAssignmentsByCourse = (courseId) => 
    assignmentsArray.filter((assignment) => assignment.course === courseId);

export const updateAssignment = (assignmentId, assignmentUpdates) => {
    assignmentsArray = assignmentsArray.map((assignment) => 
        assignment._id === assignmentId 
            ? { ...assignment, ...assignmentUpdates }
            : assignment
    );
    return findAssignmentById(assignmentId);
};

export const deleteAssignment = (assignmentId) => {
    assignmentsArray = assignmentsArray.filter((assignment) => assignment._id !== assignmentId);
    return { success: true };
};
