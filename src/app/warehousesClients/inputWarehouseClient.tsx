import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiSpacer,
} from "@elastic/eui";

export interface WarehouseShipment {
  instructions: string;
  clientId: string;
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
}

export interface ValidateWarehouseDataProps {
  instructions: boolean;
  clientId: boolean;
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

interface InputWarehouseClientProps {
  warehouseData: WarehouseShipment;
  setWarehouseData: React.Dispatch<React.SetStateAction<WarehouseShipment>>;
  validateDataWarehouse: ValidateWarehouseDataProps;
  setValidateDataWarehouse: React.Dispatch<
    React.SetStateAction<ValidateWarehouseDataProps>
  >;
}

export const InputWarehouseClient: React.FC<InputWarehouseClientProps> = ({
  setWarehouseData,
  warehouseData,
  setValidateDataWarehouse,
  validateDataWarehouse,
}) => {
  const onChange = (e: any) => {
    const { name, value } = e.target;

    setWarehouseData({ ...warehouseData, [name]: value });
  };

  const onBlurValidator = (e: any) => {
    const { name, value } = e.target;

    if (name === "street") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          street: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          street: false,
        });
      }
    }
    if (name === "neigthboorhood") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          neigthboorhood: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          neigthboorhood: false,
        });
      }
    }
    if (name === "municipality") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          municipality: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          municipality: false,
        });
      }
    }
    if (name === "state") {
      if (value.length === 0 || value.length > 10 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          state: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          state: false,
        });
      }
    }
    if (name === "zipCode") {
      if (value.length === 0 || value.length > 6 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          zipCode: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          zipCode: false,
        });
      }
    }
    if (name === "externalNumber") {
      if (value.length === 0 || value.length > 5) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          externalNumber: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          externalNumber: false,
        });
      }
    }
    if (name === "firstName") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          firstName: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          firstName: false,
        });
      }
    }
    if (name === "lastName") {
      if (value.length === 0 || value.length > 30 || value.length < 3) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          lastName: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          lastName: false,
        });
      }
    }
    if (name === "phone") {
      if (value.length === 0 || value.length > 10 || value.length < 9) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          phone: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          phone: false,
        });
      }
    }
    if (name === "email") {
      if (value.length === 0 || value.length > 30 || value.length < 5) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          email: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          email: false,
        });
      }
    }
    if (name === "instructions") {
      if (value.length === 0 || value.length > 40 || value.length < 5) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          instructions: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          instructions: false,
        });
      }
    }
    if (name === "clientId") {
      if (value.length === 0 || value.length > 10) {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          clientId: true,
        });
      } else {
        setValidateDataWarehouse({
          ...validateDataWarehouse,
          clientId: false,
        });
      }
    }
  };

  return (
    <>
      <strong>Datos generales</strong>
      <EuiHorizontalRule margin="s" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow
            id="1"
            error={["campo requerido"]}
            isInvalid={validateDataWarehouse.instructions}
          >
            <EuiFieldText
              name="instructions"
              onChange={onChange}
              onBlur={onBlurValidator}
              value={warehouseData.instructions}
              placeholder="Instrucciones"
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow
            id="2"
            error={["Campo requerido"]}
            isInvalid={validateDataWarehouse.clientId}
          >
            <EuiFieldText
              name="clientId"
              onChange={onChange}
              onBlur={onBlurValidator}
              value={warehouseData.clientId}
              placeholder="Id cliente"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFlexGroup>
            <EuiFlexItem>
              <strong>Dirección almacén</strong>
              <EuiHorizontalRule margin="s" />
              <EuiFormRow
                id="3"
                error={["Campo requerido"]}
                isInvalid={validateDataWarehouse.street}
              >
                <EuiFieldText
                  name="street"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  placeholder="Calle"
                  value={warehouseData.street}
                />
              </EuiFormRow>
              <EuiFormRow
                id="4"
                error={["Campo requerido"]}
                isInvalid={validateDataWarehouse.neigthboorhood}
              >
                <EuiFieldText
                  name="neigthboorhood"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.neigthboorhood}
                  placeholder="Colonia"
                />
              </EuiFormRow>
              <EuiFormRow
                id="5"
                error={["Campo requerido"]}
                isInvalid={validateDataWarehouse.municipality}
              >
                <EuiFieldText
                  name="municipality"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.municipality}
                  placeholder="Delegación o municipio"
                />
              </EuiFormRow>
              <EuiFormRow
                id="6"
                error={["Campo requerido"]}
                isInvalid={validateDataWarehouse.state}
              >
                <EuiFieldText
                  name="state"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.state}
                  placeholder="Ciudad"
                />
              </EuiFormRow>
              <EuiFormRow
                id="7"
                error={["Campo requerido"]}
                isInvalid={validateDataWarehouse.zipCode}
              >
                <EuiFieldText
                  name="zipCode"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.zipCode}
                  placeholder="Código postal"
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiHorizontalRule margin="l" style={{ marginTop: "28px" }} />
              <EuiFormRow
                id="8"
                error={["Campo requerido"]}
                isInvalid={validateDataWarehouse.externalNumber}
              >
                <EuiFieldText
                  name="externalNumber"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.externalNumber}
                  placeholder="Número exterior"
                />
              </EuiFormRow>
              <EuiFormRow id="9">
                <EuiFieldText
                  name="internalNumber"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.internalNumber}
                  placeholder="Número interior"
                />
              </EuiFormRow>
              <EuiFormRow id="10">
                <EuiFieldText
                  name="latitude"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.latitude}
                  placeholder="Latitud"
                />
              </EuiFormRow>
              <EuiFormRow id="11">
                <EuiFieldText
                  name="longitude"
                  onChange={onChange}
                  onBlur={onBlurValidator}
                  value={warehouseData.longitude}
                  placeholder="Longitud"
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <strong>Contacto almacén</strong>
          <EuiHorizontalRule margin="s" />
          <EuiFormRow
            id="12"
            error={["Campo requerido"]}
            isInvalid={validateDataWarehouse.firstName}
          >
            <EuiFieldText
              name="firstName"
              onChange={onChange}
              onBlur={onBlurValidator}
              value={warehouseData.firstName}
              placeholder="Nombre"
            />
          </EuiFormRow>
          <EuiFormRow
            id="13"
            error={["Campo requerido"]}
            isInvalid={validateDataWarehouse.lastName}
          >
            <EuiFieldText
              name="lastName"
              onChange={onChange}
              onBlur={onBlurValidator}
              value={warehouseData.lastName}
              placeholder="Apellido"
            />
          </EuiFormRow>
          <EuiFormRow
            id="14"
            error={["Campo requerido"]}
            isInvalid={validateDataWarehouse.phone}
          >
            <EuiFieldText
              name="phone"
              onChange={onChange}
              onBlur={onBlurValidator}
              value={warehouseData.phone}
              placeholder="Teléfono"
            />
          </EuiFormRow>
          <EuiFormRow
            id="15"
            error={["Campo requerido"]}
            isInvalid={validateDataWarehouse.email}
          >
            <EuiFieldText
              name="email"
              onChange={onChange}
              onBlur={onBlurValidator}
              value={warehouseData.email}
              placeholder="Correo"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
