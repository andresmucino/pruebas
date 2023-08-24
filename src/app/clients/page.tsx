"use client";

import {
  Button,
  ErrorPage,
  GeneralForm,
  Header,
  LoadingPage,
  Modal,
  TableBody,
} from "@/components";
import { ClientsQuery, RegisterOneClient, clientGeneric } from "@/graphql";
import { useToastsContext } from "@/hooks";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import {
  EuiBasicTableColumn,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { API_URL, ClientsInterface } from "@/common";
import { useGeneratedGQLQuery } from "@/hooks";
import { UseAuthContext } from "@/hooks/login";
import { useRouter } from "next/navigation";

export default function Clients() {
  const queryCache: any = useQueryClient();
  const router = useRouter();
  const { user } = UseAuthContext();
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
  const [showModal, setShowModal] = useState(false);
  const [clients, setClients] = useState<ClientsInterface[]>([]);
  const { globalToasts, pushToast } = useToastsContext();
  const [generalFormData, setGeneralFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [validateGeneralFormData, setValidateGeneralFormData] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
  });

  const queryVars = {
    filter: {},
    paging: actionsPaging,
    sorting: {},
  };

  const {
    data,
    isFetching,
    status: getQueryClientsStatus,
  } = useGeneratedGQLQuery<unknown | any, unknown | any, unknown, unknown>(
    apiUrl,
    "getClients",
    ClientsQuery,
    queryVars
  );

  const { mutate, status: createOneQueryStatus } = useMutation({
    mutationKey: ["createOneClient"],
    mutationFn: (client: any) => {
      return clientGeneric(apiUrl, user).request(RegisterOneClient, client);
    },
  });

  const onSubmit = (e: any) => {
    e.preventDefault();

    mutate(
      {
        input: {
          firstName: generalFormData.firstName,
          lastName: generalFormData.lastName,
          phone: `+52 ${generalFormData.phone}`,
          email: generalFormData.email,
        },
      },
      {
        onError: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "2",
            title: "Cliente",
            text: <p>No se pudo guardar correctamente, intenta de nuevo</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
        onSuccess: (data: any) => {
          if (isFetching === false) {
            queryCache.removeQueries("getClients", { stale: false });
          }
          setShowModal(false);

          setGeneralFormData({
            email: "",
            firstName: "",
            lastName: "",
            phone: "",
          });

          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Cliente",
            text: (
              <>
                <p>Creado correctamente</p>
                <p>comparte la url con el cliente</p>
                <p>url: {data.registerClient.url}</p>
              </>
            ),
            color: "success",
          });
          pushToast(newToast);
        },
      }
    );
  };

  const validateFields = () => {
    let valid = true;

    if (
      generalFormData.firstName === "" ||
      validateGeneralFormData.firstName ||
      generalFormData.lastName === "" ||
      validateGeneralFormData.lastName ||
      generalFormData.phone === "" ||
      validateGeneralFormData.phone ||
      generalFormData.email === "" ||
      validateGeneralFormData.email
    ) {
      valid = false;
    }

    return !valid;
  };

  useEffect(() => {
    if (getQueryClientsStatus === "success") {
      setClients(
        data?.clients?.nodes?.map((cl: any) => ({
          id: cl.id,
          firstName: cl.firstName,
          lastName: cl.lastName,
          phone: cl.phone,
          email: cl.email,
        }))
      );
      setTotalCount(data.clients.totalCount);
    }
  }, [getQueryClientsStatus]);

  useEffect(() => {
    const newPaging = {
      limit: pageSize,
      offset: pageSize * pageIndex,
    };
    setActionsPaging(newPaging);
  }, [pageIndex, pageSize]);

  const columns: Array<EuiBasicTableColumn<any>> = [
    {
      field: "id",
      name: "ID",
    },
    {
      field: "firstName",
      name: "Nombre",
    },
    {
      field: "lastName",
      name: "Apellido",
    },
    {
      field: "phone",
      name: "Teléfono",
    },
    {
      field: "email",
      name: "Correo",
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
          {getQueryClientsStatus === "loading" ? (
            <LoadingPage isLoading={getQueryClientsStatus === "loading"} />
          ) : (
            <EuiPanel style={{ margin: "2vh" }}>
              <Header title={`Clientes (${totalCount})`}>
                <Button onClick={() => setShowModal(!showModal)} fill>
                  Crear cliente
                </Button>
              </Header>
              <EuiHorizontalRule />
              <EuiPanel>
                <TableBody
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  columns={columns}
                  items={clients}
                  totalItemCount={totalCount}
                  pageSizeOptions={pageSizeOptions}
                  noItemsMessage={"No se encontraron clientes"}
                  itemId={"id"}
                />
              </EuiPanel>
            </EuiPanel>
          )}
          {showModal && (
            <>
              <Modal
                onCloseModal={() => setShowModal(!showModal)}
                titleModal={"Crear cliente"}
              >
                <EuiForm component="form" onSubmit={onSubmit}>
                  <GeneralForm
                    generalFormData={generalFormData}
                    setGeneralFormData={setGeneralFormData}
                    validateGeneralFormData={validateGeneralFormData}
                    setValidateGeneralFormData={setValidateGeneralFormData}
                  />
                  <EuiSpacer />
                  <EuiModalFooter>
                    <Button onClick={() => setShowModal(!showModal)} size="m">
                      cancelar
                    </Button>
                    <Button
                      type="submit"
                      fill
                      size="m"
                      isLoading={createOneQueryStatus === "loading"}
                      isDisabled={validateFields()}
                    >
                      Guardar
                    </Button>
                  </EuiModalFooter>
                </EuiForm>
              </Modal>
            </>
          )}
          {getQueryClientsStatus === "error" && (
            <ErrorPage message="Error al cargar clientes" />
          )}
          {globalToasts}
        </>
      )}
    </EuiPageHeaderContent>
  );
}
