import Joi from "joi";
import validation from "./validation";
import generateMessages from "./utils/msgGenerationUtil";
import validateFieldFromSchema from "./utils/validateFieldFromSchemaUtil"

const editPrescriptionSchema = Joi.object({
    url: Joi.string().min(6).max(1024).allow("").messages(generateMessages("URL", [6,1024], 0,
    [1,1])),
    alt: Joi.string().min(6).max(256).allow("").messages(generateMessages("ALT", [6,256], 0,
    [1,1]))
});

const editPrescriptionParamsSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
});

const validatePrescriptionEditSchema = (userInput) => validation(editPrescriptionSchema, userInput);

const validateEditPrescriptionParamsSchema = (userInput) =>
    validation(editPrescriptionParamsSchema, userInput);

const validateEditPrescriptionFieldFromSchema = (userInput, userFieldId) => {
    return (validateFieldFromSchema(editPrescriptionSchema, userInput, userFieldId));
}

export { validateEditPrescriptionParamsSchema, validateEditPrescriptionFieldFromSchema };

export default validatePrescriptionEditSchema;
