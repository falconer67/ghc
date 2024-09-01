const games = {

    1: {
        name: 'Zoopolis',
            appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            interval: 20,
            eventCount: 8, 
    },

    2: {
        name: 'Gangs Wars',
            appToken: 'b6de60a0-e030-48bb-a551-548372493523',
            promoId: 'c7821fa7-6632-482c-9635-2bd5798585f9',
            interval: 120,
            eventCount: 16,
    },
    3: {
        name: 'Cafe Dash',
            appToken: 'bc0971b8-04df-4e72-8a3e-ec4dc663cd11',
            promoId: 'bc0971b8-04df-4e72-8a3e-ec4dc663cd11',
            interval: 20,
            eventCount: 10,
    },
    4: {
        name: 'Mow and Trim',
        appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        interval: 20,
        eventCount: 10,
    },
    5: {
        name: 'Chain Cube 2048',
        appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
        promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
        interval: 20,
        eventCount: 3,
    },
    6 : {
        name: 'Train Miner',
        appToken: '82647f43-3f87-402d-88dd-09a90025313f',
        promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
        interval: 120,
        eventCount: 1,
    },
    7: {
        name: 'Merge Away',
        appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
        promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
        interval: 21,
        eventCount: 7,
    },
    8: {
        name: 'TwerkRace',
        appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        interval: 20,
        eventCount: 10,
        },
       9: {
            
        name: 'Polysphere',
        appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        interval: 20,
        eventCount: 16,
        } 
};

//const ln = document.getElementById('ln');
//const container = document.querySelector('.container');
      //  ln.addEventListener('click', () => {
          //  if (container.style.backgroundColor === 'black') {
              //  container.style.backgroundColor = 'white';
          //  } else {
               // container.style.backgroundColor = 'black';
           // }
       // });


const toggleIcon = document.getElementById('toggleIcon');
        const container = document.querySelector('.container');
        toggleIcon.addEventListener('click', () => {
            if (container.style.backgroundColor === 'black') {
                container.style.backgroundColor = 'white';
                toggleIcon.textContent = '🌙';
            } else {
                container.style.backgroundColor = 'black';
                toggleIcon.textContent = '☀️';
            }
        });

function generateClientId() {
    // return crypto.randomUUID();
    
     const timestamp = Date.now();
    const randomNumbers = [];
    
    for (let i = 0; i < 19; i++) {
        randomNumbers.push(Math.floor(Math.random() * 10));
     }
    
     return `${timestamp}-${randomNumbers.join('')}`;
}


async function loginClient(gameNumber) {
    const clientId = generateClientId();
    const url = 'https://api.gamepromo.io/promo/login-client';
  
    const data = {
        appToken: games[gameNumber].appToken,
        clientId: clientId,
        clientOrigin: 'deviceid'
    };

    const headers = {
        'Content-Type': 'application/json; charset=utf-8',
    };

    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(5000),
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });
        const result = await response.json();

        if (result.error_code === 'TooManyIpRequest') {
            return 'TooManyIpRequest';
        }
        return result.clientToken;
    } catch (error) {
        await new Promise(resolve => setTimeout(resolve, 5000));
        return loginClient(gameNumber);
    }
}

async function registerEvent(token, gameNumber) {
    await new Promise(resolve => setTimeout(resolve, games[gameNumber].interval * 1000));
    const eventId = generateRandomUUID();
    const url = 'https://api.gamepromo.io/promo/register-event';
    const data = {
        promoId: games[gameNumber].promoId,
        eventId: eventId,
        eventOrigin: 'undefined'
    };
    const headers = {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json; charset=utf-8',
    };
    try {
        const response = await fetch(url, {
            signal: AbortSignal.timeout(5000),
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!result.hasCode) {
            console.log('Retry register event');
            return registerEvent(token, gameNumber);
        } else {
            return token;
        }
    } catch (error) {
        console.error('Fatal error:', error.message);
        await new Promise(resolve => setTimeout(resolve, 5000));
        let newToken = await loginClient(gameNumber);
        if (newToken === 'TooManyIpRequest') {
            throw new Error('لو رفتیم ! یکم صبر کن دوباره تست کن')
        }
        return registerEvent(newToken, gameNumber);
    }
}

async function createCode(token, gameNumber) {
    let response;
    do {
        try {
            await new Promise(resolve => setTimeout(resolve, 1000))
            const url = 'https://api.gamepromo.io/promo/create-code';

            const data = {
                promoId: games[gameNumber].promoId
            };

            const headers = {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json; charset=utf-8',
            };
            response = await fetch(url, {
                signal: AbortSignal.timeout(5000),
                method: 'POST',
                headers: headers,
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (result.promoCode) {
                return result.promoCode;
            }

        } catch (error) {
            console.error('Fatal error:', error.message);
        }
    } while (!response || !response.promoCode); 
}

function generateRandomUUID() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

const generateButton = document.getElementById('generateButton');
const generateTimeValue = document.getElementById('generate-time-value');
const generateProcessBlock = document.getElementById('process-generate-block');
let keyBlock = document.getElementById('keys-block');
const gameSelect = document.getElementById('game-names-select');

async function generate() {
    setsel(gameSelect.value);
    generateButton.style.display = 'none';
    gameSelect.disabled = true;
    generateProcessBlock.style.display = 'flex';

    const selectedGame = parseInt(gameSelect.value);

    let eventInterval =  games[selectedGame].interval;
    let eventCount =  games[selectedGame].eventCount;
    const endGenerateTime = Date.now() + (eventInterval * eventCount + 30) * 1000;

    keyBlock.style.display = 'none';

    generateTimeValue.innerText = '⏳';

    let generateTimeInterval = setInterval(() => startProcessGeneration(endGenerateTime), 1000);
    const codes = [];

    await new Promise(resolve => setTimeout(resolve, 5000));

    const tasks = [];

    for (let i = 0; i < 4; i++) {
        tasks.push((async (index) => {
            try {
                let token = await loginClient(selectedGame);

                if (token === 'TooManyIpRequest') {
                    throw new Error('لو رفتیم ! یکم صبر کن دوباره تست کن')
                }

                let registerToken = await registerEvent(token, selectedGame);
                codes[index] = await createCode(registerToken, selectedGame);
            } catch (error) {
                codes[index] = `Error: ${error.message}`;
            }
        })(i));
    }

    await Promise.all(tasks);

    keyBlock.style.display = 'flex';

    for (let i = 0; i < 4; i++) {
        let keyValue = document.getElementById('keys-value-' + (i + 1));
        keyValue.innerText = codes[i];
    }

    generateButton.style.display = 'block';
    gameSelect.disabled = false;
    clearInterval(generateTimeInterval);
    updateGenerateTime(gameSelect)
    console.log(codes);
}

function startProcessGeneration(generationTime) {
    function updateProcessGenerationTime(generationTime) {
        const now = new Date();
        
        const distance = generationTime - now.getTime();

        generateTimeValue.innerText = printTime(distance)

        if (distance < 0) {
            generateTimeValue.innerText = "⏳";
        }
    }

    updateProcessGenerationTime(generationTime);
}

function printTime(distance) {
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return  String(hours).padStart(2, '0') + ':' +
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0');
}

function updateGenerateTime(select) {
    const selectedGame = parseInt(select.value);

    let eventInterval =  games[selectedGame].interval;
    let eventCount =  games[selectedGame].eventCount;

    generateTimeValue.innerText = printTime((eventInterval * eventCount + 30) * 1000)
}
function changesel(v) {
    
    document.getElementById('game-names-select').value = v;
    const selectedGame = parseInt(v);
    let eventInterval = games[selectedGame].interval;
    let eventCount = games[selectedGame].eventCount;
    generateTimeValue.innerText = printTime((eventInterval * eventCount + 30) * 1000);
}
function setsel(v)
{
let selectedText;
    switch (v) {
        case '1':
            selectedText =  "zoopolis ";
            break;
        case '2':
            selectedText = "gangs war ";
            break;
        case '3':
            selectedText = "Cafe dash ";
            break;
        case '4':
            selectedText = "mow & trim ";
            break;
        case '5':
            selectedText = "chain cube ";
            break;  
        case '6':
            selectedText = "train miner ";
         case '7':
            selectedText = "merge away";
            break;
        case '8':
            selectedText = "twer race ";
            break;
         case '9':
            selectedText = "polysphere ";
            break;
        default:
            selectedText = "";
    }
    document.getElementById('selectedgame').innerText = selectedText + " در حال تولید کد برای "

}


function openurl()
{
    window.open('https://t.me/+OfQR1G0RQRYwMzdk', '_blank');
 
}
async function copyCode(codeId, button) {
    try {
        const content = document.getElementById(codeId).textContent;
        await navigator.clipboard.writeText(content);

        const toast = document.getElementById('toast');

        const buttonRect = button.getBoundingClientRect();
        toast.style.left = `${buttonRect.left + window.scrollX - 10}px`;
        toast.style.top = `${buttonRect.top - toast.offsetHeight + window.scrollY}px`;

        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000); 
    } catch (error) {
        console.error('Failed to copy content: ', error);
    }
}

generateButton.addEventListener('click', generate);

updateGenerateTime(gameSelect)
