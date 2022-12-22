import { graphql, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import ProductCard from '../../components/productCard';
import { bp } from '../../theme';

const TopImage = styled.div`
  width: 100%;
  height: 160px;
  overflow: hidden;
  display: flex;
  position: relative;

  p {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 300;
    color: white;
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }
`;

const ProductList = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  row-gap: 24px;
  padding: 16px;
  background-color: #f7f8fa;

  @media (${bp.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

export default function Products({ data }: PageProps<Queries.ProductsQuery>) {
  console.log(data);

  return (
    <Layout>
      <TopImage>
        <p>{data?.contentfulCategoryList?.category!.toUpperCase()}</p>
        <GatsbyImage
          image={
            getImage(
              data?.contentfulCategoryList?.categoryImage?.gatsbyImageData!
            ) as any
          }
          alt={data?.contentfulCategoryList?.category!}
        />
      </TopImage>

      <ProductList>
        {data?.allContentfulProduct?.nodes.map((product) => (
          <ProductCard product={product} />
        ))}
      </ProductList>
    </Layout>
  );
}

export const query = graphql`
  query Products($slug: String) {
    contentfulCategoryList(category: { eq: $slug }) {
      category
      categoryImage {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    allContentfulProduct(filter: { category: { eq: $slug } }) {
      nodes {
        id
        category
        title
        price
        productType
        description {
          childMarkdownRemark {
            html
          }
        }
        image {
          gatsbyImageData(
            placeholder: BLURRED
            resizingBehavior: THUMB
            cropFocus: CENTER
            height: 380
            width: 310
            quality: 100
          )
        }
      }
    }
  }
`;
