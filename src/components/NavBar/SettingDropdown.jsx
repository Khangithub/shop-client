import React from 'react';
import './_settingDropdown.scss';
import {Image, NavDropdown} from 'react-bootstrap';

function SettingDropdown({currentUser, billList}) {
  return (
    <NavDropdown
      className="setting-dropdown"
      title={
        <span className="setting-dropdown-title">
          <span>Hello, {currentUser ? currentUser.role : 'Sign in'}</span>
          <br />
          <span>{currentUser ? currentUser.username : 'Guest'}</span>
        </span>
      }
    >
      {currentUser && currentUser.role !== 'client' && (
        <NavDropdown.Item
          href="/yourProducts"
          className="setting-dropdown-item"
        >
          <span className="setting-dropdown-item--title">
            Your Product List
          </span>
        </NavDropdown.Item>
      )}

      {currentUser && currentUser.role !== 'client' && (
        <NavDropdown.Item className="setting-dropdown-item" href="/yourBills">
          <span className="setting-dropdown-item--title">
            Your Order List
          </span>
          <span className="setting-dropdown-item--length">
            {billList ? billList.length : 'loading'}
          </span>
        </NavDropdown.Item>
      )}

      {currentUser && (
        <NavDropdown.Item
          className="setting-dropdown-item"
          href="/personalize"
        >
          <span className="setting-dropdown-item--title">Personalize</span>

          {currentUser && (
            <Image
              src={currentUser.avatar}
              className="setting-dropdown-item-img"
              roundedCircle
            />
          )}
        </NavDropdown.Item>
      )}

      <NavDropdown.Item
        className="setting-dropdown-item setting-dropdown-user-btn"
        href="/login"
      >
        <span className="setting-dropdown-item--title">Log in</span>
      </NavDropdown.Item>

      <NavDropdown.Item
        className="setting-dropdown-item setting-dropdown-user-btn"
        href="/signup"
      >
        <span className="setting-dropdown-item--title">Sign up</span>
      </NavDropdown.Item>
    </NavDropdown>
  );
}

export default SettingDropdown;
