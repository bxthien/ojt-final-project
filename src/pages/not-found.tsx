const NotFound = () => {
  return (
    <div className="container w-screen h-screen">
      <div className="flex flex-col items-center justify-center w-full h-full gap-5">
        <div className="text-3xl font-semibold">Page Under Development</div>
        <div className="text-lg">
          This page is currently under development. Please check back later.
        </div>
        <img
          src="https://png.pngtree.com/png-clipart/20190520/original/pngtree-cartoon-style-cute-style-construction-worker-cartoon-construction-worker-png-image_3946320.jpg"
          alt="Under Development"
          className="mt-5 w-32 h-32"
        />
      </div>
    </div>
  );
};

export default NotFound;
