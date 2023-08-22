import React, { Fragment } from "react";
import "@elastic/eui/dist/eui_theme_light.css";
import { EuiBasicTable, EuiBasicTableColumn } from "@elastic/eui";

export interface TableBodyProps<T> {
  pageIndex: number;
  setPageIndex: (index: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  columns: Array<EuiBasicTableColumn<T>>;
  items: Array<any>;
  totalItemCount: number;
  itemIdToExpandedRowMap?: any;
  pageSizeOptions: Array<number>;
  noItemsMessage: string;
  isSelectable?: boolean;
  selection?: any;
  tableRef?: any;
  itemId: string;
}

export const TableBody: React.FC<TableBodyProps<any>> = ({
  pageIndex,
  setPageIndex,
  pageSize,
  setPageSize,
  columns,
  items,
  totalItemCount,
  itemIdToExpandedRowMap,
  pageSizeOptions,
  noItemsMessage,
  isSelectable,
  selection,
  tableRef,
  itemId,
}) => {
  const onTableChange = ({ page = {} }: any) => {
    const { index: pageIndex, size: pageSize } = page;

    setPageIndex(pageIndex);
    setPageSize(pageSize);
  };

  const pagination = {
    pageIndex: pageIndex,
    pageSize: pageSize,
    totalItemCount: totalItemCount,
    pageSizeOptions: pageSizeOptions,
    hidePerPageOptions: false,
  };

  return (
    <Fragment>
      <EuiBasicTable
        ref={tableRef}
        items={items}
        pagination={pagination}
        onChange={onTableChange}
        itemId={itemId}
        columns={columns}
        itemIdToExpandedRowMap={itemIdToExpandedRowMap}
        isExpandable={true}
        hasActions={true}
        noItemsMessage={noItemsMessage}
        isSelectable={isSelectable}
        selection={selection}
      />
    </Fragment>
  );
};
