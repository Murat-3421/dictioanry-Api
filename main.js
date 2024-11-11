const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

btn.addEventListener("click", () => {
    let inpWord = document.getElementById("inp-word").value;
    fetch(`${url}${inpWord}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            result.innerHTML = `
            <div class="word">
                <h3>${inpWord}</h3>
                <button onClick="playSound()">
                    <i class="fa-solid fa-volume-high"></i>
                </button>
            </div>
            <div class="details">
                <p>${data[0].meanings[0].partOfSpeech}</p>
                <p>${data[0].phonetic || ""}</p>
            </div>
            <p class="word-meaning">
                ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p class="word-example">
                ${data[0].meanings[0].definitions[0].example || ""}
            </p>
            `;

            const audioUrl = data[0].phonetics[0]?.audio;

            if (audioUrl && isValidAudioUrl(audioUrl)) {
                sound.setAttribute("src", audioUrl);
            } else {
                console.warn("No valid audio source available for this word.");
                sound.removeAttribute("src");
            }
        })
        .catch((error) => {
            console.error("Error fetching data:", error);
            result.innerHTML = `<p class="error">Sorry, we couldn't find the word you're looking for.</p>`;
        })
});

function playSound() {
    if (sound.getAttribute("src")) {
        sound.play().catch(error => {
            console.error("Audio playback failed:", error);
        });
    } else {
        console.log("No audio source to play.");
    }
}

function isValidAudioUrl(url) {
    const audioFormats = ['mp3', 'wav', 'ogg'];
    const fileExtension = url.split('.').pop().toLowerCase();
    return audioFormats.includes(fileExtension);
}
