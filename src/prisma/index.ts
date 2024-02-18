import bcrypt from "bcrypt";
import {Prisma, PrismaClient} from "@prisma/client";

const PASSWORD_KEY: string = "password";
const CREATE_OPERATION: string = "create";
const UPDATE_OPERATION: string = "update";

type ExtendedPrismaClient = ReturnType<typeof addExtensionsToClient>;

const requiresPasswordHashing = (operation: string, args: any): Boolean => {
	return (
		[CREATE_OPERATION, UPDATE_OPERATION].includes(operation) &&
		args.data &&
		args.data[PASSWORD_KEY]
	);
};

const addExtensionsToClient = (instance: PrismaClient) => {
	return instance.$extends({
		query: {
			user: {
				findMany: ({args, query}) => {
					const parsedArgs = args as Prisma.UserFindManyArgs;

					parsedArgs.select = {
						id: true,
						name: true,
						email: true,
						created_at: true,
					};

					return query(parsedArgs);
				},

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

export class PrismaSingleton {
	private static instance: ExtendedPrismaClient;

	private constructor() {}

	public static getInstance() {
		if (!PrismaSingleton.instance) {
			PrismaSingleton.instance = addExtensionsToClient(new PrismaClient());
		}

		return PrismaSingleton.instance;
	}
}

const prisma = PrismaSingleton.getInstance();

export {prisma};
