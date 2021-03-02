const db = require("../models");
const Budget = db.budgets;
const Op = db.Sequelize.Op;

// Create and Save a new Budget
exports.create = (req, res) => {
    // Validate request
  if (!req.body.userToken) {
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
    userToken: req.body.userToken,
    budgetId: req.body.name + req.body.userToken
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
  const userToken = req.params.id;
  Budget.findAll({where: { userToken: userToken } })
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
  const budgetId = req.params.id;
  Budget.update(req.body, {
    where: { budgetId: budgetId}
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Budget was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Budget "${budgetId}" with id=${userToken}. Maybe User was not found or req.body is empty!`
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
  const budgetId = req.body.budgetId;
  Budget.destroy({ where: { budgetId: budgetId }})
  .then(num => {
      if (num == 1) {
        res.send({
          message: "Budget was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Budget with id=${userToken}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error Deleteing Budget with id=" + userToken + err
      });
  });
};