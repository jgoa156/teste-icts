export function getFirstName(name: string) {
	return name.split(" ")[0];
}

export function getFirstAndLastName(name: string) {
	const _name = name.split(" ");
	return `${_name[0]} ${_name.pop()}`;
}

export function getImage(file: string) {
	function getImageOrFallback(url, fallback) {
		return new Promise((resolve, reject) => {
			const img = new Image();
			img.src = url;
			img.onload = () => resolve(url);
			img.onerror = () => resolve(fallback);
		}).catch(() => {
			return fallback;
		});
	}

	const defaultImg = "https://riverlegacy.org/wp-content/uploads/2021/07/blank-profile-photo.jpeg";
	return getImageOrFallback(file, defaultImg);
}

export function parseDate(date: string) {
	const dateArr = date.split("T")[0].split("-");
	return `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;
}

export function getLocation() {
	return new Promise((resolve) => {
		const defaultLocation = {
			lat: -3.117034,
			lng: -60.025780
		};

		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				resolve({
					lat: position.coords.latitude,
					lng: position.coords.longitude
				});
			}, () => {
				resolve(defaultLocation);
			}, { timeout: 3000 });
		}

		return (defaultLocation);
	});
}