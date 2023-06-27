interface ILocation {
	lat: number;
	lng: number;
}

export default interface IUserLogged {
	id: number;
	name: string;
	email: string;
	picture: string;
	logged: boolean;
	location?: ILocation;
}
