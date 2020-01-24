const Employee = require("../models").Employee;
module.exports = {
  getEmployees(req, res) {
    return Employee.findAll().then(employee => {
      res.send(employee);
      console.log("All employees:", JSON.stringify(employee));
    });
  },

  getEmployeebyid(req, res) {
    const companyname = req.body.companyname;
    const departmentname = req.body.departmentname
    return Employee.findAll({
      where: {
        companyname: companyname,
        departmentname: departmentname
      }
    }).then(employee => {
      res.send(employee);
      console.log("All employees:", JSON.stringify(employee));
    });
  },
  
  create(req, res) {
      const name = req.body.name;
      const designation = req.body.designation;
      const salary = req.body.salary;
      console.log(name)
    return Employee.create({
        name: name,
        designation: designation,
        salary: salary
    })
      
        .then(employee => {
            // console.log(req.body.name)
        res.status(201).send(employee);
      })
      .catch(error => {
        res.status(400).send(error);
      });
    },
    update(req, res) {
        const name = req.body.name;
        const id = req.params.id;
        const designation = req.body.designation;
        const salary = req.body.salary;
        return Employee.update(
          {
                name: name,
                designation: designation,
                salary: salary
          },
          {
            where: {
              id: id
            }
          }
        )
          .then(() => {
            console.log("Done");
            res.json({ name: name, id: id });
          })
          .catch(err => {
            console.log(err);
          });
    },
    delete(req, res) {
        const id = req.params.id;
        return Employee.destroy({
          where: {
            id: id
          }
        }).then(() => {
          console.log("Done");
          res.json({ id: id, message: "Deleted company with id" + id });
        });
      }
};
