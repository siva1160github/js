const speechSynthesis = window.speechSynthesis;

const formElement = document.querySelector('form');
const textElement = document.querySelector('#texttospeech');
const voiceSelectElement = document.querySelector('#voice-select');
const pitchElement = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const rateElement = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const body = document.querySelector('body');

const getVoicesList = () => {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const option = document.createElement('option');
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang', voice.lang);
        option.setAttribute('data-name', voice.name);
        voiceSelectElement.appendChild(option);
    });
}

getVoicesList();

if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = function () {
        getVoicesList();
    }
}

rateElement.addEventListener('change', e => {
    rateValue.textContent = rateElement.value;
});

pitchElement.addEventListener('change', e => {
    pitchValue.textContent = pitchElement.value;
});

const speak = function () {
    if (speechSynthesis.speaking) {
        console.info("Already speaking...");
        return;
    }

    if (textElement.value) {
        const selectedVoice = voiceSelectElement.options[voiceSelectElement.selectedIndex].getAttribute('data-name');
        const utterance = new SpeechSynthesisUtterance(textElement.value);

        utterance.onend = e => {
            console.info("Speech Done...");
            body.style.background = '#141414';
        };
        utterance.onerror = e => {
            console.error("Speech Error...");
            return;
        };

        utterance.pitch = pitchElement.value;
        utterance.rate = rateElement.value;

        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                utterance.voice = voice;
            }
        });

        body.style.background = '#141414 url(../Images/wave.gif)';
        body.style.backgroundRepeat = 'repeat-x';
        body.style.backgroundSize = '100% 100%';

        speechSynthesis.speak(utterance);
    }
    else{
        console.warn("please enter valid input");
    }
};

formElement.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textElement.blur();
});

voiceSelectElement.addEventListener('change', e => {
    speak();
    textElement.blur();
});