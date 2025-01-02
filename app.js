// Attendre que tout le DOM soit chargé avant d'exécuter le script
document.addEventListener("DOMContentLoaded", () => {
    
    // Récupérer les tâches stockées dans le localStorage sous forme de chaîne JSON,
    // puis les convertir en un tableau JavaScript avec JSON.parse.
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    // Vérifier si des tâches sont disponibles dans le localStorage
    if (storedTasks) {
        // Parcourir chaque tâche récupérée et l'ajouter au tableau `tasks`
        storedTasks.forEach((task) => tasks.push(task));
        
        // Mettre à jour les statistiques des tâches
        updateStats();
        
        // Mettre à jour l'affichage de la liste des tâches
        updateTasksList();
    }
});

// Déclaration d'un tableau global pour stocker les tâches
let tasks = []; 

// Fonction pour enregistrer les tâches dans le localStorage
const saveTasks = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Fonction pour ajouter une nouvelle tâche
const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    // Vérifier si le texte de la tâche n'est pas vide
    if (text) {
        // Ajouter la tâche au tableau avec l'état "non complété"
        tasks.push({ text: text, completed: false });

        // Réinitialiser le champ de saisie
        taskInput.value = "";

        // Mettre à jour l'affichage et enregistrer les modifications
        updateTasksList();
        updateStats();
        saveTasks();
    }
};

// Fonction pour basculer l'état d'achèvement d'une tâche
const togglerTastComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;

    tasks.sort((a, b) => a.completed - b.completed);
    // Mettre à jour l'affichage et enregistrer les modifications
    updateTasksList();
    updateStats();
    saveTasks();
};

// Fonction pour supprimer une tâche
const deleteTask = (index) => {
    // Supprimer la tâche à l'index spécifié
    tasks.splice(index, 1);

    // Mettre à jour l'affichage et enregistrer les modifications
    updateTasksList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");

    // Pré-remplir le champ de saisie avec le texte actuel
    taskInput.value = tasks[index].text;

    // Modifier le comportement du bouton "Ajouter"
    document.getElementById('newTask').onclick = function (e) {
        e.preventDefault(); // Empêcher le rechargement de la page
            // Modifier directement la tâche à l'index donné
            tasks.splice(index, 1);

            // Réinitialiser le champ de saisie et l'action du bouton
            taskInput.value = "";
            this.onclick = addTask;

            // Mettre à jour l'affichage et enregistrer les modifications
            updateTasksList();
            updateStats();
            saveTasks();
      
    };
};

// Fonction pour mettre à jour les statistiques des tâches
const updateStats = () => { 
    const completeTasks = tasks.filter(task => task.completed).length;
    const totalTasks = tasks.length;
    const progress = (completeTasks / totalTasks) * 100;

    // Mettre à jour la barre de progression
    const progressBar = document.getElementById("progress");
    progressBar.style.width = `${progress}%`;

    // Afficher les statistiques numériques
    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`;
};

// Fonction pour mettre à jour l'affichage de la liste des tâches
const updateTasksList = () => {
    const taskList = document.getElementById("task-list");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const listItem = document.createElement("li");

        listItem.innerHTML = `
        <div class="taskItem">
            <div class="task ${task.completed ? "completed" : ""}">
                <input type="checkbox" class="checkbox" ${
                    task.completed ? "checked" : ""
                } />
                <p>${task.text}</p>
            </div>
            <div class="icons">
                <img src="./img/edit.png" onClick="editTask(${index})" />
                <img src="./img/bin.png"  onClick="deleteTask(${index})" />
            </div>
        </div>
        `;

        // Ajouter un événement pour basculer l'état de la tâche
        listItem.addEventListener("change", () => togglerTastComplete(index));
        taskList.append(listItem);
    });
};

// Ajouter un événement de clic sur le bouton "Ajouter"
document.getElementById('newTask').addEventListener('click', function (e) {
    e.preventDefault(); // Empêcher le rechargement de la page

    addTask(); // Ajouter la nouvelle tâche
});
