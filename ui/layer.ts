import styled from 'styled-components';

export const LayoutFlexJustifyContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: ${({ justifyContent }) => justifyContent || 'space-between'};
  align-items: center;
  width: 100%;
`;

export const LayoutFlex = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const LayoutFlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: ${({ alignItems }) => alignItems || 'flex-start'};
`;

export const LayoutFlexFullSizeCenterAligned = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
`;

export const LayoutFlexCenterAligned = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: ${({ width }) => width}px;
`;

export const LayoutTitledOneLine = styled(LayoutFlex)`
  align-items: center;
  width: 100%;
  > *:first-child {
    display: inline-flex;
    width: ${(props) => props['data-title-width'] || 80}px;
    flex-shrink: 0;
  }
  > * + * {
    flex-grow: 1;
  }
`;

export const LayoutFlexDivideHalf = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  width: 100%;
  ${(props) => props.gutterBottom && `
    margin-bottom: 16px;
  `}
  > div {
    width: 50%;
    flex-grow: 1;
    flex-shrink: 0;
    ${(props) => !props.noPadding && `
    padding-right: 8px;
    `}
  }
  ${(props) => !props.noPadding && `
  > div + div {
    padding-left: 8px;
    padding-right: 0;
  }
  `}
`;

export const PaddingCreator = styled.div`
  ${(props) => (props.orientation === 'vertical' ? `
    width: 1px;
    flex-shrink: 0;
    height: 100%;
  ` : `
    height: 1px;
    flex-shrink: 0;
    width: 100%;
  `)}
`;