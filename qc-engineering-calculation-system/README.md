# QC Engineering Calculation System

A metadata-driven engineering calculation application developed using **Google Apps Script, HTML, CSS, JavaScript, and Google Sheets**.

The application enables laboratory engineers to perform engineering quality control calculations using centrally managed formulas without changing application code.

---

## Features

- Dynamic Item Selection
- Dynamic Calculation Selection
- Metadata Driven UI
- Formula Engine
- Engineering Calculation Workflow
- Google Sheets Integration
- Professional Web Interface
- Copy Result
- Print Report
- About & User Guide

---

## Technologies

- Google Apps Script
- JavaScript (ES6)
- HTML5
- CSS3
- Google Sheets

---

## Architecture

Calculation Item Master

↓

Calculation Master

↓

Parameter Master

↓

Formula Master

↓

Formula Engine

↓

Dynamic UI

---

## Supported Calculations

- Ultimate Tensile Strength (UTS)
- Conductivity

The system is designed so that new calculations can be added simply by updating master tables without modifying application code.

---

## Project Structure

appscript/

Google Apps Script backend

database/

Google Sheet master tables

docs/

Project documentation

---

## Formula Engine

The calculation engine:

- Reads formulas from Formula Master
- Replaces aliases dynamically
- Evaluates expressions
- Updates dependent variables
- Returns calculated outputs

Example:

UTS

Area

↓

π/4 × d²

↓

UTS

↓

(FL / Area) ×1000

---

## Screenshots

(Home)

(Add screenshots here)

---

## Future Improvements

- PDF Report Generation
- Calculation History
- Role Based Login
- Formula Version Control
- Audit Log
- Admin Dashboard

---

## Author

Santanu Basak

Data Analyst

Kolkata, India
