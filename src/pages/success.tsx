import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/common/layout';
import Seo from '../components/common/Seo';

const ContentWrapper = styled.div`
  height: calc(100vh - ${(props) => props.theme.headerHeight.sm});
  padding: 20px 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (${(props) => props.theme.bp.tablet}) {
    height: calc(100vh - ${(props) => props.theme.headerHeight.lg});
  }
`;

const Text = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  margin-bottom: 16px;

  svg {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }
`;

const HomeLink = styled(Link)`
  padding: 8px 16px;
  background-color: ${(props) => props.theme.colors.dark};
  color: ${(props) => props.theme.colors.white};
  font-size: 14px;
  border-radius: 4px;

  &:hover {
    color: ${(props) => props.theme.colors.white};
  }
`;

export default function Success() {
  return (
    <Layout isDefaultStyle={true}>
      <ContentWrapper>
        <Text>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            ></path>
          </svg>
          주문이 완료되었습니다.
        </Text>
        <HomeLink to="/">홈으로 돌아가기</HomeLink>
      </ContentWrapper>
    </Layout>
  );
}

export const Head = () => <Seo title="주문완료" />;
