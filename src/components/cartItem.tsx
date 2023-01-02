import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { cartItemsState, IProduct } from '../globalState';
import { useRecoilState } from 'recoil';

export type priceListType = {
  id: string;
  price: number;
};

interface ICartItemProps {
  item: IProduct;
  setPriceList: (value: any) => void;
  priceList: priceListType[];
}

const ItemWrapper = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};

  &:last-child {
    border-bottom: none;
  }
`;

const Image = styled.div`
  width: 120px;
  height: 140px;
  background-color: ${(props) => props.theme.colors.border};
  margin-right: 8px;
  overflow: hidden;
  display: flex;
`;

const AlignBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const Info = styled.div``;

const Title = styled.h4``;

const Quan = styled.div`
  margin-bottom: 8px;
  display: flex;

  div {
    width: 40px;
    padding: 0 12px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  div,
  span {
    border: 1px solid #ccc;
    height: 28px;
    font-size: 12px;
    user-select: none;
  }

  span {
    display: inline-block;
    width: 24px;
    line-height: 26px;
    background: #f1f1f1;
    color: #444;
    text-align: center;
    font-weight: bold;
    cursor: pointer;

    &:first-of-type {
      border-radius: 4px 0 0 4px;
      border-right: none;
    }
    &:last-child {
      border-radius: 0 4px 4px 0;
      border-left: none;
    }

    &:active {
      background: #ddd;
    }
  }
`;

const DeleteButton = styled.button`
  width: 36px;
  height: 36px;
  background-color: transparent;

  svg {
    color: ${(props) => props.theme.colors.secondary};
  }

  &:hover {
    svg {
      color: ${(props) => props.theme.colors.primary};
    }
  }
`;

const Price = styled.span`
  font-size: 14px;
`;

export default function CartItem({
  item,
  setPriceList,
  priceList,
}: ICartItemProps) {
  const [quan, setQuan] = useState<number>(1);
  const [cartItems, setCartItems] = useRecoilState<IProduct[]>(cartItemsState);
  let copyPriceList = [...priceList];
  let findIndex = priceList.findIndex((priceItem) => priceItem.id === item.id);

  const increaseQuantity = () => {
    quan === 10 ? quan : setQuan((prev) => prev + 1);
  };
  const decreaseQuantity = () => {
    quan === 1 ? quan : setQuan((prev) => prev - 1);
  };

  const removeItem = () => {
    const setItems = cartItems.filter((cartItem) => cartItem.id !== item.id);
    setCartItems(setItems);
    copyPriceList[findIndex].price = 0;
    setPriceList(copyPriceList);
  };

  useEffect(() => {
    if (findIndex === -1) {
      setPriceList((prev: priceListType[]) => {
        return [
          ...prev,
          {
            id: item.id,
            price: item.price! * quan,
          },
        ];
      });
    } else {
      copyPriceList[findIndex].price = item?.price! * quan;
      setPriceList(copyPriceList);
    }
  }, [quan]);

  return (
    <ItemWrapper>
      <AlignBox>
        <Image>
          <GatsbyImage image={getImage(item.image!) as any} alt={item.title!} />
        </Image>

        <Info>
          <Title>{item.title}</Title>
          <Quan>
            <span onClick={decreaseQuantity}>&#45;</span>
            <div>{quan}</div>
            <span onClick={increaseQuantity}>+</span>
          </Quan>
          <Price>{item.price! * quan}원</Price>
        </Info>
      </AlignBox>
      <DeleteButton onClick={removeItem}>
        <svg
          className="w-6 h-6"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          ></path>
        </svg>
      </DeleteButton>
    </ItemWrapper>
  );
}
