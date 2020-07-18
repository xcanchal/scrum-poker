export const ioUrl = process.env.NEXT_PUBLIC_SERVER_URL;

export const FETCH_OPTIONS = {
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  mode: 'cors',
};
