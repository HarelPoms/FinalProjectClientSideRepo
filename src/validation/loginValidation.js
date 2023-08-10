import Joi from "joi";

import validation from "./validation";
import generateMessages from "./msgGenerationUtil";
import validateFieldFromSchema from "./validateFieldFromSchemaUtil"

const loginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required().messages({"string.email": "Email must be valid", "string.empty": "Email cannot be empty"}),
  password: Joi.string().pattern(new RegExp("^(?=.*[A-Z])(?=.*[a-z]).{0,}$"))
  .min(2).max(10).required().messages(generateMessages("Password", [6,1024], 0,
  [1,1,1,1]))
});

const validateLoginSchema = (userInput) => validation(loginSchema, userInput);

const validateLoginFieldFromSchema = (userInput, userFieldId) => {
  return (validateFieldFromSchema(loginSchema, userInput, userFieldId));
}

export default validateLoginSchema;

export {validateLoginFieldFromSchema};
