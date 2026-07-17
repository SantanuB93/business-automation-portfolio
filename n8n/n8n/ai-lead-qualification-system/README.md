# AI-Powered WhatsApp Lead Qualification System

## Overview

This project automates the complete lead qualification process using **n8n**, **OpenAI**, **WhatsApp Business API**, and **Google Sheets**.

Instead of manually contacting every lead, the workflow automatically initiates a WhatsApp conversation, qualifies potential customers through an AI-powered chatbot, summarizes their requirements, and updates the CRM in real time.

All confidential information has been removed from this repository.

---

# Business Problem

Businesses receive numerous leads from advertisements and landing pages. Contacting every lead manually is time-consuming and often results in delayed responses.

The objective was to automate the initial engagement and qualification process while maintaining a conversational experience for the customer.

---

# Solution

This automation performs the following steps:

1. Capture new leads.
2. Store lead information in Google Sheets.
3. Send a WhatsApp template message automatically.
4. Continue the conversation using an OpenAI-powered AI Agent.
5. Qualify the lead based on predefined business rules.
6. Summarize customer requirements.
7. Update the CRM with qualification status.

---

# Workflow Components

## Workflow 1 – Lead Capture

Receives new leads and stores them in Google Sheets.

---

## Workflow 2 – WhatsApp Template Sender

Automatically sends the first WhatsApp message after a new lead is captured.

---

## Workflow 3 – AI Lead Qualification

An AI Agent interacts with the customer via WhatsApp, collects qualification information, summarizes the requirement, and updates the CRM.

Features include:

- Conversation Memory
- OpenAI GPT Model
- Tool Calling
- Lead Qualification Logic
- Requirement Summarization

---

## Workflow 4 – Lead Status Update

Updates Google Sheets with:

- WhatsApp Template Status
- AI Reply Status
- Lead Qualification Status
- Customer Requirements

---

# Technologies Used

- n8n
- OpenAI GPT
- WhatsApp Business API
- Google Sheets
- JSON
- REST APIs
- AI Agents
- Prompt Engineering

---

# Workflow Architecture

```
Facebook Lead Form
        │
        ▼
Lead Capture
        │
        ▼
Google Sheets
        │
        ▼
WhatsApp Template
        │
        ▼
Customer Reply
        │
        ▼
AI Agent
        │
        ▼
Lead Qualification
        │
        ▼
Google Sheets Update
```

---

# Business Benefits

- Reduced manual lead handling
- Faster customer response
- Automated lead qualification
- Standardized customer conversations
- Centralized lead tracking
- Improved operational efficiency

---

# Future Improvements

- CRM Integration
- Dashboard Reporting
- Multi-language Support
- AI Sentiment Analysis
- Automated Sales Assignment

---

# Notes

To protect client confidentiality:

- API keys have been removed.
- Credentials have been replaced with placeholders.
- Company-specific information has been sanitized.
