const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

// Create and Save a new User
exports.create = (req, res) => {
  // Validate request
  if (!req.body.name) {
    res.status(400).send({
      message: "Name can not be empty" 
    });
    return;
  } else if (!req.body.email) {
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
  const user = {
    name: req.body.name,
    email: req.body.email,
    userToken: req.body.userToken
  };
  // Save User in the database
  User.create(user)
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
// Retrieve all Users from the database
exports.findAll = (req, res) => {
  User.findAll()
  .then(data => {
      res.send(data);
  })
  .catch(err => {
      res.status(500).send({
      message:
          err.message + User || "Some error occurred while retrieving users." 
      });
  });
};
// Find a single User with an id
exports.findOne = (req, res) => {
  const userToken = req.params.id;
  User.findAll({ where: { userToken: userToken }})
    .then(data => {
    res.send(data);
    })
    .catch(err => {
    res.status(500).send({
        message: "Error retrieving User with id=" + userToken
    });
  });
};
// Update a User by the id in the request
exports.update = (req, res) => {
  const userToken = req.params.userToken;
  User.update(req.body, {
    where: { userToken: userToken }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${userToken}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Tutorial with id=" + userToken
    });
  });
};
// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const userToken = req.params.id;
  User.destroy({
    where: { userToken: userToken }
  })
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
