const BASEURL = "https://backend-auto-attendance.onrender.com/"

async function myFetchGet(url: string) {
    const URL = BASEURL + url;
    const res = await fetch(URL, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
  
    console.log(res);
    const resJson = await res.json();
    console.log(resJson);
  
    return resJson
  }

async function myFetchPost(url: string, body: object) {
  const URL = BASEURL + url;
  const res = await fetch(URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  console.log(res);
  const resJson = await res.json();
  console.log(resJson);

  return resJson
}

export { myFetchPost, myFetchGet };
