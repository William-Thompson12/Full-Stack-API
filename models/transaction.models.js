module.exports = (sequelize, Sequelize) => {
    const Transaction = sequelize.define("transaction", {
        name: {
            type: Sequelize.STRING
        },
        budgetId: {
            type: Sequelize.STRING
        },
        amount: {
            type: Sequelize.INTEGER
        },
        times: {
            type: Sequelize.INTEGER
        },
        type: {
            type: Sequelize.STRING
        },
        transactionId: {
            type: Sequelize.STRING
        }
    });
    return Transaction;
};