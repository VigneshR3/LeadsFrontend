import * as Yup from "yup";

export const FormShema = Yup.object({
  leadid: Yup.string().required("LeadIn is required"),
  customer: Yup.string().required("Customer is required"),
  company: Yup.string().required("Company is required"),
  email: Yup.string().required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  value: Yup.string().required("Value is required"),
  tags: Yup.string().required("Tags is required"),
  source: Yup.string().required("Source is required"),
  assigned: Yup.string().required("Assigned is required"),
  status: Yup.string().required("Status is required"),
});
