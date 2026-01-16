# 📝 TASKFLOW - Modern Todo List Application

A modern, feature-rich todo list application built with vanilla HTML, CSS, and JavaScript. This app helps you organize and manage your tasks efficiently with beautiful UI, persistent storage, intelligent reminders, and theme customization.

---

## ✨ Features

### Core Task Management
- **Add Tasks**: Create new tasks with optional date and time
- **Edit Tasks**: Modify task text, date, and time at any time
- **Delete Tasks**: Remove individual tasks or bulk clear operations
- **Mark Complete**: Checkbox to mark tasks as completed
- **Task Filters**: View All, Active, or Completed tasks with live counters
- **Task History**: View deleted and completed tasks, restore them to active list
- **Inline Editing**: Edit task text, date, and time without leaving list view

### Theme & Personalization
- **Dark/Light Theme Toggle**: Switch between dark and light themes with button
- **Theme Persistence**: Your theme preference is saved and restored on return
- **Animated Backgrounds**: Dynamic, constantly evolving visual backdrop
- **Smooth Animations**: Task entrance animations, hover effects, and visual feedback

### Advanced Features
- **Date & Time Support**: Set specific dates and times for tasks
- **Smart Reminders**: Browser alerts at scheduled time with user-friendly permission flow
- **Persistent Storage**: All tasks, history, and preferences saved to localStorage
- **Bulk Operations**: 
  - Clear Completed: Remove all finished tasks
  - Empty All: Delete entire task list (with confirmation)
  - Clear History: Remove all history entries
- **Live Counters**: Real-time count of total, active, and completed tasks
- **Graceful Degradation**: App remains functional even if some features unavailable

### User Experience
- **Beautiful Glass Morphism UI**: Modern frosted glass design with backdrop blur effects
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Keyboard Support**: Press Enter to add tasks quickly
- **Smart Permission Handling**: Confirm dialog for notification permission request
- **Professional Interface**: Clean design with intuitive controls and visual feedback

---

## � Code Documentation

### Comprehensive Comments Throughout Codebase
All three core files (HTML, CSS, JavaScript) have been thoroughly commented for easy maintenance and understanding:

**HTML (index.html)**
- Every HTML element has detailed explanatory comments
- Attributes are documented with their purposes
- Form inputs explain their data binding and validation
- Modal structure and JavaScript interactions clearly documented
- CSS class applications explained for styling purposes

**CSS (styles.css) - 1589 lines**
- 20+ sections with clear organizational headers
- Every CSS property has inline comments explaining its purpose
- Animation timing and effects documented
- Color variables and theme system thoroughly explained
- Responsive breakpoints clearly marked with explanations
- Media queries documented for mobile/tablet adaptations
- Complex selectors explained for maintainability

**JavaScript (script.js) - 780+ lines**
- 11 organized sections with section headers and purposes
- Every function has detailed header explaining what it does and why
- Every line has inline comment explaining logic
- Comments explain the "why" behind the code, not just the "what"
- Data structures documented with field explanations
- Event listener setup clearly organized with purpose statements
- Conditional logic branches clearly marked and explained
- DOM manipulation commented for clarity

### Benefits of Extensive Documentation
- **Maintenance**: Developers can quickly understand functionality
- **Learning**: Great resource for learning JavaScript/CSS/HTML patterns
- **Debugging**: Comments help identify issues faster
- **Extensibility**: Easy to add features to well-documented code
- **Professional**: Shows attention to code quality and maintainability

---

## �📋 File Structure

```
todo/
├── index.html           # HTML structure with comprehensive comments
├── styles.css           # Complete styling (1589 lines) with detailed comments
├── script.js            # JavaScript functionality (780+ lines) with line-by-line comments
├── img/                 # Image assets folder
│   └── taskflow.png     # Logo image for favicon and branding
├── manifest.json        # PWA manifest configuration
└── README.md            # This documentation file
```

### File Details

#### **index.html**
- Semantic HTML5 structure with comprehensive inline comments
- Every element documented explaining its purpose and functionality
- Meta tags for PWA support and theme color
- Favicon link pointing to img/taskflow.png for branded browser tab icon
- Theme toggle button positioned in top-right corner
- Main container with glass morphism effect
- App header with emoji logo and title
- Notification permission banner (hidden by default, shown by JavaScript)
- Input section with todo text field, date picker, time picker, and add button
- Filter buttons with live counter badges (All, Active, Completed)
- Todo list container that gets populated dynamically with JavaScript
- Stats section showing remaining items and total counts
- Bulk action buttons (Clear Completed, Empty All)
- History modal for viewing and restoring deleted tasks
- External CSS and JavaScript file references

#### **style.css** (675 lines)
Comprehensive styling organized into sections:
- **Universal Reset**: Box model and margin/padding reset
- **Theme Variables**: CSS custom properties for dark/light modes (--primary, --card-bg, --text-main, --card-solid)
- **Body & Background**: Animated gradient overlay and shimmer effects
- **Keyframe Animations**: backgroundMove, shimmer, logoPulse animations
- **Main Container**: Glassmorphism design with backdrop blur and CSS variables
- **Theme Toggle**: Circular button for theme switching (top-right positioned)
- **Header**: Title styling with animated logo pulse effect and motto text
- **Input Section**: Task input, date/time picker, and add button with universal input styling
- **Filter Buttons**: All/Active/Completed filters with counter badges
- **Todo List**: Individual task items with animations using CSS variables
- **Action Buttons**: Edit (orange), Delete (red), Bell/Reminder (purple)
- **Edit Mode**: Inline editing interface with save/cancel
- **Empty State**: Message when no tasks are displayed
- **Footer**: Stats display and bulk action buttons
- **Notification Banner**: Permission request UI
- **Footer Branding**: App footer section

**Key CSS Features:**
- CSS custom properties (variables) for easy theme switching
- Keyframe animations: backgroundMove (40s), shimmer (15s), logoPulse (1.5s)
- Flexbox layouts for responsive design
- Glass morphism effects with backdrop-filter
- Color-coded buttons for different actions
- Hover states for interactive feedback
- Mobile-responsive with adaptive spacing
- Logo pulse animation (scales 1 → 1.08 → 1)

#### **script.js** (520 lines)
JavaScript logic organized into sections:

**State Management:**
- `todos[]`: Array storing all task objects
- `currentFilter`: Tracks active filter ('all', 'active', 'completed')
- `editingId`: Tracks which task is being edited

**Theme Management:**
- `loadTheme()`: Load saved theme from localStorage (defaults to dark)
- `themeToggle` click listener: Toggle light/dark mode and save preference
- Updates body class and button icon (☀️/🌙)

**Core Functions:**
- `addTodo()`: Create new task with date/time
- `toggleTodo(id)`: Mark task complete/incomplete
- `deleteTodo(id)`: Remove a task
- `startEdit(id)`: Enter edit mode for a task
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
- `toggleReminder(id)`: Toggle reminder on/off for a task

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
- Theme toggle button click

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

#### **manifest.json**
Progressive Web App configuration:
- App name: "TASKFLOW"
- Display mode: Standalone (app-like experience)
- Theme color: #667eea (primary purple)
- Background color: #667eea
- Icons: taskflow-logo.svg (512x512 SVG)
- Start URL: Current directory

---

## 🎨 Theme System

### Dark Theme (Default)
- Text: White (#ffffff)
- Cards: Semi-transparent white (rgba(255,255,255,0.15))
- Background: Dark purple gradient with animated shimmer
- Perfect for low-light environments

### Light Theme
- Text: Dark gray (#333)
- Cards: Light gray/white (rgba(255,255,255,0.9) or #f9f9f9)
- Background: Same dark gradient (CSS-adaptable)
- Perfect for bright environments

### CSS Variables Used
```css
--primary: #667eea           /* Primary button color */
--card-bg: rgba(...)         /* Card background (changes with theme) */
--text-main: #ffffff/#333    /* Text color (changes with theme) */
--card-solid: #ffffff/#f9f9f9 /* Solid card background (changes with theme) */
```

The entire app automatically adjusts colors when `body.light` class is added/removed!

---

## 🚀 Getting Started

### Prerequisites
- Modern web browser with JavaScript enabled
- No server installation required - runs entirely in the browser
- PWA can be installed as standalone app on mobile devices

### Installation

1. **Extract Files**: Place all files in the same directory:
   - index.html
   - style.css
   - script.js
   - manifest.json
   - taskflow-logo.svg (optional, for PWA icon)

2. **Open in Browser**: Double-click `index.html` or open via web server

3. **Install as App** (Optional):
   - Mobile: Open in Chrome, tap menu → "Add to Home Screen"
   - Desktop: Click install icon in address bar

4. **That's it!** The app is ready to use

### First Time Setup
- Choose your preferred theme (Light/Dark) using the ☀️/🌙 button
- Your preference will be remembered next time you visit
- Grant notification permission when prompted (or enable anytime)

### Basic Usage

#### Adding a Task
1. Type your task in the input field ("What needs to be done?")
2. (Optional) Select a date using the date picker
3. (Optional) Select a time using the time picker
4. Click "Add" button or press Enter

#### Switching Themes
1. Click the ☀️/🌙 button in the top-right corner
2. The entire app instantly switches between light and dark themes
3. Your preference is saved automatically

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
- Reminders are automatically cancelled for completed tasks

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
- Your theme preference is also saved separately
- Data persists across browser sessions
- No internet connection required
- Each browser/device has separate task storage

### localStorage Details
- **Todos Key**: `'todos'`
- **Theme Key**: `'theme'`
- **Format**: JSON stringified array of todo objects and string for theme
- **Capacity**: Typically 5-10MB per site (varies by browser)
- **Clearing**: Deleting all tasks removes data from localStorage

### To Backup Your Tasks
Open browser console (F12) and run:
```javascript
// Backup tasks
console.log(JSON.parse(localStorage.getItem('todos')))

// Backup theme preference
console.log(localStorage.getItem('theme'))
```
Copy the output to save externally.

---

## 🔔 Browser Notifications and Reminders

### How the Reminder System Works
1. Create a task and set both a date and time
2. Click the bell icon (🔔) to enable reminders
3. A confirmation dialog appears asking to enable notifications
4. The browser may request permission (based on browser's Notification API)
5. At the scheduled time, an alert popup will appear with your task
6. Completing the task automatically cancels its reminder

### Reminder Features
- **Smart Scheduling**: Uses JavaScript `setTimeout()` to schedule alerts at precise times
- **Permission Flow**: User-friendly `confirm()` dialog for notification permission request
- **Auto-Reschedule**: Reminders are automatically rescheduled when page loads
- **Auto-Cancel**: Reminders automatically cancel when tasks are marked complete
- **Validation**: Prevents setting reminders for past times
- **Graceful Fallback**: Uses `alert()` popups for notifications

### Browser Support
- ✅ All modern browsers (Chrome, Firefox, Edge, Safari)
- Reminders work across all modern browsers
- Uses alert() popups for maximum compatibility
- Optional Notification API support for browsers that provide it

### Troubleshooting Reminders
- **Reminder didn't appear?** Ensure the page was open at the scheduled time
- **Missing bell button?** Task needs both a date AND time set
- **Can't enable reminders?** Grant browser notification permission when prompted
- **Want to disable?** Click the bell icon again to turn off reminders

---

## 🎨 Design & Styling

### Color Scheme
- **Primary (Purple/Blue)**: `#667eea` - Used for active filters, buttons, and focus states
- **Success (Green)**: `#2ecc71`, `#27ae60`, `#4caf50` - Save buttons, completed tasks, active reminders
- **Warning (Orange)**: `#ffa502`, `#ff7f00` - Edit buttons
- **Danger (Red)**: `#ff4757`, `#ff6b6b`, `#e74c3c` - Delete and destructive actions
- **Neutral (Gray)**: `#f5f5f5`, `#95a5a6`, `#666`, `#999` - Backgrounds and secondary elements
- **Text (Dark/Light)**: Changes based on theme selection

### Typography
- **Font Family**: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif
- **Sizes**: 
  - Title: 2.1em
  - Motto: 1em (italic)
  - Task text: 16px
  - Secondary text: 12px-14px
- **Weight**: Normal (400) and Semi-bold (600-700)

### Layout System
- **Container**: Max-width 550px, centered on screen
- **Spacing**: Consistent 10px gaps in flex layouts
- **Border Radius**: 6px-20px for rounded corners
- **Box Shadows**: Multiple shadows for depth and elevation

### Animations
- **Logo Pulse**: 1.5s ease-in-out infinite (scales from 1 to 1.08)
- **Task Slide-in**: 0.3s ease (entrance animation)
- **Background Move**: 40s ease-in-out infinite (subtle panning)
- **Shimmer Overlay**: 15s ease-in-out infinite (diagonal gradient sweep)

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
- **CSS Variables**: All modern browsers
- **Notifications API**: Chrome, Firefox, Edge (not Safari)
- **CSS Grid/Flexbox**: All modern browsers
- **Backdrop Filter**: Chrome, Edge, Safari (Firefox has limited support)
- **PWA Support**: Chrome, Edge, Firefox (iOS Safari limited)

### Fallback Behavior
- If localStorage unavailable: Tasks only persist during current session
- If Notifications unavailable: Reminder button hidden (graceful degradation)
- If CSS features unsupported: App still functional with basic styling
- If CSS Variables unsupported: Defaults to light theme (no theme switching)

---

## 🔧 Customization

### Changing Primary Color (Affects All Themes)
Edit in `style.css`:
```css
:root {
    --primary: #667eea;  /* Change to desired color */
}
```

### Modifying Dark Theme Colors
Edit in `style.css`:
```css
:root {
    --card-bg: rgba(255, 255, 255, 0.15);  /* Card background */
    --text-main: #ffffff;                    /* Text color */
    --card-solid: #ffffff;                   /* Solid backgrounds */
}
```

### Modifying Light Theme Colors
Edit in `style.css`:
```css
body.light {
    --card-bg: rgba(255, 255, 255, 0.9);    /* Light card background */
    --text-main: #333;                       /* Dark text */
    --card-solid: #f9f9f9;                   /* Light gray backgrounds */
}
```

### Changing Animations
Edit animation duration in `style.css`:
```css
animation: slideIn 0.3s ease;        /* Task entrance */
animation: backgroundMove 40s ...    /* Background pan */
animation: shimmer 15s ...           /* Overlay shimmer */
animation: logoPulse 1.5s ...        /* Logo pulse effect */
```

### Adjusting Container Size
```css
.container {
    max-width: 550px;  /* Change this value for wider/narrower app */
}
```

### Changing Date/Time Format
Edit functions in `script.js`:
```javascript
// Example: Change to 24-hour time format
function formatTime(timeStr) {
    if (!timeStr) return '';
    return timeStr;  /* Returns HH:MM format */
}
```

### Modifying Storage Keys
Change in `script.js`:
```javascript
localStorage.getItem('todos')     // Change 'todos' to custom key
localStorage.getItem('theme')     // Change 'theme' to custom key
```

### Customizing App Name
Edit in `manifest.json` and `index.html`:
```json
"name": "TASKFLOW",           /* Change app name */
"short_name": "TASKFLOW"      /* Change short name */
```

---

## 🐛 Troubleshooting

### Tasks Disappeared
- **Check Console**: Open browser DevTools (F12) to check for errors
- **Clear Cache**: Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- **Check Storage**: DevTools > Application > localStorage > Check 'todos' key
- **Recover Data**: Check backup if localStorage was cleared

### Theme Not Changing
- Clear browser cache and hard refresh
- Verify CSS file is loading correctly (DevTools > Sources)
- Check if body.light class is being toggled (DevTools > Elements)
- Verify CSS variables are defined in :root

### Reminders Not Working
- Check notification permission in browser settings
- Verify task has both date AND time
- Ensure browser supports Notifications API
- Check browser notification settings
- Verify page is still open at reminder time

### App Won't Load
- Clear browser cache and hard refresh (Ctrl+Shift+R)
- Verify all files are in same directory
- Check if CSS and JS files are properly linked in HTML
- Check browser console (F12) for error messages
- Try different browser
- Verify taskflow-logo.svg exists if referenced

### Styling Issues
- Clear browser cache and hard refresh
- Check if CSS file is properly linked in HTML head
- Verify no CSS file corruption
- Check CSS variables are supported in your browser
- DevTools > Inspect Element to debug specific styles

### Performance Issues
- Clear localStorage of old test data
- Close other browser tabs
- Verify JavaScript isn't throwing errors (F12 Console)
- Check for browser extensions interfering

---

## 📝 Code Structure

### Initialization Sequence
1. **Page Load**: JavaScript executes when DOM is ready
2. **Load Theme**: Retrieve saved theme from localStorage and apply
3. **Load Data**: Retrieve todos from localStorage
4. **Check Notifications**: Check browser support and permission
5. **Initial Render**: Display all tasks filtered by current filter
6. **Reschedule Reminders**: Reactivate any active reminders
7. **Event Listeners**: Bind click and keyboard handlers to elements

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

### Theme Lifecycle
```
Page Load
    ↓
loadTheme()
    ↓
Check localStorage['theme']
    ↓
Apply body.light class if 'light' theme
    ↓
Update toggle button icon (☀️ or 🌙)
    ↓
All CSS variables adjust via :root and body.light selectors
    ↓
User clicks toggle button
    ↓
Toggle body.light class
    ↓
Save new theme to localStorage
    ↓
UI updates instantly with new colors
```

### Data Flow
```
User Action (Click/Type)
    ↓
Event Listener triggered
    ↓
Update Function (addTodo, deleteTodo, toggleReminder, etc.)
    ↓
Modify todos[] array
    ↓
saveTodos() → localStorage['todos']
    ↓
renderTodos() → Update DOM with new UI
    ↓
Update counters in filter buttons
    ↓
User sees changes instantly
```

---

## 🎯 Future Enhancement Ideas

- **Categories/Tags**: Organize tasks by category
- **Subtasks**: Break tasks into smaller steps
- **Priority Levels**: Mark tasks as high/medium/low priority
- **Recurring Tasks**: Set tasks to repeat daily/weekly/monthly
- **Cloud Sync**: Sync tasks across devices with account login
- **Sound Effects**: Play sound on task completion or reminder
- **Export/Import**: Save tasks as JSON or CSV file
- **Task Description**: Add detailed notes to tasks
- **Collaboration**: Share tasks with other users
- **Custom Themes**: Create and save custom color schemes
- **Search/Filter**: Advanced search by text or tags
- **Task Analytics**: View productivity statistics and charts

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 👨‍💻 Technical Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| HTML5 | Semantic markup and form elements | Latest |
| CSS3 | Styling, animations, glass morphism, variables | Latest |
| JavaScript (Vanilla) | No frameworks - pure JS logic | ES6+ |
| localStorage API | Persistent data storage | Standard |
| Notification API | Browser notifications for reminders | Standard |
| Flexbox | Responsive layout system | CSS3 |
| CSS Variables | Dynamic theming system | CSS3 |
| PWA Manifest | Progressive Web App configuration | Standard |

---

## 🎓 Learning Resources

This project demonstrates:
- DOM manipulation and selection
- Event handling and listeners (click, keypress)
- Array methods (filter, map, find, forEach, etc.)
- Object creation and manipulation
- LocalStorage API usage (get/set/parse/stringify)
- Notification API and Permissions
- Date/Time handling in JavaScript
- CSS animations and keyframes
- CSS Grid and Flexbox
- CSS Variables (custom properties) for dynamic theming
- Responsive design principles
- PWA manifest configuration
- Clean code organization with detailed comments
- Functional programming patterns
- Data persistence and synchronization

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review code comments in style.css and script.js
3. Open browser DevTools (F12) to check console for errors
4. Verify all files are in same directory and properly linked
5. Check manifest.json for PWA issues
6. Compare your setup with the GitHub repository

---

**Enjoy organizing your tasks with TASKFLOW! 📝✨**
**Where productivity flows naturally.**

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

#### **style.css** (1589 lines)
Comprehensive styling organized into 20+ sections with detailed inline comments:
- **Universal Reset**: Box model and margin/padding reset
- **Theme Variables**: CSS custom properties for dark/light modes
- **Body & Background**: Animated gradient overlay and shimmer effects
- **Keyframe Animations**: backgroundMove, shimmer, logoPulse, slideIn effects
- **Main Container**: Glassmorphism design with backdrop blur
- **Theme Toggle**: Circular button for dark/light theme switching
- **Header**: Title styling with animated logo pulse effect
- **Input Section**: Task input, date/time picker, and add button with universal input styling
- **Filter Buttons**: All/Active/Completed filters with counter badges
- **Todo List**: Individual task items with animations using CSS variables
- **Action Buttons**: Edit (orange), Delete (red), Bell/Reminder (purple) - fully documented
- **Edit Mode**: Inline editing interface with save/cancel buttons
- **Empty State**: Message when no tasks are displayed
- **Footer**: Stats display and bulk action buttons
- **History Modal**: Modal container for viewing task history
- **Notification Banner**: Permission request UI
- **Responsive Design**: Breakpoints at 768px (tablets) and 480px (mobile)

**Key CSS Features:**
- CSS custom properties (variables) for dynamic theme switching
- Keyframe animations with timing explanations
- Flexbox layouts for responsive design
- Glass morphism effects with backdrop-filter and CSS variables
- Color-coded buttons with visual feedback
- Hover states for interactive feedback
- Mobile-responsive with adaptive spacing
- Comprehensive inline documentation for every CSS rule

#### **script.js** (780+ lines)
JavaScript logic organized into 12 sections with comprehensive line-by-line comments:

**Section 1: Global State and Variables**
- `todos[]`: Array storing all task objects with id, text, date, time, completed, hasReminder, timeoutId
- `history[]`: Array of deleted and completed tasks for restore functionality
- `currentFilter`: Tracks active filter ('all', 'active', or 'completed')
- `editingId`: Store ID of todo currently being edited
- DOM element references (25+ elements cached for performance)

**Section 2: Date and Time Utilities** (Fully documented)
- `getTodayDateString()`: Get today's date in YYYY-MM-DD format for date picker minimum
- `getCurrentTimeString()`: Get current time in HH:MM format with zero-padding
- `isFutureDateTime()`: Validate that date/time is in the future (not in past)
- `formatDate()`: Convert YYYY-MM-DD to readable format (e.g., "Jan 15, 2026")
- `formatTime()`: Convert HH:MM to 12-hour format with AM/PM (e.g., "3:30 PM")

**Section 3: Storage Functions** (Fully documented)
- `saveTodos()`: Persist todos to localStorage, excluding timeoutId (not serializable)
- `saveHistory()`: Persist history entries to localStorage

**Section 4: Notification Functions** (Fully documented)
- `scheduleNotification()`: Schedule alert notification at specified date/time using setTimeout
- `cancelNotification()`: Cancel scheduled notification by clearing timeout
- `rescheduleReminders()`: Re-activate reminders on page load for all active todos
- `checkNotificationSupport()`: Detect browser Notification API and show banner if needed
- `requestNotificationPermission()`: Request browser notification permission with optional auto-enable

**Section 5: Core CRUD Operations** (Fully documented)
- `addTodo()`: Create new task with validation for date/time
- `toggleComplete()`: Mark task as complete/incomplete and manage reminders
- `toggleReminder()`: Enable/disable reminder with permission flow using confirm() dialog
- `deleteTodo()`: Remove task from list with confirmation
- `editTodo()`: Enter edit mode for a task
- `saveEdit()`: Save changes to task text, date, and time with validation
- `cancelEdit()`: Exit edit mode without saving

**Section 6: History Functions** (Fully documented)
- `addToHistory()`: Create history entry when task is deleted or completed
- `restoreFromHistory()`: Restore deleted or completed task to active list
- `clearCompletedTasks()`: Remove all completed tasks from list
- `emptyAllTasks()`: Delete all tasks with destructive action confirmation

**Section 7: Filter Functions** (Fully documented)
- `setFilter()`: Change current filter and update UI active button state

**Section 8: Render Functions** (Fully documented)
- `render()`: Main UI generation function that displays filtered todos with proper HTML, handles edit mode with inline forms, updates all counters, shows empty state message
- `renderHistory()`: Display history modal content with restore buttons for each item

**Section 9: Modal Control Functions** (Fully documented)
- `openHistory()`: Open history modal and render content
- `closeHistory()`: Close history modal
- `clearHistoryData()`: Clear all history entries with confirmation

**Section 10: Initialization and Event Listeners** (Fully documented)
- Set minimum date on date picker
- Add button click listener
- Enter key support in input field
- Filter button click listeners for all three filters
- Clear completed and empty all button listeners
- Theme toggle listener with icon update
- History view and clear listeners
- Modal backdrop click to close functionality

**Section 11: Page Load and Initialization** (Fully documented)
- Check notification support on page load
- Reschedule any existing reminders
- Initial render of todo list

**Key Features of JavaScript Documentation:**
- Every function has detailed purpose explanation
- Each line has inline comment explaining what it does
- Comments explain the "why" behind the logic, not just the "what"
- Destructuring and array methods are explained
- Conditional logic branches are clearly documented
- Event listener setup is well-organized with purpose comments
- Data structure changes are tracked with comments
- Error handling and validation logic is explained

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

- **Categories/Tags**: Organize tasks by category or label
- **Subtasks**: Break tasks into smaller steps with progress tracking
- **Priority Levels**: Mark tasks as high/medium/low priority with visual indicators
- **Recurring Tasks**: Set tasks to repeat daily/weekly/monthly automatically
- **Cloud Sync**: Sync tasks across devices with user account login
- **Sound Effects**: Play sound notifications on task completion or reminders
- **Export/Import**: Save tasks as JSON or CSV file for backup/sharing
- **Task Description**: Add detailed notes and attachments to tasks
- **Collaboration**: Share tasks with other users in real-time
- **Search & Advanced Filtering**: Full-text search and multi-filter combination
- **Time Tracking**: Track time spent on tasks with stopwatch
- **Analytics**: View productivity statistics and completion charts

---

## 📄 License

This project is open source and available for personal and educational use.

---

## 👨‍💻 Technical Stack

| Technology | Purpose | Version |
|-----------|---------|---------|
| HTML5 | Semantic markup with comprehensive comments | Latest |
| CSS3 | Styling, animations, glass morphism, variables | Latest |
| JavaScript (Vanilla) | No frameworks - pure ES6+ with detailed comments | ES6+ |
| localStorage API | Persistent data storage for todos and preferences | Standard |
| Notification API | Browser alerts for task reminders | Standard |
| Flexbox | Responsive layout system | CSS3 |
| CSS Custom Properties | Dynamic theming and runtime color changes | CSS3 |

---

## 🎓 Learning Resources

This project demonstrates:
- **DOM Manipulation**: Element selection, creation, and modification
- **Event Handling**: Click listeners, keyboard events, form submissions
- **Array Methods**: filter(), map(), find(), forEach(), unshift(), etc.
- **Object Operations**: Creation, destructuring, property access
- **localStorage API**: Get/set/parse JSON data persistence
- **Date/Time Handling**: Creating dates, formatting, comparing times
- **CSS Animations**: Keyframes, timing functions, animation properties
- **CSS Variables**: Custom properties for dynamic theming
- **Responsive Design**: Media queries and mobile-first approach
- **Code Organization**: Well-structured sections and comprehensive comments
- **Clean Code**: Professional documentation throughout all files
- **Functional Programming**: Pure functions and data transformations
- **Error Handling**: Validation and user feedback with alerts

---

## 📞 Support

For issues or questions:
1. Check the Troubleshooting section
2. Review the comprehensive code comments in all three files (HTML, CSS, JavaScript)
3. Open browser DevTools (F12) to check console for error messages
4. Verify all files are in same directory and properly linked in HTML
5. Try hard refreshing your browser (Ctrl+Shift+R or Cmd+Shift+R)

---

**Enjoy organizing your tasks with TASKFLOW! 📝✨**
**Where productivity flows naturally.**
