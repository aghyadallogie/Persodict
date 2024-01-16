import React from "react";
import styled from "styled-components";

function LoginModule() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        minHeight: "60dvh",
        marginTop: "40px",
        textAlign: "center",
      }}
    >
      <h3>Personalized Dictionary</h3>
      <div style={{ width: "80%", height: "100%", margin: "0 auto 6rem" }}>
        <StyledForm
          style={{
            flexDirection: "column",
            gap: "2rem",
            paddingBottom: "5rem",
          }}
          onSubmit={() => {}}
        >
          <Input type="email" onChange={() => {}} placeholder="Enter Email" />
          <Input
            type="password"
            onChange={() => {}}
            placeholder="Enter Password"
          />
          <Button style={{ margin: "0", alignSelf: "center", width: "auto" }}>
            Login
          </Button>
        </StyledForm>
      </div>
      <div>
          <span style={{ fontSize: ".8rem" }}>
            If you do not have an account already ?{" "}
            <span
              style={{ cursor: "pointer", borderBottom: "1px solid gray" }}
              onClick={() => {}}
            >
              Register
            </span>
          </span>
      </div>
    </div>
  );
}

export default LoginModule;

const StyledForm = styled.form`
  display: flex;
  margin: 3rem 0 1rem 0;
`;

const Input = styled.input`
  width: 100%;
  padding: 15px 20px;
  padding-left: 40px;
  box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
  border: none;
  outline: none;
  background: transparent;
  border-radius: 10px;
  font-size: 1em;

  ::placeholder {
    font-size: 0.8em;
    letter-spacing: 1px;
    font-weight: 400;
    color: #ccc;
  }

  :active {
    ::placeholder {
      visibility: hidden;
    }
  }
`;

const Button = styled.button`
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
  width: 5rem;
  padding: 15px 20px;
  cursor: pointer;
  font-weight: 600;

  border: none;
  outline: none;
  background: transparent;
  border-radius: 10px;
  font-size: 1em;

  :active {
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
  }
`;
