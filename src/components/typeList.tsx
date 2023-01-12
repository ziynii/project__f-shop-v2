import { Link } from 'gatsby';
import React from 'react';
import styled from 'styled-components';

interface ITypesProps {
  types: string[];
  category: string;
  selectedType: string;
}

const ProductType = styled(Link)<{ active: string }>`
  font-size: 14px;
  font-weight: ${({ active }) => (active === 'true' ? '800' : '400')};
  margin-right: 8px;

  &:last-child {
    margin-right: 0;
  }
`;

export default function TypeList({
  types,
  category,
  selectedType,
}: ITypesProps) {
  return (
    <div>
      {types.map((type, i) => (
        <ProductType
          to={`/products/${category}?type=${type}`}
          active={(type === selectedType).toString()}
          key={i}
        >
          {type.toUpperCase()}
        </ProductType>
      ))}
    </div>
  );
}
