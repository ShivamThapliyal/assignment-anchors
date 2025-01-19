# YouTube Comment Analysis Tool

## Overview

This project is a web application that analyzes YouTube video comments to provide insights such as agreement, disagreement, and month-wise distribution of comments. Users can input a YouTube video link, and the tool fetches comments using YouTube and Gemini APIs, processes the data, and displays the results in a clean and user-friendly interface.

## Features

- **Comment Analysis**:
  - Categorizes comments into `Agree`, `Disagree`, and `Neutral` sentiments using the Gemini API.
- **Monthly Comment Distribution**:
  - Displays a bar chart showing the month-wise distribution of comments.
- **Privacy**:
  - Masks commenter usernames before storing them in the database.
- **Responsive UI**:
  - Built with ShadCN components for a clean and user-friendly design.

## Tech Stack

### Frontend

- **React.js**: For building the user interface.
- **Chart.js**: For visualizing monthly comment distribution.

### Backend

- **Node.js**: Server-side logic.
- **Express.js**: API handling.

### APIs

- **YouTube API**: For fetching video comments.
- **Gemini API**: For analyzing comment sentiments.

## Installation

### Prerequisites

- **Node.js** and **npm** installed.
- API keys for the **YouTube API** and **Gemini API**.

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/ShivamThapliyal/anchors-Assignment.git
   ```
