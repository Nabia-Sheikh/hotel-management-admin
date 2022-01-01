import styled from 'styled-components'
import defaultBcg from '../images/room-3.jpeg';

const StyledHero = styled.header`
 min-height: 100vh;
 background: url(${props => props.img ? props.img : defaultBcg}) center/cover no-repeat;
 display: flex;
 align-items: center;
 justify-content: center;
`;

export default StyledHero;