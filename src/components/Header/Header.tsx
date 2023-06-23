import './Header.scss';
import unsplashLogo from '../../assets/Unsplash_Logo_Full.png';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header>
      <Link to="/home">
        <img src={unsplashLogo} alt="unsplash.com logo" className="unsplash-logo" />
      </Link>
    </header>
  );
}
