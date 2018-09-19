import React, { Component } from 'react'
import { inject, observer } from 'mobx-react'
import { compose } from 'recompose'
import { FormattedMessage } from 'react-intl'
import * as Values from '../../../constants/Values'

import { Dropdown, MenuItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'

import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap'
import { Link } from 'react-router-dom'
import './Header.scss'
import './HeaderMenuLinks.scss'

import RippleRun from '../../Ripple/Ripple.run'

class Header extends Component {
  constructor(props) {
    super(props)

    this.toggle = this.toggle.bind(this)
    this.state = {
      isOpen: false
    }
  }

  componentDidMount() {
    RippleRun()
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    })
  }

  onLoginClick = async () => {
    try {
      const { accountStore } = this.props

      const result = await accountStore.login()

      if (!result) {
        alert('need install scatter')
      }
    } catch (e) {
      // todo - error handle
      // 423 Locked
      if (e.code === Values.SCATTER_ERROR_LOCKED) {
        alert('Locked')
      }
    }
  }

  onLogoutClick = async () => {
    const { accountStore } = this.props

    await accountStore.logout()
  }

  render() {
    const { accountStore } = this.props

    return (
      <header className="header-container" style={{ marginLeft: '0px' }}>
        <nav>
          <ul className="visible-xs visible-sm">
            <li>
              <a id="sidebar-toggler" href="#" className="menu-link menu-link-slide">
                <span>
                  <em />
                </span>
              </a>
            </li>
          </ul>
          <ul className="hidden-xs">
            <li>
              <a id="offcanvas-toggler" href="#" className="menu-link menu-link-slide">
                <span>
                  <em />
                </span>
              </a>
            </li>
          </ul>
          <h2 className="header-title">
            <Link to="/trades/karma" style={{ color: 'white' }}>
              <i className="ti-user" />
              <FormattedMessage id="EXCHANGE" />
            </Link>
          </h2>

          <ul className="pull-right">
            <li>
              {accountStore.isLogin ? (
                <a className="ripple" onClick={this.onLogoutClick}>
                  <h5>{accountStore.loginAccountInfo.account_name}</h5>
                </a>
              ) : (
                <a className="ripple" onClick={this.onLoginClick}>
                  <h5>
                    <FormattedMessage id="SignIn" />
                  </h5>
                </a>
              )}
            </li>
            <Dropdown id="basic-nav-dropdown" pullRight componentClass="li">
              <Dropdown.Toggle useAnchor noCaret className="has-badge ripple">
                <FormattedMessage id="LANG" />
              </Dropdown.Toggle>
              <Dropdown.Menu className="md-dropdown-menu">
                <LinkContainer to="pages/profile">
                  <MenuItem eventKey={3.1}>
                    <em className="ion-home icon-fw" />
                    ko-KR
                  </MenuItem>
                </LinkContainer>
                <LinkContainer to="pages/messages">
                  <MenuItem eventKey={3.2}>
                    <em className="ion-gear-a icon-fw" />
                    en-US
                  </MenuItem>
                </LinkContainer>
              </Dropdown.Menu>
            </Dropdown>
          </ul>
        </nav>
      </header>
    )
  }
}

export default compose(
  inject('accountStore'),
  observer
)(Header)
