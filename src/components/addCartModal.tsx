import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

interface IModalProps {
  setIsModal: (value: boolean) => void;
}

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 600;
  background: rgba(0, 0, 0, 0.4);
`;

const ModalContentWrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 60%;
  max-width: 400px;
  padding: 16px;
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 4px;
`;

const Text = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  margin-bottom: 16px;

  svg {
    height: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Button = styled.button`
  width: 49%;
  padding: 8px;
  font-size: 14px;
  background-color: ${(props) => props.theme.colors.black};
  border: 1px solid ${(props) => props.theme.colors.black};
  border-radius: 4px;
  color: ${(props) => props.theme.colors.white};

  &.go-shop {
    color: ${(props) => props.theme.colors.black};
    background-color: ${(props) => props.theme.colors.white};
  }
`;

export default function AddCartModal({ setIsModal }: IModalProps) {
  return (
    <ModalWrapper>
      <ModalContentWrapper>
        <Text>
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
          상품을 장바구니에 추가했습니다.
        </Text>

        <ButtonGroup>
          <Button>
            <Link to="/cart">장바구니로 이동</Link>
          </Button>
          <Button className="go-shop" onClick={() => setIsModal(false)}>
            쇼핑 계속하기
          </Button>
        </ButtonGroup>
      </ModalContentWrapper>
    </ModalWrapper>
  );
}
