import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	id: -1,
	name: "",
	email: "",
	picture: "",
	logged: false,
	location: undefined
};

const userSlice = createSlice({
	name: "user",
	initialState,
	reducers: {
		login: (state, user) => {
			const { id, name, email, picture } = user.payload;
			return {
				...state,
				id,
				name,
				email,
				picture,
				logged: true,
			};
		},
		logout: (state) => {
			return initialState;
		},
		setLocation: (state, payload) => {
			const { location } = payload.payload;
			return {
				...state,
				location
			};
		}
	}
});

export const { login, logout, setLocation } = userSlice.actions;
export default userSlice.reducer;