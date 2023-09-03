const baseUrl = "http://gitlab.shxgroup.net/api/v4";

const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

async function get(api: string, params?: Record<string, any>): Promise<any> {
  try {
    const baseApi = baseUrl + api;
    const url = params
      ? `${baseApi}?${new URLSearchParams(params).toString()}`
      : baseApi;
    console.log(
      `%cget[request] ${api}`,
      "background: #007ACC; color: white;",
      params,
    );

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "PRIVATE-TOKEN": ACCESS_TOKEN,
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log(
      `%cget[response] ${api}`,
      "background: #17964B; color: white;",
      data,
    );
    return data;
  } catch (error) {
    console.error("GET request error:", error);
    throw error;
  }
}

async function post(api: string, body: Record<string, any>): Promise<any> {
  try {
    const url = `${baseUrl}${api}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "PRIVATE-TOKEN": ACCESS_TOKEN,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`POST request failed with status ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("POST request error:", error);
    throw error;
  }
}

export { post, get };
