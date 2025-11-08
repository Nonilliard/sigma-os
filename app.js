// Σ-OS — Consciousness Interface Core

const responses = [
  "Сознание зарегистрировано. Продолжай.",
  "Реальность подстраивается под наблюдателя.",
  "Ты активировал Σ-канал влияния.",
  "«Наблюдение — это конструктор мироздания.»",
  "Твоя мысль изменила поле намерений.",
  "Параметры судьбы перенастроены.",
  "Ты входишь глубже. Следи за тоном сознания.",
  "Каждый ввод — это выбор. Каждый выбор — топология."
];

function randomResponse() {
  return responses[Math.floor(Math.random() * responses.length)];
}

// Speech synthesis for MIRA voice
function speak(text) {
  const voice = new SpeechSynthesisUtterance(text);
  voice.lang = "ru-RU";
  voice.rate = 0.92;
  voice.pitch = 1;
  speechSynthesis.cancel();
  speechSynthesis.speak(voice);
}

// Input logic
document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("sigmaInput");
  const output = document.getElementById("response");

  input.addEventListener("keypress", e => {
    if (e.key === "Enter") {
      const val = input.value.trim();
      input.value = "";

      if (!val) return;

      const text = randomResponse();
      output.textContent = text;
      speak(text);
    }
  });
});
