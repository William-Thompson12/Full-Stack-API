module.exports = app => {
    const transactions = require("../controllers/transaction.controllers");
  
    var router = require("express").Router();
  
    // Create a new transaction
    router.post("/", transactions.create);
  
    // Retrieve all transactions
    router.get("/:id", transactions.findAll);
    
    // Update a transaction with id
    router.put("/:id", transactions.update);
  
    // Delete a transactions with id
    router.delete("/:id", transactions.delete);
  
    app.use('/api/transactions', router);
};