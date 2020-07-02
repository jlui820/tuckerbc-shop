import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectCurrentUser } from '../../redux/user/user.selector';

// import { ReactComponent as Logo } from '../../assets/crown.svg';
import logo from '../../assets/Tuckers.png'

import './header.styles.scss';

const Header = ({ currentUser, hidden }) => (
  <div className='header'>
    <Link className='logo-container' to='/'>
      {/* <Logo className='logo' /> */}
      <img src={logo}  className='logo' alt=""/>
    </Link>
    <div className="icons-container">
      <div className="icons">
        <a href="https://github.com/jlui820/tuckerbc-shop">
          <i class="devicon-github-plain"></i>
        </a>
      </div>
      <div className="icons">
        <a href="https://www.linkedin.com/in/jeffrey-lui820/">
          <i class="devicon-linkedin-plain "></i>
        </a>
      </div>
    </div>
    <div className='options'>
      <Link className='option' to='/shop'>
        SHOP
      </Link>
      <Link className='option' to='/shop'>
        CONTACT
      </Link>
      {currentUser ? (
        <div className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </div>
      ) : (
        <Link className='option' to='/signin'>
          SIGN IN
        </Link>
      )}
      <CartIcon />
    </div>
    {hidden ? null : <CartDropdown />
    }
  </div>
)

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);