const express = require("express");
const Actions = require("../data/helpers/actionModel");

const router = express.Router();

router.get("/", (req, res) => {
  Actions.get()
    .then(actions => {
      res.status(200).json(actions);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.get("/:id", validateActionID, (req, res) => {
  res.status(200).json(req.action);
});

router.put("/:id", validateActionID, (req, res) => {
  const { id } = req.params;
  Actions.update(id, req.body)
    .then(action => {
      res.status(200).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.post("/", (req, res) => {
  Actions.insert(req.body)
    .then(action => {
      res.status(201).json(action);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: err.message });
    });
});

router.delete("/:id", validateActionID, (req, res) => {
  Actions.remove(req.params.id)
    .then(() => {
      res.status(200).json({ message: "action deleted" });
    })
    .catch(err => {
      res.status(500).json({ message: err.message });
    });
});

function validateActionID(req, res, next) {
  const { id } = req.params;
  Actions.get(id)
    .then(action => {
      if (action) {
        req.action = action;
        next();
      } else {
        next({ code: 400, message: "no actions with given id" });
      }
    })
    .catch(err => {
      next({ code: 500, message: err.message });
    });
}

router.use((err, req, res, next) => {
  res.status(err.code).json({ message: err.message });
});

module.exports = router;
