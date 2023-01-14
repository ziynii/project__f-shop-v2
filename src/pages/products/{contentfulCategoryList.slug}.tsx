import { graphql } from 'gatsby';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import queryString, { ParsedQuery } from 'query-string';
import React, { useMemo, useEffect, useState } from 'react';
import styled from 'styled-components';
import Layout from '../../components/layout';
import ProductList from '../../components/productList';
import TypeList from '../../components/typeList';
import { useSetRecoilState } from 'recoil';
import { headerGnbState } from '../../globalState';
import Pagination from '../../components/pagination';
import SortProductSelect from '../../components/sortProductSelect';
import Seo from '../../components/Seo';

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
    color: ${(props) => props.theme.colors.white};
    font-size: 24px;
    font-weight: bold;
    margin: 0;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    height: 240px;
  }
`;

const ContentWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.background};

  .align-box {
    display: flex;
    justify-content: space-between;
    padding: 32px 16px 0 16px;
  }
`;

const LIMIT = 6;

export default function Products({ data, location }: IProductsProps) {
  const setHeaderGnb = useSetRecoilState(headerGnbState);
  const types = useMemo(() => {
    let list: string[] = ['All'];

    data?.allContentfulProduct?.nodes.forEach((product) => {
      if (!list.includes(product?.productType!)) {
        list.push(product?.productType!);
      }
    });
    return list.sort();
  }, []);
  const parsed: ParsedQuery<string> = queryString.parse(location.search);
  const selectedType: string =
    typeof parsed.type !== 'string' || !parsed.type ? 'All' : parsed.type;
  const [nowPage, setNowPage] = useState(1);
  const [total, setTotal] = useState(0);
  const offset = (nowPage - 1) * LIMIT;
  const [sortValue, setSortValue] = useState('new');

  useEffect(() => {
    if (data) {
      setHeaderGnb(data?.contentfulCategoryList?.category!);
      setTotal(data?.allContentfulProduct?.nodes?.length);
    }
  }, []);

  return (
    <Layout isDefaultStyle={true}>
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
        <div className="align-box">
          <TypeList
            types={types}
            selectedType={selectedType}
            category={data?.contentfulCategoryList?.category!}
          />
          <SortProductSelect
            sortValue={sortValue}
            setSortValue={setSortValue}
          />
        </div>

        <ProductList
          data={data}
          selectedType={selectedType}
          setTotal={setTotal}
          offset={offset}
          limit={LIMIT}
          sortValue={sortValue}
          setNowPage={setNowPage}
        />

        {total >= LIMIT && (
          <Pagination
            nowPage={nowPage}
            setNowPage={setNowPage}
            limit={LIMIT}
            total={total}
          />
        )}
      </ContentWrapper>
    </Layout>
  );
}

export const query = graphql`
  query Products($slug: String) {
    contentfulCategoryList(category: { eq: $slug }) {
      slug
      category
      categoryImage {
        gatsbyImageData(placeholder: BLURRED)
      }
    }
    allContentfulProduct(
      filter: { category: { eq: $slug } }
      sort: { createdAt: ASC }
    ) {
      nodes {
        id
        createdAt(formatString: "YYYY-MM-DD hh:mm")
        category
        title
        price
        productType
        slug
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

export const Head = ({ data }: IProductsProps) => (
  <Seo
    title={data?.contentfulCategoryList?.category!.toUpperCase() as string}
  />
);
