export enum UserRoles {
	CHAT_USER = 1,
	GROUP_ADMIN = 2,
	SUPER_ADMIN = 3
}

export type UserId = string;

/**
 * @typedef {object} User
 * @property {string} email.required - User's email address
 * @property {string} name.required - User's full name
 * @property {string} avatar - URL to the user's avatar
 * @property {string[]} groupIds - Array of group IDs the user is a member of
 */
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

/**
 * @typedef {object} Group
 * @property {string} id.required - Group ID
 * @property {string} label.required - Group name
 * @property {string} avatar - URL to the group's avatar
 * @property {string[]} admins - Array of user emails that correspond to admin user accounts
 * @property {Channel[]} channels - Array of channels in the group
 */
export type Group = Container & {
	channels: Container[];
	admins: UserId[];
};

/**
 * @typedef {object} Channel
 * @property {string} id.required - Channel ID
 * @property {string} label.required - Channel name
 * @property {string} avatar - URL to the channel's avatar
 */
export type Channel = Container;
