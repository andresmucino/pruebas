import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiSpacer,
} from "@elastic/eui";
import { useState } from "react";

interface InputWarehouseClientProps {
  register: any;
  setValue: (name: string, value: string) => void;
  errors: any;
}

export const InputWarehouseClient: React.FC<InputWarehouseClientProps> = ({
  errors,
  register,
  setValue,
}) => {
  const [inputWarehouse, setInputWarehouse] = useState({
    instructions: "",
    clientId: 0,
    street: "",
    neigthboorhood: "",
    municipality: "",
    state: "",
    zipCode: "",
    externalNumber: "",
    internalNumber: "",
    latitude: 0,
    longitude: 0,
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setInputWarehouse({ ...inputWarehouse, [name]: value });
    setValue(name, value);
  };

  return (
    <>
      <strong>Datos Generales</strong>
      <EuiHorizontalRule margin="s" />
      <EuiFlexGroup>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText
              name="instructions"
              onChange={onChange}
              inputRef={register("instructions")}
              placeholder="intrucciones"
            />
          </EuiFormRow>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiFormRow>
            <EuiFieldText
              name="clientId"
              onChange={onChange}
              inputRef={register("clientId")}
              placeholder="id cliente"
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
              <EuiFormRow>
                <EuiFieldText
                  name="street"
                  onChange={onChange}
                  inputRef={register("street")}
                  placeholder="Calle"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="neigthboorhood"
                  onChange={onChange}
                  inputRef={register("neigthboorhood")}
                  placeholder="Colonia"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="municipality"
                  onChange={onChange}
                  inputRef={register("municipality")}
                  placeholder="Delegación o municipio"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="state"
                  onChange={onChange}
                  inputRef={register("state")}
                  placeholder="Ciudad"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="zipCode"
                  onChange={onChange}
                  inputRef={register("zipCode")}
                  placeholder="Codigo postal"
                />
              </EuiFormRow>
            </EuiFlexItem>
            <EuiFlexItem>
              <EuiHorizontalRule margin="l" style={{marginTop: '28px'}} />
              <EuiFormRow>
                <EuiFieldText
                  name="externalNumber"
                  onChange={onChange}
                  inputRef={register("externalNumber")}
                  placeholder="numero exterior"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="internalNumber"
                  onChange={onChange}
                  inputRef={register("internalNumber")}
                  placeholder="numero interior"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="latitude"
                  onChange={onChange}
                  inputRef={register("latitude")}
                  placeholder="Latitud"
                />
              </EuiFormRow>
              <EuiFormRow>
                <EuiFieldText
                  name="longitude"
                  onChange={onChange}
                  inputRef={register("longitude")}
                  placeholder="Longitud"
                />
              </EuiFormRow>
            </EuiFlexItem>
          </EuiFlexGroup>
        </EuiFlexItem>
        <EuiFlexItem>
          <strong>Contacto almacén</strong>
          <EuiHorizontalRule margin="s" />
          <EuiFormRow>
            <EuiFieldText
              name="firstName"
              onChange={onChange}
              inputRef={register("firstName")}
              placeholder="Nombre"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="lastName"
              onChange={onChange}
              inputRef={register("lastName")}
              placeholder="Apellido"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="phone"
              onChange={onChange}
              inputRef={register("phone")}
              placeholder="télefono"
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiFieldText
              name="email"
              onChange={onChange}
              inputRef={register("email")}
              placeholder="correo"
            />
          </EuiFormRow>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
