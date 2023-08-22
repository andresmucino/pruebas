"use client";

import { Button } from "@/components";
import { UseAuthContext } from "@/hooks/login";
import {
  EuiFieldText,
  EuiFlexGroup,
  EuiFlexItem,
  EuiFormRow,
  EuiHorizontalRule,
  EuiLink,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPageSection,
  EuiPanel,
  EuiSpacer,
} from "@elastic/eui";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [login, setLogin] = useState({ email: "", password: "" });
  const { loginEmailAndPassword, loading, error } = UseAuthContext();

  const handelChange = (e: any) => {
    const { name, value } = e.target;

    setLogin({ ...login, [name]: value });
  };

  const onClick = () => {
    if (!error) {
      loginEmailAndPassword(login.email, login.password);
      router.push("/home");
    }
    if (error) {
      alert("El correo o contraseña no se encontrarón, revisa tu información");
    }
  };

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }} paddingSize="l">
        <EuiPageSection>
          <EuiPageHeader pageTitle="Iniciar sesion" />
        </EuiPageSection>
        <EuiHorizontalRule />
        <EuiPanel paddingSize="l">
          <EuiFlexGroup>
            <EuiFlexItem></EuiFlexItem>
            <EuiFlexItem grow={1} style={{ justifyContent: "center" }}>
              <EuiFormRow id="1">
                <EuiFieldText fullWidth onChange={handelChange} name="email" />
              </EuiFormRow>
              <EuiFormRow id="2">
                <EuiFieldText
                  onChange={handelChange}
                  name="password"
                  type="password"
                />
              </EuiFormRow>
              <div style={{ display: "inline-grid", width: "150px" }}>
                <EuiSpacer />
                <Button onClick={onClick} isLoading={loading}>
                  Login
                </Button>
                <EuiSpacer />
                <EuiLink href="/register">Registrarse</EuiLink>
              </div>
            </EuiFlexItem>
            <EuiFlexItem></EuiFlexItem>
          </EuiFlexGroup>
        </EuiPanel>
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
