const db = require("../models");
const Transaction = db.transactions;
const Op = db.Sequelize.Op;

// Create and Save a new Budget
exports.create = (req, res) => {
    // Validate request
  if (!req.body.transactionId) {
    res.status(400).send({
      message: "transactionId can not be empty" 
    });
    return;
  }
  // Create a user
  const transaction = {
    name: req.body.name,
    amount: req.body.amount,
    times: req.body.times,
    type: req.body.type,
    transactionId: req.body.transactionId,
    budgetId: req.body.budgetId
  };
  // Save User in the database
  Transaction.create(transaction)
      .then(data => {
      res.send(data);
      })
      .catch(err => {
      res.status(500).send({
          message:
          err.message || "Some error occurred while creating the transaction."
      });
  });
};
// Retrieve all Budgets from a user in the database.
exports.findAll = (req, res) => {
  const budgetId = req.params.id;
  Transaction.findAll({where: { budgetId: budgetId } })
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
      message:
          err.message || "Some error occurred while retrieving transaction."
      });
  });
};
// Update a Budget by the id in the request
exports.update = (req, res) => {
  const transactionId = req.params.id;
  Transaction.update(req.body, {where: { transactionId: transactionId}})
  .then(num => {
    if (num == 1) {
      res.send({
        message: "transaction was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update transaction with id=${transactionId}. Maybe transaction was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating transaction with id=" + transactionId
    });
  });
};
// Delete a Budget with the specified id in the request
exports.delete = (req, res) => {
  const transactionId = req.params.id;
  Transaction.destroy({ where: { transactionId: transactionId }})
  .then(num => {
      if (num == 1) {
        res.send({
          message: "Budget was deleted successfully."
        });
      } else {
        res.send({
          message: `Cannot delete Budget with id=${Transaction}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error Deleteing Budget with id=" + Transaction + err
      });
  });
};