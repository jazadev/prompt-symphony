document.addEventListener('DOMContentLoaded', function() {
    const promptInput = document.getElementById('promptInput');
    const analyzeBtn = document.getElementById('analyzeBtn');
    const analysisResults = document.getElementById('analysisResults');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const errorMessage = document.getElementById('errorMessage');

    let analyzeTimeout;

    // Función para actualizar los resultados en la UI
    function updateResults(data) {
        document.getElementById('clarityBar').style.width = `${data.clarity_score * 10}%`;
        document.getElementById('clarityBar').setAttribute('aria-valuenow', data.clarity_score * 10);

        const grammarList = document.getElementById('grammarIssues');
        const ethicalList = document.getElementById('ethicalConcerns');
        const suggestionsList = document.getElementById('suggestions');

        grammarList.innerHTML = data.grammar_issues
            .map(issue => `<li class="list-group-item"><i class="bi bi-exclamation-triangle text-warning"></i> ${issue}</li>`)
            .join('');

        ethicalList.innerHTML = data.ethical_concerns
            .map(concern => `<li class="list-group-item"><i class="bi bi-shield-exclamation text-danger"></i> ${concern}</li>`)
            .join('');

        suggestionsList.innerHTML = data.improvement_suggestions
            .map(suggestion => `<li class="list-group-item"><i class="bi bi-lightbulb text-info"></i> ${suggestion}</li>`)
            .join('');

        document.getElementById('improvedPrompt').textContent = data.improved_prompt;
    }

    // Función para analizar el prompt
    async function analyzePrompt() {
        const prompt = promptInput.value.trim();

        if (!prompt) {
            errorMessage.textContent = 'Por favor, ingrese un prompt para analizar';
            errorMessage.classList.remove('d-none');
            return;
        }

        try {
            loadingSpinner.classList.remove('d-none');
            analysisResults.classList.add('d-none');
            errorMessage.classList.add('d-none');

            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || 'Error en la respuesta del servidor');
            }

            loadingSpinner.classList.add('d-none');
            analysisResults.classList.remove('d-none');
            updateResults(data);

            // Agregar clase show con un pequeño delay para la animación
            setTimeout(() => {
                analysisResults.classList.add('show');
            }, 50);

        } catch (error) {
            loadingSpinner.classList.add('d-none');
            errorMessage.textContent = error.message || 'Error al analizar el prompt. Por favor, intente nuevamente.';
            errorMessage.classList.remove('d-none');
            console.error('Error:', error);
        }
    }

    // Event listeners
    analyzeBtn.addEventListener('click', analyzePrompt);

    promptInput.addEventListener('input', () => {
        clearTimeout(analyzeTimeout);
        analyzeTimeout = setTimeout(analyzePrompt, 1000);
    });
});