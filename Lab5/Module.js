const module = {
    id: "CS5610",
    name: "Web Development",
    description: "Learn modern web development with Node.js and React",
    course: "Computer Science"
};

export default function Module(app) {
    app.get("/lab5/module", (req, res) => {
        res.json(module);
    });
    app.get("/lab5/module/name", (req, res) => {
        res.json(module.name);
    });
    app.get("/lab5/module/id", (req, res) => {
        res.json(module.id);
    });
    app.get("/lab5/module/course", (req, res) => {
        res.json(module.course);
    });
    app.get("/lab5/module/description", (req, res) => {
        res.json(module.description);
    });
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
    app.get("/lab5/module/id/:newId", (req, res) => {
        const { newId } = req.params;
        module.id = newId;
        res.json(module);
    });
    app.get("/lab5/module/name/:newName", (req, res) => {
        const { newName } = req.params;
        module.name = newName;
        res.json(module);
    });
    app.get("/lab5/module/description/:newDescription", (req, res) => {
        const { newDescription } = req.params;
        module.description = newDescription;
        res.json(module);
    });
}; 