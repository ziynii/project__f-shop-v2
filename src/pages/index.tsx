import { graphql, Link, PageProps } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import Layout from '../components/layout';
import { bp } from '../theme';

const CategoryList = styled.ul`
  height: calc(100vh - 80px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  margin: 0;

  @media (${bp.desktop}) {
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
`;

const CategoryItem = styled.li`
  position: relative;
  width: 100%;
  flex-basis: 25%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  cursor: pointer;

  @media (${bp.desktop}) {
    flex-basis: auto;
    width: 280px;
    height: 550px;
    display: block;
    transition: transform 200ms ease-in-out;

    .gatsby-image-wrapper-constrained {
      height: 100%;
    }

    &:hover {
      transform: scale(1.1);
      z-index: 100;
    }
  }
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
  z-index: 50;

  p {
    font-size: 18px;
    font-weight: bold;
    color: white;
  }

  @media (${bp.desktop}) {
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
    }
  }
`;

export default function IndexPage({
  data,
}: PageProps<Queries.CategoryListQuery>) {
  return (
    <Layout isDefaultStyle={false}>
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
