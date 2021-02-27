const db = require("../models");
const Budget = db.budget;
const Op = db.Sequelize.Op;

// Create and Save a new Budget
exports.create = (req, res) => {
    // Validate request
    // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty" 
    });
    return;
  } else if (!req.body.description) {
    res.status(400).send({
      message: "Email can not be empty" 
    });
    return;
  } else if (!req.body.userToken) {
    res.status(400).send({
      message: "UserToken can not be empty" 
    });
    return;
  }
  // Create a user
  const budget = {
      name: req.body.name,
      expense: req.body.expense || [],
      income: req.body.income || [],
      description: req.body.description,
      userToken: req.body.userToken
  };
  // Save User in the database
  Budget.create(budget)
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the Account."
      });
  });
};
// Retrieve all Budgets from a user in the database.
exports.findAll = (req, res) => {
  const userToken = req.query.userToken;
  var condition = userToken ? { userToken: userToken } : null;
  Budget.findAll({ where: condition })
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
      message:
          err.message || "Some error occurred while retrieving users."
      });
  });
};
// Update a Budget by the id in the request
exports.update = (req, res) => {
  const name = req.body.name;
  const userToken = req.body.userToken;
  Budget.update(req.body, {
    where: { userToken: userToken, name: name}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Budget was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Budget "${name}" with id=${userToken}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Budget with id=" + userToken
    });
  });
};
// Delete a Budget with the specified id in the request
exports.delete = (req, res) => {
  const name = req.body.name;
  const userToken = req.body.userToken;
  Budget.destroy({ where: { userToken: userToken, name: name }})
  .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete User with id=${userToken}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Tutorial with id=" + userToken
      });
  });
};