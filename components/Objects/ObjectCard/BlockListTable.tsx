import React, { useState } from "react";
import { Table } from "antd";
import { ColumnsType } from "antd/es/table";
import classes from "./BlockListTable.module.scss";
import { BlockInterface } from "../../../interfaces/BlockInterface";
import { formatNumber } from "../../../utils/utils";

interface BlockListTableProps {
  blocks: BlockInterface[];
  onRowClick: (id: number) => void;
  onRowsSelected: (ids: number[]) => void;
}

const BlockListTable = (props: BlockListTableProps) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (selectedRowKeys: any) => {
    setSelectedRowKeys(selectedRowKeys);
    props.onRowsSelected(selectedRowKeys);
  };
  const columns: ColumnsType<BlockInterface> = [
    {
      title: "Пл.м²",
      dataIndex: "area",
      sorter: (a, b) =>
        parseInt(a.area.toString()) - parseInt(b.area.toString()),
      fixed: "left",
      width: 60,
      // sortDirections: ['descend'],
    },
    {
      title: "На рынке",
      dataIndex: "isOnMarket",
      sorter: (a, b) => {
        const x = a.isOnMarket === "есть на рынке";
        const y = b.isOnMarket === "есть на рынке";
        return Number(x) - Number(y);
      },
      render: (val, record, index) => {
        return <>{record.isOnMarket === "есть на рынке" ? "✅" : "🚫"}</>;
      },
      width: 80,
      // sortDirections: ['descend'],
    },
    {
      title: "Этаж",
      dataIndex: "floor",
      // defaultSortOrder: 'descend',
      sorter: (a, b) => a.floor - b.floor,
      width: 60,
    },
    {
      title: "Отделка",
      dataIndex: "finishing",
      width: 120,
      sorter: (a, b) => (a.finishing || "").localeCompare(b.finishing),
    },
    {
      title: "Тип реализации",
      dataIndex: "realisationType",
      sorter: (a, b) => a.realisationType.localeCompare(b.realisationType),
      render: (val, record, index) => {
        return (
          <>
            {val === "rent"
              ? "аренда"
              : val === "subRent"
              ? "субаренда"
              : "продажа"}
          </>
        );
      },
      width: 100,
    },
    {
      title: "Ставка",
      dataIndex: "rentPrice",
      sorter: (a, b) => {
        const aPrice = a.realisationType !== "sale" ? a.rentPrice : a.salePrice;
        const bPrice = b.realisationType !== "sale" ? b.rentPrice : b.salePrice;
        return (
          parseInt((aPrice || 0)?.toString().replace(",", ".")) -
          parseInt((bPrice || 0)?.toString().replace(",", "."))
        );
      },
      render: (val, record, index) => {
        const price =
          record.realisationType !== "sale"
            ? record.rentPrice
            : record.salePrice;
        return (
          <>
            {Math.round(parseInt((price || 0)?.toString().replace(",", ".")))}
          </>
        );
      },
      width: 80,
    },
    {
      title: "Налоги",
      dataIndex: "taxIncluded",
      sorter: (a, b) => {
        console.log(a, b);
        const aTax =
          a.realisationType !== "sale"
            ? a.taxIncluded
              ? a.taxIncluded.toString()
              : ""
            : a.ndsSale
            ? a.ndsSale.toString()
            : "";
        const bTax =
          b.realisationType !== "sale"
            ? b.taxIncluded
              ? b.taxIncluded.toString()
              : ""
            : b.ndsSale
            ? b.ndsSale.toString()
            : "";
        return aTax.localeCompare(bTax);
      },
      render: (val, record, index) => {
        const tax =
          record.realisationType !== "sale"
            ? record.taxIncluded
            : record.ndsSale;
        return <>{tax && tax !== "null" ? tax : "–"}</>;
      },
      width: 100,
    },
    {
      title: "OPEX",
      dataIndex: "opex",
      sorter: (a, b) => a.opex.localeCompare(b.opex),
      render: (val, record, index) => {
        return (
          <>
            <div>{val}</div>{" "}
            {record.opexPrice ? (
              <div>({formatNumber(parseInt(record.opexPrice))})</div>
            ) : (
              ""
            )}
          </>
        );
      },
      width: 100,
    },
    {
      title: "Фото?",
      dataIndex: "picsQnt",
      sorter: (a, b) => (a.picsQnt > b.picsQnt ? 1 : -1),
      render: (val, record, index) => {
        const plans = record.pics.filter((pic: any) => pic.isPlan === true);
        return (
          <>
            {record.pics.length > 0 && record.pics.length > plans.length
              ? "✅"
              : "🚫"}
          </>
        );
      },
      width: 60,
    },
    {
      title: "Циан?",
      dataIndex: "isOnCian",
      sorter: (a, b) => {
        return a.isOnCian > b.isOnCian ? 1 : -1;
      },
      render: (val, record, index) => {
        return <>{val ? "✅" : "🚫"}</>;
      },
      width: 60,
    },
    {
      title: "Yand?",
      dataIndex: "isOnYandex",
      sorter: (a, b) => {
        return a.isOnYandex > b.isOnYandex ? 1 : -1;
      },
      render: (val, record, index) => {
        return <>{val ? "✅" : "🚫"}</>;
      },
      width: 60,
    },
    {
      title: "Собственник",
      dataIndex: "owner",
      sorter: (a, b) => {
        const aBlock = a.owner ? a.owner.name.toString() : "";
        const bBlock = b.owner ? b.owner.name.toString() : "";
        return aBlock.localeCompare(bBlock);
      },
      render: (val, record, index) => {
        return val && val.id ? (
          <a href={`/companies/${val.id}`} target={"_blank"} rel="noreferrer">
            {val ? val.name : "–"}
          </a>
        ) : (
          "-"
        );
      },
      width: 120,
    },
    {
      title: "Тип блока",
      dataIndex: "blockType",
      sorter: (a, b) => {
        const aBlock = a.blockType ? a.blockType.toString() : "";
        const bBlock = b.blockType ? b.blockType.toString() : "";
        return aBlock.localeCompare(bBlock);
      },
      render: (val, record, index) => {
        return <>{val || "–"}</>;
      },
      //width: 100
    },
  ];

  const data = props.blocks.map((block) => {
    return {
      key: block.id,
      ...block,
    };
  });

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className={classes.BlockListTable}>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        className={classes.Table}
        dataSource={data}
        pagination={false}
        rowClassName={(record: BlockInterface, index) => {
          const daysDiff = Math.floor(
            (Date.now() - new Date(record.updatedAt).getTime()) / 86400000
          );
          // @ts-ignore
          const className =
            record.isOnMarket === "есть на рынке"
              ? daysDiff > 30
                ? classes.YelowRow
                : classes.GreenRow
              : classes.RedRow;
          return className;
        }}
        onRow={(record) => {
          return {
            onClick: (event) => {
              props.onRowClick(record.id);
            }, // click row
          };
        }}
        scroll={{ y: `calc(100vh - 300px)` }}
      />
    </div>
  );
};

interface DataType {
  key: React.Key;
}

export default BlockListTable;
