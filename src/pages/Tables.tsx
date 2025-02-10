import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import ButtonComponent from './UiElements/ButtonComponent';
import AddDialogProduct from '../components/Dialog/AddDialogProduct';
import axios from 'axios';
import Loader from '@/common/Loader';
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { PRODUCT } from '../types/brand';
import { toast } from 'react-toastify';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/pagination";
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';
// import { Dialog } from '@radix-ui/react-dialog';

const Tables = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataInventory, setDataInventory] = useState<PRODUCT[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 3;
  const [totalPages, setTotalPages] = useState<number>(1);
  const [totalItems, setTotalItems] = useState<number>(0);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage])

  const fetchData = async (page: number) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:3000/api/products?page=${page}&limit=${itemsPerPage}`);
      setDataInventory(response.data.data.data);
      console.log(dataInventory, "dataInventory")
      setTotalItems(response.data.data.totalItems);
      setTotalPages(Math.ceil(response.data.data.totalItems / itemsPerPage))
      // return response.data;
    } catch (error) {
      console.error("Error fetching data: ", error);
    } finally {
      setLoading(false);
    }
  }

  const addProduct = () => {
    setOpen(true);
  }

  const handleSave = async (value: { product_name: String; product_price: Number; capital_price: Number }) => {
    try {
      setLoading(true);
      await axios.post(`http://localhost:3000/api/products?page=${currentPage}&limit=${itemsPerPage}`, value)
      fetchData(currentPage)
      toast.success('Berhasil menambahkan produk', {
        position: 'top-center',
        autoClose: 3000,
        theme: 'dark'
      });
    } catch (error) {
      console.log("error:", error);
      toast.error('Gagal menambahkan produk', {
        autoClose: 3000,
        position: 'top-center',
        theme: 'dark'
      })
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  return (
    <>
      <Breadcrumb pageName="Data Penjualan" />

      <ButtonComponent onClick={() => addProduct()} buttonText={<><FaPlus /> &nbsp; Tambah Penjualan</>} />
      <AddDialogProduct open={open} setOpen={setOpen} onSave={handleSave} />
      <div className="flex flex-col gap-10 pt-5">
        {loading && <Loader />}
        <TableOne 
          getAllProduct={fetchData} 
          dataInventory={dataInventory} 
          setDataInventory={setDataInventory} 
          setTotalPages={setTotalPages}
          setTotalItems={setTotalItems}
        />
        {/* <TableTwo />
        <TableThree /> */}
        {/* Pagination Control */}
        {totalPages > 1 && (
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href='#' onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} />
              </PaginationItem>
              {[...Array(totalPages)].map((_, index) => (
                <PaginationItem key={index}>
                  <PaginationLink
                    href='#'
                    isActive={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              {totalItems > itemsPerPage && totalPages > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationNext href='#' onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </>
  );
};

export default Tables;
