function sigmaProcess() {
    const input = document.getElementById("input").value;
    const output = document.getElementById("output");

    if (!input.trim()) {
        output.innerHTML = "Enter a thought to transmit ΔFI.";
        return;
    }

    // Простейшая реакция: считаем длину мысли как энергию намерения
    const deltaFI = (input.length * 0.07).toFixed(2);

    output.innerHTML = `
        <p><strong>Input captured:</strong> ${input}</p>
        <p>ΔFI computed: <strong>${deltaFI}</strong></p>
        <p>Signal accepted into lattice.</p>
    `;
}
