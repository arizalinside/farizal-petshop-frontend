import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import TableOne from "../components/Tables/TableOne";
import ButtonComponent from "./UiElements/ButtonComponent";
import AddDialogProduct from "../components/Dialog/AddDialogProduct";
import axios from "axios";
import Loader from "@/common/Loader";
import { FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../redux/store";
import {
  fetchProducts,
  setCurrentPage,
  setItemsPerPage,
  setLoading,
} from "@/redux/slices/productSlice";
import { PRODUCT } from "../types/brand";
import { toast } from "react-toastify";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tables = () => {
  const [open, setOpen] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const {
    dataInventory,
    loading,
    currentPage,
    itemsPerPage,
    totalItems,
    totalPages,
  } = useSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
  }, [dispatch, currentPage, itemsPerPage]);

  const addProduct = () => {
    setOpen(true);
  };

  const handleSave = async (value: {
    product_name: String;
    product_price: Number;
    capital_price: Number;
  }) => {
    try {
      setLoading(true);
      await axios.post(
        `http://localhost:3000/api/products?page=${currentPage}&limit=${itemsPerPage}`,
        value
      );
      dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
      toast.success("Berhasil menambahkan produk", {
        position: "top-center",
        autoClose: 3000,
        theme: "dark",
      });
    } catch (error) {
      console.log("error:", error);
      toast.error("Gagal menambahkan produk", {
        autoClose: 3000,
        position: "top-center",
        theme: "dark",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    const newLimit = value === "all" ? "all" : Number(value);

    // if 'all' limit is selected, reset current page and items per page
    if (newLimit === "all") {
      dispatch(setCurrentPage(1));
      dispatch(setItemsPerPage(newLimit));
      return;
    }

    // calculate new total pages
    const newTotalPages = Math.ceil(totalItems / newLimit);

    // make sure current page doesn't exceed total pages
    if (currentPage > newTotalPages) {
      dispatch(setCurrentPage(1));
    }

    dispatch(setItemsPerPage(newLimit));
  };

  return (
    <>
      <Breadcrumb pageName="Data Produk" />

      <ButtonComponent
        onClick={() => addProduct()}
        buttonText={
          <>
            <FaPlus /> &nbsp; Tambah Penjualan
          </>
        }
      />
      <AddDialogProduct open={open} setOpen={setOpen} onSave={handleSave} />
      <div className="flex flex-col gap-10 pt-5">
        {loading && <Loader />}
        <TableOne />
        <div className="flex md:flex-row flex-col items-center justify-between">
          <div className="flex mb-5 sm:mb-0">
            <p className="md:text-nowrap align-center my-auto me-5">
              Menampilkan{" "}
              {itemsPerPage === "all"
                ? totalItems
                : currentPage * itemsPerPage - itemsPerPage + 1}{" "}
              hingga{" "}
              {itemsPerPage === "all"
                ? totalItems
                : Math.min(currentPage * itemsPerPage, totalItems)}{" "}
              dari {totalItems} produk
            </p>
            <Select
              value={String(itemsPerPage)}
              onValueChange={handleItemsPerPageChange}
            >
              <SelectTrigger className="w-[80px]">
                <SelectValue placeholder={itemsPerPage} />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {[5, 10, 20, 30, 40, 50, "all"].map((item, index) => (
                    <SelectItem key={index} value={String(item)}>
                      {item === "all" ? "All" : item}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Pagination Control */}
          {totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={() =>
                      dispatch(setCurrentPage(Math.max(currentPage - 1, 1)))
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === index + 1}
                      onClick={() => dispatch(setCurrentPage(index + 1))}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalItems >
                  (itemsPerPage === "all" ? totalItems : itemsPerPage) &&
                  totalPages > 3 && (
                    <PaginationItem>
                      <PaginationEllipsis />
                    </PaginationItem>
                  )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={() =>
                      dispatch(
                        setCurrentPage(Math.min(currentPage + 1, totalPages))
                      )
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>
    </>
  );
};

export default Tables;
