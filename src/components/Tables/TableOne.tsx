import { PRODUCT } from '../../types/brand';
import { useState, useEffect } from 'react';
import { MdDelete, MdModeEdit } from "react-icons/md";
import { toast } from 'react-toastify';
import EditDialogProduct from '../Dialog/EditDialogProduct';
import DeleteDialogProduct from '../Dialog/DeleteDialogProduct';
import axios from 'axios';
import Loader from "../../common/Loader";

const host = 'localhost:3000';

interface TableOneProps {
  getAllProduct: (page: number, limit: number) => Promise<any>
  dataInventory: PRODUCT[]; 
  setDataInventory: React.Dispatch<React.SetStateAction<PRODUCT[]>>;
  setTotalPages: React.Dispatch<React.SetStateAction<number>>
  setTotalItems: React.Dispatch<React.SetStateAction<number>>
  currentPage: number;
  itemsPerPage: any;
}

const TableOne = ({getAllProduct, dataInventory, setDataInventory, setTotalPages, setTotalItems, currentPage, itemsPerPage}: TableOneProps) => {
  const [open, setOpen] = useState(false);
  const [deleteAlert, setDeleteAlert] = useState(false);
  const [productId, setProductId] = useState(0);
  const [oneProduct, setOneProduct] = useState<{id: number, product_name: string} | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleEdit = (id: number) => {
    setOpen(true);
    setProductId(id);
  }
  const handleDelete = (id: number, product_name: string) => {
    setDeleteAlert(true);
    setOneProduct({ id, product_name });
  }

  const handleSave = async (value: { id: string; product_name: string; product_price: number; capital_price: number }) => {
    try {
      setLoading(true);
      await axios.put(`http://${host}/api/products/${value.id}`, value);
      const updatedData = await getAllProduct(currentPage, itemsPerPage);
      setDataInventory(updatedData.data.data);
      toast.success(`Berhasil mengubah data produk`, {
        autoClose: 3000,
        position: 'top-center',
        theme: 'dark'
      })
    } catch (error) {
      console.error('Error:', error);
      toast.error('Gagal mengubah data produk', {
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
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Profit
                </th>
                <th className="py-4 px-4 font-medium text-black dark:text-white">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {dataInventory.map((product, key) => (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <span>{currentPage === 1 ? key + 1 : (currentPage - 1) * itemsPerPage + key + 1}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <span>{product.product_name}</span>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {
                        new Intl.NumberFormat('id-ID', { 
                        style: 'currency', 
                        currency: 'IDR', 
                        minimumFractionDigits: 0, 
                        maximumFractionDigits: 0 
                        }).format(product.product_price)
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
                        }).format(product.capital_price)
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
                        }).format(product.profit)
                      }
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <div className='flex'>
                      <button className='bg-primary p-2 rounded-sm text-white' onClick={() => handleEdit(product.id)}>
                        <MdModeEdit />
                      </button>
                      <button className='mx-3 bg-primary p-2 rounded-sm text-white' onClick={() => handleDelete(product.id, product.product_name)}>
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
      
      {open && (
        <EditDialogProduct open={open} setOpen={setOpen} onSave={handleSave} productId={productId} />
      )}
      {deleteAlert && oneProduct && (
        <DeleteDialogProduct 
          deleteAlert={deleteAlert} 
          setDeleteAlert={setDeleteAlert} 
          dataProduct={oneProduct} 
          getAllProduct={getAllProduct}
          setDataInventory={setDataInventory}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
        />
      )}
    </div>
  );
};

export default TableOne;
