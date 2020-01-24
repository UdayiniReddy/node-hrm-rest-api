const Company = require("../models").Company;
module.exports = {
  getCompanies(req, res) {
    return Company.findAll()
      .then(companies => {
      res.send(companies);
      console.log("All companies:", JSON.stringify(companies));
      
    })
    .catch(error => {
      res.status(400).send(error);
    });
  },
  create(req, res) {
    return Company.create({
      name: req.body.name
    })
      .then(company => {
        res.status(201).send(company);
      })
      .catch(error => {
        res.status(400).send(error);
      });
  },
  update(req, res) {
    const name = req.body.name;
    const id = req.params.id;

    return Company.update(
      {
        name: name
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
    return Company.destroy({
      where: {
        id: id
      }
    }).then(() => {
      console.log("Done");
      res.json({ id: id, message: "Deleted company with id" + id });
    });
  }
};
