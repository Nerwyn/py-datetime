export function isParams(params: unknown) {
	return typeof params == 'object' && !Array.isArray(params);
}
