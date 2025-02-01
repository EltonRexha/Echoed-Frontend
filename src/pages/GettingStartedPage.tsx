import CycleHeader from '@/components/ui/CycleHeader';
import Nav from '@/components/ui/Nav';

function GettingStartedPage(): JSX.Element {
  return (
    <div>
      <Nav />
      <CycleHeader content={['Welcome to Echoed', 'Open source social media website']} delay={2000} />
    </div>
  );
}

export default GettingStartedPage;
