module.exports = app => {
    const budgets = require("../controllers/budget.controllers");
  
    var router = require("express").Router();
  
    // Create a new budget
    router.post("/", budgets.create);
  
    // Retrieve all budget
    router.get("/", budgets.findAll);
    
    // Update a budget with id
    router.put("/:id", budgets.update);
  
    // Delete a budget with id
    router.delete("/:id", budgets.delete);
  
    app.use('/api/budgets', router);
};