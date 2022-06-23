import { COLORS } from 'helpers/constants';
import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { LayoutFlexJustifyContent } from './ui/Layouts';
import { FrequentlyTypo } from './ui/Typographies';

const ToggleSwitch = styled(LayoutFlexJustifyContent)`
  width: 103px;
  height: 42px;
  border-radius: 21px;
  margin-bottom: 8px;
  align-items: center;

  background-color: ${({
    isChecked,
    activeBackgroundColor,
    inActiveBackgroundColor,
  }) =>
    isChecked
      ? activeBackgroundColor || COLORS.BROWN
    : inActiveBackgroundColor || COLORS.UNIT};
      
  transition: all 0.3s ease-in-out;
`;

const Controller = styled(LayoutFlexJustifyContent)`
  ${({ isChecked }) => css`
    transform: translate(${isChecked ? '30px' : '-30px'}, 0);

    div:nth-child(1) {
      position: relative;
      right: 12px;
    }

    div:nth-child(3) {
      position: relative;
      left: 12px;
    }

    transition: all 0.3s ease-in-out;
  `};

  > div {
    min-width: 34px;
    flex-grow: 1;
  }
`;

const Circle = styled.div`
  width: 34px;
  height: 34px;
  background: #fff;
  border-radius: 20px;
`;

const ToggleButton = ({
  isChecked,
  activeText,
  inActiveText,
  activeBackgroundColor,
  inActiveBackgroundColor,
  onChange,
}) => {
  const [isActive, setIsActive] = useState(!!isChecked);
 

  const onChangeEventHandler = React.useCallback(() => {
    const updated = !isActive;
    setIsActive(updated);
    onChange && onChange(updated);
  }, [isActive]);

  const Text = ({ text }) => (
    <div>
      <FrequentlyTypo
        font="Montserrat-SemiBold"
        size={16}
        whiteSpace="none"
        weight={600}
        style={{ paddingTop: 3 }}
      >
        {text}
      </FrequentlyTypo>
    </div>
  );

  return (
    <ToggleSwitch
      isChecked={isActive}
      onClick={onChangeEventHandler}
      activeBackgroundColor={activeBackgroundColor}
      inActiveBackgroundColor={inActiveBackgroundColor}
    >
      <Controller isChecked={isActive}>
        <Text text={activeText || 'ON'} />
        <Circle />
        <Text text={inActiveText || 'OFF'} />
      </Controller>
    </ToggleSwitch>
  );
};

export default ToggleButton;
