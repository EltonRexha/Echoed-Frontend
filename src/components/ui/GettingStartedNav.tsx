import logo from '@/assets/images/icons/longLogo.svg';
import { Link } from 'react-router-dom';
import Line from './LineAnimation';

export default function GettingStartedNav(): JSX.Element {
  return (
    <nav className="h-10 pt-3 flex gap-4">
      <div className="w-30">
        <Link to="/">
          <img src={logo} alt="Logo" />
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
