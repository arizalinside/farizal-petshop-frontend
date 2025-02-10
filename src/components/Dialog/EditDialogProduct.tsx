import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import axios from "axios";
import ButtonComponent from "@/pages/UiElements/ButtonComponent";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from "@/components/ui/dialog"

interface EditDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (value: { id: string; product_name: string; product_price: number; capital_price: number }) => void;
  productId: number;
}

interface Product {
  id: string;
  product_name: string;
  product_price: number;
  capital_price: number;
}

const EditDialogProduct = ({ open, setOpen, onSave, productId }: EditDialogProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSelectedProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/products')
        const data: Product[] = response.data.data.data;

        const foundProduct = data.find((product) => product.id == String(productId));
        if (foundProduct) {
          setSelectedProduct(foundProduct);
        }
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSelectedProduct();
  }, [productId, open]);

  const handleNameChange = (value: string) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        product_name: value
      });
    }
  }

  const handlePriceChange = (field: "product_price" | "capital_price", value: number) => {
    if (selectedProduct) {
      setSelectedProduct({
        ...selectedProduct,
        [field]: value,
      })
    }
  }
  
  return (
    <div className="relative">
      {loading && <Loader />}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Data Produk</DialogTitle>
            <DialogDescription>Silahkan edit data produk di bawah ini.</DialogDescription>
          </DialogHeader>

          <form
            className="space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
              if (selectedProduct) {
                onSave({
                  id: selectedProduct.id,
                  product_name: selectedProduct.product_name,
                  product_price: selectedProduct.product_price,
                  capital_price: selectedProduct.capital_price
                })
              }
              setOpen(false);
            }}
          >
            <div>
              <label>Nama Produk</label>
              <input
                type="text"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                value={selectedProduct ? selectedProduct.product_name : ""}
                onChange={(e) => handleNameChange(e.target.value)}
              />
            </div>
            <div>
              <label>Harga Jual</label>
              <input 
                type="number"
                placeholder="Masukkan harga jual produk"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                value={selectedProduct ? selectedProduct.product_price : ""}
                onChange={(e) => handlePriceChange("product_price", Number(e.target.value))}
              />
            </div>
            <div>
              <label>Harga Modal</label>
              <input 
                type="number"
                placeholder="Masukkan harga modal produk"
                className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                value={selectedProduct ? selectedProduct.capital_price : ""}
                onChange={(e) => handlePriceChange("capital_price", Number(e.target.value))}
              />
            </div>
            {/* <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Simpan
            </button> */}
            <ButtonComponent buttonText="Simpan" />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditDialogProduct