import bcrypt from "bcrypt";
import {Prisma, PrismaClient} from "@prisma/client";

let prismaClient: PrismaClient;

const CREATE_OPERATION: string = "create";
const UPDATE_OPERATION: string = "update";
const PASSWORD_KEY: string = "password";

const requiresPasswordHashing = (operation: string, args: any) => {
	return (
		[CREATE_OPERATION, UPDATE_OPERATION].includes(operation) &&
		args.data &&
		args.data[PASSWORD_KEY]
	);
};

const getPrismaClient = () => {
	if (!prismaClient) {
		prismaClient = new PrismaClient();
	}

	return prismaClient.$extends({
		query: {
			user: {
				$allOperations({operation, args, query}) {
					if (!requiresPasswordHashing(operation, args)) {
						return query(args);
					}

					const parsedArgs = args as
						| Prisma.UserCreateArgs
						| Prisma.UserUpdateArgs;
					const password = parsedArgs.data["password"] as string;

					parsedArgs.data["password"] = bcrypt.hashSync(password, 10);

					return query(parsedArgs);
				},
			},
		},
	});
};

export {getPrismaClient};
