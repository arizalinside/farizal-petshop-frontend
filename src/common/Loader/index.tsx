const Loader = () => {
  return (
    <div className="fixed top-0 left-0 z-99999 flex h-screen w-full items-center justify-center bg-black/80">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-primary border-t-transparent"></div>
    </div>
  );
};

export default Loader;
