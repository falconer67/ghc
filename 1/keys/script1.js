document.getElementById('startButton').addEventListener('click', main);

const EVENTS_DELAY = 20;
const games = [
    { name: "Zoopolis", appToken: "b2436c89-e0aa-4aed-8046-9b0515e1c46b", promoId: "b2436c89-e0aa-4aed-8046-9b0515e1c46b" },
    { name: "Chain Cube 2048", appToken: "d1690a07-3780-4068-810f-9b5bbf2931b2", promoId: "b4170868-cef0-424f-8eb9-be0622e8e8e3" },
    { name: "Train Miner", appToken: "82647f43-3f87-402d-88dd-09a90025313f", promoId: "c4480ac7-e178-4973-8061-9ed5b2e17954" },
    { name: "Merge Away", appToken: "8d1cc2ad-e097-4b86-90ef-7a27e19fb833", promoId: "dc128d28-c45b-411c-98ff-ac7726fbaea4" },
    { name: "Twerk Race 3D", appToken: "61308365-9d16-4040-8bb0-2f4a4c69074c", promoId: "61308365-9d16-4040-8bb0-2f4a4c69074c" },
    { name: "Polysphere", appToken: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71", promoId: "2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71" },
    { name: "Mow and Trim", appToken: "ef319a80-949a-492e-8ee0-424fb5fc20a6", promoId: "ef319a80-949a-492e-8ee0-424fb5fc20a6" },
    { name: "Gangs Wars", appToken: "b6de60a0-e030-48bb-a551-548372493523", promoId: "c7821fa7-6632-482c-9635-2bd5798585f9" },
    { name: "Cafe Dash", appToken: "bc0971b8-04df-4e72-8a3e-ec4dc663cd11", promoId: "bc0971b8-04df-4e72-8a3e-ec4dc663cd11" }
];

function generateClientId() {
    return `${Date.now()}-${Math.random().toString().slice(2, 21)}`;
}




async function login(clientId, appToken) {
    const response = await fetch('https://api.gamepromo.io/promo/login-client', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ appToken, clientId, clientOrigin: 'deviceid' })
    });

    if (!response.ok) {
        console.error('Error during login:', response.statusText);
        return null;
    }

    const data = await response.json();
    return data.clientToken;
}

async function emulateProgress(clientToken, promoId) {
    const response = await fetch('https://api.gamepromo.io/promo/register-event', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${clientToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoId, eventId: generateClientId(), eventOrigin: 'undefined' })
    });

    if (!response.ok) {
        console.error('Error during emulate progress:', response.statusText);
        return null;
    }

    const data = await response.json();
    return data.hasCode;
}

async function generateKey(clientToken, promoId) {
    const response = await fetch('https://api.gamepromo.io/promo/create-code', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${clientToken}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ promoId })
    });

    if (!response.ok) {
        console.error('Error during generate key:', response.statusText);
        return null;
    }

    const data = await response.json();
    return data.promoCode;
}


async function generateKeyProcess(game) {
    const clientId = generateClientId();
    const clientToken = await login(clientId, game.appToken);

    if (!clientToken) return;

    for (let i = 0; i < 55; i++) {
        await new Promise(resolve => setTimeout(resolve, EVENTS_DELAY * (Math.random() % 3 + 1) / 3 * 1000));
        const hasCode = await emulateProgress(clientToken, game.promoId);

        if (hasCode === 'true') break;
    }

    const key = await generateKey(clientToken, game.promoId);
    return key;
}

async function main() {
    const output = document.getElementById('output');
    output.textContent = '';

    for (const game of games) {
        const key = await generateKeyProcess(game);
        if (key) {
            const message = `${game.name} : ${key}`;
            output.textContent += `${message}\n`;
        } else {
            output.textContent += `Error generating key for ${game.name}\n`;
        }
        await new Promise(resolve => setTimeout(resolve, 10000)); // wait
    }
}
