import {Link} from 'react-router-dom';

export default function Header(){
    return (
        <header>
        <Link to="/" className="logo">Logo</Link>

        <p><b> Welcome to MiniBlog </b></p>
        <nav>
       
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </nav>
      </header>
    );
}