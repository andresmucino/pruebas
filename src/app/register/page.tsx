"use client";

import { Button, GeneralForm, Header, LoadingPage, Modal } from "@/components";
import { RegisterUser, graphQLClient } from "@/graphql";
import { useToastsContext } from "@/hooks";
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiForm,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function About() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [registerUser, setRegisterUser] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
  });
  const [confirmRegister, setConfirmRegister] = useState({
    firstName: false,
    lastName: false,
    phone: false,
    email: false,
  });
  const [showModal, setShowModal] = useState(false);
  const { globalToasts, pushToast } = useToastsContext();

  const { mutate, status } = useMutation({
    mutationKey: ["registerUser"],
    mutationFn: (user: any) => {
      return graphQLClient.request(RegisterUser, user);
    },
  });

  const onSaveData = (e: any) => {
    e.preventDefault();
    mutate(
      {
        input: {
          firstName: registerUser.firstName,
          lastName: registerUser.lastName,
          phone: "+52 " + registerUser.phone,
          email: registerUser.email,
        },
      },
      {
        onSuccess: (data: any) => {
          setUrl(data.registerUser.url);
          setShowModal(true);
        },
        onError: (error) => {
          const newToast: Toast[] = [];

          newToast.push({
            id: "1",
            title: "Registro",
            text: (
              <p>
                No se pudo registrar, intenta de nuevo o contacta a tú
                administrador
              </p>
            ),
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
      registerUser.email === "" ||
      confirmRegister.email ||
      registerUser.firstName === "" ||
      confirmRegister.firstName ||
      registerUser.lastName === "" ||
      confirmRegister.lastName ||
      registerUser.phone === "" ||
      confirmRegister.phone
    ) {
      valid = false;
    }

    return !valid;
  };

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage isLoading={true} />;

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={"Registrate"}>{""}</Header>
        <EuiHorizontalRule />
        <EuiPanel paddingSize="l">
          <EuiForm component="form" onSubmit={onSaveData}>
            <EuiFlexGroup>
              <EuiFlexItem></EuiFlexItem>
              <EuiFlexItem grow={1} style={{ justifyContent: "center" }}>
                <GeneralForm
                  generalFormData={registerUser}
                  setGeneralFormData={setRegisterUser}
                  validateGeneralFormData={confirmRegister}
                  setValidateGeneralFormData={setConfirmRegister}
                />
                <div style={{ width: "150px" }}>
                  <EuiSpacer />
                  <Button
                    type="submit"
                    isLoading={status === "loading"}
                    isDisabled={validateFields()}
                  >
                    Registrarse
                  </Button>
                  <EuiSpacer />
                </div>
              </EuiFlexItem>
              <EuiFlexItem></EuiFlexItem>
            </EuiFlexGroup>
          </EuiForm>
        </EuiPanel>
      </EuiPanel>
      {showModal && (
        <Modal
          onCloseModal={() => setShowModal(!showModal)}
          titleModal={"Para ingresar"}
        >
          <Link target="_blank" href={url} onClick={() => {router.push("/login");}}>
            <h4 style={{ fontSize: "larger" }}>Establece una contraseña</h4>
          </Link>
          <EuiSpacer />
        </Modal>
      )}
      {globalToasts}
    </EuiPageHeaderContent>
  );
}
