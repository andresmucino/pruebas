"use client";

import { Button, Header, LoadingPage, Modal, TableBody } from "@/components";
import {
  EuiBasicTableColumn,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeaderContent,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { ReactNode, useEffect, useState } from "react";
import {
  CreateWarehouseShipment,
  GetWarehouseShipments,
  clientGeneric,
} from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import { API_URL, WarehouseShipmentsInterface } from "@/common";
import { InputWarehouseClient } from "./inputWarehouseClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import { useRouter } from "next/navigation";
import { UseAuthContext } from "@/hooks/login";
import moment from "moment";

export default function GeneratePackages() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const queryCache: any = useQueryClient();
  const apiUrl = `${API_URL}/graphql`;

  const initialIndex = 0;
  const initialPageZize = 10;
  const pageSizeOptions = [
    initialPageZize,
    initialPageZize * 2,
    initialPageZize * 4,
  ];
  const [pageIndex, setPageIndex] = useState<number>(initialIndex);
  const [pageSize, setPageSize] = useState<number>(initialPageZize);
  const [actionsPaging, setActionsPaging] = useState<any>({
    limit: pageSize,
    offset: pageIndex * pageSize,
  });
  const [totalCount, setTotalCount] = useState(0);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, ReactNode>
  >({});
  const [items, setItems] = useState<Array<WarehouseShipmentsInterface>>([]);
  const [showModal, setShowModal] = useState(false);
  const [warehouseData, setWarehouseData] = useState({
    instructions: "",
    clientId: "",
    street: "",
    neigthboorhood: "",
    municipality: "",
    state: "",
    zipCode: "",
    externalNumber: "",
    internalNumber: "",
    latitude: "",
    longitude: "",
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [validate, setValidate] = useState({
    street: false,
    neigthboorhood: false,
    municipality: false,
    state: false,
    zipCode: false,
    externalNumber: false,
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
    instructions: false,
    clientId: false,
  });

  const { globalToasts, pushToast } = useToastsContext();

  const queryVars = {
    filter: {},
    paging: actionsPaging,
    sorting: [],
  };

  const {
    data: dataWarehouse,
    status: statusWahouse,
    isFetching,
  } = useGeneratedGQLQuery<unknown | any, unknown, unknown, unknown>(
    apiUrl,
    "getWarehouseShipments",
    GetWarehouseShipments,
    queryVars
  );

  const { mutate, status: createOneWarehouseStatus } = useMutation({
    mutationKey: ["createOneWarehouse"],
    mutationFn: (warehouse: any) => {
      return clientGeneric(apiUrl, user).request(
        CreateWarehouseShipment,
        warehouse
      );
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    const input = {
      instructions: warehouseData.instructions,
      clientId: Number(warehouseData.clientId),
      direction: {
        street: warehouseData.street,
        neigthboorhood: warehouseData.neigthboorhood,
        municipality: warehouseData.municipality,
        state: warehouseData.state,
        zipCode: warehouseData.zipCode,
        externalNumber: warehouseData.externalNumber,
        internalNumber: warehouseData.internalNumber,
        latitude: Number(warehouseData.latitude),
        longitude: Number(warehouseData.longitude),
      },
      contact: {
        firstName: warehouseData.firstName,
        lastName: warehouseData.lastName,
        phone: warehouseData.phone,
        email: warehouseData.email,
      },
    };

    mutate(
      { input },
      {
        onSuccess: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Almacén",
            text: <p>Creado correctamente</p>,
            color: "danger",
          });
          pushToast(newToast);

          setWarehouseData(warehouseData);

          setShowModal(!showModal);
          if (isFetching === false) {
            queryCache.removeQueries("getWarehouseShipments", { stale: false });
          }
        },
        onError: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "2",
            title: "Almacén",
            text: <p>No se pudo guardar correctamente, intenta de nuevo</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
      }
    );
  };

  const validateFields = () => {
    let valid = true;
    if (
      warehouseData.street === "" ||
      validate.street ||
      warehouseData.externalNumber === "" ||
      validate.externalNumber ||
      warehouseData.neigthboorhood === "" ||
      validate.neigthboorhood ||
      warehouseData.state === "" ||
      validate.state ||
      warehouseData.municipality === "" ||
      validate.municipality ||
      warehouseData.zipCode === "" ||
      validate.zipCode ||
      warehouseData.firstName === "" ||
      validate.firstName ||
      warehouseData.lastName === "" ||
      validate.lastName ||
      warehouseData.phone === "" ||
      validate.phone ||
      warehouseData.email === "" ||
      validate.email ||
      warehouseData.instructions === "" ||
      validate.instructions ||
      warehouseData.clientId === "" ||
      validate.clientId
    ) {
      valid = false;
    }

    return !valid;
  };

  useEffect(() => {
    if (statusWahouse === "success") {
      setItems(
        dataWarehouse.warehouseShipments?.nodes.map((wh: any) => ({
          id: wh.id,
          instructions: wh.instructions,
          fullName: `${wh.client.firstName} ${wh.client.lastName}`,
          phone: wh.client.phone,
          email: wh.client.email,
          createdAt: moment
            .utc(wh.createdAt)
            .local()
            .format("DD-MM-YYYY HH:mm"),
          updatedAt: moment
            .utc(wh.updatedAt)
            .local()
            .format("DD-MM-YYYY HH:mm"),
          street: wh.direction.street,
          neigthboorhood: wh.direction.neigthboorhood,
          municipality: wh.direction.municipality,
          state: wh.direction.state,
          externalNumber: wh.direction.externalNumber,
          internalNumber: Number(wh.direction.internalNumber),
          zipCode: wh.direction.zipCode,
          latitude: wh.direction.latitude,
          longitude: wh.direction.longitude,
          fullNameContact: `${wh.contact.firstName} ${wh.contact.lastName}`,
          phoneContact: wh.contact.phone,
          emailContact: wh.contact.email,
        }))
      );
      setTotalCount(dataWarehouse.warehouseShipments?.totalCount);
    }
  }, [dataWarehouse]);

  useEffect(() => {
    const newPaging = {
      limit: pageSize,
      offset: pageSize * pageIndex,
    };
    setActionsPaging(newPaging);
  }, [pageIndex, pageSize]);

  const toggleDetails = (item: any) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      const [expand] = items.filter((i: any) => i === item);

      const listitemContact = [
        {
          description: `${expand.fullNameContact}`,
          title: "Nombre",
        },
        {
          description: `${expand.phoneContact}`,
          title: "Teléfono",
        },
        {
          description: `${expand.emailContact}`,
          title: "Correo",
        },
        {
          description: `${expand.instructions}`,
          title: "Instrucciones",
        },
      ];

      const listItemDirection = [
        {
          description: `${expand.street}`,
          title: "Calle",
        },
        {
          description: `${expand.neigthboorhood}`,
          title: "Colonia",
        },
        {
          description: `${expand.municipality}`,
          title: "Delegación",
        },
        {
          description: `${expand.state}`,
          title: "Ciudad",
        },
        {
          description: `${expand.externalNumber}`,
          title: "Número exterior",
        },
        {
          description: `${
            Number.isNaN(expand.internalNumber)
              ? "Sin número interior"
              : expand.internalNumber
          }`,
          title: "Número interior",
        },
        {
          description: `${expand.zipCode}`,
          title: "Código postal",
        },
      ];

      itemIdToExpandedRowMapValues[item.id] = (
        <div style={{ display: "flex" }}>
          <div>
            <EuiText>
              <h3>Contacto</h3>
            </EuiText>
            <EuiDescriptionList
              listItems={listitemContact}
              type="responsiveColumn"
              style={{ marginBottom: "2px", marginTop: "8px" }}
            />
          </div>
          <div>
            <EuiText>
              <h3>Dirección</h3>
            </EuiText>
            <EuiDescriptionList
              listItems={listItemDirection}
              type="responsiveColumn"
              style={{ marginBottom: "2px", marginTop: "8px" }}
            />
          </div>
        </div>
      );
    }
    setItemIdToExpandedRowMap(itemIdToExpandedRowMapValues);
  };

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
      isExpander: true,
      width: "100px",
    },
    {
      field: "fullName",
      name: "Cliente",
      isExpander: true,
    },
    {
      field: "phone",
      name: "Teléfono",
      isExpander: true,
    },

    {
      field: "email",
      name: "Correo",
      isExpander: true,
    },
    {
      field: "createdAt",
      name: "Fecha de creación",
      isExpander: true,
    },
    {
      field: "updatedAt",
      name: "Fecha de actualización",
      isExpander: true,
    },
    {
      align: "right",
      width: "80px",
      isExpander: true,
      name: "",
      render: (wh: any) => {
        const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
        return (
          <EuiButtonIcon
            onClick={() => toggleDetails(wh)}
            aria-label={
              itemIdToExpandedRowMapValues[wh.id] ? "Collapse" : "Expand"
            }
            iconType={
              itemIdToExpandedRowMapValues[wh.id] ? "arrowDown" : "arrowRight"
            }
          />
        );
      },
    },
  ];

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return (
    <EuiPageHeaderContent>
      {user !== null && (
        <>
          {statusWahouse === "loading" ? (
            <LoadingPage isLoading={statusWahouse === "loading"} />
          ) : (
            <EuiPanel style={{ margin: "2vh" }}>
              <Header title={`Almacenes Clientes (${totalCount})`}>
                <Button onClick={() => setShowModal(!showModal)} fill>
                  Agregar Almacén
                </Button>
                {/* <EuiButton type='submit' >submit</EuiButton> */}
              </Header>
              <EuiHorizontalRule />
              <EuiPanel>
                <TableBody
                  items={items}
                  itemIdToExpandedRowMap={itemIdToExpandedRowMap}
                  columns={columns}
                  itemId={"id"}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  totalItemCount={totalCount}
                  pageSizeOptions={pageSizeOptions}
                  noItemsMessage={"Sube tu archivo para ver información"}
                />
              </EuiPanel>
            </EuiPanel>
          )}
          {showModal && (
            <Modal
              onCloseModal={() => setShowModal(!showModal)}
              titleModal={"Crear almacén"}
              minWdith={950}
            >
              <EuiForm component="form" onSubmit={onSubmit}>
                <InputWarehouseClient
                  warehouseData={warehouseData}
                  setWarehouseData={setWarehouseData}
                  validateDataWarehouse={validate}
                  setValidateDataWarehouse={setValidate}
                />
                <EuiModalFooter>
                  <Button onClick={() => setShowModal(!showModal)} size="m">
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    fill
                    size="m"
                    isLoading={createOneWarehouseStatus === "loading"}
                    isDisabled={validateFields()}
                  >
                    Crear
                  </Button>
                </EuiModalFooter>
              </EuiForm>
            </Modal>
          )}
          {globalToasts}
        </>
      )}
    </EuiPageHeaderContent>
  );
}
