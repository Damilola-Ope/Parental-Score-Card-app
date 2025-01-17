const scorecardBody = document.getElementById('scorecard-body');

// Load existing tasks from localStorage on page load
window.onload = () => {
    const savedTasks = JSON.parse(localStorage.getItem('scorecardTasks')) || [];
    
    //load task from localStorage if they exist
    if (savedTasks.length > 0) {
        loadScorecard(savedTasks);
    } else {
        // Only fetch tasks from data.json if localStorage is empty
        fetch('data.json')
            .then(response => response.json())
            .then(data => loadScorecard(data));
    }
};

function loadScorecard(tasks) {
    scorecardBody.innerHTML ='';
    tasks.forEach(task => {
        addRow(task.task, task.points, task.earnedPoints);
    });
}

//function to add tasks
function addRow(task = '', points = '', earnedPoints = '') {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td class="task-cell"><input type="text" name="task" value="${task}"></td>
        <td class="point-cell"><input class="points" type="number" name="points" value="${points}"></td>
        <td class="point-cell"><input class="points" type="number" name="points-earned" value="${earnedPoints}"></td>
        <td class="no-print action-column"><button type="button" onclick="deleteRow(this)" class="delete-btn"><span class="material-icons">delete_outline</span></button></td>
    `;
    scorecardBody.appendChild(row);
}

    // function to delete
    function deleteRow(button) {
        /*
        //code to make delete row confirmation
        
        const deleteMsg = document.createElement('div')
 
        let confirmDeletePopup = `
        <p>are you sure you want to Delete?</p>
        <button id='yes'>Yes</button>
        <button id='no'>No</button>
        `*/
        const row = button.closest('tr');
        const choice = 'Are you sure you want to delete this row?'
        if(confirm(choice) == true){
          scorecardBody.removeChild(row);
          saveTasksToLocalStorage(); // Save changes after deleting
        }
    }

    // Save tasks to localStorage
    function saveTasksToLocalStorage() {
        const tasks = Array.from(scorecardBody.children).map(row => {
            const taskInput = row.querySelector('input[name="task"]');
            const pointsInput = row.querySelector('input[name="points"]');
            const pointsEarnedInput = row.querySelector('input[name="points-earned"]');
            return {
                task: taskInput.value,
                points: pointsInput.value,
                pointsEarned: pointsEarnedInput.value
            };
        });
        localStorage.setItem('scorecardTasks', JSON.stringify(tasks));
}
    
    //handle submit event
    document.getElementById('scorecard-form').addEventListener
    ('submit', function(event) {
        event.preventDefault();
        saveTasksToLocalStorage()

        if(doesCookieExist()){
            window.print();
        } else{
            popup();
        }
    });

    // window.onload = loadScorecard;