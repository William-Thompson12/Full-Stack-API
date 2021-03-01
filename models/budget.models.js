module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
        name: {
            type: Sequelize.STRING
        },
        budgetId: {
            type: Sequelize.STRING
        },
        expense: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
        },
        income: {
            type: Sequelize.ARRAY(Sequelize.INTEGER)
        },
        description: {
            type: Sequelize.STRING
        },
        userToken: {
            type: Sequelize.STRING
        }
    });
    return Budget;
};