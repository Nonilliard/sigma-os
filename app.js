const app = Vue.createApp({
    data() {
        return {
            input: "",
            mira: "Я слушаю. Введите намерение.",
            depth: 1,
            integrity: 90,
            totalDFI: 0,
            actionStrength: 1,
        }
    },
    methods: {
        submit() {
            if (!this.input) return;

            const len = this.input.length;
            this.actionStrength = Math.min((len / 20), 2).toFixed(2);

            const delta = (this.actionStrength * 1 * (this.integrity/100)).toFixed(2);
            this.totalDFI = (parseFloat(this.totalDFI) + parseFloat(delta)).toFixed(2);

            if (len > 12 && this.depth < 7) this.depth++;

            this.mira = `ΔFI счёт обновлён. Ваше влияние усиливается.`;
            this.input = "";
        },
        mood(x) {
            if (x === "analysis") this.mira = "Анализ принят. Структура мысли подтверждена.";
            if (x === "depth") this.mira = "Вы углубляетесь в решетку Σ-осознания.";
            if (x === "fate") this.mira = "Судьба — это интерфейс. Вы его переписываете.";
            if (x === "core") this.mira = "Ядро откликается. Система активируется.";
        }
    }
}).mount("#app");
