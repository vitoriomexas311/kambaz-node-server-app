import * as dao from "./dao.js";

export default function EnrollmentRoutes(app) {
    const findAllEnrollments = (req, res) => {
        const enrollments = dao.findAllEnrollments();
        res.json(enrollments);
    };

    const findEnrollmentsByUser = (req, res) => {
        let { userId } = req.params;
        if (userId === "current") {
            const currentUser = req.session["currentUser"];
            if (!currentUser) {
                res.sendStatus(401);
                return;
            }
            userId = currentUser._id;
        }
        const enrollments = dao.findEnrollmentsByUser(userId);
        res.json(enrollments);
    };

    const findEnrollmentsByCourse = (req, res) => {
        const { courseId } = req.params;
        const enrollments = dao.findEnrollmentsByCourse(courseId);
        res.json(enrollments);
    };

    const enrollUserInCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }

        const { courseId } = req.params;
        
        // Check if user is already enrolled
        if (dao.isUserEnrolledInCourse(currentUser._id, courseId)) {
            res.status(400).json({ message: "User is already enrolled in this course" });
            return;
        }

        dao.enrollUserInCourse(currentUser._id, courseId);
        res.json({ message: "Successfully enrolled in course" });
    };

    const unenrollUserFromCourse = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }

        const { courseId } = req.params;
        
        const success = dao.unenrollUserFromCourse(currentUser._id, courseId);
        if (success) {
            res.json({ message: "Successfully unenrolled from course" });
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    };

    const checkEnrollmentStatus = (req, res) => {
        const currentUser = req.session["currentUser"];
        if (!currentUser) {
            res.status(401).json({ message: "User not authenticated" });
            return;
        }

        const { courseId } = req.params;
        const isEnrolled = dao.isUserEnrolledInCourse(currentUser._id, courseId);
        res.json({ isEnrolled });
    };

    const deleteEnrollment = (req, res) => {
        const { enrollmentId } = req.params;
        const success = dao.deleteEnrollment(enrollmentId);
        if (success) {
            res.json({ message: "Enrollment deleted successfully" });
        } else {
            res.status(404).json({ message: "Enrollment not found" });
        }
    };

    // Route definitions
    app.get("/api/enrollments", findAllEnrollments);
    app.get("/api/enrollments/user/:userId", findEnrollmentsByUser);
    app.get("/api/enrollments/course/:courseId", findEnrollmentsByCourse);
    app.post("/api/enrollments/course/:courseId", enrollUserInCourse);
    app.delete("/api/enrollments/course/:courseId", unenrollUserFromCourse);
    app.get("/api/enrollments/course/:courseId/status", checkEnrollmentStatus);
    app.delete("/api/enrollments/:enrollmentId", deleteEnrollment);
} 