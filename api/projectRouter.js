const express = require("express");
const Projects = require("../data/helpers/projectModel");

const router = express.Router();

router.get("/", (req, res) => {
  Projects.get()
    .then(projects => {
      res.status(200).json(projects);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", validateProjectID, (req, res) => {
  res.status(200).json(req.project);
});

router.get("/:id/actions", validateProjectID, (req, res) => {
  Projects.getProjectActions(req.project.id)
    .then(actions => {
      console.log(actions);
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post("/", (req, res) => {
  Projects.insert(req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

router.delete("/:id", validateProjectID, (req, res) => {
  Projects.remove(req.project.id)
    .then(() => {
      res.status(200).json({ message: "project deleted" });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

router.put("/:id", validateProjectID, (req, res) => {
  Projects.update(req.project.id, req.body)
    .then(project => {
      res.status(200).json(project);
    })
    .catch(err => {
      res.status(500).json(err.message);
    });
});

function validateProjectID(req, res, next) {
  Projects.get(req.params.id)
    .then(project => {
      if (project) {
        req.project = project;
        next();
      } else {
        next({ code: 400, message: "no project with given ID" });
      }
    })
    .catch(err => {
      next({ code: 400, message: err.message });
    });
}

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
