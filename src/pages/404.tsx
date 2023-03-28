import * as React from 'react';
import Seo from '../components/common/Seo';
import styled from 'styled-components';

const ContentWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Text = styled.p`
  padding-right: 8px;
  animation: cursor 0.5s alternate infinite;

  @keyframes cursor {
    0% {
      box-shadow: inset -3px 0px 0px #888;
    }
    100% {
      box-shadow: inset -3px 0px 0px transparent;
    }
  }
`;

export default function NotFoundPage() {
  return (
    <ContentWrapper >
      <Text>404, Page not found.</Text>
    </ContentWrapper>
  );
}

export const Head = () => <Seo title="페이지를 찾을 수 없습니다" />;
