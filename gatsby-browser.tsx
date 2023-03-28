import React from 'react';
import { RecoilRoot } from 'recoil';

export const wrapRootElement = ({ element }: any) => {
  return <RecoilRoot>{element}</RecoilRoot>;
};
