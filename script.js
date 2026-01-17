function calculateResult() {
  const answers = [];

  for (let i = 1; i <= 3; i++) {
    const answer = document.querySelector(`input[name="q${i}"]:checked`);
    if (!answer) {
      alert("Atsakyk į visus klausimus");
      return;
    }
    answers.push(answer.value);
  }

  const pattern = answers.join("");

  document.getElementById("quiz").classList.add("hidden");
  document.getElementById("loading").classList.remove("hidden");

  setTimeout(() => {
    document.getElementById("loading").classList.add("hidden");
    showResult(pattern);
  }, 2000);
}

function showResult(pattern) {
  const resultDiv = document.getElementById("result");
  resultDiv.classList.remove("hidden");

  let resultText = "";

  if (pattern === "ABC") {
    resultText = `
      <h2>✈️ Rezultatas #1 – Analitinis pilotas</h2>
      <p>Tu pasitiki struktūra, procedūromis ir logika.</p>
      <ul>
        <li>Stiprybė: stabilūs sprendimai</li>
        <li>Rizika: per ilgas svarstymas</li>
        <li>Patarimas: treniruok sprendimų greitį</li>
      </ul>
    `;
  } 
  else if (pattern === "BAC") {
    resultText = `
      <h2>✈️ Rezultatas #2 – Komandinis pilotas</h2>
      <p>Puikiai dirbi su kitais ir pasitiki CRM.</p>
      <p>Patarimas: mokykis lyderystės spaudimo metu.</p>
    `;
  } 
  else {
    resultText = `
      <h2>✈️ Rezultatas #3 – Adaptuojantis pilotas</h2>
      <p>Prisitaikai prie situacijos, bet kartais trūksta krypties.</p>
      <p>Patarimas: stiprink standartų laikymąsi.</p>
    `;
  }

  resultDiv.innerHTML = resultText;
}
