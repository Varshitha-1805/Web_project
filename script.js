document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('task-input');
    const descInput = document.getElementById('desc-input');
    const addBtn = document.getElementById('add-btn');
    const taskList = document.getElementById('task-list');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function renderTasks() {
        taskList.innerHTML = '';

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.className = 'task-item';

            const title = document.createElement('strong');
            title.textContent = task.title;
            title.addEventListener('click', () => editTitle(index));

            const desc = document.createElement('p');
            desc.textContent = task.description || 'No description';
            desc.style.cursor = 'pointer';
            desc.addEventListener('click', () => editDescription(index));

            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = 'Delete';
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => deleteTask(index));

            li.appendChild(title);
            li.appendChild(desc);
            li.appendChild(deleteBtn);
            taskList.appendChild(li);
        });
    }

    addBtn.addEventListener('click', () => {
        const title = taskInput.value.trim();
        const description = descInput.value.trim();

        if (!title) return;

        tasks.push({ title, description });
        taskInput.value = '';
        descInput.value = '';
        saveTasks();
        renderTasks();
    });

    function editTitle(index) {
        const li = taskList.children[index];
        const oldTitle = li.querySelector('strong');

        const input = document.createElement('input');
        input.value = tasks[index].title;

        li.replaceChild(input, oldTitle);
        input.focus();

        input.addEventListener('blur', () => {
            tasks[index].title = input.value.trim() || tasks[index].title;
            saveTasks();
            renderTasks();
        });

        input.addEventListener('keypress', e => {
            if (e.key === 'Enter') input.blur();
        });
    }

    function editDescription(index) {
        const li = taskList.children[index];
        const oldDesc = li.querySelector('p');

        const textarea = document.createElement('textarea');
        textarea.value = tasks[index].description;

        li.replaceChild(textarea, oldDesc);
        textarea.focus();

        textarea.addEventListener('blur', () => {
            tasks[index].description = textarea.value.trim();
            saveTasks();
            renderTasks();
        });
    }

    function deleteTask(index) {
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    renderTasks();
});
