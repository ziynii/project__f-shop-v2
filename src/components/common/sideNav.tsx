import { graphql, Link, useStaticQuery } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { openSideBarState } from '../../globalState';

const SideNavWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 500;
  background-color: ${(props) => props.theme.colors.dark};
`;

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const NavItem = styled.li`
  padding: 16px 0;

  h2 {
    font-size: 36px;
    color: ${(props) => props.theme.colors.white};
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 48px;
  right: 36px;
  width: 36px;
  height: 24px;
  color: ${(props) => props.theme.colors.white};
  background-color: transparent;
`;

export default function SideNav() {
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

  return (
    <SideNavWrapper>
      <NavList>
        {data?.allContentfulCategoryList?.nodes?.map(
          (gnb: { category: string }, i: number) => (
            <NavItem key={i} onClick={() => setOpenSideBar(false)}>
              <Link to={`/products/${gnb.category}`}>
                <h2>{gnb.category.toUpperCase()}</h2>
              </Link>
            </NavItem>
          )
        )}
      </NavList>

      <CloseBtn onClick={() => setOpenSideBar(false)}>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          ></path>
        </svg>
      </CloseBtn>
    </SideNavWrapper>
  );
}
