export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
      <span className="ml-2 text-muted">Processing document...</span>
    </div>
  );
} 