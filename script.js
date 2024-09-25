# See https://halu.lu/%E6%9D%82%E8%B0%88/cloudflare-warp/
# Depolyed at https://warp.halu.lu/

// Change keys if needed
const keys = [
  "9WO41D5p-6OP8xj27-36gQG75D",
  "R65K12Up-aU907O2e-4nuvD581",
  "06LM94EJ-1nl0V2d7-V847va5y",
]

const headers = {
  'CF-Client-Version': 'a-6.11-2223',
  'Host': 'api.cloudflareclient.com',
  'Connection': 'Keep-Alive',
  'Accept-Encoding': 'gzip',
  'User-Agent': 'okhttp/3.12.1'
};

async function getKey() {
  const r1 = await fetch('https://api.cloudflareclient.com/v0a2223/reg', {
    method: 'POST',
    headers
  });
  const json1 = await r1.json();
  const id = json1.id;
  const license = json1.account.license;
  const token = json1.token;

  const r2 = await fetch('https://api.cloudflareclient.com/v0a2223/reg', {
    method: 'POST',
    headers
  });
  const json2 = await r2.json();
  const id2 = json2.id;
  const token2 = json2.token;

  const headersGet = { 'Authorization': `Bearer ${token}`, ...headers };
  const headersGet2 = { 'Authorization': `Bearer ${token2}`, ...headers };
  const headersPost = {
    'Content-Type': 'application/json; charset=UTF-8',
    'Authorization': `Bearer ${token}`,
    ...headers
  };

  const patchJson = { 'referrer': `${id2}` };
  await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}`, {
    method: 'PATCH',
    headers: headersPost,
    body: JSON.stringify(patchJson)
  });

  await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id2}`, {
    method: 'DELETE',
    headers: headersGet2
  });

  const key = keys[Math.floor(Math.random() * keys.length)];

  const putJson1 = { 'license': `${key}` };
  await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
    method: 'PUT',
    headers: headersPost,
    body: JSON.stringify(putJson1)
  });

  const putJson2 = { 'license': `${license}` };
  await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
    method: 'PUT',
    headers: headersPost,
    body: JSON.stringify(putJson2)
  });

  const r3 = await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
    method: 'GET',
    headers: headersGet
  });
  const json3 = await r3.json();
  const accountType = json3.account_type;
  const referralCount = json3.referral_count;
  const updatedLicense = json3.license;

  await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${id}`, {
    method: 'DELETE',
    headers: headersGet
  });

  return updatedLicense;
}

export default {
  async fetch(request, env, ctx) {
    const key = await getKey();
    console.log(key);
    return new Response(key);
  },
};
