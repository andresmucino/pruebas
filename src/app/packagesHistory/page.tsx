"use client";

import { API_URL } from "@/common";
import { Button, Header, LoadingPage, SimpleList } from "@/components";
import { GetPackageHistory } from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import { UseAuthContext } from "@/hooks/login";
import {
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
  EuiSpacer,
  EuiFieldSearch,
  EuiSteps,
  EuiFlexGroup,
  EuiFlexItem,
  EuiCard,
} from "@elastic/eui";
import moment from "moment";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PackagesHistory() {
  const router = useRouter();
  const { user } = UseAuthContext();
  const [value, setValue] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  const [history, setHistory] = useState<any[]>([]);
  const [steps, setSteps] = useState<any[]>([]);
  const [validateData, setValidateData] = useState("");
  const queryVars = {
    filter: { idPackage: { eq: Number(inputFilter) } },
    paging: { limit: 100 },
    sorting: [],
  };

  const { status, data, error } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(`${API_URL}/graphql`, "getPackageHistory", GetPackageHistory, queryVars);

  useEffect(() => {
    if (status === "success") {
      setHistory(
        data.packageHistories.nodes.map((ph: any) => ({
          createdAt: moment
          .utc(ph.createdAt)
          .local()
          .format("DD-MM-YYYY HH:mm"),
          description: ph.description,
          idPackage: ph.idPackage,
        }))
      );
    }
  }, [data]);

  useEffect(() => {
    setSteps(
      history.map((i: any) => ({
        title: i.description,
        children: (
          <>
            <SimpleList title={"Id paquete: "} description={i.idPackage} />
            <SimpleList title={"Fecha: "} description={i.createdAt} />
          </>
        ),
      }))
    );
  }, [history]);

  const onChange = (e: any) => {
    setValue(e.target.value);
  };

  const searchValueOnClick = (value: string) => {
    setInputFilter(value);
    setValidateData(steps.length > 0 ? "si hay cosas" : "no hay cosas");
  };

  const buttonClick = () => {
    setInputFilter(value);
    setValidateData(steps.length > 0 ? "si hay cosas" : "no hay cosas");
  };

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return (
    <EuiPageHeaderContent>
      {user !== null && (
        <>
          <EuiPanel style={{ margin: "2vh" }}>
            <Header title={`Historial de paquete`}>{""}</Header>
            <EuiHorizontalRule />
            <EuiFlexGroup>
              <EuiFlexItem>
                <EuiFieldSearch
                  onChange={onChange}
                  placeholder={"Buscar por id del paquete"}
                  onSearch={searchValueOnClick}
                  isLoading={status === "loading"}
                />
              </EuiFlexItem>
              <EuiFlexItem>
                <Button
                  onClick={buttonClick}
                  isLoading={status === "loading"}
                  fill
                >
                  Buscar
                </Button>
              </EuiFlexItem>
              <EuiFlexItem
                style={{ alignItems: "center", alignSelf: "center" }}
              >
                <SimpleList
                  title={"Id paquete: "}
                  description={history[0]?.idPackage}
                />
              </EuiFlexItem>
            </EuiFlexGroup>
            <EuiSpacer />
            {status === "loading" ? (
              <LoadingPage isLoading={status === "loading"} />
            ) : (
              <>
                <EuiPanel>
                  {inputFilter !== "" ? (
                    <EuiSteps titleSize="xs" steps={steps} />
                  ) : (
                    <EuiCard
                      title="Ingresa una guia para ver su historial"
                      description=""
                    />
                  )}
                  {validateData === "no hay cosas" && (
                    <>
                      <EuiCard
                        title="No se encontraron movimientos"
                        description=""
                      />
                    </>
                  )}
                </EuiPanel>
              </>
            )}
          </EuiPanel>
        </>
      )}
    </EuiPageHeaderContent>
  );
}
