import React, { useEffect } from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';
import { IGatsbyImageData } from 'gatsby-plugin-image';

interface IProductListProps {
  data: Queries.ProductsQuery;
  selectedType: string;
  setTotal: (value: number) => void;
  limit: number;
  offset: number;
}

export interface IProduct {
  id: string;
  category: string | null;
  title: string | null;
  price: number | null;
  slug: string | null;
  productType: string | null;
  description: {
    childMarkdownRemark: { html: string | null } | null;
  } | null;
  image: {
    gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData | null;
  } | null;
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

export default function ProductList({
  data,
  selectedType,
  setTotal,
  limit,
  offset,
}: IProductListProps) {
  const allProducts = data?.allContentfulProduct?.nodes;

  const filteredProducts = data?.allContentfulProduct?.nodes.filter(
    (product) => product?.productType === selectedType
  );

  const setProductList = (list: IProduct[]) => {
    return list.length >= limit
      ? list
          .slice(offset, offset + limit)
          .map((product: IProduct) => (
            <ProductCard key={product?.id} product={product} />
          ))
      : list.map((product: IProduct) => (
          <ProductCard key={product?.id} product={product} />
        ));
  };

  useEffect(() => {
    if (selectedType === 'All') {
      setTotal(allProducts.length);
    } else {
      setTotal(filteredProducts.length);
    }
  }, [filteredProducts]);

  return (
    <Products>
      {selectedType === 'All'
        ? setProductList(allProducts as IProduct[])
        : setProductList(filteredProducts as IProduct[])}
    </Products>
  );
}
