"use client";

import {
  API_URL,
  MessengerShipmentInterface,
  PackagesShipmentInterface,
  WarehouseShipmentInterface,
} from "@/common";
import { Button, Header, LoadingPage, badges } from "@/components";
import {
  AssignCourierShipment,
  GetShipment,
  clientGeneric,
} from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import React, { useEffect, useState } from "react";
import { MessengerTabs, PackagesTabs, WarehouseTab } from "../tabs";
import { useParams, useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { UseAuthContext } from "@/hooks/login";

export default function Shipments() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const queryCache: any = useQueryClient();
  const apiUrl = `${API_URL}/graphql`;

  const [packagesShipment, setPackagesShipment] = useState<
    PackagesShipmentInterface[]
  >([]);
  const [warehouseShipment, setWarehouseShipment] =
    useState<WarehouseShipmentInterface>({});
  const [messengerShipment, setMessengerShipment] =
    useState<MessengerShipmentInterface>({});

  const [idValue, setIdValue] = useState({ id: "" });

  const params = useParams();

  const { status, data, isFetching } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(apiUrl, "getShipment", GetShipment, { id: params.id });

  const { mutate, status: assignCourierShipmentStatus } = useMutation({
    mutationKey: ["assignCourierShipment"],
    mutationFn: (assignCourierShipment: any) => {
      return clientGeneric(apiUrl, user).request(
        AssignCourierShipment,
        assignCourierShipment
      );
    },
  });

  const { globalToasts, pushToast } = useToastsContext();

  useEffect(() => {
    if (status === "success") {
      setPackagesShipment(
        data.shipment.packages.nodes.map((pkg: any) => ({
          id: pkg.id,
          guide: pkg.guide,
          street: pkg.direction?.street,
          externalNumber: pkg.direction?.externalNumber,
          internalNumber: Number(pkg.direction?.internalNumber),
          latitude: pkg.direction?.latitude,
          longitude: pkg.direction?.longitude,
          municipality: pkg.direction?.municipality,
          neigthboorhood: pkg.direction?.neigthboorhood,
          state: pkg.direction?.state,
          zipCode: pkg.direction?.zipCode,
          email: pkg.contact?.email,
          firstName: pkg.contact?.firstName,
          lastName: pkg.contact?.lastName,
          phone: pkg.contact?.phone,
          status: pkg.status?.status,
          statusId: pkg.status?.id,
          description: pkg.status?.description,
          evidences: pkg.evidences.nodes.map((ev: any) => ({
            id: ev.id,
            personReceived: ev.personReceived,
            comments: ev.comments,
            url: ev.url,
            createdAt: ev.createdAt,
          })),
        }))
      );
      setMessengerShipment({
        id: data.shipment.messenger?.id,
        firstName: data.shipment.messenger?.firstName,
        lastName: data.shipment.messenger?.lastName,
        phone: data.shipment.messenger?.phone,
      });
      setWarehouseShipment({
        firstName: data.shipment.warehouseShipment.contact.firstName,
        lastName: data.shipment.warehouseShipment.contact.lastName,
        phone: data.shipment.warehouseShipment.contact.phone,
        email: data.shipment.warehouseShipment.contact.email,
        externalNumber:
          data.shipment.warehouseShipment.direction.externalNumber,
        internalNumber:
          data.shipment.warehouseShipment.direction.internalNumber,
        latitude: data.shipment.warehouseShipment.direction.latitude,
        longitude: data.shipment.warehouseShipment.direction.longitude,
        municipality: data.shipment.warehouseShipment.direction.municipality,
        neigthboorhood:
          data.shipment.warehouseShipment.direction.neigthboorhood,
        state: data.shipment.warehouseShipment.direction.state,
        street: data.shipment.warehouseShipment.direction.street,
        zipCode: data.shipment.warehouseShipment.direction.zipCode,
        statusId: data.shipment.shipmentStatus.id,
        status: data.shipment.shipmentStatus.status,
      });
    }
  }, [status]);

  const onChange = (e: any) => {
    const { name, value } = e.target;
    setIdValue({ ...idValue, [name]: value });
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    mutate(
      {
        input: { shipmentId: Number(params.id), courierId: Number(idValue.id) },
      },
      {
        onSuccess: () => {
          if (isFetching === false) {
            queryCache.removeQueries("getShipment", { stale: true });
          }
        },
        onError: (error: any) => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Mensajero",
            text: <p>{error.response.errors[0].message}</p>,
            color: "danger",
          });
          pushToast(newToast);
        },
      }
    );
    setIdValue({ id: "" });
  };

  useEffect(() => {
    if (user === null) {
      router.push("/");
    }
  }, [user]);

  return (
    <EuiPageHeaderContent>
      {user !== null && (
        <>
          {status === "loading" && isFetching ? (
            <LoadingPage isLoading={status === "loading"} />
          ) : (
            <EuiPanel style={{ margin: "2vh" }}>
              <Header
                title={`Ruta [ ${data.shipment.id} ]`}
                titleBadge={data.shipment.shipmentStatus.status}
                colorBadge={
                  data.shipment.shipmentStatus.id === 1
                    ? badges.default
                    : data.shipment.shipmentStatus.id === 2
                    ? badges.primary
                    : data.shipment.shipmentStatus.id === 3
                    ? badges.success
                    : data.shipment.shipmentStatus.id === 4
                    ? badges.warning
                    : data.shipment.shipmentStatus.id === 5
                    ? badges.danger
                    : ""
                }
              >
                {""}
              </Header>
              <EuiHorizontalRule />
              <EuiFlexGroup>
                <EuiFlexItem grow={5}>
                  <div
                    style={{
                      height: "600px",
                      overflowY: "scroll",
                      paddingRight: "10px",
                      paddingLeft: "10px",
                    }}
                  >
                    <MessengerTabs messenger={messengerShipment}>
                      <div style={{ display: "flex", alignItems: "flex-end" }}>
                        <EuiFormRow
                          label="Ingresa id mensajero"
                          style={{ marginRight: "0.5rem" }}
                        >
                          <EuiFieldText
                            name="id"
                            value={idValue.id}
                            onChange={onChange}
                          />
                        </EuiFormRow>
                        <Button
                          isLoading={assignCourierShipmentStatus === "loading"}
                          onClick={onSubmit}
                          isDisabled={idValue.id === ""}
                        >
                          Asignar
                        </Button>
                      </div>
                    </MessengerTabs>
                    <WarehouseTab warehouseShipment={warehouseShipment} />
                    <PackagesTabs packagesShipment={packagesShipment} />
                  </div>
                </EuiFlexItem>
                <EuiFlexItem grow={6}>
                  <EuiPanel>
                    <strong>Map</strong>
                  </EuiPanel>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiPanel>
          )}
          {globalToasts}
        </>
      )}
    </EuiPageHeaderContent>
  );
}
