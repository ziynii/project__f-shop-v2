import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import { useResetRecoilState } from 'recoil';
import { cartItemsState } from '../globalState';

const OrderBtn = styled(Link)`
  width: 100%;
  height: 64px;
  background-color: ${(props) => props.theme.colors.dark};
  color: ${(props) => props.theme.colors.white};
  border-radius: 8px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;

  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default function OrderButton() {
  const resetCartItems = useResetRecoilState(cartItemsState);

  return (
    <OrderBtn to="/success" onClick={resetCartItems}>
      주문하기
    </OrderBtn>
  );
}
