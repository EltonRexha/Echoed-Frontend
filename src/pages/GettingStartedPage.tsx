import SlideAnimation from '@/components/SlideAnimation';
import TypeAnimationWrapper from '@/components/TypeAnimationWrapper';
import CycleHeader from '@/components/ui/CycleHeader';
import GettingStartedNav from '@/components/ui/GettingStartedNav';
import { Link } from 'react-router-dom';
import Line from '@/components/ui/LineAnimation';
import ViewMore from '@/components/ui/viewMore';


function GettingStartedPage(): JSX.Element {
  return (
    <div className="overflow-x-hidden">
      <div className="min-h-[100vh] bg-mountain pl-10 relative">
        <SlideAnimation duration={0.5} delay={0} bgColor="#7700c6" />
        <SlideAnimation duration={0.5} delay={0.1} bgColor="#560090" />
        <GettingStartedNav />
        <div className="p-5 mt-5 h-36 bg-slate-600 border-slate-500 border-2 w-[550px] text-gray-100">
          <TypeAnimationWrapper duration={6} backgroundClr="#475569">
            <CycleHeader
              content={['Welcome to Echoed', 'Open source']}
              delay={6000}
            />
          </TypeAnimationWrapper>
          <TypeAnimationWrapper duration={6} backgroundClr="#475569">
            <CycleHeader content={['', 'Social Media website']} delay={6000} />
          </TypeAnimationWrapper>
        </div>
        <div>
          <p className="text-md mt-10 text-gray-400 font-mono">
            A Place To Share Your Ideas, Create Firends,{' '}
            <span className="text-purple-500">And Go Open.</span>
          </p>
        </div>
        <div className="mt-10 text-purple-300 text-3xl font-mono w-max">
          <Line color="#560090" height={2}>
            <Link to="/sign-up">
              <p>Get started</p>
            </Link>
          </Line>
        </div>
        <ViewMore to="#example"/>
      </div>
      <div className="min-h-[100vh] bg-purple-700 pl-10" id="example"></div>
    </div>
  );
}

export default GettingStartedPage;
