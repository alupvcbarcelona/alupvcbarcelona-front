// ----------------------
// API CLIENT
// ----------------------
export const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.VITE_URI_BACKEND || "").replace(/\/$/, "");

export const TOKEN_KEY = "AUTH_VALIDATE_USER_TOKEN";

export const getToken = () => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

export class ApiError extends Error {
  constructor(message, status, data) {
    super(message);
    this.status = status;
    this.data = data;
  }
}

export const api = async (path, { method = "GET", body, auth = true, signal } = {}) => {
  const headers = {};
  if (body !== undefined) headers["Content-Type"] = "application/json";
  const token = auth ? getToken() : null;
  if (token) headers.Authorization = `Bearer ${token}`;

  let response;
  try {
    response = await fetch(`${API_URL}${path}`, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
      signal,
    });
  } catch (error) {
    if (error.name === "AbortError") throw error;
    throw new ApiError("No hay conexión con el servidor. Inténtalo de nuevo.", 0);
  }

  if (response.status === 204) return null;
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401 && token) window.dispatchEvent(new Event("auth:expired"));
    throw new ApiError(data.message || "Ha ocurrido un error.", response.status, data);
  }
  return data;
};

// ----------------------
// SUBIDA DIRECTA A CLOUDINARY (FIRMADA POR EL BACKEND)
// ----------------------
export const uploadImage = async (file, onProgress) => {
  const { data: sign } = await api("/media/signature");

  const form = new FormData();
  form.append("file", file);
  form.append("api_key", sign.apiKey);
  form.append("timestamp", sign.timestamp);
  form.append("signature", sign.signature);
  form.append("folder", sign.folder);

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", sign.uploadUrl);
    xhr.upload.onprogress = (e) => e.lengthComputable && onProgress?.(Math.round((e.loaded / e.total) * 100));
    xhr.onload = () => {
      const res = JSON.parse(xhr.responseText || "{}");
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve({ url: res.secure_url, publicId: res.public_id, width: res.width, height: res.height });
      } else {
        reject(new ApiError(res.error?.message || "No se pudo subir la imagen.", xhr.status));
      }
    };
    xhr.onerror = () => reject(new ApiError("No se pudo subir la imagen.", 0));
    xhr.send(form);
  });
};

// IMAGEN OPTIMIZADA DE CLOUDINARY (FORMATO Y TAMAÑO AUTOMÁTICOS)
export const cdn = (url, width = 1200) => {
  if (!url || !url.includes("res.cloudinary.com") || url.includes("/upload/f_")) return url;
  return url.replace("/upload/", `/upload/f_auto,q_auto,c_limit,w_${width}/`);
};
