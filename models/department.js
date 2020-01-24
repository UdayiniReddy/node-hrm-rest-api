'use strict';
module.exports = (sequelize, DataTypes) => {
  const Department = sequelize.define('Department', {
    name: DataTypes.STRING,
    location: DataTypes.STRING
  }, {});
  Department.associate = function(models) {
    // associations can be defined here
    Department.hasMany(models.Employee, {
      foreignKey: 'departmentId',
      as: 'employees'
    })
  };
  return Department;
};