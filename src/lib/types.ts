export type Poem = {
	title: string;
	note?: string;
	content: string;
	draft: string;
	slug: string;
	big?: boolean;
	align?: 'center' | 'left' | 'right';
	form?: string;
	theme?: Theme;
	cover?: boolean;
	meta?: boolean;
};

export type Theme = {
	back: string;
	text: string;
};
