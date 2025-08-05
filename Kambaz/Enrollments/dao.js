import enrollments from "../enrollments.js";
import { v4 as uuidv4 } from "uuid";

export function enrollUserInCourse(userId, courseId) {
    enrollments.push({ _id: uuidv4(), user: userId, course: courseId });
}

export function findAllEnrollments() {
    return enrollments;
}

export function findEnrollmentsByUser(userId) {
    return enrollments.filter(enrollment => enrollment.user === userId);
}

export function findEnrollmentsByCourse(courseId) {
    return enrollments.filter(enrollment => enrollment.course === courseId);
}

export function findEnrollmentById(enrollmentId) {
    return enrollments.find(enrollment => enrollment._id === enrollmentId);
}

export function unenrollUserFromCourse(userId, courseId) {
    const index = enrollments.findIndex(enrollment => 
        enrollment.user === userId && enrollment.course === courseId
    );
    if (index !== -1) {
        enrollments.splice(index, 1);
        return true;
    }
    return false;
}

export function isUserEnrolledInCourse(userId, courseId) {
    return enrollments.some(enrollment => 
        enrollment.user === userId && enrollment.course === courseId
    );
}

export function deleteEnrollment(enrollmentId) {
    const index = enrollments.findIndex(enrollment => enrollment._id === enrollmentId);
    if (index !== -1) {
        enrollments.splice(index, 1);
        return true;
    }
    return false;
}
