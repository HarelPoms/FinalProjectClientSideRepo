import Joi from "joi";
import validation from "./validation";
import generateMessages from "./utils/msgGenerationUtil";
import validateFieldFromSchema from "./utils/validateFieldFromSchemaUtil"

let prescriptionSubItemJoiSchema = Joi.object().keys({
    medicineId: Joi.number().min(1000000).max(9999999).allow(""),
    medicineName: Joi.string().required(),
    medicineUnits: Joi.number().integer().min(1).max(5).required(),
    isActive: Joi.boolean().required(),
    _id: Joi.string().hex().length(24)
})

const editPrescriptionSchema = Joi.object({
    url: Joi.string().min(6).max(1024).allow("").messages(generateMessages("URL", [6,1024], 0,
    [1,1])),
    alt: Joi.string().min(6).max(256).allow("").messages(generateMessages("ALT", [6,256], 0,
    [1,1])),
    medicineList: Joi.array().items(prescriptionSubItemJoiSchema),
    patientId: Joi.string().hex().length(24).required(),
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
