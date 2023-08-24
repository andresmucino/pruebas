"use client";

import { UseAuthContext } from "@/hooks/login";
import {
  EuiHorizontalRule,
  EuiPageHeader,
  EuiPageHeaderContent,
  EuiPageSection,
  EuiPanel,
} from "@elastic/eui";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { user } = UseAuthContext();

  useEffect(() => {
    if (user === null) {
      router.push("/login");
    }
  }, [user]);

  return (
    <>
      {"hola" && (
        <EuiPageHeaderContent>
          {user !== null && (
            <EuiPanel style={{ margin: "2vh" }} paddingSize="l">
              <EuiPageSection>
                <EuiPageHeader pageTitle="Bienvenido!" />
              </EuiPageSection>
              <EuiHorizontalRule />
              <EuiPanel paddingSize="l"></EuiPanel>
            </EuiPanel>
          )}
        </EuiPageHeaderContent>
      )}
    </>
  );
}
