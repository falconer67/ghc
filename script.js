const FALLBACK_BASE_KEYS = [
    "578Ko2xd-36K7DMX2-4V812ame",
    "94lB36du-4960HEzs-68E5jd3I",
    "28R1r9iF-6Li9Kq27-U514Yx8l",
    "k18ba35e-5whgj679-8Pi34nI2",
    "3MqFO712-DL4Q678q-5R6DN2z0",
    "2F05CD1P-7CJ0g2I5-B3hO4b56",
    "68y15EAJ-C3519JfR-zve6847x",
    "7I8n60ds-Chy26D57-5W21IFH8",
    "U4C071LW-JhT604K8-3a6s27uT",
    "aAsQ1072-fy983J0c-r432m6ZG",
];

const WARP_CLIENT_HEADERS = {
    "CF-Client-Version": "a-6.11-2223",
    "Host": "api.cloudflareclient.com",
    "Connection": "Keep-Alive",
    "Accept-Encoding": "gzip",
    "User-Agent": "okhttp/3.12.1",
};

class User {
    constructor(userId, licenseCode, token) {
        this.userId = userId;
        this.licenseCode = licenseCode;
        this.token = token;
    }
}

class GenerateResults {
    constructor(accountType, referralCount, licenseCode) {
        this.accountType = accountType;
        this.referralCount = referralCount;
        this.licenseCode = licenseCode;
    }

    toString() {
        return `WarpGenerateResults(account_type=${this.accountType}, referral_count=${this.referralCount}, license_code=${this.licenseCode})`;
    }
}

async function registerSingle() {
    console.log("Start registering new account");
    console.log("Creating HTTP/2 Transport");
    const response = await fetch("https://api.cloudflareclient.com/v0a2223/reg", {
        method: "POST",
        headers: WARP_CLIENT_HEADERS,
    });
    const request = await response.json();
    const userId = request.id;
    const licenseCode = request.account.license;
    const token = request.token;
    console.log("Registered");
    return new User(userId, licenseCode, token);
}

async function generateKey(baseKey) {
    console.log("Start generating new key");
    console.log("Creating HTTP/2 Transport");

    const user1 = await registerSingle();
    const user2 = await registerSingle();

    console.log("Referring U2 -> U1");
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${user1.userId}`, {
        method: "PATCH",
        headers: { ...WARP_CLIENT_HEADERS, "Authorization": `Bearer ${user1.token}` },
        body: JSON.stringify({ referrer: user2.userId }),
    });

    console.log("Removing U2");
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${user2.userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${user2.token}` },
    });

    console.log("Referring BaseKey -> U1");
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${user1.userId}/account`, {
        method: "PUT",
        headers: { ...WARP_CLIENT_HEADERS, "Authorization": `Bearer ${user1.token}` },
        body: JSON.stringify({ license: baseKey }),
    });

    console.log("Referring U1");
    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${user1.userId}/account`, {
        method: "PUT",
        headers: { ...WARP_CLIENT_HEADERS, "Authorization": `Bearer ${user1.token}` },
        body: JSON.stringify({ license: user1.licenseCode }),
    });

    console.log("Getting account details");
    const accountResponse = await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${user1.userId}/account`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${user1.token}` },
    });
    const accountDetails = await accountResponse.json();
    const accountType = accountDetails.account_type;
    const referralCount = accountDetails.referral_count;
    const licenseCode = accountDetails.license;

    await fetch(`https://api.cloudflareclient.com/v0a2223/reg/${user1.userId}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${user1.token}` },
    });

    return new GenerateResults(accountType, referralCount, licenseCode);
}

async function cli(num, baseKeys = []) {
    if (!baseKeys.length) {
        try {
            const response = await fetch("https://raw.githubusercontent.com/0x24a/WarpPlusKeyGenerator-NG/main/BASE_KEYS.txt");
            const text = await response.text();
            const keys = text.split("\n").filter(key => key.length === 26 && key.split("-").length === 3);
            baseKeys = keys;
        } catch {
            baseKeys = FALLBACK_BASE_KEYS;
        }
    } else {
        baseKeys = baseKeys.filter(key => key.length === 26 && key.split("-").length === 3);
    }

    const resultKeys = [];
    for (let i = 1; i <= num; i++) {
        let sleepTime = 30;
        while (true) {
            try {
                const singleKey = await generateKey(baseKeys[Math.floor(Math.random() * baseKeys.length)]);
                resultKeys.push(singleKey);
                break;
            } catch (error) {
                sleepTime += 30;
                console.error(error);
                console.log(`Retrying after ${sleepTime}s...`);
                await new Promise(resolve => setTimeout(resolve, sleepTime * 1000));
            }
        }
        console.log(`Account Type: ${singleKey.accountType}\nData Limit: ${singleKey.referralCount} GiB\nLicense Key: ${singleKey.licenseCode}`);
    }
    console.log("\nKeys:\n" + resultKeys.map(key => key.licenseCode).join("\n"));
    return resultKeys;
}

document.getElementById('runScript').addEventListener('click', () => {
    const logOutput = document.getElementById('log');
    logOutput.value = 'Running script...\n';

    cli(1).then(resultKeys => {
        logOutput.value += `Script output:\n${resultKeys.map(key => key.toString()).join('\n')}\n`;
    }).catch(error => {
        logOutput.value += `Error: ${error.message}\n`;
    });
});
