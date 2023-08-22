import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
} from "@elastic/eui";
import { useState } from "react";

export interface GeneralFormProps {
  register: any;
  setValue: (name: string, value: string) => void;
  errors: any;
}

function validateEmail(inputText: string) {
  var mailformat =
    /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  if (mailformat.test(inputText)) {
    return true;
  }
  return false;
}

function validatePhone(inputText: string) {
  var mailformat = /[0-9]{10}/;
  if (
    mailformat.test(inputText.split(" ").join("")) &&
    inputText.split(" ").join("").length === 10
  ) {
    return true;
  }
  return false;
}

export const GeneralForm: React.FC<GeneralFormProps> = ({
  errors,
  register,
  setValue,
}) => {
  const [inputValue, setInputValue] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setInputValue({ ...inputValue, [name]: value });
    setValue(name, value);
  };

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFormRow
          id="1"
          error={errors.firstName && "Ingresa nombre"}
          isInvalid={inputValue.firstName === ""}
        >
          <EuiFieldText
            name="firstName"
            placeholder="Nombre"
            onChange={handleChange}
            inputRef={register("firstName", {
              required: inputValue.firstName === "",
            })}
          />
        </EuiFormRow>
        <EuiFormRow
          id="2"
          error={errors.lastName && "Ingresa Apellido"}
          isInvalid={inputValue.lastName === ""}
        >
          <EuiFieldText
            name="lastName"
            placeholder="Apellido"
            onChange={handleChange}
            inputRef={register("lastName", {
              required: inputValue.lastName === "",
            })}
          />
        </EuiFormRow>
        <EuiFormRow
          id="3"
          error={errors.phone && "Ingresa nuemero tefefonico a 10 digitos"}
          isInvalid={inputValue.phone === ""}
        >
          <EuiFieldText
            name="phone"
            placeholder="Numero"
            onChange={handleChange}
            inputRef={register("phone", {
              required: inputValue.phone && "Número requerido",
            })}
          />
        </EuiFormRow>
        <EuiFormRow
          id="4"
          error={errors.email && "Ingresa un correo valido"}
          isInvalid={inputValue.email === ""}
        >
          <EuiFieldText
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            inputRef={register("email", { required: inputValue.email === "" })}
          />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
