# codeWithCOJO
# 📝 My To-Do List App

A modern, feature-rich todo list application built with vanilla HTML, CSS, and JavaScript. This app helps you organize and manage your tasks efficiently with beautiful UI, persistent storage, and intelligent reminders.

---

## ✨ Features

### Core Task Management
- **Add Tasks**: Create new tasks with optional date and time
- **Edit Tasks**: Modify task text, date, and time at any time
- **Delete Tasks**: Remove individual tasks or bulk clear operations
- **Mark Complete**: Checkbox to mark tasks as completed
- **Task Filters**: View All, Active, or Completed tasks with live counters

### Advanced Features
- **Date & Time Support**: Set specific dates and times for tasks
- **Task Reminders**: Browser notifications for scheduled tasks
- **Persistent Storage**: All tasks saved to browser's localStorage
- **Bulk Actions**: 
  - Clear Completed: Remove all finished tasks
  - Empty All: Delete entire task list (with confirmation)
- **Live Counters**: Real-time count of total, active, and completed tasks

### User Experience
- **Beautiful Glass Morphism UI**: Modern frosted glass design
- **Animated Background**: Dynamic, constantly evolving visual backdrop
- **Smooth Animations**: Task entrance animations and hover effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Keyboard Support**: Press Enter to add tasks quickly
- **Notification Permissions**: Smart notification handling with user-friendly banner

---

## 📋 File Structure

```
todo/
├── index.html           # HTML structure and layout
├── style.css            # Complete styling with detailed comments
├── script.js            # JavaScript functionality and logic
└── README.md            # This documentation file
```

### File Details

#### **index.html**
- Semantic HTML5 structure
- Main container with glass morphism effect
- Input section with date/time pickers
- Filter buttons with live counters
- Todo list container that gets populated dynamically
- Footer with stats and bulk action buttons
- Notification permission banner

#### **style.css** (644 lines)
Comprehensive styling organized into sections:
- **Universal Reset**: Box model and margin/padding reset
- **Body & Background**: Animated gradient overlay and shimmer effects
- **Main Container**: Glassmorphism design with backdrop blur
- **Header**: Title styling with emoji logo
- **Input Section**: Task input, date/time picker, and add button
- **Filter Buttons**: All/Active/Completed filters with counter badges
- **Todo List**: Individual task items with animations
- **Action Buttons**: Edit (orange), Delete (red), Bell/Reminder (purple)
- **Edit Mode**: Inline editing interface with save/cancel
- **Empty State**: Message when no tasks are displayed
- **Footer**: Stats display and bulk action buttons
- **Notification Banner**: Permission request UI

**Key CSS Features:**
- Keyframe animations for smooth transitions
- Flexbox layouts for responsive design
- Glass morphism effects with backdrop-filter
- Color-coded buttons for different actions
- Hover states for interactive feedback
- Mobile-responsive with adaptive spacing

#### **script.js** (488 lines)
JavaScript logic organized into sections:

**State Management:**
- `todos[]`: Array storing all task objects
- `currentFilter`: Tracks active filter ('all', 'active', 'completed')
- `editingId`: Tracks which task is being edited

**Core Functions:**
- `addTodo()`: Create new task with date/time
- `toggleTodo(id)`: Mark task complete/incomplete
- `deleteTodo(id)`: Remove a task
- `editTodo(id)`: Enter edit mode for a task
- `saveEdit(id)`: Save changes to edited task
- `cancelEdit()`: Exit edit mode without saving
- `clearCompletedTodos()`: Remove all finished tasks
- `emptyAllTasks()`: Delete all tasks (with confirmation)
- `getFilteredTodos()`: Return tasks based on current filter
- `renderTodos()`: Main UI update function

**Reminder System:**
- `checkNotificationSupport()`: Detect browser notification capability
- `requestNotificationPermission()`: Request user permission for notifications
- `scheduleNotification(todo)`: Set up browser notification for task
- `cancelNotification(todo)`: Cancel scheduled notification
- `rescheduleReminders()`: Re-activate reminders on page load

**Utility Functions:**
- `formatDate(dateStr)`: Convert YYYY-MM-DD to readable format
- `formatTime(timeStr)`: Convert HH:MM to 12-hour AM/PM format
- `setFilter(filter)`: Change current filter
- `saveTodos()`: Persist data to localStorage

**Event Listeners:**
- Add button click
- Enter key press in input
- Filter button clicks
- Clear completed button
- Empty all button

**Data Structure (Todo Object):**
```javascript
{
  id: 1234567890,        // Unique timestamp ID
  text: "Task name",     // Task description
  completed: false,      // Completion status
  date: "2026-01-14",    // Optional date (YYYY-MM-DD)
  time: "14:30",         // Optional time (HH:MM)
  hasReminder: false,    // Reminder enabled status
  timeoutId: undefined   // Internal: scheduled notification ID
}
```

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No server installation required - runs entirely in the browser

### Installation

1. **Extract Files**: Place all three files (index.html, style.css, script.js) in the same directory
2. **Open in Browser**: Double-click `index.html` or open via web server
3. **That's it!** The app is ready to use

### Basic Usage

#### Adding a Task
1. Type your task in the input field ("What needs to be done?")
2. (Optional) Select a date using the date picker
3. (Optional) Select a time using the time picker
4. Click "Add" button or press Enter

#### Filtering Tasks
- Click "All" to see every task
- Click "Active" to see incomplete tasks
- Click "Completed" to see finished tasks
- Each filter button shows a counter of matching tasks

#### Editing a Task
1. Click the orange "Edit" button on a task
2. Modify the task text, date, or time in the inline editor
3. Click "Save" to apply changes or "Cancel" to discard

#### Completing a Task
- Click the checkbox next to a task to mark it complete
- Completed tasks get a light green background and left border
- Task text color changes to dark green

#### Setting Reminders
1. Task must have a date AND time set
2. Click the purple bell (🔔) button to enable reminder
3. When scheduled time arrives, you'll get a browser notification
4. Click bell again to disable reminder

#### Deleting Tasks
- **Individual Delete**: Click the red "×" button on any task
- **Clear Completed**: Click "Clear Completed" button to remove all finished tasks
- **Empty All**: Click "Empty All Tasks" to delete everything (requires confirmation)

---

## 💾 Data Persistence

### How It Works
- All tasks are automatically saved to the browser's **localStorage**
- Data persists across browser sessions
- No internet connection required
- Each browser/device has separate task storage

### localStorage Details
- **Key**: `'todos'`
- **Format**: JSON stringified array of todo objects
- **Capacity**: Typically 5-10MB per site (varies by browser)
- **Clearing**: Deleting all tasks removes data from localStorage

### To Backup Your Tasks
Open browser console (F12) and run:
```javascript
console.log(JSON.parse(localStorage.getItem('todos')))
```
Copy the output to save externally.

---

## 🔔 Browser Notifications

### Requirements
- Modern browser with Notification API support
- User must grant permission

### How Reminders Work
1. Set a date and time for your task
2. Enable the bell icon (🔔) on the task
3. Before the scheduled time, a notification will appear
4. Completing the task automatically cancels its reminder

### Notification Features
- **Unique Tag System**: Prevents duplicate notifications for same task
- **Auto-Reschedule**: Reminders are re-scheduled if page is refreshed
- **Auto-Cancel**: Reminders cancel when tasks are completed
- **Smart Timing**: Only schedules reminders for future times

### Troubleshooting Reminders
- **No notifications?** Check if you granted browser permission
- **Banner asking for permission?** Click "Enable" button
- **Missing bell button?** Task needs a date AND time set
- **Notification disappeared?** Task was marked as completed

---

## 🎨 Design & Styling

### Color Scheme
- **Primary (Purple/Blue)**: `#667eea` - Used for active filters and focus states
- **Success (Green)**: `#2ecc71`, `#27ae60` - Save buttons and completed tasks
- **Warning (Orange)**: `#ffa502`, `#ff7f00` - Edit buttons
- **Danger (Red)**: `#ff4757`, `#e74c3c` - Delete and destructive actions
- **Neutral (Gray)**: `#f5f5f5`, `#95a5a6` - Backgrounds and secondary elements
- **Text (Dark Gray)**: `#333`, `#666` - Main and secondary text

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Sizes**: 
  - Title: 2em
  - Task text: 16px
  - Secondary text: 12px-14px
- **Weight**: Normal (400) and Semi-bold (600)

### Layout System
- **Container**: Max-width 550px, centered on screen
- **Spacing**: Consistent 10px gaps in flex layouts
- **Border Radius**: 6px-20px for rounded corners
- **Box Shadows**: Multiple shadows for depth and elevation

### Responsive Design
- **Mobile**: Single column, smaller padding, flexible buttons
- **Tablet**: Medium spacing and button sizes
- **Desktop**: Full styling with comfortable spacing

---

## ⌨️ Keyboard Shortcuts

| Key | Action |
|-----|--------|
| Enter (in task input) | Add task |
| Tab | Navigate between form elements |

---

## 🌐 Browser Compatibility

### Fully Supported
- ✅ Chrome/Edge 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Opera 47+

### Features Requiring Modern Browsers
- **localStorage**: All modern browsers
- **Notifications API**: Chrome, Firefox, Edge (not Safari)
- **CSS Grid/Flexbox**: All modern browsers
- **Backdrop Filter**: Chrome, Edge, Safari (Firefox has limited support)

### Fallback Behavior
- If localStorage unavailable: Tasks only persist during current session
- If Notifications unavailable: Reminder button hidden (graceful degradation)
- If CSS features unsupported: App still functional with basic styling

---

## 🔧 Customization

### Changing Colors
Edit the color values in `style.css`:
```css
#667eea    /* Primary color - buttons, borders */
#2ecc71    /* Success - completed state */
#ffa502    /* Warning - edit buttons */
#ff4757    /* Danger - delete buttons */
```

### Modifying Animations
Edit animation duration in `style.css`:
```css
animation: slideIn 0.3s ease;      /* Task entrance */
animation: backgroundMove 40s ...  /* Background pan */
animation: shimmer 15s ...         /* Overlay shimmer */
```

### Adjusting Container Size
```css
.container {
    max-width: 550px;  /* Change this value */
}
```

### Changing Date/Time Format
Edit `formatDate()` and `formatTime()` functions in `script.js`:
```javascript
// Example: Change to 24-hour time format
function formatTime(timeStr) {
    if (!timeStr) return '';
    return timeStr;  // Returns HH:MM format
}
```

### Modifying Storage Key
Change the localStorage key in `script.js`:
```javascript
localStorage.getItem('todos')  // Change 'todos' to custom key
localStorage.setItem('todos', ...)
```

---

## 🐛 Troubleshooting

### Tasks Disappeared
- **Check Console**: Open browser DevTools (F12) to check for errors
- **Clear Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Check Storage**: DevTools > Application > localStorage

### Reminders Not Working
- Check notification permission in browser settings
- Verify task has both date AND time
- Ensure browser supports Notifications API
- Check browser notification settings

### App Won't Load
- Clear browser cache
- Verify all three files (HTML, CSS, JS) are in same directory
- Check browser console for error messages
- Try different browser

### Styling Issues
- Clear browser cache and hard refresh
- Check if CSS file is properly linked in HTML
- Verify no CSS file corruption

---

## 📝 Code Structure

### Initialization Sequence
1. **Page Load**: JavaScript executes when DOM is ready
2. **Load Data**: Retrieve todos from localStorage
3. **Check Notifications**: Check browser support and permission
4. **Initial Render**: Display all tasks
5. **Reschedule Reminders**: Reactivate any active reminders
6. **Event Listeners**: Bind click handlers to buttons

### Task Lifecycle
```
Created → Displayed → Edited → Completed → Deleted
   ↓          ↓          ↓          ↓         ↓
Add Task  Render UI  Save Edit  Toggle ✓  Remove
   ↓          ↓          ↓          ↓         ↓
Save     Update UI  Re-render  Cancel     Save
         Update     Save       Reminder   Save
         Counters   Reminder
```

### Data Flow
```
User Action
    ↓
Event Listener
    ↓
Update Function (addTodo, deleteTodo, etc.)
    ↓
Modify todos[] array
    ↓
saveTodos() → localStorage
    ↓
renderTodos() → Update UI
    ↓
User sees changes
```

---

## 🎯 Future Enhancement Ideas

- **Categories/Tags**: Organize tasks by category
- **Subtasks**: Break tasks into smaller steps
- **Priority Levels**: Mark tasks as high/medium/low priority
- **Recurring Tasks**: Set tasks to repeat daily/weekly/monthly
- **Cloud Sync**: Sync tasks across devices with account
- **Dark Mode**: Toggle between light and dark themes
- **Sound Effects**: Play sound on task completion or reminder
- **Export/Import**: Save tasks as JSON or CSV file
- **Task Description**: Add detailed notes to tasks
- **Collaboration**: Share tasks with other users

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 👨‍💻 Technical Stack

| Technology | Purpose |
|-----------|---------|
| HTML5 | Semantic markup and form elements |
| CSS3 | Styling, animations, glass morphism |
| JavaScript (Vanilla) | No frameworks - pure JS logic |
| localStorage API | Persistent data storage |
| Notification API | Browser notifications for reminders |
| Flexbox | Responsive layout system |

---

## 🎓 Learning Resources

This project demonstrates:
- DOM manipulation and selection
- Event handling and listeners
- Array methods (filter, map, find, etc.)
- Object creation and manipulation
- LocalStorage API usage
- Notification API
- Date/Time handling in JavaScript
- CSS animations and transitions
- Responsive design principles
- Clean code organization with comments

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review code comments in style.css and script.js
3. Open browser DevTools (F12) to check console for errors
4. Verify all files are in same directory and properly linked

---

**Enjoy organizing your tasks! 📝✨**
