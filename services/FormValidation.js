import React from 'react';
import * as yup from 'yup';

// Esquema de validación de formulario en yup
export const patientSchema = yup.object().shape({
  name: yup.string().required('Please, enter a name'),
  email: yup.string().email().optional(),
  phone: yup
    .number()
    .required('A phone number is required')
    .typeError('Please, enter a number'),
  appointment: yup.date().nullable().default('').optional(),
  reason: yup.string().required('Please, enter an appointment reason'),
  record: yup.string().optional(),
});
