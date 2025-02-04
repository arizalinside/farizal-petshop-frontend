import { useEffect, useState } from "react";
import Loader from "../../common/Loader";
import axios from "axios";
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
  // let inputValue = "";
  
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [dataProduct, setDataProduct] = useState<{ id: string; product_name: string; product_price: number, capital_price: number; }[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchSelectedOptions = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3000/api/products')
        const data: Product[] = response.data.data;
        console.log(data, "data")
        
        // const formattedOptions = data.map((product) => ({
        //   value: product.id,
        //   label: product.product_name
        // }))
        
        // setOptions(formattedOptions);
        // setDataProduct(data);
        // setSelectedProduct(data);

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

    fetchSelectedOptions();
  }, [productId, open]);

  const handleProductChange = (selectedOption: { value: string; label: string }) => {
    const found = dataProduct.find((product) => product.id == selectedOption.value);
    if (found) {
      setSelectedProduct(found);
    }
  }

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
            <DialogTitle>Edit Data</DialogTitle>
            <DialogDescription>Silahkan edit data di bawah ini.</DialogDescription>
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
              {/* <SelectGroupOne 
                label="Pilih produk" 
                options={options} 
                onChange={handleProductChange} 
                value={selectedProduct ? selectedProduct.id : ""} 
                readOnly
              /> */}
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
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Simpan
            </button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default EditDialogProduct