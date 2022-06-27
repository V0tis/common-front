import React from 'react';
import styled from 'styled-components';

const Item = styled.div`
  display: flex;
  justify-content: ${({ flexContent }) => flexContent || 'flex-start'};
  align-items: center;
  width: 100%;
  height: 45px;
  font-family: Montserrat-SemiBold;
  font-size: 37px;
  font-weight: bold;
  opacity: 5%;
  color: black;
  text-align: left;

  &.selected-time {
    transition: all 0.3s;
    opacity: 100%;
  }

  &:hover {
    cursor: pointer;
  }

  &:focus {
    outline: none;
  }
`;

const TimePickerItem = ({ text, id, onClick }) => {
  return (
    <Item
      onClick={onClick}
      id={`${id}-${text}-scroll-item`}
    >
      {`${String(text).padStart(2, '0')}`}
    </Item>
  );
};

export default TimePickerItem;
