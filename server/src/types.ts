export enum UserRoles {
	CHAT_USER = 1,
	GROUP_ADMIN = 2,
	SUPER_ADMIN = 3
}

export type UserId = string;

export type User = {
	email: UserId;
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
	admins: UserId[];
};

export type Channel = Container;
