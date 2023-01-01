import React from 'react';
import { useStaticQuery, graphql, Link } from 'gatsby';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { GatsbyImage, getImage, IGatsbyImageData } from 'gatsby-plugin-image';
import styled from 'styled-components';

interface ISlideItem {
  id: string;
  title: string;
  image: IGatsbyImageData;
  category: string;
  slug: string;
}

interface IProductSliderProps {
  category: string;
  itemId: string;
}

const SlideWrapper = styled.div`
  display: none;
  width: 80px;
  height: 366px;
  margin-right: 8px;

  .slick-slider {
    height: 100%;

    .slick-list {
      height: 100%;
    }
  }

  .slick-prev::before,
  .slick-next::before {
    opacity: 0;
    display: none;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    display: block;
  }
`;

const SlideItem = styled.div`
  position: relative;
  height: 120px;
  overflow: hidden;

  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`;

const Image = styled.div`
  height: 100%;

  .gatsby-image-wrapper {
    height: 100%;
  }
`;

const Title = styled.p`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
  z-index: 100;
  margin: 0;
  background: rgba(0, 0, 0, 0);

  &:hover {
    background: rgba(0, 0, 0, 0.1);
  }
`;

const ButtonGroup = styled.div`
  top: 390px !important;

  &.slick-prev {
    left: 0;
  }

  &.slick-next {
    right: 0;
  }

  button {
    position: absolute;
    width: 40px;
    height: 20px;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
    background: ${(props) => props.theme.colors.black};
    opacity: 0.7;

    &:hover {
      opacity: 1;
    }

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

const NextBtn = styled.button`
  right: 0;
  border-radius: 0px 4px 4px 0px;
  border-left: 1px solid white;
`;

const PrevBtn = styled.button`
  left: 0;
  border-radius: 4px 0 0 4px;
`;

export default function ProductSlider({
  category,
  itemId,
}: IProductSliderProps) {
  const data = useStaticQuery(graphql`
    query SliderImages {
      allContentfulProduct {
        nodes {
          id
          title
          slug
          category
          image {
            gatsbyImageData(placeholder: BLURRED)
          }
        }
      }
    }
  `);
  const slideList = data?.allContentfulProduct?.nodes.filter(
    (item: ISlideItem) => item.category === category
  );

  const settings = {
    arrows: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
    nextArrow: (
      <ButtonGroup>
        <NextBtn>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </NextBtn>
      </ButtonGroup>
    ),
    prevArrow: (
      <ButtonGroup>
        <PrevBtn>
          <svg
            className="w-6 h-6"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
        </PrevBtn>
      </ButtonGroup>
    ),
  };

  return (
    <SlideWrapper>
      <Slider {...settings}>
        {slideList
          ?.filter((slideItem: ISlideItem) => slideItem.id !== itemId)
          .map((item: ISlideItem) => (
            <SlideItem key={item.id}>
              <Link to={`/product/${item.slug}`}>
                <Image>
                  <GatsbyImage
                    image={getImage(item.image!) as any}
                    alt={item.title}
                  />
                </Image>
                <Title />
              </Link>
            </SlideItem>
          ))}
      </Slider>
    </SlideWrapper>
  );
}
