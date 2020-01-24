"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    */
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.addColumn(
          "employees",
          "departmentId",
          {
            type: Sequelize.DataTypes.INTEGER,
            onDelete: "CASCADE",
            references: {
              model: "Departments",
              key: "id",
              as: "departmentId"
            }
          },
          { transaction: t }
        )
      ]);
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction(t => {
      return Promise.all([
        queryInterface.removeColumn("employees", "departmentId", { transaction: t })
      ]);
    });
  }
};
