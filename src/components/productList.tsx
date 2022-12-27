import React from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';

interface IProductListProps {
  data: Queries.ProductsQuery;
  selectedType: string;
}

const Products = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  row-gap: 24px;
  padding: 16px;

  @media (${(props) => props.theme.bp.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
`;

export default function ProductList({ data, selectedType }: IProductListProps) {
  return (
    <Products>
      {data?.allContentfulProduct?.nodes
        .filter((product) => product?.productType === selectedType)
        .map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
    </Products>
  );
}
