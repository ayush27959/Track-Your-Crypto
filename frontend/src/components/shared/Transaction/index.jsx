import React, { useState, useEffect } from "react";

// ======================================================
// ANT DESIGN COMPONENTS
// ======================================================
import {
  Button,
  Card,
  Input,
  Modal,
  Popconfirm,
  Table,
  Form,
  Select,
  Tag,
  Space,
  Typography,
  DatePicker,
} from "antd";

// ======================================================
// ICONS
// ======================================================
import {
  DeleteOutlined,
  EditOutlined,
  SearchOutlined,
  DownloadOutlined,
  PrinterOutlined,
  PlusOutlined,
} from "@ant-design/icons";

// ======================================================
// UTILS & LIBRARIES
// ======================================================
import http from "../../../utils/http";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

const { Item } = Form;
const { Text } = Typography;

const Transaction = () => {
  const [transactionForm] = Form.useForm();

  // STATES
  const [edit, setEdit] = useState(null);
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");

  // DATE FILTERS
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);

  // PAGINATION
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });

  // Helper date formatter
  const formatDate = (dateStr) => {
    return dateStr ? dayjs(dateStr).format("DD MMM YYYY, hh:mm A") : "N/A";
  };

  // ======================================================
  // TABLE COLUMNS FOR CRYPTO
  // ======================================================
  const columns = [
    {
      title: "Asset",
      dataIndex: "coinName",
      key: "coinName",
      render: (text, record) => (
        <div className="flex flex-col">
          <Text strong className="capitalize text-slate-800">
            {text || "Crypto"}
          </Text>
          <Tag color="blue" className="w-max uppercase font-bold !mt-1">
            {record.symbol || "COIN"}
          </Tag>
        </div>
      ),
    },
    {
      title: "Type",
      dataIndex: "transactionType",
      key: "transactionType",
      render: (type) => {
        const isBuy = type?.toLowerCase() === "buy";
        return (
          <Tag
            color={isBuy ? "green" : "red"}
            className="!px-3 !py-1 !rounded-full uppercase font-extrabold"
          >
            {isBuy ? "BUY" : "SELL"}
          </Tag>
        );
      },
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (qty) => <span className="font-semibold text-slate-700">{qty}</span>,
    },
    {
      title: "Price/Unit",
      dataIndex: "buyPrice",
      key: "buyPrice",
      render: (price) => <span className="font-medium text-slate-700">${price}</span>,
    },
    {
      title: "Total Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount, record) => {
        const isBuy = record.transactionType?.toLowerCase() === "buy";
        return (
          <span className={`font-bold ${isBuy ? "text-emerald-600" : "text-rose-600"}`}>
            ${amount}
          </span>
        );
      },
    },
    {
      title: "Payment",
      dataIndex: "paymentMethod",
      key: "paymentMethod",
      render: (method) => (
        <Tag color={method === "online" || method === "wallet" ? "blue" : "gold"} className="uppercase font-semibold">
          {method || "Wallet"}
        </Tag>
      ),
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => <span>{formatDate(date)}</span>,
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, obj) => (
        <Space>
          <Popconfirm title="Edit Trade?" onConfirm={() => onEditTransaction(obj)}>
            <Button
              shape="circle"
              icon={<EditOutlined />}
              className="!bg-emerald-50 !text-emerald-600 border-none"
            />
          </Popconfirm>

          <Popconfirm title="Delete Trade?" onConfirm={() => onDelete(obj._id)}>
            <Button danger shape="circle" icon={<DeleteOutlined />} />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  // ======================================================
  // FETCH TRANSACTIONS FROM BACKEND
  // ======================================================
  const fetchTransaction = async (page = 1, pageSize = 5, query = "") => {
    try {
      setLoading(true);
      const res = await http.get(
        `/api/transaction/get?page=${page}&limit=${pageSize}&search=${query}`
      );

      const { data, total } = res.data;

      setTransactions(data || []);
      setPagination({
        current: page,
        pageSize,
        total: total || 0,
      });
    } catch (err) {
      toast.error("Failed to fetch trades");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransaction(pagination.current, pagination.pageSize, search);
  }, []);

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  // ======================================================
  // SEARCH & DATE FILTERING
  // ======================================================
  const filteredTransactions = transactions.filter((item) => {
    const searchValue = search.toLowerCase();
    const matchSearch =
      item.coinName?.toLowerCase().includes(searchValue) ||
      item.symbol?.toLowerCase().includes(searchValue) ||
      item.notes?.toLowerCase().includes(searchValue);

    const transactionDate = dayjs(item.createdAt);
    const matchFromDate = fromDate
      ? transactionDate.isAfter(dayjs(fromDate).startOf("day")) ||
        transactionDate.isSame(dayjs(fromDate).startOf("day"))
      : true;

    const matchToDate = toDate
      ? transactionDate.isBefore(dayjs(toDate).endOf("day")) ||
        transactionDate.isSame(dayjs(toDate).endOf("day"))
      : true;

    return matchSearch && matchFromDate && matchToDate;
  });

  // ======================================================
  // ADD & UPDATE HANDLERS
  // ======================================================
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await http.post("/api/transaction/create", values);
      toast.success("Crypto Trade Added");
      fetchTransaction(pagination.current, pagination.pageSize, search);
      setModal(false);
      transactionForm.resetFields();
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const onUpdate = async (values) => {
    try {
      setLoading(true);
      await http.put(`/api/transaction/update/${edit._id}`, values);
      toast.success("Crypto Trade Updated");
      fetchTransaction(pagination.current, pagination.pageSize, search);
      setModal(false);
      setEdit(null);
      transactionForm.resetFields();
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async (id) => {
    try {
      setLoading(true);
      await http.delete(`/api/transaction/delete/${id}`);
      toast.success("Trade Deleted");
      fetchTransaction(pagination.current, pagination.pageSize, search);
    } catch (err) {
      toast.error(err?.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const onEditTransaction = (obj) => {
    setEdit(obj);
    transactionForm.setFieldsValue(obj);
    setModal(true);
  };

  // ======================================================
  // EXPORTS
  // ======================================================
  const downloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Trades");
    XLSX.writeFile(workbook, "Crypto_Trades_Report.xlsx");
    toast.success("Excel Downloaded");
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Crypto Tracker - Trade Ledger Report", 14, 15);

    const tableRows = filteredTransactions.map((item) => [
      item.coinName,
      item.symbol?.toUpperCase(),
      item.transactionType?.toUpperCase(),
      item.quantity,
      `$${item.buyPrice}`,
      `$${item.amount}`,
      formatDate(item.createdAt),
    ]);

    autoTable(doc, {
      head: [["Coin", "Symbol", "Type", "Quantity", "Price/Unit", "Total ($)", "Date"]],
      body: tableRows,
      startY: 20,
    });

    doc.save("Crypto_Trades_Report.pdf");
    toast.success("PDF Downloaded");
  };

  return (
    <div className="p-4 bg-slate-50 min-h-screen">
      <Card
        className="rounded-2xl shadow-sm border border-slate-200"
        title={
          <div>
            <h2 className="text-2xl font-black text-slate-800 m-0">
              Crypto Trade Ledger
            </h2>
            <p className="text-slate-500 text-sm m-0">
              Manage your BUY & SELL crypto portfolio holdings
            </p>
          </div>
        }
        extra={
          <div className="flex flex-wrap gap-2">
            <Input
              placeholder="Search coin name or symbol..."
              prefix={<SearchOutlined />}
              value={search}
              onChange={onSearch}
              allowClear
              className="w-64"
            />

            <DatePicker
              placeholder="From Date"
              onChange={(date) => setFromDate(date)}
            />

            <DatePicker
              placeholder="To Date"
              onChange={(date) => setToDate(date)}
            />

            <Button icon={<PrinterOutlined />} onClick={exportPDF}>
              PDF
            </Button>

            <Button
              icon={<DownloadOutlined />}
              onClick={downloadExcel}
              className="!bg-emerald-600 !text-white border-none font-medium"
            >
              Excel
            </Button>

            <Button
              type="primary"
              icon={<PlusOutlined />}
              className="!bg-emerald-600 hover:!bg-emerald-500 !border-none font-bold shadow-md shadow-emerald-600/20"
              onClick={() => {
                setEdit(null);
                transactionForm.resetFields();
                setModal(true);
              }}
            >
              Add Trade
            </Button>
          </div>
        }
      >
        {/* TABLE */}
        <Table
          columns={columns}
          dataSource={filteredTransactions}
          rowKey="_id"
          loading={loading}
          pagination={pagination}
          onChange={(pag) => {
            fetchTransaction(pag.current, pag.pageSize, search);
          }}
        />
      </Card>

      {/* CRYPTO FORM MODAL */}
      <Modal
        open={modal}
        footer={null}
        destroyOnClose
        title={
          <span className="text-lg font-bold text-slate-800">
            {edit ? "Update Crypto Trade" : "Add Crypto Trade"}
          </span>
        }
        onCancel={() => {
          setModal(false);
          setEdit(null);
          transactionForm.resetFields();
        }}
      >
        <Form
          layout="vertical"
          form={transactionForm}
          onFinish={edit ? onUpdate : onFinish}
          className="mt-4"
        >
          <Item
            label="Coin Name"
            name="coinName"
            rules={[{ required: true, message: "Please enter coin name" }]}
          >
            <Input placeholder="e.g. Bitcoin, Ethereum, Solana" />
          </Item>

          <Item
            label="Symbol"
            name="symbol"
            rules={[{ required: true, message: "Please enter symbol" }]}
          >
            <Input placeholder="e.g. BTC, ETH, SOL" />
          </Item>

          <Item
            label="Transaction Type"
            name="transactionType"
            rules={[{ required: true, message: "Select BUY or SELL" }]}
          >
            <Select
              options={[
                { label: "BUY", value: "buy" },
                { label: "SELL", value: "sell" },
              ]}
              placeholder="Select Type"
            />
          </Item>

          <Item
            label="Quantity"
            name="quantity"
            rules={[{ required: true, message: "Please enter quantity" }]}
          >
            <Input type="number" step="any" placeholder="e.g. 0.05" />
          </Item>

          <Item
            label="Price Per Unit ($)"
            name="buyPrice"
            rules={[{ required: true, message: "Please enter price per unit" }]}
          >
            <Input type="number" placeholder="e.g. 65000" />
          </Item>

          <Item
            label="Total Amount ($)"
            name="amount"
            rules={[{ required: true, message: "Please enter total amount" }]}
          >
            <Input type="number" placeholder="e.g. 3250" />
          </Item>

          <Item
            label="Payment Method"
            name="paymentMethod"
            initialValue="wallet"
            rules={[{ required: true }]}
          >
            <Select
              options={[
                { label: "Crypto Wallet", value: "wallet" },
                { label: "Bank Transfer", value: "bank" },
                { label: "Card", value: "card" },
              ]}
            />
          </Item>

          <Item label="Notes / Remarks" name="notes">
            <Input.TextArea rows={2} placeholder="Optional notes..." />
          </Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            className="!bg-emerald-600 hover:!bg-emerald-500 !border-none !h-11 font-bold text-base mt-2"
          >
            {edit ? "Update Trade" : "Save Trade"}
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default Transaction;