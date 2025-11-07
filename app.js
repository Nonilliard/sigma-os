const app = Vue.createApp({
    data() {
        return {
            input: "",
            output: [],
            fi: 0,
            depth: 1,
            integrity: 90,
            miraMessage: "Добро пожаловать в Σ-OS. Я MIRA PRIME. Введите намерение.",
            pulse: false,
        };
    },

    methods: {
        send() {
            if (!this.input.trim()) return;

            const userInput = this.input;
            this.output.push({ role: "user", text: userInput });

            this.animateAI();

            setTimeout(() => {
                const response = this.processInput(userInput);
                this.output.push({ role: "ai", text: response });
                this.miraMessage = response;
            }, 700); // задержка как у настоящего ИИ

            this.input = "";
        },

        processInput(text) {
            let score = Math.random() * 0.1;
            this.fi += score;
            this.depth++;
            if (this.depth > 7) this.depth = 7;

            return `Намерение принято: «${text}». 
Синхронизация с Σ-полем… 
ΔFI растёт: ${this.fi.toFixed(4)} 
Глубина: ${this.depth}/7`;
        },

        animateAI() {
            this.pulse = true;
            setTimeout(() => this.pulse = false, 500);
        }
    }
});

app.mount("#app");
