import { graphql, PageProps } from 'gatsby';
import React from 'react';
import Layout from '../../components/layout';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  background-color: #f7f8fa;
  padding: 12px 16px;
`;

const ItemImage = styled.div`
  width: 375px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;
`;

const ItemInfo = styled.div`
  width: 100%;
  margin-top: 24px;
`;

const ItemCategory = styled.span`
  font-size: 12px;
  color: #1b1b1b;
`;

const ItemTitle = styled.h5`
  margin-top: 8px;
  margin-bottom: 0;
  font-size: 20px;
  font-weight: 800;
`;

const ItemPrice = styled.p`
  margin-top: 16px;
  font-size: 18px;
`;

const ItemDescription = styled.pre`
  background-color: white;
  padding: 16px;
  border-radius: 8px;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 14px;

  p {
    line-height: 1.2rem;
    margin: 4px 0;
  }
`;

export default function ProductDetail({
  data,
}: PageProps<Queries.ProductQuery>) {
  console.log(data);

  const { image, title, description, category, price } =
    data?.contentfulProduct!;

  return (
    <Layout>
      <ContentWrapper>
        <ItemImage>
          <GatsbyImage
            image={getImage(image?.gatsbyImageData!) as any}
            alt={title!}
          />
        </ItemImage>

        <ItemInfo>
          <ItemCategory>{category?.toUpperCase()}</ItemCategory>
          <ItemTitle>{title}</ItemTitle>
          <ItemPrice>{price}</ItemPrice>
          <ItemDescription
            dangerouslySetInnerHTML={{
              __html: description?.childMarkdownRemark?.html!,
            }}
          />
        </ItemInfo>
      </ContentWrapper>
    </Layout>
  );
}

export const query = graphql`
  query Product($slug: String) {
    contentfulProduct(slug: { eq: $slug }) {
      id
      title
      price
      category
      description {
        childMarkdownRemark {
          html
        }
      }
      image {
        gatsbyImageData(placeholder: BLURRED, cornerRadius: 8)
      }
    }
  }
`;
