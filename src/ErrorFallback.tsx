export const ErrorFallback = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-red-600">Oops -  Something went wrong</h1>
      <p className="mt-2 text-gray-700">
        An error occurred while loading the page. Please try again later.
      </p>
    </div>
  );
};
