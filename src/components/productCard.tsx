import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';

export interface ProductProps {
  product: {
    id: string;
    category: string | null;
    title: string | null;
    price: number | null;
    productType: string | null;
    description: {
      childMarkdownRemark: { html: string | null } | null;
    } | null;
    image: {
      gatsbyImageData: import('gatsby-plugin-image').IGatsbyImageData | null;
    } | null;
  };
}

const ProductItem = styled.li`
  cursor: pointer;
`;

const ItemTitle = styled.h5`
  margin-top: 16px;
  margin-bottom: 8px;

  &:hover {
    color: gray;
  }
`;

const ItemPrice = styled.span`
  font-size: 12px;
`;

const ItemImage = styled.div`
  display: flex;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
`;

export default function ProductCard({ product }: ProductProps) {
  return (
    <ProductItem key={product?.id}>
      <ItemImage>
        <GatsbyImage
          image={getImage(product?.image?.gatsbyImageData!) as any}
          alt={product?.title!}
        />
      </ItemImage>
      <ItemTitle>{product?.title}</ItemTitle>
      <ItemPrice>{product?.price}</ItemPrice>
    </ProductItem>
  );
}
