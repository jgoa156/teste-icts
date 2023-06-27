import styled from 'styled-components';

export const Video = styled.video`
	position: fixed;
  left: -15px;
  bottom: -15px;
  min-width: calc(100% + 30px); 
  min-height: calc(100% + 40px);
	filter: brightness(50%) blur(10px);
`;