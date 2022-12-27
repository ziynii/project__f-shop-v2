import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
  margin: 48px 0;
`;

const SelectWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
`;

const InputWrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  position: relative;
`;

const InputTitle = styled.label`
  margin: 16px 0;
  font-weight: 700;
`;

const Select = styled.select`
  width: 100%;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.colors.white};

  @media (${(props) => props.theme.bp.desktop}) {
    border-color: ${(props) => props.theme.colors.border};
  }
`;

const Input = styled.input`
  width: 100%;
  padding: 12px 8px;
  background-color: ${(props) => props.theme.colors.white};

  @media (${(props) => props.theme.bp.desktop}) {
    border: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const InputButton = styled.button`
  position: absolute;
  right: 0;
  bottom: 0;
  width: 44px;
  height: 44px;
  background-color: ${(props) => props.theme.colors.dark};

  svg {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default function CouponForm() {
  return (
    <Form>
      <SelectWrapper>
        <InputTitle htmlFor="coupon-select">
          <p>COUPON</p>
        </InputTitle>
        <Select name="coupons" id="coupon-select">
          <option value="select">쿠폰 선택하기</option>
          <option value="free">[첫구매] 무료배송 쿠폰</option>
        </Select>
      </SelectWrapper>

      <InputWrapper>
        <InputTitle htmlFor="code-input">
          <p>CODE</p>
        </InputTitle>
        <Input
          type="text"
          id="code-input"
          className="code"
          placeholder="쿠폰 코드를 입력하세요"
        />
        <InputButton>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            ></path>
          </svg>
        </InputButton>
      </InputWrapper>
    </Form>
  );
}
