// const BASEURL = "https://backend-auto-attendance.onrender.com/";
const BASEURL = "http://127.0.0.1:8000/";

async function myFetchGet(url: string, token: string | null = null) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  console.log(res);
  const resJson = await res.json();
  console.log(resJson);

  return resJson;
}

async function myFetchPost(url: string, body: object, token: string | null = null) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

  console.log(res);
  const resJson = await res.json();
  console.log(resJson);

  return resJson;
}

async function myFetchGetToken(url: string, token: string | null) {
  console.log(token)

  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
  });

  console.log(res);
  const resJson = await res.json();
  console.log(resJson);

  return { resJson, res };
}

export { myFetchPost, myFetchGet, myFetchGetToken };
