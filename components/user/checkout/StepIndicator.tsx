type Props = {
  currentStep: number;
};

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex items-center justify-center gap-6 mt-6">
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm font-semibold ${
            currentStep === 1
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          1
        </div>
        <span className="text-sm hidden sm:inline">User Details</span>
      </div>
      <div className="h-0.5 w-10 bg-gray-300" />
      <div className="flex items-center gap-2">
        <div
          className={`w-8 h-8 rounded-full flex items-center justify-center border text-sm font-semibold ${
            currentStep === 2
              ? "bg-black text-white"
              : "bg-gray-200 text-gray-600"
          }`}
        >
          2
        </div>
        <span className="text-sm hidden sm:inline">Payment Method</span>
      </div>
    </div>
  );
}
