// ===========================
// GLOBAL STATE AND VARIABLES
// ===========================

// Retrieve todos from localStorage or initialize empty array if none exist
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Retrieve history of deleted/completed tasks from localStorage or initialize empty array
let history = JSON.parse(localStorage.getItem('history')) || [];

// Track current filter view: 'all', 'active', or 'completed'
let currentFilter = 'all';

// Store ID of todo currently being edited, null when not in edit mode
let editingId = null;

// ===========================
// DOM ELEMENT REFERENCES
// ===========================

// Reference to the text input field where users type new todo text
const todoInput = document.getElementById('todoInput');

// Reference to the date input field for setting task reminder dates
const todoDate = document.getElementById('todoDate');

// Reference to the time input field for setting task reminder times
const todoTime = document.getElementById('todoTime');

// Reference to the add button that creates new todos
const addBtn = document.getElementById('addBtn');

// Reference to the list container where all todos are rendered
const todoList = document.getElementById('todoList');

// Reference to all filter buttons (All, Active, Completed)
const filterBtns = document.querySelectorAll('.filter-btn');

// Reference to the element showing count of remaining incomplete tasks
const itemsLeft = document.getElementById('itemsLeft');

// Reference to button that clears all completed tasks
const clearCompleted = document.getElementById('clearCompleted');

// Reference to button that deletes all tasks
const emptyAll = document.getElementById('emptyAll');

// Reference to element displaying total count of all tasks
const allCount = document.getElementById('allCount');

// Reference to element displaying count of active (incomplete) tasks
const activeCount = document.getElementById('activeCount');

// Reference to element displaying count of completed tasks
const completedCount = document.getElementById('completedCount');

// Reference to notification banner that appears when browser notifications not enabled
const notificationBanner = document.getElementById('notificationBanner');

// Reference to theme toggle button for switching between dark and light modes
const themeToggle = document.getElementById('themeToggle');

// Reference to button that opens the history modal
const viewHistory = document.getElementById('viewHistory');

// Reference to the modal container for viewing task history
const historyModal = document.getElementById('historyModal');

// Reference to the list inside history modal where deleted tasks are displayed
const historyList = document.getElementById('historyList');

// Reference to button that clears all history entries
const clearHistory = document.getElementById('clearHistory');

// ===========================
// DATE AND TIME UTILITIES
// ===========================

// Get today's date in YYYY-MM-DD format for use as minimum date in date picker
function getTodayDateString() {
    // Create a new Date object representing current moment
    const today = new Date();
    // Convert to ISO string format and extract the date portion (before 'T')
    return today.toISOString().split('T')[0];
}

// Get current time in HH:MM format with proper zero-padding
function getCurrentTimeString() {
    // Create a new Date object representing current moment
    const now = new Date();
    // Extract hours and minutes, pad with leading zeros if needed
    return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}`;
}

// Check if a given date and time is in the future (not in the past)
function isFutureDateTime(dateStr, timeStr) {
    // If no date provided, consider it valid (no reminder set)
    if (!dateStr) return true;
    // Get current moment
    const now = new Date();
    // Parse the selected date and time; default to midnight if no time specified
    const selected = new Date(`${dateStr}T${timeStr || '00:00'}`);
    // Return true if selected time is at or after current time
    return selected >= now;
}

// Convert YYYY-MM-DD format to readable date string (e.g., "Jan 15, 2026")
function formatDate(dateStr) {
    // Return empty string if no date provided
    if (!dateStr) return '';
    // Create Date object from the date string (add T00:00 to create valid ISO datetime)
    const date = new Date(dateStr + 'T00:00');
    // Format using toLocaleDateString with abbreviated month, numeric day, and full year
    return date.toLocaleDateString('en-US', { month:'short', day:'numeric', year:'numeric' });
}

// Convert HH:MM format to 12-hour time with AM/PM (e.g., "3:30 PM")
function formatTime(timeStr) {
    // Return empty string if no time provided
    if (!timeStr) return '';
    // Split the time string into hours and minutes
    const [hours, minutes] = timeStr.split(':');
    // Convert hours string to integer
    const h = parseInt(hours);
    // Determine AM or PM based on hour value (12+ is PM)
    const ampm = h >= 12 ? 'PM' : 'AM';
    // Convert 24-hour format to 12-hour format (0 becomes 12, 13 becomes 1, etc.)
    const displayHour = h % 12 || 12;
    // Return formatted time string
    return `${displayHour}:${minutes} ${ampm}`;
}

// ===========================
// STORAGE FUNCTIONS
// ===========================

// Save todos to localStorage, excluding timeoutId since it can't be serialized
function saveTodos() {
    // Map through todos and destructure to remove timeoutId from each
    // This extracts all properties except timeoutId using rest operator
    const todosToSave = todos.map(({timeoutId, ...rest}) => rest);
    // Store the cleaned todos array as JSON string in localStorage
    localStorage.setItem('todos', JSON.stringify(todosToSave));
}

// Save history entries to localStorage as JSON
function saveHistory() {
    // Convert history array to JSON and store in localStorage
    localStorage.setItem('history', JSON.stringify(history));
}

// ===========================
// NOTIFICATION FUNCTIONS
// ===========================

// Schedule an alert notification for a todo at its specified date/time
function scheduleNotification(todo) {
    // Return early if reminder not enabled, or if date/time not set
    if (!todo.hasReminder || !todo.date || !todo.time) return;

    // Create a Date object for the reminder time from todo's date and time
    const reminderTime = new Date(`${todo.date}T${todo.time}`);
    // Get current moment
    const now = new Date();
    // Calculate milliseconds until the reminder should fire
    const delay = reminderTime - now;

    // Only schedule if the delay is positive (reminder is in the future)
    if (delay > 0) {
        // Schedule an alert to appear after the delay expires
        // Store the timeoutId in the todo so it can be cancelled later
        todo.timeoutId = setTimeout(() => {
            // Display an alert with the task text and a bell emoji reminder icon
            alert(`Task Reminder 🔔\n\n${todo.text}`);
        }, delay);
    }
}

// Cancel a scheduled notification for a todo by clearing its timeout
function cancelNotification(todo) {
    // Check if todo has a timeoutId (meaning a notification was scheduled)
    if (todo.timeoutId) {
        // Clear the scheduled timeout to prevent the alert from appearing
        clearTimeout(todo.timeoutId);
        // Delete the timeoutId property since the timeout is no longer active
        delete todo.timeoutId;
    }
}

// Reschedule reminders for all active todos (used after page reload)
function rescheduleReminders() {
    // Iterate through all todos in the list
    todos.forEach(todo => {
        // Only reschedule if reminder is enabled and task is not completed
        if (todo.hasReminder && !todo.completed) scheduleNotification(todo);
    });
}

// Check if the browser supports notifications and show banner if permission pending
function checkNotificationSupport() {
    // Return early if browser doesn't have Notification API
    if (!("Notification" in window)) return;
    // If notification permission is still in default (not decided) state, show banner
    if (Notification.permission === "default") notificationBanner.style.display = 'flex';
}

// Request notification permission from user and reschedule reminders if granted
function requestNotificationPermission(todoId = null) {
    // Request notification permission from the browser
    Notification.requestPermission().then(perm => {
        // If user granted permission
        if (perm === "granted") {
            // Hide the notification banner since permission is now granted
            notificationBanner.style.display = 'none';
            // Reschedule all reminders with the newly granted permission
            rescheduleReminders();
            // If this was called from reminder toggle, enable the reminder automatically
            if (todoId) {
                // Find the todo by its ID
                const todo = todos.find(t => t.id === todoId);
                // Only proceed if todo exists and is not already completed
                if (todo && !todo.completed) {
                    // Enable the reminder for this specific todo
                    todo.hasReminder = true;
                    // Schedule the notification for this todo
                    scheduleNotification(todo);
                    // Save the updated todo to localStorage
                    saveTodos();
                    // Refresh the UI to show updated reminder status
                    render();
                }
            }
        }
    });
}

// ===========================
// CORE CRUD OPERATIONS
// ===========================

// Create a new todo from the input fields and add it to the todos array
function addTodo() {
    // Get the trimmed text from the input field
    const text = todoInput.value.trim();
    // Return early if input is empty or whitespace only
    if (!text) return;

    // Get the date value from the date input
    const date = todoDate.value;
    // Get the time value from the time input
    const time = todoTime.value;

    // Validate that if both date and time are set, they represent a future time
    if (date && time && !isFutureDateTime(date, time)) {
        // Show error alert if user tried to set a reminder in the past
        alert('Please select a future date and time for reminders.');
        return;
    }

    // Create new todo object with all properties
    const todo = {
        // Use current timestamp as unique identifier
        id: Date.now(),
        // Store the task text
        text,
        // Store the reminder date if set
        date,
        // Store the reminder time if set
        time,
        // Todos start as incomplete
        completed: false,
        // Reminders are disabled by default
        hasReminder: false
    };

    // Add the new todo to the todos array
    todos.push(todo);
    // Save updated todos to localStorage
    saveTodos();
    // Refresh the UI to display the new todo
    render();

    // Clear all input fields to prepare for next entry
    todoInput.value = '';
    todoDate.value = '';
    todoTime.value = '';
}

// Toggle a todo's completed status between true and false
function toggleComplete(id) {
    // Find the todo with matching ID
    const todo = todos.find(t => t.id === id);
    // Return early if todo not found
    if (!todo) return;

    // Toggle the completed property (true becomes false, false becomes true)
    todo.completed = !todo.completed;
    
    // If task was just marked as completed
    if (todo.completed) {
        // Cancel any scheduled reminder since task is done
        cancelNotification(todo);
        // Add entry to history log showing this task was completed
        addToHistory(todo, 'completed');
    } else {
        // If task was uncompleted and has reminder enabled, reschedule it
        if (todo.hasReminder) scheduleNotification(todo);
    }

    // Save the updated todos to localStorage
    saveTodos();
    // Refresh the UI to show updated completion status
    render();
}

// Toggle reminder on/off for a todo, requesting permission if needed
function toggleReminder(id) {
    // Find the todo with matching ID
    const todo = todos.find(t => t.id === id);
    // Return early if todo not found
    if (!todo) return;

    // Check if todo has both date and time set
    if (!todo.date || !todo.time) {
        // Show error if user tries to set reminder without date/time
        alert('Please set a date and time first!');
        return;
    }

    // Verify the reminder time is in the future, not in the past
    if (!isFutureDateTime(todo.date, todo.time)) {
        // Show error if user tries to set reminder for past time
        alert('Cannot set reminder for past time!');
        return;
    }

    // Check if the browser supports the Notification API
    if (!("Notification" in window)) {
        // Show error if browser doesn't support notifications
        alert('Your browser does not support notifications.');
        return;
    }

    // If notification permission has not been granted yet
    if (Notification.permission !== "granted") {
        // Ask user with a confirm dialog if they want to enable notifications
        const enableReminder = confirm('Enable notifications to set reminders for your tasks?');
        // If user clicked OK, request permission
        if (enableReminder) {
            // Request permission and pass the todo ID to enable reminder after grant
            requestNotificationPermission(id);
        }
        // Stop here since we're waiting for permission response
        return;
    }

    // If permission is already granted, toggle the reminder on/off
    todo.hasReminder = !todo.hasReminder;

    // If reminder was just enabled, schedule the notification
    if (todo.hasReminder) {
        scheduleNotification(todo);
    } else {
        // If reminder was just disabled, cancel the scheduled notification
        cancelNotification(todo);
    }

    // Save the updated todos to localStorage
    saveTodos();
    // Refresh the UI to show updated reminder status
    render();
}

// Delete a todo from the list after user confirmation
function deleteTodo(id) {
    // Find the todo with matching ID
    const todo = todos.find(t => t.id === id);
    // Return early if todo not found
    if (!todo) return;

    // Ask user to confirm deletion
    if (!confirm('Delete this task?')) return;

    // Cancel any scheduled reminder for this todo
    cancelNotification(todo);
    // Add the deleted todo to history so it can be restored later
    addToHistory(todo, 'deleted');
    // Remove the todo from the todos array, keeping all others
    todos = todos.filter(t => t.id !== id);
    // Save the updated todos to localStorage
    saveTodos();
    // Refresh the UI to remove the todo
    render();
}

// Enter edit mode for a todo to allow text and date/time changes
function editTodo(id) {
    // Set the ID of the todo currently being edited
    editingId = id;
    // Refresh the UI to show edit inputs instead of view mode
    render();
}

// Save changes made to a todo in edit mode
function saveEdit(id) {
    // Find the todo with matching ID
    const todo = todos.find(t => t.id === id);
    // Return early if todo not found
    if (!todo) return;

    // Get the edit input field for this todo
    const input = document.querySelector(`#edit-input-${id}`);
    // Get the date edit field for this todo
    const dateInput = document.querySelector(`#edit-date-${id}`);
    // Get the time edit field for this todo
    const timeInput = document.querySelector(`#edit-time-${id}`);

    // Get and trim the new text from the input field
    const newText = input.value.trim();
    // Return early if user left the text field empty
    if (!newText) return;

    // Get the new date value
    const newDate = dateInput.value;
    // Get the new time value
    const newTime = timeInput.value;

    // Validate that if both date and time are set, they represent a future time
    if (newDate && newTime && !isFutureDateTime(newDate, newTime)) {
        // Show error if user tried to set date/time in the past
        alert('Please select a future date and time.');
        return;
    }

    // Cancel the old scheduled notification before updating date/time
    cancelNotification(todo);

    // Update the todo's text with the new value
    todo.text = newText;
    // Update the todo's date with the new value
    todo.date = newDate;
    // Update the todo's time with the new value
    todo.time = newTime;

    // If reminder is enabled and new date/time are set, reschedule the notification
    if (todo.hasReminder && todo.date && todo.time) {
        scheduleNotification(todo);
    }

    // Exit edit mode by clearing the editing ID
    editingId = null;
    // Save the updated todos to localStorage
    saveTodos();
    // Refresh the UI to show the updated todo in view mode
    render();
}

// Exit edit mode without saving changes
function cancelEdit() {
    // Clear the editing ID to exit edit mode
    editingId = null;
    // Refresh the UI to return to view mode
    render();
}

// ===========================
// HISTORY FUNCTIONS
// ===========================

// Add a deleted or completed task entry to the history log
function addToHistory(todo, action) {
    // Add new history entry to the beginning of the history array
    history.unshift({
        // Create unique ID for this history entry
        id: Date.now(),
        // Store the task text as it was
        text: todo.text,
        // Store the date if it had one set
        date: todo.date,
        // Store the time if it had one set
        time: todo.time,
        // Store the action that happened: 'completed' or 'deleted'
        action,
        // Record the exact timestamp when this action occurred
        timestamp: new Date().toISOString(),
        // Store whether the task was completed when action occurred
        completed: todo.completed
    });
    // Save the updated history to localStorage
    saveHistory();
}

// Restore a deleted or completed task from history back to the active todos list
function restoreFromHistory(historyId) {
    // Find the history entry with matching ID
    const item = history.find(h => h.id === historyId);
    // Return early if history entry not found
    if (!item) return;

    // Create a new todo object from the history entry
    const todo = {
        // Generate new ID for the restored todo
        id: Date.now(),
        // Use the text from history
        text: item.text,
        // Use the date from history
        date: item.date,
        // Use the time from history
        time: item.time,
        // Restored todos start as incomplete
        completed: false,
        // Reminders are disabled on restored todos
        hasReminder: false
    };

    // Add the restored todo to the active todos array
    todos.push(todo);
    // Save the updated todos to localStorage
    saveTodos();
    // Refresh the main todo list UI
    render();
    // Refresh the history modal to reflect the restoration
    renderHistory();
}

// Clear all completed tasks from the todos array
function clearCompletedTasks() {
    // Filter to get only completed tasks
    const completed = todos.filter(t => t.completed);
    // If no completed tasks exist, show info message
    if (completed.length === 0) {
        alert('No completed tasks to clear!');
        return;
    }

    // Ask user to confirm clearing multiple tasks
    if (!confirm(`Clear ${completed.length} completed task(s)?`)) return;

    // Cancel notifications for each completed task
    completed.forEach(t => cancelNotification(t));
    // Remove completed tasks by keeping only incomplete ones
    todos = todos.filter(t => !t.completed);
    // Save the updated todos to localStorage
    saveTodos();
    // Refresh the UI to show the deleted tasks are gone
    render();
}

// Delete all tasks from the todos array (nuclear option)
function emptyAllTasks() {
    // If there are no tasks, show a message
    if (todos.length === 0) {
        alert('No tasks to remove!');
        return;
    }

    // Ask user to confirm this destructive action with emphasis on permanence
    if (!confirm('Delete all tasks? This cannot be undone!')) return;

    // Iterate through all todos to handle cleanup
    todos.forEach(t => {
        // Cancel any scheduled notifications for each task
        cancelNotification(t);
        // Add each deleted task to history
        addToHistory(t, 'deleted');
    });
    // Clear the entire todos array
    todos = [];
    // Save the (now empty) todos array to localStorage
    saveTodos();
    // Refresh the UI to show all tasks are gone
    render();
}

// ===========================
// FILTER FUNCTIONS
// ===========================

// Set the active filter and update UI to show selected filter button as active
function setFilter(filter) {
    // Update the current filter state variable
    currentFilter = filter;
    // Iterate through all filter buttons to update their active state
    filterBtns.forEach(btn => {
        // Check if this button matches the selected filter
        if (btn.dataset.filter === filter) {
            // Add the 'active' class to highlight this button
            btn.classList.add('active');
        } else {
            // Remove the 'active' class from non-selected buttons
            btn.classList.remove('active');
        }
    });
    // Refresh the UI to show filtered todos
    render();
}

// ===========================
// RENDER FUNCTIONS
// ===========================

// Generate and display the todo list based on current filter and edit state
function render() {
    // Start with all todos as the default
    let filtered = todos;
    // Filter to show only active (incomplete) todos if 'active' filter is selected
    if (currentFilter === 'active') {
        filtered = todos.filter(t => !t.completed);
    } 
    // Filter to show only completed todos if 'completed' filter is selected
    else if (currentFilter === 'completed') {
        filtered = todos.filter(t => t.completed);
    }

    // If there are no todos to display after filtering
    if (filtered.length === 0) {
        // Show a message to the user that there are no tasks
        todoList.innerHTML = '<div class="empty-state">No tasks to display</div>';
    } else {
        // Generate HTML for each todo item
        todoList.innerHTML = filtered.map(todo => {
            // Check if this todo is currently in edit mode
            if (editingId === todo.id) {
                // Return edit form HTML with input fields for text, date, and time
                return `
                    <li class="todo-item ${todo.completed ? 'completed' : ''}">
                        <div class="edit-mode-container">
                            <!-- Text input field with current todo text as placeholder -->
                            <input type="text" class="edit-input" id="edit-input-${todo.id}" value="${todo.text}">
                            <!-- Row containing date and time input fields -->
                            <div class="edit-datetime-row">
                                <!-- Date picker with minimum date set to today -->
                                <input type="date" class="datetime-input" id="edit-date-${todo.id}" value="${todo.date || ''}" min="${getTodayDateString()}">
                                <!-- Time picker with current time or empty if not set -->
                                <input type="time" class="datetime-input" id="edit-time-${todo.id}" value="${todo.time || ''}">
                            </div>
                            <!-- Row with Save and Cancel buttons -->
                            <div class="edit-actions-row">
                                <!-- Save button that persists edits -->
                                <button class="save-btn" onclick="saveEdit(${todo.id})">Save</button>
                                <!-- Cancel button that discards edits -->
                                <button class="cancel-btn" onclick="cancelEdit()">Cancel</button>
                            </div>
                        </div>
                    </li>
                `;
            }

            // Return the view mode HTML for non-editing todos
            return `
                <li class="todo-item ${todo.completed ? 'completed' : ''}">
                    <div class="todo-main-row">
                        <!-- Checkbox that marks todo as complete when clicked -->
                        <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} onchange="toggleComplete(${todo.id})">
                        <!-- Container for the task text and datetime information -->
                        <div class="todo-content">
                            <!-- The main task text -->
                            <div class="todo-text">${todo.text}</div>
                            <!-- Date and time display (only shown if either is set) -->
                            ${todo.date || todo.time ? `
                                <div class="todo-datetime">
                                    <!-- Display formatted date with calendar emoji if date is set -->
                                    ${todo.date ? `<span class="todo-datetime-item">📅 ${formatDate(todo.date)}</span>` : ''}
                                    <!-- Display formatted time with clock emoji if time is set -->
                                    ${todo.time ? `<span class="todo-datetime-item">⏰ ${formatTime(todo.time)}</span>` : ''}
                                </div>
                            ` : ''}
                        </div>
                        <!-- Container for action buttons -->
                        <div class="todo-actions">
                            <!-- Reminder button (bell emoji) - only shown if both date and time are set -->
                            ${todo.date && todo.time ? `<button class="bell-btn ${todo.hasReminder ? 'active' : ''}" onclick="toggleReminder(${todo.id})" title="${todo.hasReminder ? 'Reminder On' : 'Set Reminder'}">🔔</button>` : ''}
                            <!-- Edit button (pencil emoji) - allows editing todo text and date/time -->
                            <button class="edit-btn" onclick="editTodo(${todo.id})">✏️</button>
                            <!-- Delete button (X symbol) - removes todo from list -->
                            <button class="delete-btn" onclick="deleteTodo(${todo.id})">×</button>
                        </div>
                    </div>
                </li>
            `;
        }).join('');
    }

    // Get all active (incomplete) todos for the counter
    const activeTodos = todos.filter(t => !t.completed);
    // Update the "items left" display with count and proper singular/plural grammar
    itemsLeft.textContent = `${activeTodos.length} item${activeTodos.length !== 1 ? 's' : ''} left`;

    // Update the "all tasks" counter with total count
    allCount.textContent = todos.length;
    // Update the "active tasks" counter with incomplete count
    activeCount.textContent = activeTodos.length;
    // Update the "completed tasks" counter with completed count
    completedCount.textContent = todos.filter(t => t.completed).length;
}

// Generate and display the history modal list of deleted/completed tasks
function renderHistory() {
    // If history is empty, show a message
    if (history.length === 0) {
        historyList.innerHTML = '<div class="empty-state">No history yet</div>';
        return;
    }

    // Generate HTML for each history entry
    historyList.innerHTML = history.map(item => {
        // Parse the ISO timestamp string to a Date object
        const date = new Date(item.timestamp);
        return `
            <li class="history-item">
                <!-- Container for the history item content -->
                <div class="history-item-content">
                    <!-- The original task text -->
                    <div class="history-text">${item.text}</div>
                    <!-- Container for date, time, and action information -->
                    <div class="history-details">
                        <!-- Display formatted date if it exists in the history item -->
                        ${item.date ? `<span class="history-date">📅 ${formatDate(item.date)}</span>` : ''}
                        <!-- Display formatted time if it exists in the history item -->
                        ${item.time ? `<span class="history-time">⏰ ${formatTime(item.time)}</span>` : ''}
                        <!-- Display what action was taken: 'deleted' or 'completed' -->
                        <span class="history-status">${item.action}</span>
                    </div>
                </div>
                <!-- Restore button that brings the task back to active todos -->
                <button class="restore-btn" onclick="restoreFromHistory(${item.id})">Restore</button>
            </li>
        `;
    }).join('');
}

// ===========================
// MODAL CONTROL FUNCTIONS
// ===========================

// Open the history modal to display deleted and completed tasks
function openHistory() {
    // Generate the history list content inside the modal
    renderHistory();
    // Display the history modal by setting it to flex
    historyModal.style.display = 'flex';
}

// Close the history modal
function closeHistory() {
    // Hide the history modal by setting display to none
    historyModal.style.display = 'none';
}

// Clear all history entries after user confirmation
function clearHistoryData() {
    // Check if history is empty
    if (history.length === 0) {
        alert('History is already empty!');
        return;
    }

    // Ask user to confirm this permanent deletion
    if (!confirm('Clear all history? This cannot be undone!')) return;

    // Clear the history array
    history = [];
    // Save the empty history to localStorage
    saveHistory();
    // Re-render the history list to show empty state
    renderHistory();
}

// ===========================
// INITIALIZATION AND EVENT LISTENERS
// ===========================

// Set the minimum date in the main date input to today to prevent past dates
todoDate.min = getTodayDateString();

// Add click event listener to the add button
addBtn.addEventListener('click', addTodo);

// Add enter key handler to the text input so pressing Enter also adds a todo
todoInput.addEventListener('keypress', (e) => {
    // Check if the key pressed was the Enter key
    if (e.key === 'Enter') addTodo();
});

// Add click event listeners to each filter button
filterBtns.forEach(btn => {
    // Get the filter value from the button's data attribute
    btn.addEventListener('click', () => setFilter(btn.dataset.filter));
});

// Add click event listener to clear completed button
clearCompleted.addEventListener('click', clearCompletedTasks);

// Add click event listener to empty all button
emptyAll.addEventListener('click', emptyAllTasks);

// Add click event listener to view history button
viewHistory.addEventListener('click', openHistory);

// Add click event listener to clear history button
clearHistory.addEventListener('click', clearHistoryData);

// Add click event listener to close history modal when clicking the backdrop
historyModal.addEventListener('click', (e) => {
    // Only close if clicking directly on the modal backdrop, not its contents
    if (e.target === historyModal) closeHistory();
});

// Add click event listener to theme toggle button
themeToggle.addEventListener('click', () => {
    // Toggle the 'light' class on the document body to switch themes
    document.body.classList.toggle('light');
    // Update the theme toggle button emoji to reflect current theme
    // Shows sun emoji (☀️) for light mode, moon emoji (🌙) for dark mode
    themeToggle.textContent = document.body.classList.contains('light') ? '☀️' : '🌙';
});

// ===========================
// PAGE LOAD AND INITIALIZATION
// ===========================

// Check if browser supports notifications and show notification request if needed
checkNotificationSupport();

// Reschedule any existing reminders when the page loads
rescheduleReminders();

// Initial render of the todo list
render();

// Initialize floating-label behavior for date/time inputs
function initDateTimePlaceholders() {
    const inputs = [todoDate, todoTime];

    // Helper to update has-value class based on current value
    function updateHasValue(el) {
        if (el.value) el.classList.add('has-value');
        else el.classList.remove('has-value');
    }

    // Set initial state
    inputs.forEach(inp => {
        if (!inp) return;
        updateHasValue(inp);

        // Update on input/change
        inp.addEventListener('input', () => updateHasValue(inp));
        inp.addEventListener('change', () => updateHasValue(inp));

        // Also update on focus/blur to ensure label hides while active
        inp.addEventListener('focus', () => inp.classList.add('has-value'));
        inp.addEventListener('blur', () => updateHasValue(inp));
    });
}

// Run placeholder init
initDateTimePlaceholders();
