export type TabConfig = {
	label: string;
	route: string;
	icon?: string;
};

export type ChatContainer = {
	id: number;
	label: string;
	avatar?: string;
};

export type AlertStyle = 'success' | 'info' | 'warning' | 'alert';

export type ThemeColour = 'primary' | 'secondary' | 'accent' | 'light' | 'dark';
