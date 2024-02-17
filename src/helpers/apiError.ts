export class ApiError extends Error {
	constructor(public readonly message: string, public readonly status: number) {
		super(message);
	}
}
