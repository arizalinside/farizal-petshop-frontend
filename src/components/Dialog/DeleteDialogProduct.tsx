import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog"
import axios from "axios";
import { PRODUCT } from "@/types/brand";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import { fetchProducts, setCurrentPage, setItemsPerPage } from "@/redux/slices/productSlice";

interface DeleteDialogProps {
  deleteAlert: boolean;
  setDeleteAlert: React.Dispatch<React.SetStateAction<boolean>>;
  dataProduct: { id: number; product_name: string };
}

const DeleteDialogProduct = ({ deleteAlert, setDeleteAlert, dataProduct }: DeleteDialogProps) => {
  const { currentPage, itemsPerPage } = useSelector((state: RootState) => state.products);
  const dispatch = useDispatch<AppDispatch>();

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3000/api/products/${dataProduct.id}`)
      await dispatch(fetchProducts({ page: currentPage, limit: itemsPerPage }));
      toast.success(`Berhasil menghapus ${dataProduct.product_name}`, {
        autoClose: 3000,
        position: 'top-center',
        theme: 'dark'
      });
    } catch (error) {
      console.error("Gagal menghapus produk", error);
      toast.error(`Gagal menghapus ${dataProduct.product_name}`, {
        autoClose: 3000,
        position: 'top-center',
        theme: 'dark'
      });
    } finally {
      setDeleteAlert(false);
    }
  }

  return (
    <AlertDialog open={deleteAlert} onOpenChange={setDeleteAlert}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Kamu yakin ingin menghapus {dataProduct.product_name}?</AlertDialogTitle>
          <AlertDialogDescription>
            Setelah produk dihapus, produk tidak dapat dipulihkan kembali.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Batal</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Ya, hapus</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteDialogProduct