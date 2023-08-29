"use client";

import { API_URL } from "@/common";
import { Header, LoadingPage, TableBody } from "@/components";
import { GetQueryUsers } from "@/graphql";
import { useGeneratedGQLQuery } from "@/hooks";
import {
  EuiBasicTableColumn,
  EuiHorizontalRule,
  EuiPageHeaderContent,
  EuiPanel,
} from "@elastic/eui";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";

export default function Users() {
  const queryCache: any = useQueryClient();
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
  const [users, setUsers] = useState<any[]>([]);
  const queryVars = {
    filter: {},
    paging: actionsPaging,
    sorting: [],
  };
  const { data, status } = useGeneratedGQLQuery<
    unknown | any,
    unknown,
    unknown,
    unknown
  >(`${API_URL}/graphql`, "getUsers", GetQueryUsers, queryVars);

  useEffect(() => {
    if (status === "success") {
      setUsers(
        data.users.nodes.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          phone: user.phone,
          email: user.email,
        }))
      );
      setTotalCount(data.users.totalCount);
    }
  }, [data]);

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
      field: "firstName",
      name: "Nombre",
    },
    {
      field: "lastName",
      name: "Apellido",
    },
    {
      field: "phone",
      name: "Teléfono",
    },
    {
      field: "email",
      name: "Correo",
    },
  ];

  if (status === "loading") {
    return <LoadingPage isLoading={status === "loading"} />;
  }

  return (
    <EuiPageHeaderContent>
      <EuiPanel style={{ margin: "2vh" }}>
        <Header title={`Usuarios (${totalCount})`}>{""}</Header>
        <EuiHorizontalRule />
        <EuiPanel>
          <TableBody
            pageIndex={pageIndex}
            setPageIndex={setPageIndex}
            pageSize={pageSize}
            setPageSize={setPageSize}
            columns={columns}
            items={users}
            totalItemCount={totalCount}
            pageSizeOptions={pageSizeOptions}
            noItemsMessage={"No se encontraron usuarios"}
            itemId={"id"}
          />
        </EuiPanel>
      </EuiPanel>
    </EuiPageHeaderContent>
  );
}
