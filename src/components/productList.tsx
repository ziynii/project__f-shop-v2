import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ProductCard from './productCard';
import { IProduct } from '../globalState';

interface IProductListProps {
  data: Queries.ProductsQuery;
  selectedType: string;
  setTotal: (value: number) => void;
  limit: number;
  offset: number;
  sortValue: string;
  setNowPage: (value: number) => void;
}

const Products = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 12px;
  row-gap: 24px;
  padding: 16px;
  max-width: 1040px;
  margin: 0 auto;

  @media (${(props) => props.theme.bp.tablet}) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (${(props) => props.theme.bp.desktop}) {
    column-gap: 24px;
  }
`;

export default function ProductList({
  data,
  selectedType,
  setTotal,
  limit,
  offset,
  sortValue,
  setNowPage,
}: IProductListProps) {
  const [productsList, setProductsList] = useState<IProduct[]>([]);
  const filteredProducts = (type: string) => {
    if (type === 'All') {
      return data?.allContentfulProduct?.nodes;
    } else {
      return data?.allContentfulProduct?.nodes.filter(
        (product) => product?.productType === selectedType
      );
    }
  };

  const paginationProducts = (list: IProduct[]) => {
    return list.length >= limit ? list.slice(offset, offset + limit) : list;
  };

  const sortProducts = (list: IProduct[]) => {
    if (sortValue === 'new') {
      list.sort((a, b) => {
        return (
          new Date(a.createdAt!).getTime() - new Date(b.createdAt!).getTime()
        );
      });
    } else if (sortValue === 'price-low') {
      list.sort((a, b) => a.price! - b.price!);
    } else if (sortValue === 'price-high') {
      list.sort((a, b) => b.price! - a.price!);
    }
    return list;
  };

  useEffect(() => {
    const filteredList = filteredProducts(selectedType);
    const sortList = sortProducts(filteredList as IProduct[]);
    const pagination = paginationProducts(sortList as IProduct[]);
    setTotal(filteredList.length);
    setProductsList(pagination as IProduct[]);
  }, [selectedType, sortValue, offset]);

  useEffect(() => {
    if (selectedType === 'All') setNowPage(1);
  }, [selectedType]);

  return (
    <Products>
      {productsList.map((product: IProduct) => (
        <ProductCard key={product?.id} product={product} />
      ))}
    </Products>
  );
}
