export function getDateFromString(dateString) {
	const tokens = dateString.split("-");
	return new Date(Number(tokens[0]), Number(tokens[1]) - 1, Number(tokens[2]));
}

export function getDateStringNoTimezone(date) {
	return `${date.getFullYear()}-${(date.getMonth() + 1)
		.toString()
		.padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;
}
