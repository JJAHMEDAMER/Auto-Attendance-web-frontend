// const BASEURL = "https://backend-auto-attendance.onrender.com";  // Render
// const BASEURL = "https://backend-auto-attendance.up.railway.app"  // Railway
// const BASEURL = "http://127.0.0.1:8000";  // Local Dev
const BASEURL = "https://20.199.123.194";  // Microsoft Azure


async function myFetchGet(url: string, token: string | null = null) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resJson = await res.json();
  return resJson;
}

async function myFetchPost(
  url: string,
  body: object,
  token: string | null = null
) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const resJson = await res.json();
  return resJson;
}

async function myFetchDelete(
  url: string,
  body: object,
  token: string | null = null
) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  const resJson = await res.json();
  return resJson;
}

async function myFetchGetToken(url: string, token: string | null = null) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const resJson = await res.json();
  return { resJson, res };
}

export { myFetchPost, myFetchGet, myFetchDelete, myFetchGetToken };
