"use client";

import { API_URL, MessengerInterface } from "@/common";
import {
  Button,
  GeneralForm,
  Header,
  LoadingPage,
  Modal,
  TableBody,
} from "@/components";
import {
  CreateMessengerQuery,
  GetMessengersQuery,
  graphQLClient,
} from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import { UseAuthContext } from "@/hooks/login";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import {
  EuiBasicTableColumn,
  EuiForm,
  EuiHorizontalRule,
  EuiModalFooter,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Messengers() {
  const queryCache: any = useQueryClient();
  const router = useRouter();
  const { user } = UseAuthContext();
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
  const [messengers, setMessengers] = useState<MessengerInterface[]>([]);

  const { globalToasts, pushToast } = useToastsContext();

  const queryVars = {
    filter: {},
    paging: actionsPaging,
    sorting: {},
  };

  const {
    data,
    isFetching,
    status: getMessengerQuerystatus,
  } = useGeneratedGQLQuery<unknown | any, unknown, unknown, unknown>(
    `${API_URL}/graphql`,
    "getMessengers",
    GetMessengersQuery,
    queryVars
  );

  const { mutate, status: createOneMessengerStatus } = useMutation({
    mutationKey: ["createOneMessenger"],
    mutationFn: (messenger: any) => {
      return graphQLClient.request(CreateMessengerQuery, messenger);
    },
  });

  const {
    register,
    formState: { errors },
    setValue,
    handleSubmit,
  } = useForm();

  const onSubmit = (data: any) => {
    mutate(
      {
        input: {
          messenger: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: `+52 ${data.phone}`,
            email: data.email,
          },
        },
      },
      {
        onError: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "2",
            title: "Mensajero",
            text: <p>No se pudo guardar correctamente, intenta de nuevo</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
        onSuccess: () => {
          if (isFetching === false) {
            queryCache.removeQueries("getMessengers", { stale: false });
          }
          setShowModal(false);
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Mensajero",
            text: <p>Creado correctamente</p>,
            color: "success",
          });
          pushToast(newToast);
        },
      }
    );
  };

  useEffect(() => {
    if (getMessengerQuerystatus === "success") {
      setMessengers(
        data.messengers?.nodes.map((messenger: any) => ({
          id: messenger.id,
          firstName: messenger.firstName,
          lastName: messenger.lastName,
          phone: messenger.phone,
          email: messenger.email,
        }))
      );
      setTotalCount(data.messengers.totalCount);
    }
  }, [getMessengerQuerystatus]);

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
      name: "Telefono",
    },
    {
      field: "email",
      name: "Correo",
    },
  ];

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  return (
    <EuiPageHeaderContent>
      {user !== null && (
        <>
          {getMessengerQuerystatus === "loading" ? (
            <LoadingPage isLoading={getMessengerQuerystatus === "loading"} />
          ) : (
            <EuiPanel style={{ margin: "2vh" }}>
              <Header title={`Mensajeros (${totalCount})`}>
                <Button onClick={() => setShowModal(!showModal)} fill>
                  Crear mensajero
                </Button>
              </Header>
              <EuiHorizontalRule />
              <EuiPanel>
                <TableBody
                  items={messengers}
                  columns={columns}
                  itemId={"id"}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  totalItemCount={totalCount}
                  pageSizeOptions={pageSizeOptions}
                  noItemsMessage={"No se encontraron mensajeros"}
                />
              </EuiPanel>
            </EuiPanel>
          )}
          {showModal && (
            <Modal
              onCloseModal={() => setShowModal(!showModal)}
              titleModal={"Crear mensajero"}
            >
              <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
                <GeneralForm
                  register={register}
                  setValue={setValue}
                  errors={errors}
                />
                <EuiModalFooter>
                  <Button onClick={() => setShowModal(!showModal)}>
                    Cancelar
                  </Button>
                  <Button
                    type="submit"
                    fill
                    isLoading={createOneMessengerStatus === "loading"}
                  >
                    Guardar
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
