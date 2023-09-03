const baseUrl = "http://gitlab.shxgroup.net/api/v4";

async function get(api: string, params?: Record<string, any>): Promise<any> {
  try {
    const baseApi = baseUrl + api;
    const url = params
      ? `${baseApi}?${new URLSearchParams(params).toString()}`
      : baseApi;
    console.log(`%cget ${api}`, "background: #007ACC; color: white;", params);

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`GET request failed with status ${response.status}`);
    }

    const data = await response.json();
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
