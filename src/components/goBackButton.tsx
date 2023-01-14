import React from 'react';
import styled from 'styled-components';
import { navigate } from 'gatsby';

const Btn = styled.button`
  position: fixed;
  top: calc(${(props) => props.theme.headerHeight.sm} + 16px);
  left: 12px;
  width: 32px;
  height: 32px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.dark};
  cursor: pointer;
  z-index: 100;
  border-radius: 4px;

  @media (${(props) => props.theme.bp.tablet}) {
    top: calc(${(props) => props.theme.headerHeight.lg} + 16px);
  }

  @media (${(props) => props.theme.bp.desktop}) {
    display: none;
  }
`;

export default function GoBackButton() {
  return (
    <Btn onClick={() => navigate(-1)}>
      <svg
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M7 16l-4-4m0 0l4-4m-4 4h18"
        ></path>
      </svg>
    </Btn>
  );
}
