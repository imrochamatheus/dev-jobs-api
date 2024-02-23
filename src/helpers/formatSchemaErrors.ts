const requiredMessage = "Campo obrigatório!";

const formatInvalidTypeError = (type: string, format: string) => {
	return `O campo ${type} deve ser do tipo ${format}!`;
};

export const formatSchemaErrors = (title: string, type: string = "string") => {
	return {
		required_error: requiredMessage,
		invalid_type_error: formatInvalidTypeError(title, type),
	};
};
