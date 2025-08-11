import { Sales } from "@/types/sales";
import SelectGroupOne from "@/components/Forms/SelectGroup/SelectGroupOne";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from "@/components/ui/dialog";

interface EditDialogSalesProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSave: (value: Sales[]) => void;
  salesId: number;
}

const EditDialogSales = ({ open, setOpen, onSave, salesId }: EditDialogSalesProps) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Penjualan</DialogTitle>
          <DialogDescription>
            Silahkan edit data sales di bawah ini
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSave([]);  // Tambahkan data yang akan disimpan
        }}>
          <div>
            <label className="mb-2.5 block text-black dark:text-white">
              Nama Produk
            </label>
            <SelectGroupOne label="Pilih produk" options={[]} onChange={() => {}} value={undefined} />
          </div>
          <div>
            
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialogSales;