import {
	ValidationError,
	UniqueConstraintError,
	ForeignKeyConstraintError,
	AccessDeniedError,
} from "sequelize";

export function parseFormidable(req, res, next) {
	req.body = req.fields;
	next();
}

export function handleError(res, error) {
	let code;

	if (
		error instanceof ValidationError ||
		error instanceof UniqueConstraintError ||
		error instanceof ForeignKeyConstraintError
	)
		code = 400;
	else if (error instanceof AccessDeniedError) code = 403;
	else code = 500;

	const message =
		error.parent && error.parent.sqlMessage
			? error.parent.sqlMessage
			: error.errors && error.errors[0].message
				? error.errors[0].message
				: error.message;

	return res.status(code).json({ message: message });
}

export function isLatitude(num) {
	return isFinite(num) && Math.abs(num) <= 90;
}

export function isLongitude(num) {
	return isFinite(num) && Math.abs(num) <= 180;
}
