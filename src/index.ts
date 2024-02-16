import SERVER from "./server";

const PORT = process.env.PORT || 3000;

SERVER.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}`);
});
