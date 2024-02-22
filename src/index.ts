import SERVER from "./config/server";

const PORT = process.env.PORT;

SERVER.listen(PORT, () => {
	console.log(`Server is running in port ${PORT}`);
});
