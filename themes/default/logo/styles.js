import styled from 'react-emotion'
import palette from '../palette'

export const Wrapper = styled('div')`
  :hover {
    opacity: 0.7;
  }
`

export const CustomLogo = styled('div')`
  img {
    display: block;
    height: 35px;
  }
`

export const GeneratedLogo = styled('div')`
  color: ${palette.primary.main};
  font-size: 1.6rem;
  font-weight: 700;
  text-decoration: none;
`
