// Trying out style-components for this one.
// I like styled-components except for not-so-great debugging because the class name in inspector
// is just a random string (cryptic) and the display name in the React Debugger is <Styled.div />
// I looks like they're fixing this with v2 though
// See: https://github.com/styled-components/styled-components/pull/227

import styled, { keyframes } from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`

const Loader = styled.div`
  width: 32px;
  height: 32px;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: 0;
  text-align: center;
  z-index: 1000;
  transform: translateX(-50%) translateY(-50%);
  box-sizing: border-box;

  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 50%;
    margin: 0 0 0 -50%;
    width: 100%;
    height: 100%;
    border-radius: 500rem;
    border: .2em solid rgba(0,0,0,.1);
    box-sizing: inherit;
  }

  &::after {
    position: absolute;
    content: '';
    top: 0;
    left: 50%;
    margin: 0 0 0 -50%;
    width: 100%;
    height: 100%;
    animation: ${rotate360} .6s linear;
    animation-iteration-count: infinite;
    border-radius: 500rem;
    border-color: #767676 transparent transparent;
    border-style: solid;
    border-width: .2em;
    box-shadow: 0 0 0 1px transparent;
    box-sizing: inherit;
  }
`

export default Loader
