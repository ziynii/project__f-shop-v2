import React from 'react';
import styled from 'styled-components';

interface IPaginationProps {
  total: number;
  limit: number;
  nowPage: number;
  setNowPage: (value: number) => void;
}

const PageNationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 24px 0;
`;

const ArrowBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  background-color: ${(props) => props.theme.colors.border};

  &:hover {
    background-color: ${(props) => props.theme.colors.tertiary};
  }

  &:disabled {
    opacity: 0.5;
    &:hover {
      background-color: ${(props) => props.theme.colors.border};
    }
  }
`;

const PageBtn = styled.button`
  width: 32px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 6px;
  margin: 0 4px;

  &:hover {
    font-weight: 700;
  }

  &[aria-current] {
    font-weight: 700;
  }
`;

export default function Pagination({
  total,
  limit,
  nowPage,
  setNowPage,
}: IPaginationProps) {
  const maxPage = Math.ceil(total / limit);

  return (
    <PageNationWrapper>
      <ArrowBtn
        onClick={() => setNowPage(nowPage - 1)}
        disabled={nowPage === 1}
      >
        <svg
          className="h-6 w-6"
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
      </ArrowBtn>

      {Array(maxPage)
        .fill(1)
        .map((_, i) => (
          <PageBtn
            key={i + 1}
            onClick={() => setNowPage(i + 1)}
            aria-current={nowPage === i + 1 ? 'page' : undefined}
          >
            {i + 1}
          </PageBtn>
        ))}

      <ArrowBtn
        onClick={() => setNowPage(nowPage + 1)}
        disabled={nowPage === maxPage}
      >
        <svg
          className="h-6 w-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          ></path>
        </svg>
      </ArrowBtn>
    </PageNationWrapper>
  );
}
