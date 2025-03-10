import CycleComponents from '@/components/ui/CycleComponents';
import { Loader } from '@/components/ui/Loader';

function LoadingPage() {
  return (
    <div className="flex flex-col items-center h-[100vh] justify-center bg-light-background dark:bg-purple-shade-400">
      <div className="flex flex-col gap-2">
        <Loader size='lg' />
        <CycleComponents delay={2000}>
          <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-xl">
            Getting things ready...
          </h1>
          <h1 className="text-light-primary-text dark:text-dark-primary-text font-bold text-xl">
            Almost there...
          </h1>
        </CycleComponents>
      </div>
    </div>
  );
}

export default LoadingPage;
