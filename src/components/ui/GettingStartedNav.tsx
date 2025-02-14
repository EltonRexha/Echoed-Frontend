import lightLogo from '@/assets/images/icons/longLogo.svg';
import darkLogo from '@/assets/images/icons/longLogoDark.svg';
import { Link } from 'react-router-dom';
import Line from './LineAnimation';

export default function GettingStartedNav(): JSX.Element {
  return (
    <nav className="h-full py-5 px-5 sm:px-0 flex gap-4">
      <div className="w-30">
        <Link to="/">
          <div className="hidden dark:block">
            <img src={lightLogo} alt="Logo" />
          </div>
          <div className="block dark:hidden">
            <img src={darkLogo} alt="Logo" />
          </div>
        </Link>
      </div>

      <Link to="/sign-up" className="justify-self-end relative ml-auto">
        <Line color="#560090" height={2}>
          <button className="text-light-secondary dark:text-dark-secondary-darker cursor-pointer pb-1 ">
            Sign up
          </button>
        </Line>
      </Link>
      <Link to="/log-in" className="justify-self-start relative">
        <Line color="#560090" height={2}>
          <button className="text-light-secondary dark:text-dark-secondary-darker cursor-pointer pb-1">
            Log in
          </button>
        </Line>
      </Link>
    </nav>
  );
}
