import { EuiFieldText, EuiFormRow } from "@elastic/eui";
import { GeneralFormProps } from "../generalForm";
import { useState } from "react";

export const GenerateShipmentInput: React.FC<GeneralFormProps> = ({
  errors,
  register,
  setValue,
}) => {
  const [formShipment, setFormShipment] = useState({
    comments: "",
    clientId: "",
    warehouseShipmentId: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormShipment({ ...formShipment, [name]: value });
    setValue(name, value);
  };

  return (
    <>
      <EuiFormRow
        id="1"
        error={errors.comments && "Ingresa tus comentarios"}
        isInvalid={formShipment.comments === ""}
      >
        <EuiFieldText
          placeholder="Agregar comentarios"
          name="comments"
          onChange={handleChange}
          inputRef={register("comments", {
            required: formShipment.comments === "",
          })}
        />
      </EuiFormRow>
      <EuiFormRow
        id="2"
        error={errors.clientId && "ingresa el id de cliente"}
        isInvalid={formShipment.clientId === ""}
      >
        <EuiFieldText
          placeholder="Ingresa el id Cliente"
          name="clientId"
          onChange={handleChange}
          inputRef={register("clientId", {
            required: formShipment.clientId === "",
          })}
        />
      </EuiFormRow>
      <EuiFormRow
        id="3"
        error={
          errors.warehouseShipmentId && "Ingresa el almacen de recolección"
        }
        isInvalid={formShipment.warehouseShipmentId === ""}
      >
        <EuiFieldText
          placeholder="Almacen de cliente"
          name="warehouseShipmentId"
          onChange={handleChange}
          inputRef={register("warehouseShipmentId", {
            required: formShipment.warehouseShipmentId === "",
          })}
        />
      </EuiFormRow>
    </>
  );
};
