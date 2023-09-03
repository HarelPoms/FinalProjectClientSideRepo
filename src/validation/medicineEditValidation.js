import Joi from "joi";
import validation from "./validation";
import generateMessages from "./utils/msgGenerationUtil";
import validateFieldFromSchema from "./utils/validateFieldFromSchemaUtil"

const editMedicineSchema = Joi.object({
  name: Joi.string().min(2).max(256).required().messages(generateMessages("Name", [2,256], 0,
  [1,1,1])),
  subTitle: Joi.string().min(2).max(256).required().messages(generateMessages("Subtitle", [2,256], 0,
  [1,1,1])),
  description: Joi.string().min(2).max(1024).required().messages(generateMessages("Description", [2,1024], 0,
  [1,1,1])),
  price: Joi.number().min(10).max(999).required().messages(generateMessages("Price", [2,3], 1,
  [1,1,1])),
  url: Joi.string().min(6).max(1024).allow("").messages(generateMessages("URL", [6,1024], 0,
  [1,1])),
  alt: Joi.string().min(6).max(256).allow("").messages(generateMessages("ALT", [6,256], 0,
  [1,1])),
  pharma_id: Joi.string().hex().length(24),
  prescription_required: Joi.boolean().required()
});

const editMedicineParamsSchema = Joi.object({
  id: Joi.string().hex().length(24).required(),
});

const validateMedicineEditSchema = (userInput) => validation(editMedicineSchema, userInput);

const validateEditMedicineParamsSchema = (userInput) =>
  validation(editMedicineParamsSchema, userInput);

const validateEditMedicineFieldFromSchema = (userInput, userFieldId) => {
  return (validateFieldFromSchema(editMedicineSchema, userInput, userFieldId));
}

export { validateEditMedicineParamsSchema, validateEditMedicineFieldFromSchema };

export default validateMedicineEditSchema;
