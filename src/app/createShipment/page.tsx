"use client";

import { Button, Header, LoadingPage } from "@/components";
import {
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { InputCreateShipment } from "./inputCreateShipment";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {
  AddPackagesToShipments,
  CreatePackages,
  GenerateShipment,
  graphQLClient,
} from "@/graphql";
import { nanoid } from "nanoid";
import { useRouter } from "next/navigation";
import { UseAuthContext } from "@/hooks/login";

export default function CreateShipment() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate: mutateGeneratePackage, status: statusGeneratePakcage } =
    useMutation({
      mutationKey: ["createOnePackages"],
      mutationFn: (packages: any) => {
        return graphQLClient.request(CreatePackages, packages);
      },
    });

  const { mutate: mutateGenerateShipment, status: statusGenerateShipment } =
    useMutation({
      mutationKey: ["createShipment"],
      mutationFn: (shipment: any) => {
        return graphQLClient.request(GenerateShipment, shipment);
      },
    });

  const { mutate: mutateAddPackageShipment, status: statusAddPackageShipment } =
    useMutation({
      mutationKey: ["addPackagesShipment"],
      mutationFn: (addPackages: any) => {
        return graphQLClient.request(AddPackagesToShipments, addPackages);
      },
    });

  const onSubmit = (data: any) => {
    console.log(data);
    let packagesType: any;
    if (data.packageType === "envelope") {
      packagesType = { heigth: 1, length: 1, width: 1, weigth: 1 };
    }
    if (data.packageType === "box_small") {
      packagesType = { heigth: 25, length: 40, width: 30, weigth: 1 };
    }
    if (data.packageType === "box_medium") {
      packagesType = { heigth: 30, length: 30, width: 40, weigth: 15 };
    }
    if (data.packageType === "box_big") {
      packagesType = { heigth: 40, length: 40, width: 50, weigth: 25 };
    }

    mutateGeneratePackage(
      {
        input: {
          weigth: packagesType.weigth,
          width: packagesType.width,
          heigth: packagesType.heigth,
          length: packagesType.length,
          guide: nanoid(),
          contact: {
            firstName: data.firstName,
            lastName: data.lastName,
            phone: "+52" + data.phone,
            email: data.email,
          },
          direction: {
            street: data.street,
            neigthboorhood: data.neigthboorhood,
            municipality: data.municipality,
            state: data.state,
            zipCode: data.zipCode,
            externalNumber: data.externalNumber,
            internalNumber: data.internalNumber,
            latitude: Number(data.latitude),
            longitude: Number(data.longitude),
          },
          idClient: Number(data.idClient),
        },
      },
      {
        onSuccess: (datasuccess: any) => {
          console.log(datasuccess, "genera guides");
          mutateGenerateShipment(
            {
              input: {
                comments: data.instructions,
                clientId: datasuccess.createDelivery.clientId,
                warehouseShipmentId: Number(data.warehouseShipmentId),
              },
            },
            {
              onSuccess: (data: any) => {
                console.log(data, "genera un envio");
                mutateAddPackageShipment(
                  {
                    input: {
                      shipmentId: data.generateShipment.id,
                      guides: datasuccess.createDelivery.guide,
                    },
                  },
                  {
                    onError: (error) => {
                      console.log(error);
                    },
                    onSuccess: (data) => {
                      console.log(data, "agrega packages");
                    },
                  }
                );
              },
              onError: (error) => {
                console.log(error);
              },
            }
          );
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  useEffect(() => {
    if (user === null) {
      router.push("/");
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
          <EuiPanel style={{ margin: "2vh", height: "700px" }}>
            <EuiForm component="form" onSubmit={handleSubmit(onSubmit)}>
              <Header title={`Crear envio`}>
                <Button type="submit" size="m" fill>
                  Crear
                </Button>
              </Header>
              <EuiHorizontalRule />

              <InputCreateShipment
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </EuiForm>
          </EuiPanel>
        </>
      )}
    </EuiPageHeaderContent>
  );
}
