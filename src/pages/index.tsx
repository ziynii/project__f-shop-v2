import { graphql, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';

const CategoryList = styled.ul`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: lightpink;
  margin: 0;
`;

const CategoryItem = styled.li`
  position: relative;
  width: 100%;
  flex-basis: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: lightblue;
  cursor: pointer;
`;

const CategoryText = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 300;

  p {
    font-size: 18px;
    font-weight: bold;
    color: white;
  }
`;

export default function IndexPage({
  data,
}: PageProps<Queries.CategoryListQuery>) {
  return (
    <Layout>
      <CategoryList>
        {data?.allContentfulCategoryList?.nodes.map((category, i) => (
          <CategoryItem key={i}>
            <Link to={`/products/${category.slug}`}>
              <CategoryText>
                <p>{category?.category?.toUpperCase()}</p>
              </CategoryText>
              <GatsbyImage
                image={
                  getImage(category?.categoryImage?.gatsbyImageData!) as any
                }
                alt={category?.category!}
              />
            </Link>
          </CategoryItem>
        ))}
      </CategoryList>
    </Layout>
  );
}

export const query = graphql`
  query CategoryList {
    allContentfulCategoryList(sort: { createdAt: ASC }) {
      nodes {
        slug
        category
        categoryImage {
          gatsbyImageData(placeholder: BLURRED)
        }
      }
    }
  }
`;
