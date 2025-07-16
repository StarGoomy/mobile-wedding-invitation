import styled from '@emotion/styled';

const Container = styled.div`
  border: 30px solid transparent; /* 테두리의 초기 값 설정 30 */
  border-image-source: url('/background.png'); /* 이미지 경로 설정 */
  border-image-slice: 30% 50%; /* 이미지의 크기 설정 30 50 */
  border-image-width: 280px; /* 테두리 이미지의 너비 설정 280 */
  background-color: #ffffff;
  width: 85vw;
  margin: 0 auto;
  
  @media screen and (min-width: 500px) {
      width: 500px; /* 500 */
  }

  @media (prefers-color-scheme: dark) {
    filter: none !important;
    mix-blend-mode: normal !important;
  }
`;
export default Container;
