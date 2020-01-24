'use strict';
module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    designation: {
      type: DataTypes.STRING
    },
    salary: DataTypes.INTEGER
  }, {});
  Employee.associate = function(models) {
    // associations can be defined here
    Employee.belongsTo(models.Company, {
      foreignKey: 'companyId',
      onDelete: 'CASCADE',
    }),
      Employee.belongsTo(models.Company, {
      foreignKey: 'departmentId',
      onDelete: 'CASCADE',
    })
  };
  return Employee;
};