const { ValidationError, Validator } = require("jsonschema");
const CustomError = require("../Utils/customError");

const xssPatterns = [
  /<.*?>/,
  /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/,
  /(on\w+\s*=\s*['"][^'"]*['"])/,
];

const noSQLPatterns = [
  /\$ne|\$eq|\$gte|\$lte|\$regex|\$where|\$inc|\$push/,
  /eval\(|db\.\w+\.find\(|db\.\w+\.update\(|new\s+Function\(|\bfunction\s*\(.*?\)\s*{/,
];

const urlWhiteList = [/^\/auth\/google$/, /^\/auth\/google\/callback.*$/];

const checkPatterns = (data, patterns) => {
  return patterns.some((pattern) => pattern.test(data));
};

const crossSiteScriptValidator = (data, key) => {
  try {
    const schema = {
      type: ["string", "number"],
      pattern: "^(?!.*[$()<>!`~]).*$",
    };

    const validator = new Validator();
    validator.validate(data, schema, { throwError: true });

    if (
      typeof data === "string" &&
      checkPatterns(data, xssPatterns) &&
      checkPatterns(data, noSQLPatterns)
    ) {
      throw new ValidationError();
    }
  } catch (error) {
    if (error instanceof ValidationError) {
      throw new CustomError(`XSS Validation failed for ${key}`, 400);
    }
    throw new CustomError(`Validation error for ${key}`, 500);
  }
};

const XSSValidateObj = (object) => {
  Object.entries(object).forEach((entries) => {
    const [key, value] = entries;
    if (typeof value === "string" || typeof value === "number") {
      crossSiteScriptValidator(value, key);
    } else if (typeof value === "object") {
      XSSValidateObj(value);
    }
  });
};

const XSSValidateMW = (req, res, next) => {
  try {
    if (urlWhiteList.some((pattern) => pattern.test(req.originalUrl))) {
      return next();
    }
    const { body = {}, params = {}, query = {}, headers = {} } = req;
    XSSValidateObj(body);
    XSSValidateObj(params);
    XSSValidateObj(query);
    XSSValidateObj(headers);
    next();
  } catch (err) {
    next(err);
  }
};
module.exports = XSSValidateMW;
