import { Loader } from '@/components/ui/Loader';

function LoadingPage() {
  return (
    <div className="flex flex-col items-center h-[100vh] justify-center bg-light-background dark:bg-purple-shade-400">
      <div className="flex flex-col gap-2">
        <Loader size="lg" />
      </div>
    </div>
  );
}

export default LoadingPage;
