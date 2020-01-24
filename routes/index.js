const companyController = require("../controllers/company");
const employeeController = require("../controllers/employee");
const departmentController = require("../controllers/department");
const userController = require("../controllers/user");
var jwt = require("jsonwebtoken");

function AuthMW(req, res, next) {
  let token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({ error: "Access denied. No token provided." });
  }
  const decoded = jwt.verify(token, "secret-key");
  if (!decoded) {
    return res.status(401).send({ error: "unauthorized request" });
  } else {
    req.user = decoded;
    next();
  }
}

module.exports = app => {
  app.get("/api", (req, res) =>
    res.status(200).send({
      message: "welcome to todo API"
    })
  );

  app.get("/company", AuthMW, companyController.getCompanies);
  app.post("/company", AuthMW, companyController.create);
  app.put("/company/:id", AuthMW, companyController.update);
  app.delete("/company/:id", AuthMW, companyController.delete);
  app.get("/employee", AuthMW, employeeController.getEmployees);
  app.get("/employee/by", AuthMW, employeeController.getEmployeebyid);
  app.post("/employee", AuthMW, employeeController.create);
  app.put("/employee/:id", AuthMW, employeeController.update);
  app.delete("/emp/:id", AuthMW, employeeController.delete);
  app.get("/department", AuthMW, departmentController.getDepartments);
  app.post("/department", AuthMW, departmentController.create);
  app.put("/department/:id", AuthMW, departmentController.update);
  app.delete("/department/:id", AuthMW, departmentController.delete);
  app.post("/register", userController.register);
  app.post("/login", userController.getUserbyid);
  app.get("/user", AuthMW, userController.getUsers);
  app.get("/user/myprofile", AuthMW, (req, res) =>
    res.status(200).send({
      message: "Authentication works"
    })
  );
};
