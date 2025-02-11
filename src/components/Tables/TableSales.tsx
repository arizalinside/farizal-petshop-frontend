import Breadcrumb from "../Breadcrumbs/Breadcrumb";
import axios from "axios";
import { useEffect, useState } from "react";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { toast } from "react-toastify";
import EditDialogSales from "../Dialog/Sales/EditDialogSales";
import DeleteDialogSales from "../Dialog/Sales/DeleteDialogSales";
import Loader from "@/common/Loader";
import { Sales } from "@/types/sales";

const TableSales = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [dataSales, setDataSales] = useState<Sales[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number | 'all'>(5);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  const fetchSalesData = async (page: number, limit: number | 'all') => {
    try {
      setLoading(true);
      const url = limit === 'all'
        ? 'http://localhost:3000/api/sales'
        : `http://localhost:3000/api/sales?page=${page}&limit=${limit}`
      const { data } = await axios.get(url);
      setDataSales(data.data.data);
      console.log("response:", data)
      return data.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const handleEdit = (id: number) => {

  }

  const handleDelete = (id: number, product_name: string) => {

  }

  useEffect(() => {
    fetchSalesData(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage])

  return(
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
                  Harga Jual
                </th>
                <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                  Harga Modal
                </th>
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
                    {currentPage === 1 ? 
                      key + 1 : 
                      (currentPage - 1) * (typeof itemsPerPage === 'number' ? itemsPerPage : 5) + key + 1}
                  </span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <span>{sales.product_name}</span>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {
                      new Intl.NumberFormat('id-ID', { 
                      style: 'currency', 
                      currency: 'IDR', 
                      minimumFractionDigits: 0, 
                      maximumFractionDigits: 0 
                      }).format(sales.product_price)
                    }
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {
                      new Intl.NumberFormat('id-ID', { 
                      style: 'currency', 
                      currency: 'IDR', 
                      minimumFractionDigits: 0, 
                      maximumFractionDigits: 0 
                      }).format(sales.capital_price)
                    }
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {sales.quantity}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {
                      new Intl.NumberFormat('id-ID', { 
                      style: 'currency', 
                      currency: 'IDR', 
                      minimumFractionDigits: 0, 
                      maximumFractionDigits: 0 
                      }).format(sales.profit)
                    }
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <div className='flex'>
                    <button className='bg-primary p-2 rounded-sm text-white' onClick={() => handleEdit(sales.id)}>
                      <MdModeEdit />
                    </button>
                    <button className='mx-3 bg-primary p-2 rounded-sm text-white' onClick={() => handleDelete(sales.id, sales.product_name)}>
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
    </div>
  )
}

export default TableSales;
