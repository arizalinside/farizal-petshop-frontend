interface SubmitButtonProps {
  onClick: () => Promise<void>;
}

const SubmitButton = ({ onClick }: SubmitButtonProps) => {
  return (
    <>
      <div className="flex justify-end">
        <button onClick={onClick} type="submit" className="w-full inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:w-32 sm:w-32 xs:w-full lg:px-8 xl:px-10">
          Konfirmasi
        </button>
      </div>
    </>
  )
}

export default SubmitButton;