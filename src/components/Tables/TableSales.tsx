import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import EditDialogSales from "../Dialog/Sales/EditDialogSales";
import DeleteDialogSales from "../Dialog/Sales/DeleteDialogSales";
import Loader from "@/common/Loader";
import { Sales } from "@/types/sales";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import DateFormat from "../ui/DateFormat";

const TableSales = () => {
  const [openDialogSales, setOpenDialogSales] = useState<boolean>(false);
  const [salesId, setSalesId] = useState<number>(0);

  const {
    dataSales,
    loading,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
  } = useSelector((state: RootState) => state.sales);

  const handleEdit = (id: number) => {
    setOpenDialogSales(true);
    setSalesId(id);
  };

  const handleDelete = (id: number, product_name: string) => {};

  const handleSave = (value: Sales[]) => {};

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="rounded-sm border border-stroke bg-white lg:pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
                <th className="w-[10px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  No.
                </th>
                <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                  Nama Produk
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Waktu Penjualan
                </th>
                <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                  Harga Jual
                </th>
                {/* <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Harga Modal
                </th> */}
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Kuantitas
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Profit
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataSales.map((sales, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <span>
                      {currentPage === 1
                        ? key + 1
                        : (currentPage - 1) *
                            (typeof itemsPerPage === "number"
                              ? itemsPerPage
                              : 5) +
                          key +
                          1}
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <span>{sales.product_name}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <span>
                      <DateFormat dateString={sales.updated_at}></DateFormat>
                    </span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(sales.product_price)}
                    </p>
                  </td>
                  {/* <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(sales.capital_price)}
                    </p>
                  </td> */}
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {sales.quantity}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Intl.NumberFormat("id-ID", {
                        style: "currency",
                        currency: "IDR",
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(sales.profit)}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className="flex">
                      <button
                        className="bg-primary p-2 rounded-sm text-white"
                        onClick={() => handleEdit(sales.id)}
                      >
                        <MdModeEdit />
                      </button>
                      <button
                        className="mx-3 bg-primary p-2 rounded-sm text-white"
                        onClick={() =>
                          handleDelete(sales.id, sales.product_name)
                        }
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {openDialogSales && (
        <EditDialogSales
          open={openDialogSales}
          setOpen={setOpenDialogSales}
          onSave={handleSave}
          salesId={salesId}
        />
      )}
    </div>
  );
};

export default TableSales;
