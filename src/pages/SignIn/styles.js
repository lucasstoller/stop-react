import styled from "styled-components";
import logoImage from '../../assets/logo_stop.png';
import formBgImage from '../../assets/login-form-bg.png';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled.form`
  width: 400px;
  height: 100vh;
  background-image: url(${formBgImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    color: #ff3333;
    margin-bottom: 15px;
    border: 1px solid #ff3333;
    padding: 10px;
    width: 100%;
    text-align: center;
  }
  input {
    height: 46px;
    margin-bottom: 15px;
    padding: 0 20px;
    color: #777;
    font-size: 15px;
    width: 100%;
    border: 1px solid #ddd;
    &::placeholder {
      color: #999;
    }
  }
`;

export const Logo = styled.div`
  width: 450px;
  height: 450px;
  margin-left: 50px;
  background-image: url(${logoImage});
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;