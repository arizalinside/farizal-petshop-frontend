import Breadcrumb from '../components/Breadcrumbs/Breadcrumb';
import TableOne from '../components/Tables/TableOne';
import ButtonComponent from './UiElements/ButtonComponent';
import AddDialogProduct from '../components/Dialog/AddDialogProduct';
import axios from 'axios';
import Loader from '@/common/Loader';
import { FaPlus } from "react-icons/fa";
import { useState } from "react";
import { PRODUCT } from '../types/brand';
import { toast } from 'react-toastify';
// import TableThree from '../components/Tables/TableThree';
// import TableTwo from '../components/Tables/TableTwo';
// import { Dialog } from '@radix-ui/react-dialog';

const Tables = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [dataInventory, setDataInventory] = useState<PRODUCT[]>([]);

  const fetchData = async () => {
    const response = await axios.get('http://localhost:3000/api/products')
    return response.data.data
  }

  const addProduct = () => {
    setOpen(true);
  }

  const handleSave = async (value: { product_name: String; product_price: Number; capital_price: Number }) => {
    try {
      setLoading(true);
      await axios.post('http://localhost:3000/api/products', value)
      const updatedData = await fetchData();
      setDataInventory(updatedData.data)
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
        />
        {/* <TableTwo />
        <TableThree /> */}
      </div>
    </>
  );
};

export default Tables;
