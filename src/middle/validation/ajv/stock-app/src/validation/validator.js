import Ajv from 'ajv';
import { stockRequestSchema, stockResponseSchema } from './schemas';

const ajv = new Ajv();

export const validateRequest = ajv.compile(stockRequestSchema);
export const validateResponse = ajv.compile(stockResponseSchema);

export function getValidationErrors(errors) {
  return errors?.map(error => {
    let message = error.message;
    if (error.keyword === 'pattern') {
      message = 'Symbol should contain only uppercase letters';
    }
    return {
      field: error.instancePath.slice(1) || error.params?.missingProperty,
      message
    };
  });
}