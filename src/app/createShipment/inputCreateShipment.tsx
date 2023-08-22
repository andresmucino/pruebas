import { GeneralForm } from "@/components";
import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPanel,
  EuiSuperSelect,
  EuiText,
} from "@elastic/eui";
import { useState } from "react";

interface InputCreateShipmentProps {
  register: any;
  setValue: (name: string, value: string) => void;
  errors: any;
}
export const InputCreateShipment: React.FC<InputCreateShipmentProps> = ({
  errors,
  register,
  setValue,
}) => {
  const onChange = (e: any) => {
    const { name, value } = e.target;

    setValue(name, value);
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
      value: "box_medium",
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

  const [valueselect, setValueselect] = useState<any>("");

  const onChangeSelect = (value: any) => {
    setValueselect(value);
  };

  return (
    <EuiFlexGroup>
      <EuiFlexItem>
        <EuiPanel>
          <strong>Datos Generales</strong>
          <EuiHorizontalRule />
          <EuiFormRow id="1">
            <EuiFieldText
              name="instructions"
              onChange={onChange}
              inputRef={register("instructions")}
              placeholder="Instrucciones de recolección"
            />
          </EuiFormRow>
          <EuiFormRow id="3">
            <EuiFieldText
              name="idClient"
              onChange={onChange}
              inputRef={register("idClient")}
              placeholder="Id del cliente"
            />
          </EuiFormRow>
          <EuiFormRow id="9">
            <EuiFieldText
              name="warehouseShipmentId"
              onChange={onChange}
              inputRef={register("warehouseShipmentId")}
              placeholder="Almacen del cliente "
            />
          </EuiFormRow>
          <EuiFormRow>
            <EuiSuperSelect
              id="0"
              options={options}
              valueOfSelected={valueselect}
              placeholder="Selecciona el tipo de paquete"
              name="packageType"
              onChange={(value) => {
                onChangeSelect(value);
                setValue("packageType", value);
                register("packageType");
              }}
              itemLayoutAlign="top"
              hasDividers
            />
          </EuiFormRow>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <strong>Direccion</strong>
          <EuiHorizontalRule />
          <EuiFormRow id="4">
            <EuiFieldText
              name="street"
              onChange={onChange}
              inputRef={register("street")}
              placeholder="Calle"
            />
          </EuiFormRow>
          <EuiFormRow id="10">
            <EuiFieldText
              name="externalNumber"
              onChange={onChange}
              inputRef={register("externalNumber")}
              placeholder="Numero exterior"
            />
          </EuiFormRow>
          <EuiFormRow id="11">
            <EuiFieldText
              name="internalNumber"
              onChange={onChange}
              inputRef={register("internalNumber")}
              placeholder="Numero interior"
            />
          </EuiFormRow>
          <EuiFormRow id="5">
            <EuiFieldText
              name="neigthboorhood"
              onChange={onChange}
              inputRef={register("neigthboorhood")}
              placeholder="Colonia"
            />
          </EuiFormRow>
          <EuiFormRow id="6">
            <EuiFieldText
              name="municipality"
              onChange={onChange}
              inputRef={register("municipality")}
              placeholder="Delegación o municipio"
            />
          </EuiFormRow>
          <EuiFormRow id="7">
            <EuiFieldText
              name="state"
              onChange={onChange}
              inputRef={register("state")}
              placeholder="Ciudad"
            />
          </EuiFormRow>
          <EuiFormRow id="8">
            <EuiFieldText
              name="zipCode"
              onChange={onChange}
              inputRef={register("zipCode")}
              placeholder="Codigo postal"
            />
          </EuiFormRow>
          <EuiFormRow id="12">
            <EuiFieldText
              name="latitude"
              onChange={onChange}
              inputRef={register("latitude")}
              placeholder="Latitud"
            />
          </EuiFormRow>
          <EuiFormRow id="13">
            <EuiFieldText
              name="longitude"
              onChange={onChange}
              inputRef={register("longitude")}
              placeholder="Longitud"
            />
          </EuiFormRow>
        </EuiPanel>
      </EuiFlexItem>

      <EuiFlexItem>
        <EuiPanel>
          <strong>Contacto</strong>
          <EuiHorizontalRule />
          <GeneralForm
            register={register}
            setValue={setValue}
            errors={errors}
          />
        </EuiPanel>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
};
