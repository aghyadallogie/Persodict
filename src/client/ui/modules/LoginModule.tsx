import React from 'react';
import styled from 'styled-components';

//unused code
const LoginModule = () => (
    <Wrapper>
        <h3>Personalized Dictionary</h3>
        <div style={{
            height: '100%',
            margin: '0 auto 6rem',
            width: '80%'
        }}
        >
            <StyledForm
                style={{
                    flexDirection: 'column',
                    gap: '2rem',
                    paddingBottom: '5rem'
                }}
                onSubmit={() => { }}
            >
                <Input placeholder="Enter Email" type="email" onChange={() => { }} />
                <Input
                    placeholder="Enter Password"
                    type="password"
                    onChange={() => { }}
                />
                <Button style={{
                    alignSelf: 'center',
                    margin: '0',
                    width: 'auto'
                }}
                >
                    Login
                </Button>
            </StyledForm>
        </div>
        <div>
            <span style={{ fontSize: '.8rem' }}>
                If you do not have an account already ?{' '}
                <span style={{ borderBottom: '1px solid gray', cursor: 'pointer' }} onClick={() => { }}>
                    Register
                </span>
            </span>
        </div>
    </Wrapper>
);

export default LoginModule;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    margin-top: 4rem;
    min-height: 60dvh;
    text-align: center;
`;

const StyledForm = styled.form`
    display: flex;
    margin: 3rem 0 1rem 0;
`;

const Input = styled.input`
    background: transparent;
    border: none;
    border-radius: 10px;
    box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
    font-size: 1em;
    outline: none;
    padding: 15px 20px;
    padding-left: 40px;
    width: 100%;

    ::placeholder {
        color: #ccc;
        font-size: 0.8em;
        font-weight: 400;
        letter-spacing: 1px;
    }

    :active {
        ::placeholder {
            visibility: hidden;
        }
    }
`;

const Button = styled.button`
    background: transparent;
    border: none;
    border-radius: 10px;
    box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.1), -5px -5px 10px #fff;
    cursor: pointer;

    font-size: 1em;
    font-weight: 600;
    outline: none;
    padding: 15px 20px;
    width: 5rem;

    :active {
        box-shadow: inset 5px 5px 10px rgba(0, 0, 0, 0.1), inset -5px -5px 10px #fff;
    }
`;