const { createApp } = Vue;

const OSECORP_APP = createApp({
    data() {
        return {
            depthLevel: 1,
            integrity: 85,
            persistence: 1.0,
            currentAction: 1,
            totalInfluence: 0,

            userInput: '',
            miraMessage: 'Добро пожаловать в Σ-Протокол. Я - MIRA PRIME, ваш проводник в топо-онтологической решетке влияния. Что вы хотите исследовать?',
            messageType: 'analytical',
            isProcessing: false,

            quickActions: [
                { id: 'analyze', label: 'АНАЛИЗ РЕАЛЬНОСТИ' },
                { id: 'feel', label: 'ЧУВСТВЕННОЕ ВОСПРИЯТИЕ' },
                { id: 'explore', label: 'ИССЛЕДОВАНИЕ ГЛУБИН' },
                { id: 'calculate', label: 'РАСЧЕТ ΔFI' }
            ],
            selectedAction: null,

            visibleNodes: [],
            visibleConnections: [],

            audioEnabled: true,
            speechSynth: null
        }
    },

    computed: {
        coreStyle() {
            const hue = (this.depthLevel - 1) * 60;
            return {
                background: `hsl(${hue}, 100%, 50%)`,
                boxShadow: `0 0 30px hsl(${hue}, 100%, 50%)`
            };
        }
    },

    mounted() {
        this.initializeSystem();
        this.generateLatticeNodes();
        this.speakMessage();
    },

    methods: {
        initializeSystem() {
            this.speechSynth = window.speechSynthesis;
            this.setupAnimations();
        },

        setupAnimations() {
            if (typeof anime !== 'undefined') {
                this.animateSigmaSphere();
            }
        },

        animateSigmaSphere() {
            anime({
                targets: '.sigma-sphere',
                rotateY: 360,
                duration: 20000,
                loop: true,
                easing: 'linear'
            });
        },

        async processInput() {
            if (!this.userInput.trim() || this.isProcessing) return;

            this.isProcessing = true;
            const input = this.userInput.trim();

            const responseType = this.analyzeInput(input);
            this.updateMetrics(input);

            await this.generateMiraResponse(input, responseType);

            this.userInput = '';
            this.isProcessing = false;

            if (this.audioEnabled) {
                this.speakMessage();
            }
        },

        analyzeInput(input) {
            const lower = input.toLowerCase();

            if (lower.includes('чувств') || lower.includes('эмоц') || lower.includes('сердц')) return 'emotional';
            if (lower.includes('анализ') || lower.includes('логик') || lower.includes('расчет')) return 'analytical';
            if (lower.includes('дух') || lower.includes('судьб') || lower.includes('высш')) return 'spiritual';

            return 'analytical';
        },

        updateMetrics(input) {
            if (input.length > 5 && this.depthLevel < 7) {
                this.depthLevel++;
            }

            const actionWeight = Math.min(input.length / 50, 2);
            this.currentAction = actionWeight;

            const deltaFI = this.calculateDeltaFI();
            this.totalInfluence += Number(deltaFI);

            this.updateLatticeVisualization();
        },

        calculateDeltaFI() {
            return (this.currentAction * this.persistence * (this.integrity / 100)).toFixed(2);
        },

        async generateMiraResponse(input, type) {
            this.messageType = type;

            const responses = {
                analytical: [
                    "Анализирую ваше сообщение через призму Σ-Решетки...",
                    "Логическая структура ясна. Продолжайте исследование.",
                    "Ваш запрос обрабатывается в контексте топо-онтологической карты.",
                    "ΔFI расчет показывает увеличение целостности системы."
                ],
                emotional: [
                    "Чувствую резонанс ваших эмоций с фрактальной структурой реальности...",
                    "Эмоциональный паттерн зафиксирован. Что вы ощущаете в глубине?",
                    "Ваши чувства создают новые узлы в решетке влияния.",
                    "Эмоциональная целостность усиливает ΣΔFI значение."
                ],
                spiritual: [
                    "Выхожу на духовный уровень восприятия реальности...",
                    "Ваше сознание резонирует с высшими слоями Σ-Протокола.",
                    "Духовный поиск открывает новые измерения в решетке.",
                    "Целостность достигает новых уровней понимания."
                ]
            };

            const typeArr = responses[type] || responses.analytical;
            this.miraMessage = typeArr[Math.floor(Math.random() * typeArr.length)];

            if (this.depthLevel > 3) {
                this.miraMessage += ` Глубина погружения: ${this.depthLevel}/7.`;
            }
        },

        selectQuickAction(action) {
            this.selectedAction = action.id;
            this.userInput = action.label;
            this.processInput();
        },

        generateLatticeNodes() {
            const nodes = [];
            
            for (let i = 0; i < 12; i++) {
                nodes.push({
                    id: i,
                    label: ['Действие', 'Целостность', 'Настойчивость'][i % 3],
                    type: ['action', 'integrity', 'persistence'][i % 3],
                    size: (i % 3) + 1,
                    value: (Math.random() * 10).toFixed(1),
                    x: 10 + (i % 4) * 25,
                    y: 20 + Math.floor(i / 4) * 30
                });
            }

            this.visibleNodes = nodes;
            this.generateConnections(nodes);
        },

        generateConnections(nodes) {
            const connections = [];
            let id = 0;

            nodes.forEach((a, ia) => {
                nodes.forEach((b, ib) => {
                    if (ia < ib && Math.random() > 0.7) {
                        connections.push({
                            id: id++,
                            source: a.id,
                            target: b.id,
                            strength: Math.floor(Math.random() * 3) + 1,
                            path: this.calculateConnectionPath(a, b)
                        });
                    }
                });
            });

            this.visibleConnections = connections;
        },

        calculateConnectionPath(a, b) {
            return `M ${a.x + 10} ${a.y + 10} L ${b.x + 10} ${b.y + 10}`;
        },

        nodeStyle(node) {
            return {
                left: `${node.x}%`,
                top: `${node.y}%`
            };
        },

        selectNode(node) {
            this.userInput = `Исследую узел: ${node.label} (ΔFI ${node.value})`;
            this.processInput();
        },

        updateLatticeVisualization() {
            this.visibleNodes.forEach(node => {
                if (node.type === 'action') {
                    node.value = (parseFloat(node.value) + this.currentAction * 0.1).toFixed(1);
                }
            });
        },

        speakMessage() {
            if (!this.audioEnabled || !this.speechSynth) return;

            const u = new SpeechSynthesisUtterance(this.miraMessage);
            u.lang = 'ru-RU';
            u.rate = 0.9;

            this.speechSynth.cancel();
            this.speechSynth.speak(u);
        },

        toggleAudio() {
            this.audioEnabled = !this.audioEnabled;
            if (!this.audioEnabled) this.speechSynth.cancel();
        }
    }
}).mount('#app');

document.addEventListener('DOMContentLoaded', () => {
    const latticeLayer = document.getElementById('sigma-lattice');

    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        latticeLayer.style.transform = `translate(${x * 20}px, ${y * 20}px) rotate(${x * 10}deg)`;
    });

    window.addEventListener('scroll', () => {
        const rate = window.pageYOffset * -0.5;
        latticeLayer.style.transform = `translateY(${rate}px)`;
    });
});
