import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import queryString, { ParsedQuery } from 'query-string';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import ProductList from '../../components/productList';
import TypeList from '../../components/typeList';

interface IProductsProps {
  location: {
    search: string;
  };
  data: Queries.ProductsQuery;
}

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

const ContentWrapper = styled.div`
  background-color: #f7f8fa;
`;

export default function Products({ data, location }: IProductsProps) {
  const types = useMemo(() => {
    let list: string[] = [];

    data?.allContentfulProduct?.nodes.forEach((product) => {
      if (!list.includes(product?.productType!)) {
        list.push(product?.productType!);
      }
    });
    return list.sort(function (a, b): any {
      if (a < b) return 1;
      if (a > b) return -1;
      if (a === b) return 0;
    });
  }, []);

  const parsed: ParsedQuery<string> = queryString.parse(location.search);
  const selectedType: string =
    typeof parsed.type !== 'string' || !parsed.type ? types[0] : parsed.type;

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

      <ContentWrapper>
        <TypeList
          types={types}
          selectedType={selectedType}
          category={data?.contentfulCategoryList?.category!}
        />

        <ProductList data={data} selectedType={selectedType} />
      </ContentWrapper>
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
