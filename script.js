 // Load todos from localStorage or initialize empty array
        // localStorage persists data even after page refresh
        let todos = JSON.parse(localStorage.getItem('todos')) || [];
        
        // Current filter state: 'all', 'active', or 'completed'
        let currentFilter = 'all';
        
        // ID of task currently being edited (null when not editing)
        let editingId = null;

        // Get references to DOM elements for manipulation
        const todoInput = document.getElementById('todoInput');
        const todoDate = document.getElementById('todoDate');
        const todoTime = document.getElementById('todoTime');
        const addBtn = document.getElementById('addBtn');
        const todoList = document.getElementById('todoList');
        const filterBtns = document.querySelectorAll('.filter-btn');
        const itemsLeft = document.getElementById('itemsLeft');
        const clearCompleted = document.getElementById('clearCompleted');
        const emptyAll = document.getElementById('emptyAll');
        const allCount = document.getElementById('allCount');
        const activeCount = document.getElementById('activeCount');
        const completedCount = document.getElementById('completedCount');
        const notificationBanner = document.getElementById('notificationBanner');

        /* ===================================
           NOTIFICATION PERMISSION HANDLING
           =================================== */

        /**
         * Check if browser supports notifications and show banner if needed
         */
        function checkNotificationSupport() {
            if (!("Notification" in window)) {
                console.log("This browser does not support notifications");
                return;
            }

            // Show banner if permission hasn't been granted yet
            if (Notification.permission === "default") {
                notificationBanner.style.display = "flex";
            }
        }

        /**
         * Request notification permission from user
         */
        function requestNotificationPermission() {
            if (!("Notification" in window)) {
                alert("This browser does not support notifications");
                return;
            }

            Notification.requestPermission().then(permission => {
                if (permission === "granted") {
                    notificationBanner.style.display = "none";
                    // Show test notification
                    new Notification("Notifications Enabled!", {
                        body: "You'll now receive reminders for your tasks",
                        icon: "📝"
                    });
                }
            });
        }

        /**
         * Schedule a notification for a specific task
         * @param {Object} todo - The todo object with date, time, and text
         */
        function scheduleNotification(todo) {
            if (!todo.date || !todo.time || !todo.hasReminder) return;
            if (Notification.permission !== "granted") return;

            // Combine date and time into a single Date object
            const reminderDateTime = new Date(`${todo.date}T${todo.time}`);
            const now = new Date();
            const timeUntilReminder = reminderDateTime - now;

            // Only schedule if the time is in the future
            if (timeUntilReminder > 0) {
                // Store timeout ID so we can cancel it later if needed
                todo.timeoutId = setTimeout(() => {
                    new Notification("Task Reminder 🔔", {
                        body: todo.text,
                        icon: "📝",
                        tag: `todo-${todo.id}` // Prevent duplicate notifications
                    });
                }, timeUntilReminder);
            }
        }

        /**
         * Cancel scheduled notification for a task
         * @param {Object} todo - The todo object
         */
        function cancelNotification(todo) {
            if (todo.timeoutId) {
                clearTimeout(todo.timeoutId);
                delete todo.timeoutId;
            }
        }

        /* ===================================
           CORE FUNCTIONS
           =================================== */
        
        /**
         * Save current todos array to localStorage
         * This ensures data persists across page refreshes
         */
        function saveTodos() {
            // Remove timeout IDs before saving (they can't be serialized)
            const todosToSave = todos.map(todo => {
                const { timeoutId, ...todoWithoutTimeout } = todo;
                return todoWithoutTimeout;
            });
            localStorage.setItem('todos', JSON.stringify(todosToSave));
        }

        /**
         * Add a new todo task
         * Creates a todo object with unique ID, text, date, time, and completion status
         */
        function addTodo() {
            const text = todoInput.value.trim(); // Remove whitespace
            if (text === '') return; // Don't add empty tasks

            // Create new todo object
            const todo = {
                id: Date.now(), // Use timestamp as unique ID
                text: text,
                completed: false,
                date: todoDate.value || null, // Optional date
                time: todoTime.value || null, // Optional time
                hasReminder: false // Reminder initially off
            };

            todos.push(todo); // Add to todos array
            todoInput.value = ''; // Clear input fields
            todoDate.value = '';
            todoTime.value = '';
            saveTodos(); // Persist to localStorage
            renderTodos(); // Update UI
        }

        /**
         * Toggle completion status of a task
         * @param {number} id - The ID of the task to toggle
         */
        function toggleTodo(id) {
            const todo = todos.find(t => t.id === id); // Find task by ID
            if (todo) {
                todo.completed = !todo.completed; // Flip completion status
                
                // Cancel reminder if task is completed
                if (todo.completed && todo.hasReminder) {
                    cancelNotification(todo);
                    todo.hasReminder = false;
                }
                
                saveTodos();
                renderTodos();
            }
        }

        /**
         * Toggle reminder for a task
         * @param {number} id - The ID of the task
         */
        function toggleReminder(id) {
            const todo = todos.find(t => t.id === id);
            if (!todo) return;

            // Check if task has date and time set
            if (!todo.date || !todo.time) {
                alert("Please set a date and time for this task before enabling reminders");
                return;
            }

            // Check notification permission
            if (Notification.permission !== "granted") {
                alert("Please enable notifications first");
                requestNotificationPermission();
                return;
            }

            // Toggle reminder
            todo.hasReminder = !todo.hasReminder;

            if (todo.hasReminder) {
                scheduleNotification(todo);
            } else {
                cancelNotification(todo);
            }

            saveTodos();
            renderTodos();
        }

        /**
         * Delete a task permanently
         * @param {number} id - The ID of the task to delete
         */
        function deleteTodo(id) {
            const todo = todos.find(t => t.id === id);
            if (todo) {
                cancelNotification(todo); // Cancel any scheduled notifications
            }
            todos = todos.filter(t => t.id !== id); // Remove task from array
            saveTodos();
            renderTodos();
        }

        /**
         * Enter edit mode for a task
         * @param {number} id - The ID of the task to edit
         */
        function startEdit(id) {
            editingId = id; // Set global editing state
            renderTodos(); // Re-render to show edit input
        }

        /**
         * Save edited task text, date, and time
         * @param {number} id - The ID of the task being edited
         */
        function saveEdit(id) {
            const input = document.querySelector(`#edit-input-${id}`);
            const dateInput = document.querySelector(`#edit-date-${id}`);
            const timeInput = document.querySelector(`#edit-time-${id}`);
            const newText = input.value.trim();
            
            if (newText === '') return; // Don't save empty text
            
            const todo = todos.find(t => t.id === id);
            if (todo) {
                // Cancel existing reminder if date/time is changing
                if (todo.hasReminder) {
                    cancelNotification(todo);
                }

                todo.text = newText; // Update task text
                todo.date = dateInput.value || null; // Update date
                todo.time = timeInput.value || null; // Update time
                
                // Re-schedule reminder if still active and has date/time
                if (todo.hasReminder && todo.date && todo.time && !todo.completed) {
                    scheduleNotification(todo);
                } else if (todo.hasReminder && (!todo.date || !todo.time)) {
                    // Turn off reminder if date/time was removed
                    todo.hasReminder = false;
                }

                editingId = null; // Exit edit mode
                saveTodos();
                renderTodos();
            }
        }

        /**
         * Cancel edit mode without saving changes
         */
        function cancelEdit() {
            editingId = null; // Exit edit mode
            renderTodos(); // Re-render original task
        }

        /**
         * Delete all completed tasks
         */
        function clearCompletedTodos() {
            // Cancel notifications for completed tasks
            todos.filter(t => t.completed).forEach(todo => {
                cancelNotification(todo);
            });
            todos = todos.filter(t => !t.completed); // Keep only active tasks
            saveTodos();
            renderTodos();
        }

        /**
         * Delete ALL tasks (with confirmation)
         */
        function emptyAllTasks() {
            if (todos.length === 0) return; // Nothing to delete
            
            // Show confirmation dialog before destructive action
            if (confirm('Are you sure you want to delete ALL tasks? This cannot be undone.')) {
                // Cancel all notifications
                todos.forEach(todo => cancelNotification(todo));
                todos = []; // Empty the array
                saveTodos();
                renderTodos();
            }
        }

        /**
         * Get filtered tasks based on current filter selection
         * @returns {Array} Filtered array of todos
         */
        function getFilteredTodos() {
            if (currentFilter === 'active') {
                return todos.filter(t => !t.completed); // Only incomplete tasks
            } else if (currentFilter === 'completed') {
                return todos.filter(t => t.completed); // Only completed tasks
            }
            return todos; // All tasks
        }

        /**
         * Format date for display
         * @param {string} dateStr - Date string in YYYY-MM-DD format
         * @returns {string} Formatted date string
         */
        function formatDate(dateStr) {
            if (!dateStr) return '';
            const date = new Date(dateStr + 'T00:00');
            const options = { month: 'short', day: 'numeric', year: 'numeric' };
            return date.toLocaleDateString('en-US', options);
        }

        /**
         * Format time for display
         * @param {string} timeStr - Time string in HH:MM format
         * @returns {string} Formatted time string
         */
        function formatTime(timeStr) {
            if (!timeStr) return '';
            const [hours, minutes] = timeStr.split(':');
            const hour = parseInt(hours);
            const ampm = hour >= 12 ? 'PM' : 'AM';
            const displayHour = hour % 12 || 12;
            return `${displayHour}:${minutes} ${ampm}`;
        }

        /**
         * Render all todos to the DOM
         * This is the main UI update function
         */
        function renderTodos() {
            const filteredTodos = getFilteredTodos();
            
            // Show empty state if no tasks match current filter
            if (filteredTodos.length === 0) {
                todoList.innerHTML = '<div class="empty-state">No tasks to show</div>';
            } else {
                // Generate HTML for each task
                todoList.innerHTML = filteredTodos.map(todo => {
                    // If this task is being edited, show edit input
                    if (editingId === todo.id) {
                        return `
                            <li class="todo-item">
                                <div class="edit-mode-container">
                                    <input 
                                        type="text" 
                                        class="edit-input" 
                                        id="edit-input-${todo.id}"
                                        value="${todo.text}"
                                    />
                                    <div class="edit-datetime-row">
                                        <input 
                                            type="date" 
                                            class="datetime-input" 
                                            id="edit-date-${todo.id}"
                                            value="${todo.date || ''}"
                                        />
                                        <input 
                                            type="time" 
                                            class="datetime-input" 
                                            id="edit-time-${todo.id}"
                                            value="${todo.time || ''}"
                                        />
                                    </div>
                                    <div class="edit-actions-row">
                                        <button class="save-btn" onclick="saveEdit(${todo.id})">Save</button>
                                        <button class="cancel-btn" onclick="cancelEdit()">Cancel</button>
                                    </div>
                                </div>
                            </li>
                        `;
                    } else {
                        // Normal task display
                        const dateTimeHtml = (todo.date || todo.time) ? `
                            <div class="todo-datetime">
                                ${todo.date ? `<span class="todo-datetime-item">📅 ${formatDate(todo.date)}</span>` : ''}
                                ${todo.time ? `<span class="todo-datetime-item">🕐 ${formatTime(todo.time)}</span>` : ''}
                            </div>
                        ` : '';

                        return `
                            <li class="todo-item ${todo.completed ? 'completed' : ''}">
                                <div class="todo-main-row">
                                    <input 
                                        type="checkbox" 
                                        class="todo-checkbox" 
                                        ${todo.completed ? 'checked' : ''}
                                        onchange="toggleTodo(${todo.id})"
                                    />
                                    <div class="todo-content">
                                        <div class="todo-text">${todo.text}</div>
                                        ${dateTimeHtml}
                                    </div>
                                    <div class="todo-actions">
                                        ${(todo.date && todo.time && !todo.completed) ? 
                                            `<button class="bell-btn ${todo.hasReminder ? 'active' : ''}" 
                                                onclick="toggleReminder(${todo.id})" 
                                                title="${todo.hasReminder ? 'Reminder On' : 'Set Reminder'}">
                                                🔔
                                            </button>` : ''}
                                        ${!todo.completed ? `<button class="edit-btn" onclick="startEdit(${todo.id})">Edit</button>` : ''}
                                        <button class="delete-btn" onclick="deleteTodo(${todo.id})">×</button>
                                    </div>
                                </div>
                            </li>
                        `;
                    }
                }).join(''); // Convert array to single HTML string
            }

            // Update "items left" counter
            const activeTaskCount = todos.filter(t => !t.completed).length;
            itemsLeft.textContent = `${activeTaskCount} item${activeTaskCount !== 1 ? 's' : ''} left`;

            // Update filter button counters
            allCount.textContent = todos.length; // Total tasks
            activeCount.textContent = todos.filter(t => !t.completed).length; // Active tasks
            completedCount.textContent = todos.filter(t => t.completed).length; // Completed tasks
        }

        /**
         * Set the current filter and update UI
         * @param {string} filter - 'all', 'active', or 'completed'
         */
        function setFilter(filter) {
            currentFilter = filter;
            // Update active class on filter buttons
            filterBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.filter === filter);
            });
            renderTodos(); // Re-render with new filter
        }

        /**
         * Re-schedule all active reminders after page load
         */
        function rescheduleReminders() {
            todos.forEach(todo => {
                if (todo.hasReminder && !todo.completed) {
                    scheduleNotification(todo);
                }
            });
        }

        /* ===================================
           EVENT LISTENERS
           =================================== */
        
        // Add task when Add button is clicked
        addBtn.addEventListener('click', addTodo);
        
        // Add task when Enter key is pressed in input field
        todoInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') addTodo();
        });

        // Set up click handlers for filter buttons
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => setFilter(btn.dataset.filter));
        });

        // Clear completed tasks button
        clearCompleted.addEventListener('click', clearCompletedTodos);
        
        // Empty all tasks button
        emptyAll.addEventListener('click', emptyAllTasks);

        /* ===================================
           INITIALIZATION
           =================================== */
        
        // Check notification support and show banner if needed
        checkNotificationSupport();
        
        // Initial render when page loads
        renderTodos();
        
        // Re-schedule any active reminders
        rescheduleReminders();