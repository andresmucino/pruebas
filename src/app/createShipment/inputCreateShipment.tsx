import { Button } from "@/components";
import {
  EuiButtonIcon,
  EuiDescriptionList,
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPanel,
  EuiSpacer,
  EuiSuperSelect,
  EuiText,
} from "@elastic/eui";
import { useState } from "react";

export interface PackageDataProps {
  street: string;
  neigthboorhood: string;
  municipality: string;
  state: string;
  zipCode: string;
  externalNumber: string;
  internalNumber: string;
  latitude: string;
  longitude: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  weigth: number;
  width: number;
  heigth: number;
  length: number;
}

export interface ValidateInputPackageDataProps {
  street: boolean;
  neigthboorhood: boolean;
  municipality: boolean;
  state: boolean;
  zipCode: boolean;
  externalNumber: boolean;
  firstName: boolean;
  lastName: boolean;
  phone: boolean;
  email: boolean;
}

export interface ValidateGeneralFormProps {
  instructions: boolean;
  idClient: boolean;
  warehouseShipmentId: boolean;
}

export interface DeliveryData {
  instructions: string;
  idClient: string;
  warehouseShipmentId: string;
}

interface InputCreateShipmentProps {
  packageData: PackageDataProps;
  setPackageData: React.Dispatch<React.SetStateAction<PackageDataProps>>;
  validateInput: ValidateInputPackageDataProps;
  setValidateInput: React.Dispatch<
    React.SetStateAction<ValidateInputPackageDataProps>
  >;
}

interface StatePackagesProps {
  onClick: () => void;
  storageData: Array<PackageDataProps>;
  isDisabled: boolean;
}

interface InputGeneralFormProps {
  deliveryData: DeliveryData;
  setDeliveryData: React.Dispatch<React.SetStateAction<DeliveryData>>;
  validateGeneralForm: ValidateGeneralFormProps;
  setValidateGeneralForm: React.Dispatch<
    React.SetStateAction<ValidateGeneralFormProps>
  >;
}

export const InputCreateShipment: React.FC<InputCreateShipmentProps> = ({
  packageData,
  setPackageData,
  setValidateInput,
  validateInput,
}) => {
  const [valueselect, setValueselect] = useState("");

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setPackageData({ ...packageData, [name]: value });
  };

  const options = [
    {
      value: "envelope",
      inputDisplay: "Sobre",
      dropdownDisplay: (
        <>
          <strong>Sobre</strong>
          <EuiText size="s" color="subdued">
            <p>Envia sobres, llaves, libros</p>
          </EuiText>
        </>
      ),
    },
    {
      value: "box_small",
      inputDisplay: "Caja chica",
      dropdownDisplay: (
        <>
          <strong>Caja chica</strong>
          <EuiText size="s" color="subdued">
            <p>
              Caracteristicas del paquete: Largo: 40, Ancho: 30, Alto: 25 y
              hasta 1kg
            </p>
          </EuiText>
        </>
      ),
    },
    {
      value: "box_medium",
      inputDisplay: "Caja mediana",
      dropdownDisplay: (
        <>
          <strong>Caja mediana</strong>
          <EuiText size="s" color="subdued">
            <p>
              Caracteristicas del paquete: Largo: 30, Ancho: 40, Alto: 30 y
              hasta 15kg
            </p>
          </EuiText>
        </>
      ),
    },
    {
      value: "box_big",
      inputDisplay: "Caja grande",
      dropdownDisplay: (
        <>
          <strong>Caja grande</strong>
          <EuiText size="s" color="subdued">
            <p>
              Caracteristicas del paquete: Largo: 40, Ancho: 50, Alto: 40 y
              hasta 25kg
            </p>
          </EuiText>
        </>
      ),
    },
  ];

  const onChangeSelect = (value: string) => {
    setValueselect(value);

    let dimensions = {
      weigth: 0,
      width: 0,
      heigth: 0,
      length: 0,
    };

    switch (value) {
      case "box_small":
        dimensions = { heigth: 25, length: 40, width: 30, weigth: 1 };

        break;

      case "box_medium":
        dimensions = { heigth: 30, length: 30, width: 40, weigth: 15 };

        break;

      case "box_big":
        dimensions = { heigth: 40, length: 40, width: 50, weigth: 25 };

        break;

      default:
        dimensions = { heigth: 1, length: 1, width: 1, weigth: 1 };
        break;
    }
    setPackageData({ ...packageData, ...dimensions });
  };

  const onBlurValidator = (e: any) => {
    const { name, value } = e.target;

    if (name === "street") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          street: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          street: false,
        });
      }
    }
    if (name === "externalNumber") {
      if (value.length === 0 || value.length > 5) {
        setValidateInput({
          ...validateInput,
          externalNumber: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          externalNumber: false,
        });
      }
    }
    if (name === "neigthboorhood") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          neigthboorhood: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          neigthboorhood: false,
        });
      }
    }
    if (name === "municipality") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          municipality: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          municipality: false,
        });
      }
    }
    if (name === "state") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          state: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          state: false,
        });
      }
    }
    if (name === "zipCode") {
      if (value.length === 0 || value.length > 6 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          zipCode: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          zipCode: false,
        });
      }
    }
    if (name === "firstName") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          firstName: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          firstName: false,
        });
      }
    }
    if (name === "lastName") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          lastName: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          lastName: false,
        });
      }
    }
    if (name === "phone") {
      if (value.length === 0 || value.length > 10 || value.length < 9) {
        setValidateInput({
          ...validateInput,
          phone: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          phone: false,
        });
      }
    }
    if (name === "email") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateInput({
          ...validateInput,
          email: true,
        });
      } else {
        setValidateInput({
          ...validateInput,
          email: false,
        });
      }
    }
  };

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel>
          <strong>Direccion</strong>
          <EuiHorizontalRule />
          <EuiFormRow
            id="4"
            error={["campo requerido"]}
            isInvalid={validateInput.street}
          >
            <EuiFieldText
              name="street"
              onChange={onChange}
              onBlur={onBlurValidator}
              placeholder="Calle"
              value={packageData.street}
            />
          </EuiFormRow>
          <EuiFormRow id="1-1">
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFormRow
                  id="10"
                  error={["Campo requerido"]}
                  isInvalid={validateInput.externalNumber}
                >
                  <EuiFieldText
                    name="externalNumber"
                    onChange={onChange}
                    onBlur={onBlurValidator}
                    placeholder="Numero exterior"
                    value={packageData.externalNumber}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow id="11">
                  <EuiFieldText
                    name="internalNumber"
                    onChange={onChange}
                    placeholder="Numero interior"
                    value={packageData.internalNumber}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFormRow>
          <EuiFormRow
            id="5"
            error={["Campo requerido"]}
            isInvalid={validateInput.neigthboorhood}
          >
            <EuiFieldText
              name="neigthboorhood"
              onChange={onChange}
              onBlur={onBlurValidator}
              placeholder="Colonia"
              value={packageData.neigthboorhood}
            />
          </EuiFormRow>
          <EuiFormRow
            id="6"
            error={["Campo requerido"]}
            isInvalid={validateInput.municipality}
          >
            <EuiFieldText
              name="municipality"
              onChange={onChange}
              onBlur={onBlurValidator}
              placeholder="Delegación o municipio"
              value={packageData.municipality}
            />
          </EuiFormRow>
          <EuiFormRow
            id="7"
            error={["Campo requerido"]}
            isInvalid={validateInput.state}
          >
            <EuiFieldText
              name="state"
              onChange={onChange}
              onBlur={onBlurValidator}
              placeholder="Ciudad"
              value={packageData.state}
            />
          </EuiFormRow>
          <EuiFormRow
            id="8"
            error={["Campo requerido"]}
            isInvalid={validateInput.zipCode}
          >
            <EuiFieldText
              name="zipCode"
              onChange={onChange}
              onBlur={onBlurValidator}
              placeholder="Codigo postal"
              value={packageData.zipCode}
            />
          </EuiFormRow>
          <EuiFormRow id="1-2">
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFormRow id="12">
                  <EuiFieldText
                    name="latitude"
                    onChange={onChange}
                    onBlur={onBlurValidator}
                    placeholder="Latitud"
                    value={packageData.latitude}
                  />
                </EuiFormRow>
              </EuiFlexItem>
              <EuiFlexItem>
                <EuiFormRow id="13">
                  <EuiFieldText
                    name="longitude"
                    onChange={onChange}
                    onBlur={onBlurValidator}
                    placeholder="Longitud"
                    value={packageData.longitude}
                  />
                </EuiFormRow>
              </EuiFlexItem>
            </EuiFlexGroup>
          </EuiFormRow>
        </EuiPanel>
      </EuiFlexItem>
      <EuiFlexItem>
        <EuiFlexGroup direction="column">
          <EuiPanel>
            <EuiFlexItem>
              <strong>Contacto</strong>
              <EuiHorizontalRule />
              <EuiFormRow
                error={["Campo requerido"]}
                isInvalid={validateInput.firstName}
              >
                <EuiFieldText
                  name="firstName"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  placeholder="Nombre"
                  value={packageData.firstName}
                />
              </EuiFormRow>
              <EuiFormRow
                error={["Campo requerido"]}
                isInvalid={validateInput.lastName}
              >
                <EuiFieldText
                  name="lastName"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  placeholder="Apellido"
                  value={packageData.lastName}
                />
              </EuiFormRow>
              <EuiFormRow
                error={["Campo requerido"]}
                isInvalid={validateInput.phone}
              >
                <EuiFieldText
                  name="phone"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  placeholder="Telefono"
                  value={packageData.phone}
                />
              </EuiFormRow>
              <EuiFormRow
                error={["Campo requerido"]}
                isInvalid={validateInput.email}
              >
                <EuiFieldText
                  name="email"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  placeholder="Correo"
                  value={packageData.email}
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem style={{ paddingTop: "1rem" }}>
              <EuiSpacer />
              <strong>Paquete</strong>
              <EuiHorizontalRule />
              <EuiSuperSelect
                id="0"
                options={options}
                valueOfSelected={valueselect}
                placeholder="Selecciona el tipo de paquete"
                name="packageType"
                onChange={(value) => {
                  onChangeSelect(value);
                }}
                itemLayoutAlign="top"
                hasDividers
              />
            </EuiFlexItem>
          </EuiPanel>
        </EuiFlexGroup>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};

export const InputGeneralForm: React.FC<InputGeneralFormProps> = ({
  deliveryData,
  setDeliveryData,
  validateGeneralForm,
  setValidateGeneralForm,
}) => {
  const onChange = (e: any) => {
    const { name, value } = e.target;

    setDeliveryData({ ...deliveryData, [name]: value });
  };

  const onBlurValidator = (e: any) => {
    const { name, value } = e.target;
    if (name === "instructions") {
      if (value.length === 0 || value.length > 60 || value.length < 3) {
        setValidateGeneralForm({
          ...validateGeneralForm,
          instructions: true,
        });
      } else {
        setValidateGeneralForm({
          ...validateGeneralForm,
          instructions: false,
        });
      }
    }
    if (name === "idClient") {
      if (value.length === 0 || value.length > 5) {
        setValidateGeneralForm({
          ...validateGeneralForm,
          idClient: true,
        });
      } else {
        setValidateGeneralForm({
          ...validateGeneralForm,
          idClient: false,
        });
      }
    }

    if (name === "warehouseShipmentId") {
      if (value.length === 0 || value.length > 5) {
        setValidateGeneralForm({
          ...validateGeneralForm,
          warehouseShipmentId: true,
        });
      } else {
        setValidateGeneralForm({
          ...validateGeneralForm,
          warehouseShipmentId: false,
        });
      }
    }
  };

  return (
    <EuiFlexItem>
      <EuiPanel>
        <strong>Datos Generales</strong>
        <EuiHorizontalRule />
        <EuiFormRow
          id="1"
          error={["Campo requerido"]}
          isInvalid={validateGeneralForm.instructions}
        >
          <EuiFieldText
            name="instructions"
            onChange={onChange}
            onBlur={onBlurValidator}
            placeholder="Instrucciones de recolección"
            value={deliveryData.instructions}
          />
        </EuiFormRow>
        <EuiFormRow
          id="3"
          error={["Campo requerido"]}
          isInvalid={validateGeneralForm.idClient}
        >
          <EuiFieldText
            name="idClient"
            onChange={onChange}
            onBlur={onBlurValidator}
            placeholder="Id del cliente"
            value={deliveryData.idClient}
          />
        </EuiFormRow>
        <EuiFormRow
          id="9"
          error={["Campo requerido"]}
          isInvalid={validateGeneralForm.warehouseShipmentId}
        >
          <EuiFieldText
            name="warehouseShipmentId"
            onChange={onChange}
            onBlur={onBlurValidator}
            placeholder="Almacen del cliente"
            value={deliveryData.warehouseShipmentId}
          />
        </EuiFormRow>
      </EuiPanel>
    </EuiFlexItem>
  );
};

export const StatePackages: React.FC<StatePackagesProps> = ({
  onClick,
  storageData,
  isDisabled,
}) => {
  return (
    <EuiPanel>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <strong> Paquetes agregados</strong>
        <Button type="button" onClick={onClick} isDisabled={isDisabled}>
          Agregar paquetes
        </Button>
      </div>
      <EuiHorizontalRule />
      <div
        style={{
          height: "450px",
          overflowY: "scroll",
          paddingRight: "10px",
          paddingLeft: "10px",
        }}
      >
        {storageData.length <= 1 ? (
          <h2
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            Sin paquetes
          </h2>
        ) : (
          <>
            {storageData.map((i: any, index: any) => {
              if (index === 0) {
                return <div key={index}></div>;
              }
              return (
                <div key={index}>
                  <EuiDescriptionList
                    listItems={[
                      {
                        title: "Direccion:",
                        description: `${i.street} ${i.externalNumber} 
                        ${i.internalNumber} ${i.municipality} ${i.neigthboorhood} 
                        ${i.zipCode} ${i.state}`,
                      },
                    ]}
                  />
                  <EuiDescriptionList
                    listItems={[
                      {
                        title: "Contacto:",
                        description: `${i.firstName} ${i.lastName} ${i.email} ${i.phone}`,
                      },
                    ]}
                  />
                  <div
                    style={{
                      paddingTop: "0.5rem",
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <EuiButtonIcon
                      display="base"
                      iconType="trash"
                      aria-label="Delete"
                      color="danger"
                    />
                  </div>
                  <EuiHorizontalRule margin="xs" />
                </div>
              );
            })}
          </>
        )}
      </div>
    </EuiPanel>
  );
};
