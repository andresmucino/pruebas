import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
} from "@elastic/eui";

export interface GeneralFormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
}

export interface ValidateGeneralFormData {
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  email: boolean;
}

export interface GeneralFormProps {
  generalFormData: GeneralFormData;
  setGeneralFormData: React.Dispatch<React.SetStateAction<GeneralFormData>>;
  validateGeneralFormData: ValidateGeneralFormData;
  setValidateGeneralFormData: React.Dispatch<
    React.SetStateAction<ValidateGeneralFormData>
  >;
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
  generalFormData,
  setGeneralFormData,
  setValidateGeneralFormData,
  validateGeneralFormData,
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;

    setGeneralFormData({ ...generalFormData, [name]: value });
  };

  const onBlurValidator = (e: any) => {
    const { name, value } = e.target;

    if (name === "firstName") {
      if (value.length === 0 || value.length > 25 || value.length < 3) {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          firstName: true,
        });
      } else {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          firstName: false,
        });
      }
    }
    if (name === "lastName") {
      if (value.length === 0 || value.length > 25 || value.length < 3) {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          lastName: true,
        });
      } else {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          lastName: false,
        });
      }
    }
    if (name === "phone") {
      if (
        (value.length === 0 || value.length > 10 || value.length < 10) &&
        !validatePhone(value)
      ) {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          phone: true,
        });
      } else {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          phone: false,
        });
      }
    }
    if (name === "email") {
      if (
        (value.length === 0 || value.length > 30 || value.length < 5) &&
        !validateEmail(value)
      ) {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          email: true,
        });
      } else {
        setValidateGeneralFormData({
          ...validateGeneralFormData,
          email: false,
        });
      }
    }
  };

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiFormRow
          id="1"
          error={["Ingresa nombre"]}
          isInvalid={validateGeneralFormData.firstName}
        >
          <EuiFieldText
            name="firstName"
            placeholder="Nombre"
            onChange={handleChange}
            onBlur={onBlurValidator}
            value={generalFormData.firstName}
          />
        </EuiFormRow>
        <EuiFormRow
          id="2"
          error={["Ingresa Apellido"]}
          isInvalid={validateGeneralFormData.lastName}
        >
          <EuiFieldText
            name="lastName"
            placeholder="Apellido"
            onChange={handleChange}
            onBlur={onBlurValidator}
            value={generalFormData.lastName}
          />
        </EuiFormRow>
        <EuiFormRow
          id="3"
          error={["Ingresa número tefefónico a 10 digitos"]}
          isInvalid={validateGeneralFormData.phone}
        >
          <EuiFieldText
            name="phone"
            placeholder="Número telefónico"
            onChange={handleChange}
            onBlur={onBlurValidator}
            value={generalFormData.phone}
          />
        </EuiFormRow>
        <EuiFormRow
          id="4"
          error={["Ingresa un correo válido"]}
          isInvalid={validateGeneralFormData.email}
        >
          <EuiFieldText
            name="email"
            placeholder="Correo"
            onChange={handleChange}
            onBlur={onBlurValidator}
            value={generalFormData.email}
            type="email"
          />
        </EuiFormRow>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
