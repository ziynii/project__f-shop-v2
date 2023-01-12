import React from 'react';
import styled from 'styled-components';

interface ISortProductSelectProps {
  sortValue: string;
  setSortValue: (value: string) => void;
}

const Select = styled.select`
  outline: none;
  border: none;
  background-color: transparent;
  font-size: 14px;
`;

export default function SortProductSelect({
  sortValue,
  setSortValue,
}: ISortProductSelectProps) {
  const handleChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortValue(e.target.value);
  };
  return (
    <Select onChange={handleChangeSelect} value={sortValue}>
      <option value="new">최신순</option>
      <option value="price-low">낮은 가격순</option>
      <option value="price-high">높은 가격순</option>
    </Select>
  );
}
