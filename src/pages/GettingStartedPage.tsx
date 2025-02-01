import TypeAnimationWrapper from '@/components/TypeAnimationWrapper';
import CycleHeader from '@/components/ui/CycleHeader';
import Nav from '@/components/ui/Nav';

function GettingStartedPage(): JSX.Element {
  return (
    <div>
      <Nav />
      <TypeAnimationWrapper duration={6}>
        <CycleHeader
          content={['Welcome to Echoed', 'Open source social media website']}
          delay={6000}
        />
      </TypeAnimationWrapper>
    </div>
  );
}

export default GettingStartedPage;
