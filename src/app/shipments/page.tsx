"use client";

import { API_URL } from "@/common";
import { Button, Header, LoadingPage, Popover, TableBody } from "@/components";
import {
  AssignCourierShipment,
  ShipmentsQuery,
  clientGeneric,
} from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import { UseAuthContext } from "@/hooks/login";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import {
  EuiBasicTableColumn,
  EuiFieldText,
  EuiFormRow,
  EuiHorizontalRule,
  EuiLink,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AssignCourierProps {
  id: any;
  mutate: any;
  assignCourierShipmentStatus: "success" | "loading" | "error" | "idle";
  onSuccess: (data: any) => void;
  onError: (error: any) => void;
}

const AssignCourier: React.FC<AssignCourierProps> = ({
  id,
  mutate,
  assignCourierShipmentStatus,
  onSuccess,
  onError,
}) => {
  const [isPopoverOpen, setPopoverOpen] = useState(false);
  const [idValue, setIdValue] = useState({ id: "" });

  const onChange = (e: any) => {
    const { name, value } = e.target;

    setIdValue({ ...idValue, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutate(
      { input: { shipmentId: id, courierId: Number(idValue.id) } },
      {
        onSuccess: onSuccess,
        onError: onError,
      }
    );
    setIdValue({ id: "" });
  };

  return (
    <Popover
      button={
        <EuiLink
          onClick={() => {
            setPopoverOpen(!isPopoverOpen);
          }}
        >
          No asignado
        </EuiLink>
      }
      isPopoverOpen={isPopoverOpen}
      closePopover={() => setPopoverOpen(!isPopoverOpen)}
    >
      <div style={{ display: "flex", alignItems: "flex-end" }}>
        <EuiFormRow
          label="Ingresa id mensajero"
          style={{ marginRight: "0.5rem" }}
        >
          <EuiFieldText name="id" value={idValue.id} onChange={onChange} />
        </EuiFormRow>
        <Button
          isLoading={assignCourierShipmentStatus === "loading"}
          onClick={onSubmit}
          isDisabled={idValue.id === ""}
        >
          Asignar
        </Button>
      </div>
    </Popover>
  );
};

export default function Shipments() {
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
  const [shipments, setShipments] = useState<any[]>([]);
  const [id, setId] = useState<number>(0);
  const { globalToasts, pushToast } = useToastsContext();

  const queryVars = {
    filter: {},
    pagnig: actionsPaging,
    sorting: {},
  };

  const { data, status, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(apiUrl, "getShipments", ShipmentsQuery, queryVars);

  const { mutate, status: assignCourierShipmentStatus } = useMutation({
    mutationKey: ["assignCourierShipment"],
    mutationFn: (assignCourierShipment: any) => {
      return clientGeneric(apiUrl, user).request(
        AssignCourierShipment,
        assignCourierShipment
      );
    },
  });

  useEffect(() => {
    if (status === "success") {
      setShipments(
        data.shipments.nodes.map((sh: any) => ({
          id: sh.id,
          packages: sh.packages.totalCount,
          updatedAt: moment
            .utc(sh.updatedAt)
            .local()
            .format("DD-MM-YYYY HH:mm"),
          status: sh.shipmentStatus.status,
          messenger: sh.messenger !== null ? sh.messenger.id : "Sin asignar",
        }))
      );
      setTotalCount(data.shipments.totalCount);
    }
  }, [status]);

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
      field: "packages",
      name: "Paradas",
    },
    {
      field: "status",
      name: "Estatus",
    },
    {
      field: "messenger",
      name: "Mensajero",
      render: (messenger: any, id: any) => {
        return (
          <div>
            {messenger !== "Sin asignar" ? (
              messenger
            ) : (
              <AssignCourier
                id={id.id}
                mutate={mutate}
                assignCourierShipmentStatus={assignCourierShipmentStatus}
                onSuccess={(data: any) => {
                  if (isFetching === false) {
                    queryCache.removeQueries("getShipments", { stale: false });
                    const newToast: Toast[] = [];
                    newToast.push({
                      id: "1",
                      title: "Mensajero",
                      text: <p>Asignado correctamente</p>,
                      color: "success",
                    });
                    pushToast(newToast);
                  }
                }}
                onError={(error: any) => {
                  const newToast: Toast[] = [];
                  newToast.push({
                    id: "2",
                    title: "Mensajero",
                    text: <p>{error.response.errors[0].message}</p>,
                    color: "danger",
                  });
                  pushToast(newToast);
                }}
              />
            )}
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      name: "Actualizada",
    },
    {
      field: "actions",
      name: "Acciones",
      actions: [
        {
          name: "ruta",
          description: "Ver ruta",
          type: "icon",
          icon: "visMapRegion",
          onClick: (item) => {
            setId(item.id);
          },
          href: `shipments/${id}`,
        },
      ],
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
          {status === "loading" ? (
            <LoadingPage isLoading={status === "loading"} />
          ) : (
            <EuiPanel style={{ margin: "2vh" }}>
              <Header title={`Ordenes (${totalCount})`}>{""}</Header>
              <EuiHorizontalRule />
              <EuiPanel>
                <TableBody
                  items={shipments}
                  columns={columns}
                  itemId={"id"}
                  pageIndex={pageIndex}
                  setPageIndex={setPageIndex}
                  pageSize={pageSize}
                  setPageSize={setPageSize}
                  totalItemCount={totalCount}
                  pageSizeOptions={pageSizeOptions}
                  noItemsMessage={"No se encontraron envios"}
                />
              </EuiPanel>
            </EuiPanel>
          )}
          {globalToasts}
        </>
      )}
    </EuiPageHeaderContent>
  );
}
