import TypeAnimationWrapper from '@/components/TypeAnimationWrapper';
import CycleHeader from '@/components/ui/CycleHeader';
import Nav from '@/components/ui/Nav';

function GettingStartedPage(): JSX.Element {
  return (
    <div>
      <Nav />
      <div className="h-[95vh] bg-mountain">
        <div className="ml-10 pt-4">
          <TypeAnimationWrapper duration={6} backgroundClr="#140021">
            <CycleHeader
              content={['Welcome to Echoed', 'Open source']}
              delay={6000}
            />
          </TypeAnimationWrapper>
          <TypeAnimationWrapper duration={6.1} backgroundClr="#140021">
            <CycleHeader content={['', 'Social Media website']} delay={6100} />
          </TypeAnimationWrapper>
        </div>
      </div>
    </div>
  );
}

export default GettingStartedPage;
