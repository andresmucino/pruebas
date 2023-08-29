"use client";

import { Button, Header, LoadingPage } from "@/components";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import {
  InputCreateShipment,
  InputGeneralForm,
  StatePackages,
} from "./inputCreateShipment";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  AddPackagesToShipments,
  CreateManyPackages,
  GenerateShipment,
  clientGeneric,
} from "@/graphql";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { UseAuthContext } from "@/hooks/login";
import { API_URL, GenerateDeliveryInterface } from "@/common";
import { useToastsContext } from "@/hooks";

const packagesInterface = {
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
  weigth: 0,
  width: 0,
  heigth: 0,
  length: 0,
};

export default function CreateShipment() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const apiUrl = `${API_URL}/graphql`;
  const { globalToasts, pushToast } = useToastsContext();
  const [packages, setPackages] = useState(packagesInterface);

  const [packagesArray, setPackagesArray] = useState<any[]>([
    packagesInterface,
  ]);
  const [deliveryData, setDeliveryData] = useState({
    instructions: "",
    idClient: "",
    warehouseShipmentId: "",
  });

  const [deliveryDataValidate, setDeliveryDataValidate] = useState({
    instructions: false,
    idClient: false,
    warehouseShipmentId: false,
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
  });

  const [saveData, setSaveData] = useState<Array<GenerateDeliveryInterface>>(
    []
  );

  const { mutate: mutateGeneratePackage, status: statusGeneratePakcage } =
    useMutation({
      mutationKey: ["createManyPackages"],
      mutationFn: (packages: any) => {
        return clientGeneric(apiUrl, user).request(
          CreateManyPackages,
          packages
        );
      },
    });

  const { mutate: mutateGenerateShipment, status: statusGenerateShipment } =
    useMutation({
      mutationKey: ["createShipment"],
      mutationFn: (shipment: any) => {
        return clientGeneric(apiUrl, user).request(GenerateShipment, shipment);
      },
    });

  const { mutate: mutateAddPackageShipment, status: statusAddPackageShipment } =
    useMutation({
      mutationKey: ["addPackagesShipment"],
      mutationFn: (addPackages: any) => {
        return clientGeneric(apiUrl, user).request(
          AddPackagesToShipments,
          addPackages
        );
      },
    });

  let storageData;

  const dataStorage = () => {
    setPackagesArray([...packagesArray, packages]);
    setPackages(packagesInterface);
  };

  if (typeof window !== "undefined") {
    localStorage.setItem("packages", JSON.stringify(packagesArray));

    storageData = JSON.parse(localStorage.getItem("packages") as string);
  }

  useEffect(() => {
    setSaveData(
      packagesArray.map((pkg: any) => ({
        length: pkg.length,
        weigth: pkg.weigth,
        width: pkg.width,
        heigth: pkg.heigth,
        guide: nanoid(),
        idClient: Number(deliveryData.idClient),
        contact: {
          firstName: pkg.firstName,
          lastName: pkg.lastName,
          phone: `+52 ${pkg.phone}`,
          email: pkg.email,
        },
        direction: {
          street: pkg.street,
          externalNumber: pkg.externalNumber,
          internalNumber: pkg.internalNumber,
          municipality: pkg.municipality,
          neigthboorhood: pkg.neigthboorhood,
          state: pkg.state,
          zipCode: pkg.zipCode,
          latitude: Number(pkg.latitude),
          longitude: Number(pkg.longitude),
        },
      }))
    );
  }, [packagesArray]);

  const onSubmit = (e: any) => {
    e.preventDefault();

    let mutation = saveData.slice(1);

    mutateGeneratePackage(
      { input: { packages: mutation } },
      {
        onSuccess: (data: any) => {
          const createDeliveries = data.createDeliveries.map(
            (item: any) => item.guide
          );
          mutateGenerateShipment(
            {
              input: {
                comments: deliveryData.instructions,
                clientId: Number(deliveryData.idClient),
                warehouseShipmentId: Number(deliveryData.warehouseShipmentId),
              },
            },
            {
              onSuccess: (data: any) => {
                mutateAddPackageShipment(
                  {
                    input: {
                      shipmentId: data.generateShipment.id,
                      guides: createDeliveries,
                    },
                  },
                  {
                    onSuccess: (data: any) => {
                      const newToast: Toast[] = [];
                      newToast.push({
                        id: "1",
                        title: "Delivery",
                        text: (
                          <p>ID del delivery {data.addPackageShipment.id}</p>
                        ),
                        color: "success",
                      });
                      pushToast(newToast);
                    },
                    onError: (error: any) => {
                      const newToast: Toast[] = [];
                      newToast.push({
                        id: "2",
                        title: "Delivery",
                        text: <p>Error al crear el envío, intenta de nuevo</p>,
                        color: "danger",
                      });
                      pushToast(newToast);
                    },
                  }
                );
              },
              onError: (error: any) => {
                const newToast: Toast[] = [];
                newToast.push({
                  id: "3",
                  title: "Delivery",
                  text: <p>Error al crear el envío, intenta de nuevo</p>,
                  color: "danger",
                });
                pushToast(newToast);
              },
            }
          );
        },
        onError: (error) => {
          const newToast: Toast[] = [];
          newToast.push({
            id: "4",
            title: "Delivery",
            text: <p>Error al crear el envío, intenta de nuevo</p>,
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
      packages.street === "" ||
      validate.street ||
      packages.externalNumber === "" ||
      validate.externalNumber ||
      packages.neigthboorhood === "" ||
      validate.neigthboorhood ||
      packages.state === "" ||
      validate.state ||
      packages.municipality === "" ||
      validate.municipality ||
      packages.zipCode === "" ||
      validate.zipCode ||
      packages.firstName === "" ||
      validate.firstName ||
      packages.lastName === "" ||
      validate.lastName ||
      packages.phone === "" ||
      validate.phone ||
      packages.email === "" ||
      validate.email ||
      deliveryData.idClient === "" ||
      deliveryDataValidate.idClient ||
      deliveryData.instructions === "" ||
      deliveryDataValidate.instructions ||
      deliveryData.warehouseShipmentId === "" ||
      deliveryDataValidate.warehouseShipmentId
    ) {
      valid = false;
    }

    return !valid;
  };

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
          <EuiPanel style={{ margin: "2vh", height: "auto" }}>
            <EuiForm component="form" onSubmit={onSubmit}>
              <Header title={`Crear envío`}>
                <Button
                  type="submit"
                  size="m"
                  fill
                  isLoading={
                    statusAddPackageShipment === "loading" ||
                    statusGeneratePakcage === "loading" ||
                    statusGenerateShipment === "loading"
                  }
                >
                  Crear
                </Button>
              </Header>
              <EuiHorizontalRule />
              <EuiFlexGroup>
                <EuiFlexItem grow={3}>
                  <InputGeneralForm
                    deliveryData={deliveryData}
                    setDeliveryData={setDeliveryData}
                    validateGeneralForm={deliveryDataValidate}
                    setValidateGeneralForm={setDeliveryDataValidate}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={6}>
                  <InputCreateShipment
                    packageData={packages}
                    setPackageData={setPackages}
                    validateInput={validate}
                    setValidateInput={setValidate}
                  />
                </EuiFlexItem>
                <EuiFlexItem grow={3}>
                  <StatePackages
                    onClick={dataStorage}
                    storageData={storageData}
                    isDisabled={validateFields()}
                  />
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiForm>
          </EuiPanel>
        </>
      )}
      {globalToasts}
    </EuiPageHeaderContent>
  );
}
