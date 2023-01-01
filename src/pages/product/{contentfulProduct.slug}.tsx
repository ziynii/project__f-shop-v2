import { graphql, PageProps, Link } from 'gatsby';
import React, { useState } from 'react';
import Layout from '../../components/layout';
import styled from 'styled-components';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { useRecoilState } from 'recoil';
import { cartItemsState, IProduct } from '../../globalState';
import AddCartModal from '../../components/addCartModal';
import ProductSlider from '../../productSlider';

const ContentWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  height: 100%;
  padding: 20px 16px;
  padding-bottom: 60px;

  @media (${(props) => props.theme.bp.tablet}) {
    max-width: 960px;
    margin: 0 auto;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    flex-direction: row;
    align-items: flex-start;
    max-width: 1140px;
    padding-bottom: 20px;
  }
`;

const LeftSection = styled.div`
  @media (${(props) => props.theme.bp.desktop}) {
    flex-basis: 40%;
    display: flex;
    flex-direction: row-reverse;
  }
`;

const ItemImage = styled.div`
  width: 375px;
  height: 500px;
  border-radius: 8px;
  overflow: hidden;

  @media (${(props) => props.theme.bp.desktop}) {
    border-right: 1px solid ${(props) => props.theme.colors.border};
  }
`;

const RightSection = styled.div`
  width: 100%;
  height: 100%;
  margin-top: 24px;

  @media (${(props) => props.theme.bp.desktop}) {
    flex-basis: 60%;
    padding-left: 24px;
  }
`;

const ItemCategory = styled(Link)`
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
  background-color: ${(props) => props.theme.colors.white};
  padding: 16px;
  border-radius: 8px;
  font-family: 'Nanum Gothic', sans-serif;
  font-size: 14px;

  p {
    line-height: 1.2rem;
    margin: 4px 0;
  }
`;

const AddCartButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60px;
  color: ${(props) => props.theme.colors.white};
  background-color: ${(props) => props.theme.colors.dark};
  opacity: 0.9;
  border-radius: 4px;

  &:hover {
    opacity: 1;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    position: relative;
    width: 50%;
    margin-top: 28px;
  }
`;

export default function ProductDetail({
  data,
}: PageProps<Queries.ProductQuery>) {
  const { image, title, description, category, price, id } =
    data?.contentfulProduct!;
  const [cartItems, setCartItems] = useRecoilState<IProduct[]>(cartItemsState);
  const [isModal, setIsModal] = useState(false);

  const onClickAddCartButton = () => {
    const newItem = {
      id,
      image,
      title,
      description,
      category,
      price,
    };
    console.log(newItem);
    const hasItem = cartItems.some((item) => item.id === newItem.id);

    if (!hasItem) {
      setIsModal(true);
      setCartItems(cartItems.concat(newItem));
    } else {
      alert('이미 장바구니에 담긴 상품입니다.');
    }
  };

  console.log(cartItems);

  return (
    <Layout isDefaultStyle={true}>
      <ContentWrapper>
        <LeftSection>
          <ItemImage>
            <GatsbyImage
              image={getImage(image?.gatsbyImageData!) as any}
              alt={title!}
            />
          </ItemImage>

          <ProductSlider category={category!} itemId={id} />
        </LeftSection>

        <RightSection>
          <ItemCategory to={`/products/${category}`}>
            {category?.toUpperCase()}
          </ItemCategory>
          <ItemTitle>{title}</ItemTitle>
          <ItemPrice>{price}</ItemPrice>
          <ItemDescription
            dangerouslySetInnerHTML={{
              __html: description?.childMarkdownRemark?.html!,
            }}
          />
          <AddCartButton onClick={onClickAddCartButton}>
            장바구니에 추가
          </AddCartButton>
        </RightSection>
      </ContentWrapper>

      {isModal && <AddCartModal setIsModal={setIsModal} />}
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
