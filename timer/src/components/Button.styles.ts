import styled from 'styled-components'
export type ButtonVariant = 'primary' | 'secondary' | 'success'
interface ButtonContainerProps {
  variant: ButtonVariant
}
const buttonsVariants = {
  primary: 'purple',
  secondary: 'orange',
  success: 'green',
}

export const ButtonContainer = styled.button<ButtonContainerProps>`
  width: 100px;
  height: 40px;
  color: white;
  background-color: ${(props) => props.theme.primary};
  ${(props) => {
    return `background-color: ${buttonsVariants[props.variant]}`
  }};
`
