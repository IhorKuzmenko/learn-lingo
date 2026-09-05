import * as yup from 'yup';

export const bookingSchema = yup.object({
  reason: yup
    .string()
    .required('Please select a reason.'),

  name: yup
    .string()
    .min(2, 'Name must be at least 2 characters.')
    .required('Name is required.'),

  email: yup
    .string()
    .email('Enter a valid email.')
    .required('Email is required.'),

  phone: yup
    .string()
    .min(7, 'Enter a valid phone number.')
    .required('Phone number is required.'),
});

export type BookingFormValues = yup.InferType<
  typeof bookingSchema
>;