const passwordValidator = require("password-validator");

const passwordSchema = new passwordValidator();
// Renforcement du choix de mot de passe à la création de compte :
passwordSchema
  .is()
  .min(8)
  .is()
  .max(100)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(2)
  .has()
  .not()
  .spaces()
  .is()
  .not()
  .oneOf(["Passw0rd", "Password123", "Azerty123"]);

module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return res.status(400).json({
      error:
        "Le mot de passe n'est pas assez fort : " +
        passwordSchema.validate("req.body.password", { list: true }),
    });
  }
};
