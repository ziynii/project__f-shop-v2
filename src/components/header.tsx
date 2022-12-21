import React from 'react';
import styled from 'styled-components';
import { StaticImage } from 'gatsby-plugin-image';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 24px 16px;
  background-color: white;
  box-shadow: 0 4px 20px rgb(63 65 80 / 30%);
  z-index: 500;
`;

const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
`;

const LogoWrapper = styled.div`
  height: 24px;
`;

const CartButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
`;

export default function Header() {
  return (
    <HeaderWrapper>
      <MenuButton>
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h7"
          ></path>
        </svg>
      </MenuButton>

      <LogoWrapper>
        <StaticImage src="../images/logo.svg" placeholder='none' alt="logo" />
      </LogoWrapper>

      <CartButton>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M10 2a4 4 0 00-4 4v1H5a1 1 0 00-.994.89l-1 9A1 1 0 004 18h12a1 1 0 00.994-1.11l-1-9A1 1 0 0015 7h-1V6a4 4 0 00-4-4zm2 5V6a2 2 0 10-4 0v1h4zm-6 3a1 1 0 112 0 1 1 0 01-2 0zm7-1a1 1 0 100 2 1 1 0 000-2z"
            clipRule="evenodd"
          ></path>
        </svg>
      </CartButton>
    </HeaderWrapper>
  );
}
