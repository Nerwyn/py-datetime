export function isParams(params) {
    return typeof params == 'object' && !Array.isArray(params);
}
