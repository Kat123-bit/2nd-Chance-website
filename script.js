// Funktion für die Abstimmung
function vote(option) {
  const votesRef = db.ref("votes/" + option);
  votesRef.transaction((currentVotes) => {
    return (currentVotes || 0) + 1;
  }).then(() => {
    updateResults();
  });
}

// Funktion zum Abrufen und Anzeigen der Ergebnisse
function updateResults() {
  db.ref("votes").once("value").then((snapshot) => {
    const data = snapshot.val() || {};
    document.getElementById("result1").innerText = `Option 1: ${data.option1 || 0} Stimmen`;
    document.getElementById("result2").innerText = `Option 2: ${data.option2 || 0} Stimmen`;
    document.getElementById("result3").innerText = `Option 3: ${data.option3 || 0} Stimmen`;
  });
}

// Initiales Laden der Ergebnisse
updateResults();