import { getHeaders } from "@/config/globals";

const getParams = (params?: {
  [key: string]: string | number | boolean | undefined;
}) => {
  if (!params) return "";

  const paramsArray = Object.keys(params).map((key) => {
    const value = params[key];

    if (value === undefined) return "";

    return `${key}=${value}`;
  });

  return `?${paramsArray.join("&")}`;
};

interface Body {
  [key: string]: any;
}

export const post = async <T>(
  url: string,
  body?: Body
): Promise<T | undefined> => {
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: getHeaders(),
      ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const get = async <T>(url: string): Promise<T | undefined> => {
  try {
    const response = await fetch(url, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return;
  }
};

export const getWithParams = async <T>(
  url: string,
  params?: { [key: string]: string | number | boolean | undefined }
): Promise<T | undefined> => {
  try {
    const response = await fetch(`${url}${getParams(params)}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    console.error(error);
    return;
  }
};
