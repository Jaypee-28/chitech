// components/admin/DashboardLoader.tsx
export const DashboardLoader = () => {
  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="p-4 bg-muted rounded-lg animate-pulse shadow-md h-[100px]"
        >
          <div className="flex justify-between items-center h-full">
            <div className="space-y-2">
              <div className="w-24 h-4 bg-gray-300 rounded" />
              <div className="w-16 h-6 bg-gray-300 rounded" />
            </div>
            <div className="w-10 h-10 bg-gray-300 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
};
