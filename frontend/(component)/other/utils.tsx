export const sleep = (ms: number) => new Promise(r => setTimeout(r, ms));

export interface AuthResponse {
	id: string;
	username: string;
}