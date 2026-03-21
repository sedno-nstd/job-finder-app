export const FullPageLoader = ({
  message = "Loading...",
}: {
  message?: string;
}) => (
  <div className="flex flex-col items-center justify-center min-h-[400px] w-full gap-4">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
    <p className="text-gray-500 font-medium animate-pulse">{message}</p>
  </div>
);
