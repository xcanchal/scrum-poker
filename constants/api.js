export const ioUrl = process.env.NEXT_PUBLIC_HOST;

export const FETCH_OPTIONS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'cors',
};

export const httpErrors = Object.freeze({
  badRequest: 400,
  unauthorized: 401,
  forbidden: 403,
  notFound: 404,
  internalError: 500,
});
