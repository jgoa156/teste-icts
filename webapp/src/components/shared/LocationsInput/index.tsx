import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getLocation } from "utils";
import { components } from "react-select";

// Shared
import SelectCustom from "../SelectCustom";

// Styled
import {
	FormWrapper,
	InputWrapper
} from "./styles";

// Interfaces
import { IRootState } from "redux/store";
import IUserLogged from "interfaces/IUserLogged";

export default function LocationsInput({
	place,
	handlePlace
}) {
	const user = useSelector<IRootState, IUserLogged>(state => state.user);

	// Autocomplete
	const [search, setSearch] = useState<string>("");
	const handleSearch = value => {
		setSearch(value);
		console.log(value);
	}

	const [places, setPlaces] = useState<any[]>([]);
	const [fetchingPlaces, setFetchingPlaces] = useState<boolean>(true);

	async function fetchLocations(search = "") {
		if (search.length > 0) {
			let coords = { lat: 0, lng: 0 };
			if (navigator.geolocation) {
				if (!user?.location) {
					//@ts-ignore
					coords = await getLocation();
				} else {
					coords = user?.location;
				}

				const google = window.google;
				const service = new google.maps.places.AutocompleteService();
				const geocoder = new google.maps.Geocoder();
				const location = new google.maps.LatLng(coords);

				await service.getPlacePredictions({
					input: `${search}`,
					location: location,
					radius: 500
				}, (response, status) => {
					let data = [];

					response?.forEach(async (location) => {
						await geocoder.geocode({ placeId: location.place_id }, (_response, _status) => {
							let _location = {
								description: location.description,
								geo: {
									// @ts-ignore
									lat: _response[0].geometry.location.lat(),
									// @ts-ignore
									lng: _response[0].geometry.location.lng(),
								}
							};

							// @ts-ignore
							data.push(_location);
						});

						// Used to avoid concurrency problems
						if (data.length == response.length) {
							setPlaces(data);
							setFetchingPlaces(false);
						}
					});
				});
			}
		} else {
			setFetchingPlaces(false);
		}
	}

	useEffect(() => {
		setFetchingPlaces(true);
		const debounce = setTimeout(() => {
			fetchLocations(search);
		}, 1000);

		return () => clearTimeout(debounce);
	}, [search]);

	const DropdownIndicator = props => {
		return (
			<components.DropdownIndicator {...props}>
				<i className="fas fa-search" style={{ marginTop: -5 }} />
			</components.DropdownIndicator>
		);
	};

	return (
		<FormWrapper>
			<InputWrapper>
				<SelectCustom
					label={"Pesquisar"}
					name={"search"}
					inputValue={search}
					onInputChange={(value) => handleSearch(value)}
					value={place}
					handleValue={handlePlace}
					options={
						places?.map((place) => {
							return {
								value: place,
								label: place.description
							}
						})}
					required={false}
					alert={""}
					sent={false}
					obligatoryAlert={""}
					fetching={fetchingPlaces}
					noOptionsMessage={"Nenhum local encontrado"}
					components={{
						DropdownIndicator
					}}
				/>
			</InputWrapper>
		</FormWrapper>
	);
}