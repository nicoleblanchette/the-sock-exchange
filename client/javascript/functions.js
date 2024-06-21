export const fetchData = async (
  url,
  options = {},
  errorCallback = console.error
) => {
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      throw new Error(
        `Fetch failed. ${response.status} ${response.statusText}`
      );
    }

    const isJson = (response.headers.get("content-type") || "").includes(
      "application/json"
    );
    const data = isJson ? await response.json() : await response.text();

    return [data, null];
  } catch (error) {
    errorCallback(error);

    return [null, error];
  }
};
