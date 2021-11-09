import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 20px;
  height: 100%;

  button {
    border-radius: 0 0 20px 20px;
    margin: 30px 0 0 0;
    background-color: #c9baba;
    font-weight: bold;
  }
  
  .added{
    background-color: #f58181;
  }

  .img-wrapper{
    height: 250px;
    padding: 20px;
    border-radius: 20px 20px 0 0; 
    text-align: center;
   }
    
  img {
    max-height: 250px;
    display: block;
    margin: 0 auto;
    height: auto;
    max-width: 100%;
  }

  .texts-wrapper {
    font-family: Arial, Helvetica, sans-serif;
    padding: 1rem;
    height: 100%;
  }
  
  .qty{
    display: flex;
    justify-content: center;
  }
  
  .qty-btn{
    border-radius: 6px;
    font-size: 30px;
    line-height: 20px;
    margin: 0 20px;
  }
  
  .like-btn{
     border-radius: 0;
     background-color: transparent;
  }
`;
