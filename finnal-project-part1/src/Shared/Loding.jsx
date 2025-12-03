const Loding = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        {/* Spinner */}
        <div className="w-15 h-15 border-4 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>

        {/* Text */}
        <p className="text-lg font-semibold text-gray-700 mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default Loding;
