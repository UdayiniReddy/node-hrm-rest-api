const Department = require("../models").Department;
module.exports = {
    getDepartments(req, res) {
        return Department.findAll()
            .then(department => {
            res.send(department);
            console.log("All department:", JSON.stringify(department));
        })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    
    create(req, res) {
        return Department.create({
            name: req.body.name,
            location:req.body.location
        })
          .then(department => {
            res.status(201).send(department);
          })
          .catch(error => {
            res.status(400).send(error);
          });
    },
    update(req, res) {
        const name = req.body.name;
        const location = req.body.location;
        const id = req.params.id;
    
        return Department.update(
          {
                name: name,
              location:location
          },
          {
            where: {
              id: id
            }
          }
        )
          .then(() => {
            console.log("Done");
            res.json({ name: name, id: id ,location:location});
          })
          .catch(err => {
            console.log(err);
          });
    },
    delete(req, res) {
        const id = req.params.id;
        return Department.destroy({
          where: {
            id: id
          }
        }).then(() => {
          console.log("Done");
          res.json({ id: id, message: "Deleted company with id" + id });
        });
      }
}