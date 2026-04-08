# Wall Calendar

A modern, responsive wall calendar application built with React, Vite, and Tailwind CSS. Features date range selection, notes functionality, and dark/light theme support.

## Features

- **Interactive Calendar**: Click to select date ranges with visual feedback
- **Notes System**: Add notes for specific date ranges or entire months
- **Theme Support**: Toggle between light and dark themes
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Persistent Storage**: Notes and theme preferences are saved locally
- **Modern UI**: Clean, accessible design with smooth animations

## Technologies Used

- **React 19** - Modern React with hooks and functional components
- **Vite** - Fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework
- **date-fns** - Modern JavaScript date utility library
- **ESLint** - Code linting and formatting

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd calender2
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## Usage

### Date Selection
- Click on any date to start selecting a range
- Click on an end date to complete the range
- Click the start date again to select a single day
- Use the "Clear" button to reset selection

### Adding Notes
- Notes are automatically saved for the selected date range
- If no range is selected, notes apply to the entire month
- Notes persist between sessions using localStorage

### Theme Toggle
- Click the sun/moon icon to switch between light and dark themes
- Theme preference is saved automatically

### Navigation
- Use the arrow buttons to navigate between months
- Month and year are displayed in the header

## Project Structure

```
src/
├── components/
│   └── WallCalendar/
│       ├── WallCalendar.jsx    # Main calendar component
│       ├── DayGrid.jsx         # Calendar grid layout
│       ├── DayCell.jsx         # Individual date cells
│       ├── MonthHeader.jsx     # Month navigation and title
│       ├── NotesPanel.jsx      # Notes input and display
│       └── ThemeToggle.jsx     # Theme switching button
├── hooks/
│   ├── useDateRangeSelection.js # Date range logic
│   ├── useLocalStorageState.js  # localStorage wrapper
│   └── useTheme.js             # Theme management
├── utils/
│   └── calendar.js             # Date utility functions
├── assets/                     # Static assets
└── main.jsx                    # App entry point
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

