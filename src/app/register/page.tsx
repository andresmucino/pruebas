"use client";

import { Button, GeneralForm, Header, LoadingPage } from "@/components";
import { RegisterUser, graphQLClient } from "@/graphql";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function About() {
  const [url, setUrl] = useState("");
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { mutate, status } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (user: any) => {
      return graphQLClient.request(RegisterUser, user);
    },
  });

  const onSaveData = (data: any) => {
    mutate(
      {
        input: {
          firstName: data.firstName,
          lastName: data.lastName,
          phone: "+52 " + data.phone,
          email: data.email,
        },
      },
      {
        onSuccess: (data: any) => {
          setUrl(data.registerUser.url);
        },
        onError: (error) => {
          console.log(error);
        },
      }
    );
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage isLoading={true} />;

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={"Registrate"}>
          {url !== "" && (
            <Link target="_blank" href={url}>
              para continuar estable una contraseña
            </Link>
          )}
        </Header>
        <EuiHorizontalRule />
        <EuiPanel paddingSize="l">
          <EuiForm component="form" onSubmit={handleSubmit(onSaveData)}>
            <EuiFlexGroup>
              <EuiFlexItem></EuiFlexItem>
              <EuiFlexItem grow={1} style={{ justifyContent: "center" }}>
                {/* <GeneralForm
                  register={register}
                  setValue={setValue}
                  errors={errors}
                /> */}
                <div style={{ width: "150px" }}>
                  <EuiSpacer />
                  <Button type="submit" isLoading={status === "loading"}>
                    Registarse
                  </Button>
                  <EuiSpacer />
                </div>
              </EuiFlexItem>
              <EuiFlexItem></EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
        </EuiPanel>
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
