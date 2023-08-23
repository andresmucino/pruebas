import { EuiFieldText, EuiFormRow } from "@elastic/eui";

export interface GeneralShipmentData {
  comments: string;
  clientId: string;
  warehouseShipmentId: string;
}

export interface ValidateGeneralShipmentData {
  comments: boolean;
  clientId: boolean;
  warehouseShipmentId: boolean;
}

export interface GeneralShipmentInputProps {
  generateShipmentData: GeneralShipmentData;
  setGenerateShipmentData: React.Dispatch<
    React.SetStateAction<GeneralShipmentData>
  >;
  validateGenerateShipmentData: ValidateGeneralShipmentData;
  setValidateGenerateShipmentData: React.Dispatch<
    React.SetStateAction<ValidateGeneralShipmentData>
  >;
}

export const GenerateShipmentInput: React.FC<GeneralShipmentInputProps> = ({
  generateShipmentData,
  setGenerateShipmentData,
  setValidateGenerateShipmentData,
  validateGenerateShipmentData,
}) => {
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setGenerateShipmentData({ ...generateShipmentData, [name]: value });
  };

  const onBlurValidator = (e: any) => {
    const { name, value } = e.target;

    if (name === "comments") {
      if (value.length === 0 || value.length > 35 || value.length < 5) {
        setValidateGenerateShipmentData({
          ...validateGenerateShipmentData,
          comments: true,
        });
      } else {
        setValidateGenerateShipmentData({
          ...validateGenerateShipmentData,
          comments: false,
        });
      }
    }
    if (name === "clientId") {
      if (value.length === 0 || value.length > 10) {
        setValidateGenerateShipmentData({
          ...validateGenerateShipmentData,
          clientId: true,
        });
      } else {
        setValidateGenerateShipmentData({
          ...validateGenerateShipmentData,
          clientId: false,
        });
      }
    }
    if (name === "warehouseShipmentId") {
      if (value.length === 0 || value.length > 10) {
        setValidateGenerateShipmentData({
          ...validateGenerateShipmentData,
          warehouseShipmentId: true,
        });
      } else {
        setValidateGenerateShipmentData({
          ...validateGenerateShipmentData,
          warehouseShipmentId: false,
        });
      }
    }
  };

  return (
    <>
      <EuiFormRow
        id="1"
        error={["Ingresa tus comentarios"]}
        isInvalid={validateGenerateShipmentData.comments}
      >
        <EuiFieldText
          placeholder="Agregar comentarios"
          name="comments"
          onChange={handleChange}
          onBlur={onBlurValidator}
          value={generateShipmentData.comments}
        />
      </EuiFormRow>
      <EuiFormRow
        id="2"
        error={["Ingresa el ID de cliente"]}
        isInvalid={validateGenerateShipmentData.clientId}
      >
        <EuiFieldText
          placeholder="Ingresa el ID Cliente"
          name="clientId"
          onChange={handleChange}
          onBlur={onBlurValidator}
          value={generateShipmentData.clientId}
        />
      </EuiFormRow>
      <EuiFormRow
        id="3"
        error={["Ingresa el almacén de recolección"]}
        isInvalid={validateGenerateShipmentData.warehouseShipmentId}
      >
        <EuiFieldText
          placeholder="Almacén de cliente"
          name="warehouseShipmentId"
          onChange={handleChange}
          onBlur={onBlurValidator}
          value={generateShipmentData.warehouseShipmentId}
        />
      </EuiFormRow>
    </>
  );
};
