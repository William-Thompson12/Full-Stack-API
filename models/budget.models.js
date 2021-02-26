module.exports = (sequelize, Sequelize) => {
    const Budget = sequelize.define("budget", {
        name: {
            type: Sequelize.STRING
        },
        expense: {
            type: Sequelize.ARRAY
        },
        income: {
            type: Sequelize.ARRAY
        },
        description: {
            type: Sequelize.STRING
        }
    });
    return Budget;
};