import SlideAnimation from '@/components/SlideAnimation';
import TypeAnimationWrapper from '@/components/TypeAnimationWrapper';
import CycleHeader from '@/components/ui/CycleHeader';
import GettingStartedNav from '@/components/ui/GettingStartedNav';

function GettingStartedPage(): JSX.Element {
  return (
    <div className="overflow-x-hidden">
      <GettingStartedNav />
      <SlideAnimation duration={0.5} delay={0} bgColor="#7700c6" />
      <SlideAnimation duration={0.5} delay={0.1} bgColor="#560090" />

      <div className="h-[95vh] bg-mountain">
        <div className="ml-10 pt-4 h-32">
          <TypeAnimationWrapper duration={6} backgroundClr="#140021">
            <CycleHeader
              content={['Welcome to Echoed', 'Open source']}
              delay={6000}
            />
          </TypeAnimationWrapper>
          <TypeAnimationWrapper duration={6} backgroundClr="#140021">
            <CycleHeader content={['', 'Social Media website']} delay={6000} />
          </TypeAnimationWrapper>
        </div>
        <div>
          <p className="text-md ml-10 mt-10 text-gray-500 font-sans">
            A place to share your ideas, Create firends,{' '}
            <span className="text-purple-500">Go open.</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default GettingStartedPage;
