
    function saveWorkout() {
        const currentProgram = document.querySelector('.training-program.active').id;
        const inputs = document.querySelectorAll(`#${currentProgram} .carga-input`);
        const workoutData = {
            date: new Date().toLocaleString(),
            program: currentProgram,
            exercises: []
        };

        inputs.forEach(input => {
            if (input.value) {
                const exerciseRow = input.closest('tr');
                const exerciseName = exerciseRow.cells[0].textContent.trim();
                workoutData.exercises.push({
                    name: exerciseName,
                    sets: exerciseRow.cells[1].textContent,
                    reps: exerciseRow.cells[2].textContent,
                    load: input.value
                });
            }
        });

        const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
        history.unshift(workoutData);
        localStorage.setItem('workoutHistory', JSON.stringify(history));
        
        alert('Treino salvo com sucesso! 🌟');
    }

    // 2. Outras funções necessárias
    function showHistory() { /* ... */ }
    function loadWorkout() { /* ... */ }
    // ... outras funções

    // 3. Inicialização
    document.addEventListener('DOMContentLoaded', function() {
        loadWorkout();
    });
