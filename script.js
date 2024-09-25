document.getElementById('generateKey').addEventListener('click', async () => {
    const keys = [
        "9WO41D5p-6OP8xj27-36gQG75D",
        "R65K12Up-aU907O2e-4nuvD581",
        "06LM94EJ-1nl0V2d7-V847va5y",
    ];

    const headers = {
        'CF-Client-Version': 'a-6.11-2223',
        'Host': 'api.cloudflareclient.com',
        'Connection': 'Keep-Alive',
        'Accept-Encoding': 'gzip',
        'User-Agent': 'okhttp/3.12.1'
    };

    async function getKey() {
        const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
        const targetUrl = 'https://api.cloudflareclient.com/v0a2223/reg';

        const r1 = await fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers
        });
        const json1 = await r1.json();
        console.log(json1);
        const id = json1.id;
        const license = json1.account.license;
        const token = json1.token;

        const r2 = await fetch(proxyUrl + targetUrl, {
            method: 'POST',
            headers
        });
        const json2 = await r2.json();
        console.log(json2);
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
        const patchResponse = await fetch(proxyUrl + `https://api.cloudflareclient.com/v0a2223/reg/${id}`, {
            method: 'PATCH',
            headers: headersPost,
            body: JSON.stringify(patchJson)
        });
        const patchJsonResponse = await patchResponse.json();
        console.log(patchJsonResponse);

        await fetch(proxyUrl + `https://api.cloudflareclient.com/v0a2223/reg/${id2}`, {
            method: 'DELETE',
            headers: headersGet2
        });

        const key = keys[Math.floor(Math.random() * keys.length)];

        const putJson1 = { 'license': `${key}` };
        const putResponse1 = await fetch(proxyUrl + `https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
            method: 'PUT',
            headers: headersPost,
            body: JSON.stringify(putJson1)
        });
        const putJsonResponse1 = await putResponse1.json();
        console.log(putJsonResponse1);

        const putJson2 = { 'license': `${license}` };
        const putResponse2 = await fetch(proxyUrl + `https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
            method: 'PUT',
            headers: headersPost,
            body: JSON.stringify(putJson2)
        });
        const putJsonResponse2 = await putResponse2.json();
        console.log(putJsonResponse2);

        const r3 = await fetch(proxyUrl + `https://api.cloudflareclient.com/v0a2223/reg/${id}/account`, {
            method: 'GET',
            headers: headersGet
        });
        const json3 = await r3.json();
        console.log(json3);
        const accountType = json3.account_type;
        const referralCount = json3.referral_count;
        const updatedLicense = json3.license;

        await fetch(proxyUrl + `https://api.cloudflareclient.com/v0a2223/reg/${id}`, {
            method: 'DELETE',
            headers: headersGet
        });

        return updatedLicense;
    }

    const key = await getKey();
    document.getElementById('output').textContent = key;
});
