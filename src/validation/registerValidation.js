import Joi from "joi";

import validation from "./validation";

import generateMessages from "./utils/msgGenerationUtil";
import validateFieldFromSchema from "./utils/validateFieldFromSchemaUtil";

const registerSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required().messages(generateMessages("First Name", [2,255], 0,
  [1,1,1])),
  middleName: Joi.string().min(2).max(255).required().allow("").messages(generateMessages("Middle Name", [2,255], 0,
  [1,1,1])),
  lastName: Joi.string().min(2).max(255).required().messages(generateMessages("Last Name", [2,255], 0,
  [1,1,1])),
  phone: Joi.string()
  .pattern(new RegExp(/^(?:0\d{1,2}-\d{7}|(?:\+|00)\d{1,3}\s?\d{4,14})$/)).min(9).max(14).required().messages({"string.pattern.base": "Phone must be of valid format e.g. 052-1234567", "string.empty": "Phone cannot be empty", "string.max": "Phone must be max 14 length", "string.min": "Phone must be minimum 9 length"}),
  email: Joi.string().min(5).max(255).required().email({ tlds: { allow: false } }).messages(generateMessages("Email", [5,255], 0, [1,1,1,0,1])),
  password: Joi.string()
  .pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
  .min(6)
  .max(1024)
  .required().messages(generateMessages("Password", [6,1024], 0,
  [1,1,1,1])),
  imageUrl: Joi.string().min(6).max(1024).allow("").messages(generateMessages("Image URL", [6,1024], 0,
  [1,1])),
  imageAlt: Joi.string().min(6).max(256).allow("").messages(generateMessages("Image ALT", [6,256], 0,
  [1,1])),
  state: Joi.string().min(2).max(255).allow("").messages(generateMessages("State", [2,255], 0,
  [1,1])),
  country: Joi.string().min(2).max(256).required().messages(generateMessages("Country", [2,256], 0,
  [1,1,1])),
  city: Joi.string().min(2).max(256).required().messages(generateMessages("City", [2,256], 0,
  [1,1,1])),
  street: Joi.string().min(2).max(256).required().messages(generateMessages("Street", [2,256], 0,
  [1,1,1])),
  houseNumber: Joi.string().min(1).max(256).required().messages(generateMessages("House Number", [1,256], 0,
  [1,1,1])),
  zipCode: Joi.number().min(1).max(99999999).allow("").messages(generateMessages("Zip Code", [1,99999999], 1,
  [1,1,1])),
  isDoctor: Joi.boolean(),
  HMO: Joi.string().required()
});

const validateRegisterSchema = (userInput) =>
  validation(registerSchema, userInput);

const validateRegisterFieldFromSchema = (userInput, userFieldId) => {
  return (validateFieldFromSchema(registerSchema, userInput, userFieldId));
}

export default validateRegisterSchema;

export {validateRegisterFieldFromSchema};
