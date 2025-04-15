const tasks = [
    { question: "Das ist kein___ Apfel.", answer: "-" },
    { question: "Das ist ein___ Ei.", answer: "-" },
    { question: "Ist das ein___ Tomate?", answer: "e" },
    { question: "Das ist kein___ Brötchen.", answer: "-" },
    { question: "Ist das ein___ Kartoffel?", answer: "e" },
    { question: "Das ist kein___ Fleisch.", answer: "-" },
    { question: "Das ist kein___ Sahne.", answer: "e" },
    { question: "Das ist ein___ Joghurt.", answer: "-" },
    { question: "Das sind kein___ Eier.", answer: "e" },
    { question: "Das sind kein___ Tomaten.", answer: "e" },
    { question: "Das ist kein___ Schokolade.", answer: "e" },
    { question: "Das ist kein___ Milch.", answer: "e" },
    { question: "Das ist kein___ Käse.", answer: "-" },
    { question: "Das sind kein___ Orangen.", answer: "e" },
    { question: "Das ist ein___ Kilo Kartoffeln.", answer: "-" },
    { question: "Das ist ein___ Getränk.", answer: "-" },
    { question: "Das ist kein___ Kaffee.", answer: "-" },
    { question: "Das ist kein___ Tee.", answer: "-" }
];

const container = document.getElementById("cardsContainer");
const fireworks = document.getElementById("fireworks");

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function createCards(tasks) {
    container.innerHTML = "";

    shuffle(tasks).forEach(task => {
        const card = document.createElement("div");
        card.classList.add("card");

        card.innerHTML = `
            <div class="card-inner">
                <div class="card-front">${task.question}</div>
                <div class="card-back">
                    <p>${task.answer}</p>
                    <div>
                        <button class="correctBtn">✅</button>
                        <button class="wrongBtn">❌</button>
                    </div>
                </div>
            </div>
        `;

        // Klicken auf die Karte dreht sie um, wenn sie noch nicht umgedreht ist
        card.addEventListener("click", () => {
            if (!card.classList.contains("flipped")) {
                card.classList.add("flipped");
            }
        });

        // Beim "Richtig"-Button entfernen wir die Karte
        card.querySelector(".correctBtn").onclick = (e) => {
            e.stopPropagation(); // Verhindert, dass das Klicken auf den Button auch das Klicken auf die Karte auslöst
            card.remove();
            checkEnd();
        };

        // Beim "Falsch"-Button soll die Karte nach 1 Sekunde wieder umgedreht und neu positioniert werden
        card.querySelector(".wrongBtn").onclick = (e) => {
            e.stopPropagation();
            setTimeout(() => {
                card.classList.remove("flipped");
                repositionCard(card);
            }, 1000);
        };

        container.appendChild(card);
    });
}

// Diese Funktion entfernt die Karte aus dem Container und fügt sie an einer zufälligen Position wieder ein.
function repositionCard(card) {
    // Zuerst entfernen wir die Karte aus dem Container
    container.removeChild(card);
    // Bestimme die Anzahl der aktuell vorhandenen Karten
    const children = container.children;
    // Wähle einen zufälligen Index zwischen 0 und der Anzahl der vorhandenen Karten (inklusive Möglichkeit, am Ende einzufügen)
    const randomIndex = Math.floor(Math.random() * (children.length + 1));
    if (randomIndex === children.length) {
        container.appendChild(card);
    } else {
        container.insertBefore(card, children[randomIndex]);
    }
}

// Überprüft, ob alle Karten entfernt wurden und das Feuerwerk angezeigt werden soll.
function checkEnd() {
    if (container.children.length === 0) {
        fireworks.style.display = "block";
        setTimeout(() => { fireworks.style.display = "none"; }, 4000);
    }
}

createCards(tasks);