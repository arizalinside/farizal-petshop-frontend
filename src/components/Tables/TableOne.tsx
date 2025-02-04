import { PRODUCT } from '../../types/brand';
import { useState, useEffect } from 'react';
import { MdModeEdit } from "react-icons/md";
import EditDialogProduct from '../Dialog/EditDialogProduct';
import axios from 'axios';
import Loader from "../../common/Loader";

// const brandData: BRAND[] = [


//   {
//     logo: BrandOne,
//     name: 'Google',
//     visitors: 3.5,
//     revenues: '5,768',
//     sales: 590,
//     conversion: 4.8,
//   },
//   {
//     logo: BrandTwo,
//     name: 'Twitter',
//     visitors: 2.2,
//     revenues: '4,635',
//     sales: 467,
//     conversion: 4.3,
//   },
//   {
//     logo: BrandThree,
//     name: 'Github',
//     visitors: 2.1,
//     revenues: '4,290',
//     sales: 420,
//     conversion: 3.7,
//   },
//   {
//     logo: BrandFour,
//     name: 'Vimeo',
//     visitors: 1.5,
//     revenues: '3,580',
//     sales: 389,
//     conversion: 2.5,
//   },
//   {
//     logo: BrandFive,
//     name: 'Facebook',
//     visitors: 3.5,
//     revenues: '6,768',
//     sales: 390,
//     conversion: 4.2,
//   },
// ];

const host = 'localhost:3000';

const TableOne = () => {
  const [dataInventory, setDataInventory] = useState<PRODUCT[]>([]);
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchData = () => {
    return axios.get(`http://${host}/api/products`)
  }

  const handleEdit = (id: number) => {
    setOpen(true);
    setProductId(id);
  }

  const handleSave = async (value: { id: string; product_name: string; product_price: number; capital_price: number }) => {
    // hit api update data and call fetchData
    try {
      setLoading(true);
      await axios.put(`http://${host}/api/products/${value.id}`, value);
      const updatedData = await fetchData();
      setDataInventory(updatedData.data.data);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  }

  useEffect(() => {
    fetchData()
      .then((response) => {
        console.log('Response data:', response.data);
        setDataInventory(response.data.data);
      })
      .catch((error) => {
        console.error('Error:', error);
      })
  }, []);

  return (
    <div className="relative">
      {loading && <Loader />}
      <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
        <div className="max-w-full overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-2 text-left dark:bg-meta-4">
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
                    <button onClick={() => handleEdit(product.id)}>
                      <MdModeEdit />
                    </button>
                  </td>
                </tr>
              ))}
              {open && (
                <EditDialogProduct open={open} setOpen={setOpen} onSave={handleSave} productId={productId} />
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default TableOne;
