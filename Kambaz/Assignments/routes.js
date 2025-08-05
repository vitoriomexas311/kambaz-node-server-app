import * as dao from "./dao.js";

export default function AssignmentRoutes(app) {
    const createAssignment = (req, res) => {
        const newAssignment = dao.createAssignment(req.body);
        res.json(newAssignment);
    };

    const findAllAssignments = (req, res) => {
        const assignments = dao.findAllAssignments();
        res.json(assignments);
    };

    const findAssignmentById = (req, res) => {
        const assignment = dao.findAssignmentById(req.params.assignmentId);
        if (!assignment) {
            res.status(404).json({ message: "Assignment not found" });
            return;
        }
        res.json(assignment);
    };

    const findAssignmentsByCourse = (req, res) => {
        const assignments = dao.findAssignmentsByCourse(req.params.courseId);
        res.json(assignments);
    };

    const updateAssignment = (req, res) => {
        const assignmentId = req.params.assignmentId;
        const assignmentUpdates = req.body;
        const updatedAssignment = dao.updateAssignment(assignmentId, assignmentUpdates);
        if (!updatedAssignment) {
            res.status(404).json({ message: "Assignment not found" });
            return;
        }
        res.json(updatedAssignment);
    };

    const deleteAssignment = (req, res) => {
        const assignmentId = req.params.assignmentId;
        const result = dao.deleteAssignment(assignmentId);
        res.json(result);
    };

    // Assignment routes
    app.post("/api/assignments", createAssignment);
    app.get("/api/assignments", findAllAssignments);
    app.get("/api/assignments/:assignmentId", findAssignmentById);
    app.get("/api/courses/:courseId/assignments", findAssignmentsByCourse);
    app.put("/api/assignments/:assignmentId", updateAssignment);
    app.delete("/api/assignments/:assignmentId", deleteAssignment);
} 