
    // Função para alternar entre os treinos
    function showTraining(level) {
        // Remove a classe active de todos os botões
        document.querySelectorAll('.level-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Adiciona a classe active ao botão clicado
        event.target.classList.add('active');
        
        // Esconde todos os programas de treino
        document.querySelectorAll('.training-program').forEach(program => {
            program.classList.remove('active');
        });
        
        // Mostra o programa de treino selecionado
        document.getElementById(level).classList.add('active');
    }

    // Função para salvar o treino
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

    // Função para mostrar o histórico
    function showHistory() {
        const history = JSON.parse(localStorage.getItem('workoutHistory') || '[]');
        const historyList = document.getElementById('historyList');
        const modal = document.getElementById('historyModal');
        
        historyList.innerHTML = '';
        
        if (history.length === 0) {
            historyList.innerHTML = '<p>Nenhum treino salvo ainda. 😢</p>';
        } else {
            history.forEach(workout => {
                const workoutItem = document.createElement('div');
                workoutItem.className = 'history-item';
                
                let exercisesHTML = '<ul>';
                workout.exercises.forEach(ex => {
                    exercisesHTML += `<li>${ex.name}: ${ex.sets}x${ex.reps} com ${ex.load}kg</li>`;
                });
                exercisesHTML += '</ul>';
                
                workoutItem.innerHTML = `
                    <div class="history-date">${workout.date} - ${workout.program}</div>
                    ${exercisesHTML}
                `;
                
                historyList.appendChild(workoutItem);
            });
        }
        
        modal.style.display = 'block';
    }

    // Função para fechar o histórico
    function closeHistory() {
        document.getElementById('historyModal').style.display = 'none';
    }

    // Função para limpar os campos
    function clearWorkout() {
        if (confirm('Tem certeza que deseja limpar todos os campos? 😮')) {
            const inputs = document.querySelectorAll('.carga-input');
            inputs.forEach(input => {
                input.value = '';
            });
        }
    }

    // Função para carregar um treino salvo
    function loadWorkout() {
        // Implementação opcional para carregar um treino específico
        console.log('Função loadWorkout() chamada');
    }

    // Fechar o modal quando clicar fora dele
    window.onclick = function(event) {
        const modal = document.getElementById('historyModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Inicialização
    document.addEventListener('DOMContentLoaded', function() {
        loadWorkout();
    });
