import React from 'react';
import styled from 'styled-components';
import { bp } from '../theme';
import CouponForm from './couponForm';

interface IOrderBoxProps {
  setIsOpenOrderBox: (value: boolean) => void;
  isOpenOrderBox: boolean;
}

const ToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: -32px;
  width: 32px;
  height: 56px;
  transform: translateY(-50%);
  background-color: #3f4150;
  border-radius: 8px 0 0 8px;

  svg {
    color: white;
  }

  @media (${bp.desktop}) {
    display: none;
  }
`;

const ContentWrapper = styled.div<{ isOpenOrderBox: boolean }>`
  display: none;
  position: fixed;
  top: 80px;
  right: 0;
  width: 40%;
  height: calc(100% - 80px);
  color: white;
  background-color: #3f4150;
  padding: 12px 24px;
  transform: ${({ isOpenOrderBox }) =>
    isOpenOrderBox ? 'translate3d(0, 0, 0)' : 'translate3d(100%, 0, 0)'};
  transition: transform 200ms ease-in-out;

  h2 {
    text-transform: uppercase;
    margin-bottom: 48px;
  }

  @media (${bp.tablet}) {
    display: flex;
    flex-direction: column;
    justify-content: center;

    ${ToggleButton} {
      svg {
        transform: ${({ isOpenOrderBox }) =>
          isOpenOrderBox ? 'rotate(180deg)' : ''};
      }
    }
  }

  @media (${bp.desktop}) {
    position: relative;
    top: 0;
    height: auto;
    flex-basis: 40%;
    transform: none;
    background-color: #f7f8fa;
    color: black;
    border-left: 1px solid #ddd;
  }
`;

const SummaryInfo = styled.div`
  display: flex;
  justify-content: space-between;

  span {
    font-size: 18px;
    font-weight: 700;
  }
`;

const TotalPrice = styled.div`
  border-top: 1px solid white;
  margin-bottom: 48px;

  dl,
  div {
    display: flex;
    justify-content: space-between;
  }

  div {
    padding-top: 18px;
  }

  span {
    font-size: 14px;
    color: red;
  }

  dl {
    font-size: 18px;
    font-weight: 700;
  }

  @media (${bp.desktop}) {
    border-color: #ddd;
  }
`;

const OrderButton = styled.button`
  width: 100%;
  height: 64px;
  background-color: black;
  color: white;
  border-radius: 8px;
  font-weight: 700;
`;

export default function OrderBox({
  setIsOpenOrderBox,
  isOpenOrderBox,
}: IOrderBoxProps) {
  console.log(isOpenOrderBox);

  return (
    <ContentWrapper isOpenOrderBox={isOpenOrderBox}>
      <h2>summary</h2>

      <SummaryInfo>
        <span>상품 총 1개</span>
        <span>20000000원</span>
      </SummaryInfo>

      <CouponForm />

      <TotalPrice>
        <div>
          <span>[첫구매] 무료배송 쿠폰 적용</span>
          <span>-&#36;3</span>
        </div>

        <dl>
          <dt>TOTAL</dt>
          <dd>200000000원</dd>
        </dl>
      </TotalPrice>
      <OrderButton>주문하기</OrderButton>

      <ToggleButton onClick={() => setIsOpenOrderBox(!isOpenOrderBox)}>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </ToggleButton>
    </ContentWrapper>
  );
}
