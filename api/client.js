import { FETCH_OPTIONS } from '../constants/api';
import HttpError from './http-error';

export const fetchRequest = async (endpoint, options = {}) => {
  const response = await fetch(endpoint, {
    ...FETCH_OPTIONS,
    ...options,
    headers: {
      ...FETCH_OPTIONS.headers,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const { status, statusText } = response;
    throw new HttpError(`(${status}) - ${statusText}`, status);
  }

  let data = await response.text();

  try {
    data = JSON.parse(data);
    return data;
  } catch (err) {
    return data;
  }
};

export const GET = async (endpoint, options) => fetchRequest(endpoint, {
  method: 'GET',
  ...options,
});

export const POST = (endpoint, body, options) => fetchRequest(endpoint, {
  method: 'POST',
  body: JSON.stringify(body),
  ...options,
});

export const PATCH = (endpoint, body, options) => fetchRequest(endpoint, {
  method: 'PATCH',
  body: JSON.stringify(body),
  ...options,
});

export const DELETE = (endpoint) => fetchRequest(endpoint, {
  method: 'DELETE',
});
