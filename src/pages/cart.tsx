import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import CartItem, { priceListType } from '../components/cartItem';
import Layout from '../components/layout';
import OrderBox from '../components/orderBox';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartItemsState, headerGnbState, IProduct } from '../globalState';
import OrderButton from '../components/orderButton';

const PageWrapper = styled.div`
  @media (${(props) => props.theme.bp.desktop}) {
    display: flex;
  }
`;

const ContentWrapper = styled.div`
  height: calc(100vh - ${(props) => props.theme.headerHeight.sm} - 128px);
  padding: 20px 16px;

  @media (${(props) => props.theme.bp.tablet}) {
    height: calc(100vh - ${(props) => props.theme.headerHeight.lg});
  }

  @media (${(props) => props.theme.bp.desktop}) {
    flex-basis: 60%;
  }
`;

const EmptyText = styled.p`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 18px;
    height: 18px;
    margin-right: 4px;
  }
`;

const CartList = styled.ul`
  height: 100%;
  overflow: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const OrderWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: ${(props) => props.theme.colors.background};

  @media (${(props) => props.theme.bp.tablet}) {
    display: none;
  }
`;

const TotalPrice = styled.p`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 24px 16px;
  margin: 0;
  border-top: 2px solid ${(props) => props.theme.colors.border};
  font-weight: 800;
`;

export default function Cart() {
  const [isOpenOrderBox, setIsOpenOrderBox] = useState(false);
  const cartItems = useRecoilValue<IProduct[]>(cartItemsState);
  const [priceList, setPriceList] = useState<priceListType[]>([]);

  const totalPrice = priceList
    ?.map((item) => item.price)
    .reduce((a, b) => a + b, 0);

  const setHeaderGnb = useSetRecoilState(headerGnbState);

  useEffect(() => {
    setHeaderGnb('');
  }, []);
  return (
    <Layout isDefaultStyle={true}>
      <PageWrapper>
        <ContentWrapper>
          {cartItems.length >= 1 ? (
            <CartList>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={item}
                  setPriceList={setPriceList}
                  priceList={priceList}
                />
              ))}
            </CartList>
          ) : (
            <EmptyText>
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z"></path>
              </svg>
              장바구니가 비었습니다
            </EmptyText>
          )}
        </ContentWrapper>
        <OrderWrapper>
          <TotalPrice>총 결제금액: {totalPrice}</TotalPrice>
          <OrderButton />
        </OrderWrapper>
        <OrderBox
          setIsOpenOrderBox={setIsOpenOrderBox}
          isOpenOrderBox={isOpenOrderBox}
          totalPrice={totalPrice}
        />
      </PageWrapper>
    </Layout>
  );
}
