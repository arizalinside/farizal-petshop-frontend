interface ButtonComponentProps {
  onClick?: () => void;
  buttonText: string | React.ReactNode;
}

const ButtonComponent = ({ onClick, buttonText }: ButtonComponentProps) => {
  return (
    <>
      <div className="flex justify-end">
        <button onClick={onClick} type="submit" className="w-full inline-flex items-center justify-center rounded-full bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:w-auto sm:w-auto xs:w-full lg:px-8 xl:px-10">
          {buttonText}
        </button>
      </div>
    </>
  )
}

export default ButtonComponent;