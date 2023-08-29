"use client";

import { Button, Header, LoadingPage, TableBody } from "@/components";
import {
  EuiBasicTableColumn,
  EuiButtonIcon,
  EuiDescriptionList,
  EuiFieldText,
  EuiFilePicker,
  EuiFormRow,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiText,
} from "@elastic/eui";
import { useMutation } from "@tanstack/react-query";
import { ReactNode, useEffect, useState } from "react";
import Papa from "papaparse";
import { CreateManyPackages } from "@/graphql";
import { useToastsContext } from "@/hooks/useToastAlertProvider/useToastContext";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useRouter } from "next/navigation";
import { API_URL, GeneratePackagesCSVInterface } from "@/common";
import { UseAuthContext } from "@/hooks/login";
import { GraphQLClient } from "graphql-request";

export default function GeneratePackages() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const [files, setFiles] = useState<any>([]);
  const [itemIdToExpandedRowMap, setItemIdToExpandedRowMap] = useState<
    Record<string, ReactNode>
  >({});
  const [items, setItems] = useState<Array<GeneratePackagesCSVInterface>>([]);
  const [idClient, setIdClient] = useState("");

  const apiUrl = `${API_URL}/graphql`;

  const client = new GraphQLClient(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${user?.stsTokenManager?.accessToken}`,
    },
  });

  const { mutate, isLoading, error, data, status } = useMutation({
    mutationKey: ["createManyPackages"],
    mutationFn: (createManyPackages: any) => {
      return client.request(CreateManyPackages, createManyPackages);
    },
  });

  const { globalToasts, pushToast } = useToastsContext();

  const onChaeIdClient = (e: any) => {
    const { value } = e.target;
    setIdClient(value);
  };

  const onChange = (files: any) => {
    if (files[0]) {
      Papa.parse(files[0], {
        header: true,
        skipEmptyLines: true,
        complete(results) {
          setFiles(results.data);
        },
      });
    }
  };

  useEffect(() => {
    setItems(
      files.map((pkg: any) => ({
        guide: pkg.guide,
        weigth: Number(pkg.weigth),
        width: Number(pkg.width),
        length: Number(pkg.length),
        heigth: Number(pkg.heigth),
        idClient: Number(idClient),
        contact: {
          firstName: pkg.firstName,
          lastName: pkg.lastName,
          phone: pkg.phone,
          email: pkg.email,
        },
        direction: {
          street: pkg.street,
          neigthboorhood: pkg.neigthboorhood,
          municipality: pkg.municipality,
          state: pkg.state,
          externalNumber: pkg.externalNumber,
          internalNumber: pkg.internalNumber,
          zipCode: pkg.zipCode,
          latitude: Number(pkg.latitude),
          longitude: Number(pkg.longitude),
        },
      }))
    );
  }, [files]);

  const submitManyPackages = () => {
    mutate(
      { input: { packages: items } },
      {
        onSuccess: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "1",
            title: "Guias",
            text: <p>Creadas correctamente</p>,
            color: "success",
          });
          pushToast(newToast);
          router.push("/packages");
        },
        onError: () => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "2",
            title: "Cliente",
            text: (
              <p>
                No se pudieron guardar algunas guías correctamente, verifica la
                información ingresada, intenta de nuevo
              </p>
            ),
            color: "danger",
          });
          pushToast(newToast);
        },
      }
    );
  };

  const toggleDetails = (item: any) => {
    const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };

    if (itemIdToExpandedRowMapValues[item.id]) {
      delete itemIdToExpandedRowMapValues[item.id];
    } else {
      const [expand] = files.filter((i: any) => i === item);

      const listitemContact = [
        {
          description: `${expand.firstName}`,
          title: "Nombre",
        },
        {
          description: `${expand.lastName}`,
          title: "Apellido",
        },
        {
          description: `${expand.phone}`,
          title: "Teléfono",
        },
        {
          description: `${expand.email}`,
          title: "Correo",
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
          description: `${expand.internalNumber}`,
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
            <EuiText style={{ marginBottom: "2px" }}>
              <h2>Contacto</h2>
            </EuiText>
            <EuiDescriptionList
              listItems={listitemContact}
              type="responsiveColumn"
              style={{ marginBottom: "2px" }}
            />
          </div>
          <div>
            <EuiText style={{ marginBottom: "2px" }}>
              <h2>Dirección</h2>
            </EuiText>
            <EuiDescriptionList
              listItems={listItemDirection}
              type="responsiveColumn"
              style={{ marginBottom: "2px" }}
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
    },
    {
      field: "packageType",
      name: "Tipo de paquete",
      isExpander: true,
    },
    {
      field: "guide",
      name: "Guía",
      isExpander: true,
    },

    {
      field: "latitude",
      name: "Latitud",
      isExpander: true,
    },
    {
      field: "longitude",
      name: "Longitud",
      isExpander: true,
    },
    {
      align: "right",
      width: "80px",
      isExpander: true,
      name: "",
      render: (user: any) => {
        const itemIdToExpandedRowMapValues = { ...itemIdToExpandedRowMap };
        return (
          <EuiButtonIcon
            onClick={() => toggleDetails(user)}
            aria-label={
              itemIdToExpandedRowMapValues[user.id] ? "Collapse" : "Expand"
            }
            iconType={
              itemIdToExpandedRowMapValues[user.id] ? "arrowDown" : "arrowRight"
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

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage isLoading={true} />;

  return (
    <EuiPageHeaderContent>
      {user !== null && (
        <>
          <EuiPanel style={{ margin: "2vh" }}>
            <Header title={`Subir paquetes`}>
              <div style={{ display: "flex", marginRight: "3rem" }}>
                {idClient !== "" && (
                  <EuiFilePicker
                    id={"filePickerId"}
                    multiple
                    initialPromptText="Select or drag and drop file"
                    onChange={onChange}
                    display={"default"}
                    aria-label="Use aria labels when no actual label is in use"
                  />
                )}
              </div>
              <Button
                onClick={submitManyPackages}
                isLoading={status === "loading"}
                fill
              >
                Agregar guías
              </Button>
            </Header>
            <EuiHorizontalRule />
            <EuiFormRow>
              <EuiFieldText
                name="idClient"
                placeholder="Ingresa el ID del cliente para generar guías"
                value={idClient}
                onChange={onChaeIdClient}
              />
            </EuiFormRow>
            <EuiHorizontalRule />
            <EuiPanel>
              {files && (
                <TableBody
                  items={files}
                  itemIdToExpandedRowMap={itemIdToExpandedRowMap}
                  columns={columns}
                  itemId={"id"}
                  pageIndex={0}
                  setPageIndex={() => {}}
                  pageSize={0}
                  setPageSize={() => {}}
                  totalItemCount={0}
                  pageSizeOptions={[]}
                  noItemsMessage={"Sube tu archivo para ver información"}
                />
              )}
            </EuiPanel>
          </EuiPanel>
          {globalToasts}
        </>
      )}
    </EuiPageHeaderContent>
  );
}
