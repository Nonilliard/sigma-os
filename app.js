const app = Vue.createApp({
  data() {
    return {
      depth: 1,
      integrity: 90,
      influence: 0,
      message: "Добро пожаловать в Σ-OS. Введите намерение.",
      input: ""
    }
  },

  methods: {
    submit() {
      if (!this.input.trim()) return;

      const text = this.input.toLowerCase();
      this.input = "";

      this.depth = Math.min(7, this.depth + 1);
      const action = Math.min(text.length / 20, 2);
      const delta = (action * 1.0 * (this.integrity / 100)).toFixed(2);
      this.influence += parseFloat(delta);

      if (text.includes("цель") || text.includes("путь"))
        this.message = "Цель — форма энергии. Выбери вектор.";
      else if (text.includes("страх"))
        this.message = "Страх фиксирует реальность. Осознание — освобождает.";
      else if (text.includes("я"))
        this.message = "Я — оператор. Не объект.";
      else
        this.message = `ΔFI обновлено: +${delta}`;

      this.speak(this.message);
    },

    speak(text) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "ru-RU";
      u.rate = 0.92;
      speechSynthesis.cancel();
      speechSynthesis.speak(u);
    }
  }
});

app.mount("#app");
