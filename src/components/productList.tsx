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
  max-width: 1040px;
  margin: 0 auto;

  @media (${(props) => props.theme.bp.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    column-gap: 24px;
  }
`;

export default function ProductList({ data, selectedType }: IProductListProps) {
  return (
    <Products>
      {selectedType === 'All'
        ? data?.allContentfulProduct?.nodes.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        : data?.allContentfulProduct?.nodes
            .filter((product) => product?.productType === selectedType)
            .map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
    </Products>
  );
}
