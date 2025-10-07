import React from "react";
import FormField from "../FormField/FormField";

const CheckoutForm = ({ formData, errors, touched, onChange, onBlur }) => {
  const formFields = [
    {
      name: "nomeCompleto",
      placeholder: "Nome Completo",
      type: "text",
      colSpan: "md:col-span-2",
    },
    {
      name: "cpf",
      placeholder: "CPF",
      type: "text",
      maxLength: 14,
      maskType: "cpf",
    },
    {
      name: "celular",
      placeholder: "Celular",
      type: "text",
      maxLength: 15,
      maskType: "celular",
    },
    {
      name: "email",
      placeholder: "E-mail",
      type: "email",
      colSpan: "md:col-span-2",
    },
    {
      name: "cep",
      placeholder: "CEP",
      type: "text",
      maxLength: 9,
      maskType: "cep",
      inputClass: "max-w-[140px]",
    },
    { name: "endereco", placeholder: "Endereço", type: "text" },
    { name: "cidade", placeholder: "Cidade", type: "text" },
    { name: "estado", placeholder: "Estado", type: "text" },
  ];

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
      {formFields.map((field) => (
        <div key={field.name} className={`${field.colSpan ?? ""}`}>
          <FormField
            {...field}
            value={formData[field.name]}
            error={errors[field.name]}
            touched={touched[field.name]}
            onChange={onChange}
            onBlur={onBlur}
          />
        </div>
      ))}
    </form>
  );
};

export default CheckoutForm;
