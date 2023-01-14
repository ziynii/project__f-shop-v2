import React from 'react';
import styled from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  cartItemsState,
  headerGnbState,
  openSideBarState,
} from '../../globalState';

const HeaderWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 0 16px;
  height: ${(props) => props.theme.headerHeight.sm};
  background-color: ${(props) => props.theme.colors.white};
  box-shadow: 0 4px 20px rgb(63 65 80 / 30%);
  z-index: 500;

  @media (${(props) => props.theme.bp.tablet}) {
    height: ${(props) => props.theme.headerHeight.lg};
    padding: 0 32px;
  }
`;

const AlignBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;

  @media (${(props) => props.theme.bp.desktop}) {
    max-width: 1140px;
  }
`;

const MenuButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;

  @media (${(props) => props.theme.bp.tablet}) {
    display: none;
  }
`;

const LogoWrapper = styled.div`
  height: 24px;
`;

const CartButton = styled.button`
  width: 32px;
  height: 32px;
  background-color: transparent;
  position: relative;

  span {
    position: absolute;
    top: -2px;
    right: -2px;
    width: 18px;
    height: 18px;
    color: #fff;
    background-color: #f86d7d;
    border-radius: 50%;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (${(props) => props.theme.bp.tablet}) {
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

const HeaderGnb = styled.div`
  display: none;

  @media (${(props) => props.theme.bp.tablet}) {
    display: block;
  }
`;

const GnbList = styled.ul`
  display: flex;
`;

const GnbItem = styled.li`
  margin: 0 16px;
  font-weight: 800;
  color: ${(props) => props.theme.colors.secondary};

  &.active {
    color: ${(props) => props.theme.colors.primary};
  }

  &:hover {
    color: ${(props) => props.theme.colors.primary};
  }

  @media (${(props) => props.theme.bp.desktop}) {
    font-size: 18px;
  }
`;

export default function Header() {
  const data = useStaticQuery(graphql`
    query HeaderQuery {
      allContentfulCategoryList {
        nodes {
          category
        }
      }
    }
  `);
  const setOpenSideBar = useSetRecoilState(openSideBarState);
  const headerGnb = useRecoilValue(headerGnbState);
  const cartItems = useRecoilValue(cartItemsState);

  return (
    <HeaderWrapper>
      <AlignBox>
        <MenuButton onClick={() => setOpenSideBar(true)}>
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
          <Link to="/">
            <StaticImage
              src="../../images/logo.svg"
              placeholder="none"
              alt="logo"
            />
          </Link>
        </LogoWrapper>
        <HeaderGnb>
          <GnbList>
            {data?.allContentfulCategoryList?.nodes?.map(
              (gnb: { category: string }, i: number) => (
                <GnbItem
                  key={i}
                  className={headerGnb === gnb.category ? 'active' : ''}
                >
                  <Link to={`/products/${gnb.category}`}>
                    {gnb.category.toUpperCase()}
                  </Link>
                </GnbItem>
              )
            )}
          </GnbList>
        </HeaderGnb>
        <CartButton>
          <Link to="/cart">
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
          </Link>
          <span>{cartItems.length > 99 ? '99+' : cartItems.length}</span>
        </CartButton>
      </AlignBox>
    </HeaderWrapper>
  );
}
