import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectGroupOne from '../../components/Forms/SelectGroup/SelectGroupOne';
import ButtonComponent from '../UiElements/ButtonComponent';
import axios from 'axios';
import Loader from "../../common/Loader";
import TableSales from "@/components/Tables/TableSales";
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  product_name: string;
}

const FormElements = () => {
  const [options, setOptions] = useState<{ value: string; label: string }[]>([]);
  const [dataProduct, setDataProduct] = useState<{ id: string; product_name: string; product_price: number }[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [productPrice, setProductPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleProductChange = (selectedOption: { value: string; label: string }) => {
    setSelectedProductId(selectedOption.value);
    const selectedProduct = dataProduct.find(product => product.id == selectedOption.value);
    setProductPrice(selectedProduct ? selectedProduct.product_price : null);
  };

  const handleQuantityChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setQuantity(value && parseInt(value) > 0 ? parseInt(value) : null);
  };

  const handleSubmit = async () => {
    if (selectedProductId && productPrice !== null && quantity !== null) {
      const payload = {
        product_id: selectedProductId,
        quantity: quantity,
        product_price: productPrice,
      };

      try {
        const response = await axios.post('http://localhost:3000/api/sales', payload);
        console.log('Response:', response.data.data);
      } catch (error) {
        console.error('Error:', error);
      }
    } else {
      toast.warn('Silakan pilih produk dan masukkan kuantitas', { position: 'top-center', autoClose: 3000, theme: 'dark' });
      console.log('Please select a product and enter a quantity.');
    }
  }

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:3000/api/products');
        const data = await response.json();
        setDataProduct(data.data.data)
        // console.log("data:", data)

        const formattedOptions = data.data.data.map((item: Product) => ({
          value: item.id,
          label: item.product_name,
        }))

        setOptions(formattedOptions);
      } catch (error) {
        console.error('Error fetching options:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchOptions();
  }, [])

  return loading ? <Loader /> : (
    <>
      <Breadcrumb pageName="Input Penjualan" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-1">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="gap-4 rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Form Input Penjualan
              </h3>
            </div>
            <div className="flex flex-col grid lg:grid-cols-3 gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Nama Produk
                </label>
                <SelectGroupOne label="Pilih produk" options={options} onChange={handleProductChange} value={undefined} />
              </div>

              <div>
                <label className="mb-3 block font-medium text-black dark:text-white">
                  Harga produk
                </label>
                <input
                  type="text"
                  value={productPrice !== null ? productPrice : ''}
                  placeholder='Pilih produk terlebih dahulu'
                  disabled
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary dark:disabled:bg-black"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Kuantitas
                </label>
                <input
                  type="number"
                  placeholder="Berapa kuantitas"
                  value={quantity != null ? quantity : ''}
                  onChange={handleQuantityChange}
                  min="1"
                  className="w-full rounded-lg border-[1.5px] border-primary bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:bg-form-input dark:text-white"
                />
              </div>
            </div>
            <div className="px-6.5 pb-6.5">
              <ButtonComponent onClick={handleSubmit} buttonText='Konfirmasi' />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <TableSales />
        </div>
      </div>
    </>
  );
};

export default FormElements;
