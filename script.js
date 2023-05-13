const paragraphs = [
    'HTML est le langage de balisage standard pour les pages Web.Avec HTML, vous pouvez créer votre propre site Web.Le HTML est facile à apprendre!',
    'CSS est un langage qui décrit le style d\'un document HTML.CSS décrit comment les éléments HTML doivent être affichés.','JavaScript est un langage de programmation de scripts principalement employé dans les pages web interactives mais aussi pour les serveurs2 avec l\'utilisation (par exemple) de Node.js3. C\'est un langage orienté objet à prototype, c\'est-à-dire que les bases du langage et ses principales interfaces sont fournies par des objets qui ne sont pas des instances de classes',
    'La page web est l\'unité de consultation du World Wide Web. Ce terme a une signification pratique ; il n\'a pas de définition technique formelle. Les pages web sont conçues pour être consultées avec un navigateur web. Elles sont identifiées par une adresse web', 
    'Une gamme de professions qui impliquent la programmation nécessitent souvent une série d\'autres, des compétences similaires, par exemple: développeur (logiciel), développeur web , applications mobiles développeur, embarqué firmware développeur, ingénieur logiciel , informaticien , programmeur de jeux , développeur de jeux et logiciels analyste . ',
    'Les coronavirus sont des virus à ARN fréquents, de la famille des Coronaviridae, qui sont responsables d\'infections digestives et respiratoires chez l\'Homme et l\'animal. Le virus doit son nom à l\'apparence de ses particules virales, portant des excroissances qui évoquent une couronne. Les virions, qui sont constitués d\'une capside recouverte d\'une enveloppe, mesurent 80 à 150 nm de diamètre.'
    
];

const typingText = document.querySelector(".typing-text p"),
    inpField = document.querySelector(".wrapper .input-field"),
    tryAgainBtn = document.querySelector(".content button"),
    timeTag = document.querySelector(".timeLeft span b"),
    errorTag = document.querySelector(".errors span"),
    wpmTag = document.querySelector(".wpm span"),
    cpmTag = document.querySelector(".cpm span");

let timer,
    maxTime = 60,
    timeLeft = maxTime,
    charIndex = errors = isTyping = 0;

function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length);
    typingText.innerHTML = "";
    paragraphs[ranIndex].split("").forEach(char => {
        let span = `<span>${char}</span>`
        typingText.innerHTML += span;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inpField.focus());
    typingText.addEventListener("click", () => inpField.focus());
}

function initTyping() {
    let characters = typingText.querySelectorAll("span");
    let typedChar = inpField.value.split("")[charIndex];
    if (charIndex < characters.length - 1 && timeLeft > 0) {
        if (!isTyping) {
            timer = setInterval(initTimer, 1000);
            isTyping = true;
        }
        if (typedChar == null) {
            if (charIndex > 0) {
                charIndex--;
                if (characters[charIndex].classList.contains("incorrect")) {
                    errors--;
                }
                characters[charIndex].classList.remove("correct", "incorrect");
            }
        } else {
            if (characters[charIndex].innerText == typedChar) {
                characters[charIndex].classList.add("correct");
            } else {
                errors++;
                characters[charIndex].classList.add("incorrect");
            }
            charIndex++;
        }
        characters.forEach(span => span.classList.remove("active"));
        characters[charIndex].classList.add("active");

        let wpm = Math.round(((charIndex - errors) / 5) / (maxTime - timeLeft) * 60);
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

        wpmTag.innerText = wpm;
        errorTag.innerText = errors;
        cpmTag.innerText = charIndex - errors;
    } else {
        clearInterval(timer);
        inpField.value = "";
    }
}

function initTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        timeTag.innerText = timeLeft;
        let wpm = Math.round(((charIndex - errors) / 5) / (maxTime - timeLeft) * 60);
        wpmTag.innerText = wpm;
    } else {
        clearInterval(timer);
    }
}

function resetTest() {
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    charIndex = errors = isTyping = 0;
    inpField.value = "";
    timeTag.innerText = timeLeft;
    wpmTag.innerText = 0;
    errorTag.innerText = 03;
    cpmTag.innerText = 0;
}

loadParagraph();
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetTest);