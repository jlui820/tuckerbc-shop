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


import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv, Icons, IconsContainer } from './header.styles';

const Header = ({ currentUser, hidden }) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      {/* <Logo className='logo' /> */}
      <img src={logo}  className='logo' alt=""/>
    </LogoContainer>
    <IconsContainer>
      <Icons>
        <a href="https://github.com/jlui820/tuckerbc-shop">
          <i class="devicon-github-plain"></i>
        </a>
      </Icons>
      <icon>
        <a href="https://www.linkedin.com/in/jeffrey-lui820/">
          <i class="devicon-linkedin-plain "></i>
        </a>
      </icon>
    </IconsContainer>
    <OptionsContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {currentUser ? (
        <OptionDiv className='option' onClick={() => auth.signOut()}>
          SIGN OUT
        </OptionDiv>
      ) : (
        <OptionLink to='/signin'>
          SIGN IN
        </OptionLink>
      )}
      <CartIcon />
    </OptionsContainer>
    {hidden ? null : <CartDropdown />
    }
  </HeaderContainer>
)

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
})

export default connect(mapStateToProps)(Header);