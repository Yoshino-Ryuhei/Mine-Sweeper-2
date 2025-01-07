import styled from 'styled-components';

interface StyleProps {
  isOpen: boolean;
  isBom: boolean;
  isFlag: boolean;
  numOfAroundBom: number;
}

const ColorArray: Array<string> = [
  '',
  'blue',
  'green',
  'red',
  'navy',
  'brown',
  'cyan',
  'balck',
  'gray',
];

export const SBlock = styled.div<StyleProps>`
    width: 30px;
    height: 30px;
    box-sizing: border-box;
    border: 3px outset black;
    color: ${(props) => {
      return `${ColorArray[props.numOfAroundBom]};`;
    }}
    ${(props) => {
      return props.isOpen ? `` : `background-color:#9E886F;`;
    }}
    &::before{
    ${(props) => {
      return props.isBom
        ? `position:absolute;top: 50%;left: 50%;transform:translate(-50%, -50%);z-index:-1;content:"💣";`
        : `z-index:-2;content:"${
            props.numOfAroundBom ? props.numOfAroundBom : ''
          }";`;
    }}}
    ${(props) => {
      return props.isFlag ? `&::before{z-index:1;content:"🚩"};` : ``;
    }}
`;
