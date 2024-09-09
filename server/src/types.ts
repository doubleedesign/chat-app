export enum UserRoles {
	CHAT_USER = 1,
	GROUP_ADMIN = 2,
	SUPER_ADMIN = 3
}

export type User = {
	email: string;
	name: string;
	avatar?: string;
	groupIds: string[];
};

type Container = {
	id: string;
	label: string;
	avatar?: string;
};

export type Group = Container & {
	channels: Container[];
	admins: User[];
};

export type Channel = Container;