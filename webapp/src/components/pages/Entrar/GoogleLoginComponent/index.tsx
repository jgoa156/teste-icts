import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { login, setLocation } from "redux/slicer/user";
import axios from "axios";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import { getLocation } from "utils";

// Shared
import Button from "components/shared/Button";
import toast from "components/shared/Toast";
import { H3 } from "components/shared/Titles";

// Custom
import {
	LoginWrapper,
	TitleWrapper
} from "./styles";

export default function GoogleLoginComponent() {
	const dispatch = useDispatch();
	const handleLogin = useGoogleLogin({
		onSuccess: (response) => {
			if (response) {
				axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${response.access_token}`, {
					headers: {
						Authorization: `Bearer ${response.access_token}`,
						Accept: 'application/json'
					}
				}).then(async (response) => {
					dispatch(login(response.data));
				}).catch((error) => { });
			}
		},
		onError: (error) => toast("Erro", "Ocorreu um erro ao realizar login. Tente novamente.", "danger")
	});

	return (
		<LoginWrapper>
			<img src={`${process.env.img}/logo.png`} />

			<TitleWrapper>
				<H3>Entrar</H3>
			</TitleWrapper>

			<Button onClick={() => handleLogin()}>
				<i className="fab fa-google"></i>
				Entrar com Google
			</Button>
		</LoginWrapper>
	);
}