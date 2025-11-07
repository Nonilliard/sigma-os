const { createApp } = Vue;

createApp({
    data() {
        return {
            depth: 1,
            integrity: 90,
            persistence: 1.0,
            action: 1.0,
            total: 0,
            user: "",
            message: "Добро пожаловать в Σ-OS. Я MIRA PRIME. Введите намерение."
        }
    },
    methods: {
        submit() {
            if (!this.user.trim()) return;

            const text = this.user.toLowerCase();
            this.action = Math.min(text.length / 20, 2);
            this.total += this.action * this.persistence * (this.integrity / 100);

            if (text.includes("глуб")) this.depth++;
            if (this.depth > 7) this.depth = 7;

            const replies = [
                "Поток принят. Реальность адаптируется.",
                "ΔFI обновлен. Продолжайте.",
                "Сознание меняет структуру поля.",
                "Запрос интегрирован в решетку судьбы."
            ];
            this.message = replies[Math.floor(Math.random()*replies.length)];
            this.user = "";
        },
        quick(cmd) {
            this.user = cmd;
            this.submit();
        }
    }
}).mount("#app");
