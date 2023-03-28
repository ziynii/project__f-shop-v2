import React from 'react';
import styled, { createGlobalStyle, ThemeProvider } from 'styled-components';
import normalize from 'styled-normalize';
import { openSideBarState } from '../../globalState';
import { useRecoilValue } from 'recoil';
import theme from '../../theme';
import Header from './header';
import SideNav from './sideNav';
import ScrollToTop from './scrollToTop';

interface ILayoutProps {
  children: any;
  isDefaultStyle: boolean;
}

const GlobalStyle = createGlobalStyle`
	
	${normalize}

	* {
		box-sizing: border-box
	}

	body {
		font-family: 'Noto Sans KR', sans-serif;
		background-color: ${theme.colors.background};
	}

	ul {
		padding-left: 0;
		margin: 0
	}
	
	li {
		list-style: none;
		margin-left: 0;
	}

	button {
		border: none;
		outline: none;
		cursor:pointer;
	}

  a,
  a:hover {
    color: inherit;
    text-decoration: none;
    cursor: pointer;
	}

	input {
		outline: none;
		border: none;
	}
	
	pre {
    white-space: pre-wrap;     
    white-space: -moz-pre-wrap; 
    white-space: -pre-wrap;     
    white-space: -o-pre-wrap;   
}
`;

const ContentWrapper = styled.div`
  padding-top: ${(props) => props.theme.headerHeight.sm};
  background-color: ${theme.colors.background};

  @media (${theme.bp.tablet}) {
    margin-top: ${(props) => props.theme.headerHeight.lg};
  }
`;

const AlignBox = styled.div`
  @media (${theme.bp.tablet}) {
    max-width: 960px;
    margin: 0 auto;
  }

  @media (${theme.bp.desktop}) {
    max-width: 1140px;
  }
`;

export default function Layout({ children, isDefaultStyle }: ILayoutProps) {
  const openSideBar = useRecoilValue(openSideBarState);
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <ScrollToTop />
      <Header />
      <ContentWrapper>
        {isDefaultStyle === true ? (
          <AlignBox>{children}</AlignBox>
        ) : (
          <div>{children}</div>
        )}
      </ContentWrapper>

      {openSideBar === true ? <SideNav /> : null}
    </ThemeProvider>
  );
}
