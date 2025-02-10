import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"
import ButtonComponent from "@/pages/UiElements/ButtonComponent";

interface AddDialogProduct {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (value: { product_name: string; product_price: number; capital_price: number; }) => void;
}

interface Product {
  product_name: string;
  product_price: number;
  capital_price: number;
}

const AddDialogProduct = ({ open, setOpen, onSave }: AddDialogProduct) => {
  const [dataProduct, setDataProduct] = useState<Product>({
    product_name: '',
    product_price: 0,
    capital_price: 0
  });
  const [loading, setLoading] = useState<boolean>(false);

  return (
    <div className="relative">
      {loading && <Loader />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Tambah Product</DialogTitle>
            <DialogDescription>Silahkan isi data produk di bawah ini.</DialogDescription>
          </DialogHeader>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!dataProduct) return;
              onSave({
                product_name: dataProduct.product_name,
                product_price: dataProduct.product_price,
                capital_price: dataProduct.capital_price
              })
            }}
          >
            <div>
              <label>Nama Produk</label>
              <input
                type="text"
                placeholder="Masukkan nama produk"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                onChange={(e) => setDataProduct({ ...dataProduct, product_name: e.target.value })}
              />
            </div>
            <div className="py-3">
              <label>Harga Jual</label>
              <input 
                type="number"
                placeholder="Masukkan harga jual produk"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                onChange={(e) => setDataProduct({ ...dataProduct, product_price: Number(e.target.value)})}
              />
            </div>
            <div className="pb-5">
              <label>Harga Modal</label>
              <input 
                type="number"
                placeholder="Masukkan harga modal produk"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                onChange={(e) => setDataProduct({ ...dataProduct, capital_price: Number(e.target.value)})}
              />
            </div>
            <ButtonComponent buttonText="Simpan" />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddDialogProduct;