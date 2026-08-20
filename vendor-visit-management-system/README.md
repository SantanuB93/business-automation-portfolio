# Vendor Visit Management System

A web-based vendor/customer visit reporting system built with **Google Apps Script, HTML, CSS, JavaScript, Google Sheets, Google Drive and Gmail**.

The application allows employees to submit visit details through a web form, capture their current GPS location, calculate travel distance, upload supporting documents, store visit records in Google Sheets, save attachments to Google Drive, and automatically send visit notifications by email.

---

## 📌 Project Overview

Managing vendor/customer visits through emails, spreadsheets, and manually shared documents can result in:

* Incomplete visit records
* Missing supporting documents
* Incorrect travel information
* Lack of location verification
* Manual email communication
* Difficulty maintaining a centralized visit history

This application provides a centralized web-based solution for recording and managing field/vendor visits.

The employee completes the form from a browser, captures their location, uploads supporting documents if required, and submits the visit.

The system then automatically:

1. Validates the submitted information
2. Captures GPS coordinates
3. Calculates travel distance
4. Uploads attachments to Google Drive
5. Stores visit information in Google Sheets
6. Sends an email notification to designated recipients

---

# 🚀 Key Features

### Visit Information

* Employee email automatically retrieved
* Visit date automatically populated
* Place of visit
* Vendor/customer name
* Purpose of visit
* Remarks

### Travel Information

* KM Start
* KM End
* Automatic travel-distance calculation
* Validation of kilometer values

### GPS Location

* Browser-based GPS capture
* Latitude and longitude recording
* Location accuracy display
* Google Maps preview
* Direct Google Maps link stored with the visit

### Attachments

* Multiple file selection
* Attachment preview
* Individual attachment removal
* Base64 file processing
* Automatic upload to Google Drive
* Attachment links stored with the visit record

### Notifications

* Automated email notification after successful submission
* Visit details included in the email
* Attachment links included in the notification

### User Experience

* Clean web-based interface
* Form validation
* Submission progress indicator
* Success/failure messages
* Form reset after successful submission
* Responsive layout for practical field usage

---

# 🛠 Technology Stack

| Technology                  | Purpose                           |
| --------------------------- | --------------------------------- |
| **Google Apps Script**      | Backend logic and web application |
| **HTML5**                   | Form structure                    |
| **CSS3**                    | User interface and styling        |
| **JavaScript**              | Client-side logic and validation  |
| **Google Sheets**           | Visit record storage              |
| **Google Drive**            | Attachment storage                |
| **Gmail Service**           | Automated email notifications     |
| **Browser Geolocation API** | GPS location capture              |
| **Google Maps**             | Location visualization            |
| **Bootstrap Icons**         | Interface icons                   |

---

# 🏗 System Architecture

```text
                         ┌─────────────────────────┐
                         │        Employee         │
                         │     Web Browser         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │       HTML Form         │
                         │      Index.html         │
                         └────────────┬────────────┘
                                      │
                                      ▼
                         ┌─────────────────────────┐
                         │    Client-side JS       │
                         │    JavaScript.html      │
                         │                         │
                         │ • Validation            │
                         │ • GPS Capture           │
                         │ • Distance Calculation  │
                         │ • File Processing       │
                         └────────────┬────────────┘
                                      │
                                      │ google.script.run
                                      ▼
                   ┌────────────────────────────────────┐
                   │       Google Apps Script            │
                   │            Code.gs                  │
                   │                                    │
                   │ • Request Processing                │
                   │ • Data Validation                   │
                   │ • File Handling                     │
                   │ • Spreadsheet Operations            │
                   │ • Email Notification                │
                   └───────────────┬────────────────────┘
                                   │
                  ┌────────────────┼────────────────┐
                  │                │                │
                  ▼                ▼                ▼
        ┌─────────────────┐ ┌───────────────┐ ┌──────────────┐
        │  Google Sheets  │ │ Google Drive  │ │    Gmail     │
        │                 │ │               │ │              │
        │ Visit Records  │ │ Attachments   │ │ Notification │
        └─────────────────┘ └───────────────┘ └──────────────┘
```

---

# 📂 Project Structure

```text
vendor-visit-management-system/
│
├── README.md
│
├── Code.gs
├── Index.html
├── JavaScript.html
├── Style.html
│
├── Config.example.gs
│
├── screenshots/
│   ├── form.png
│   ├── attachment-upload.png
│   ├── location-capture.png
│   ├── successful-submission.png
│   ├── google-sheet.png
│   └── email-notification.png
│
├── documentation/
│   ├── system-architecture.png
│   └── setup-guide.md
│
└── .gitignore
```

---

# 📁 File Description

### `Code.gs`

Contains the server-side Google Apps Script logic.

Responsibilities include:

* Serving the web application
* Including HTML components
* Retrieving the logged-in user's email
* Processing form submissions
* Uploading attachments to Google Drive
* Writing records to Google Sheets
* Sending automated email notifications

---

### `Index.html`

Contains the main web form.

It provides fields for:

* Employee email
* Date
* Place of visit
* Vendor/customer
* Purpose
* KM Start
* KM End
* Attachments
* Remarks
* GPS location

---

### `JavaScript.html`

Contains client-side functionality.

Responsibilities include:

* Form initialization
* User email retrieval
* Distance calculation
* File selection
* Attachment preview
* Attachment removal
* GPS capture
* Form validation
* Base64 file conversion
* Submission handling
* Success/failure handling
* Form reset

---

### `Style.html`

Contains the CSS used to style the application.

Includes:

* Form layout
* Buttons
* Input fields
* Attachment cards
* Delete buttons
* Status messages
* Submission button states

---

### `Config.example.gs`

Contains documentation for the configuration values required by the application without exposing actual company credentials or identifiers.

Sensitive configuration values are stored using **Google Apps Script Script Properties**.

---

# 🗃 Data Flow

The application follows this workflow:

```text
Employee opens web application
            │
            ▼
Employee email automatically retrieved
            │
            ▼
Employee enters visit details
            │
            ▼
Employee enters KM Start / KM End
            │
            ▼
Travel distance calculated
            │
            ▼
Employee captures GPS location
            │
            ▼
Location displayed on Google Maps
            │
            ▼
Employee selects supporting files
            │
            ▼
Files previewed before submission
            │
            ▼
Form validation
            │
            ▼
Files converted to Base64
            │
            ▼
Google Apps Script receives submission
            │
            ├───────────────► Google Drive
            │                 Attachments
            │
            ├───────────────► Google Sheets
            │                 Visit Record
            │
            └───────────────► Gmail
                              Notification
```

---

# 📊 Google Sheets Structure

The Google Sheet acts as the application's data store.

Example structure:

| Column          | Description                   |
| --------------- | ----------------------------- |
| Date            | Date of visit                 |
| Employee Email  | Employee submitting the visit |
| Place           | Visit location                |
| Customer/Vendor | Vendor/customer visited       |
| Purpose         | Purpose of visit              |
| KM Start        | Starting odometer reading     |
| KM End          | Ending odometer reading       |
| Latitude        | Captured latitude             |
| Longitude       | Captured longitude            |
| Map Link        | Google Maps location          |
| Attachments     | Google Drive file links       |
| Remarks         | Additional comments           |
| Submitted At    | Timestamp of submission       |

---

# 📎 Attachment Processing

Attachments are handled using the following process:

```text
User selects file
       │
       ▼
JavaScript reads file
       │
       ▼
File converted to Base64
       │
       ▼
File information sent to Apps Script
       │
       ▼
Apps Script decodes Base64
       │
       ▼
Blob created
       │
       ▼
File uploaded to Google Drive
       │
       ▼
Drive URL generated
       │
       ▼
URL stored in Google Sheets
       │
       ▼
URL included in email notification
```

This allows the application to keep the spreadsheet lightweight while storing the actual files in Google Drive.

---

# 📍 GPS Location Capture

The application uses the browser's **Geolocation API** to capture the employee's current location.

The following information is captured:

* Latitude
* Longitude
* Location accuracy

The coordinates are then used to generate a Google Maps link.

Example:

```text
https://www.google.com/maps?q=LATITUDE,LONGITUDE
```

The location is also displayed within the form so that the user can verify the captured position before submitting the visit.

---

# 📏 Travel Distance Calculation

The application calculates travel distance using:

```text
Distance = KM End - KM Start
```

Example:

```text
KM Start = 12,450
KM End   = 12,482

Distance = 32 KM
```

The application also validates that the ending kilometer reading is not lower than the starting reading.

---

# 📧 Automated Email Notification

After a successful submission, the application generates an automated email containing:

* Visit date
* Employee
* Place
* Vendor/customer
* Purpose
* Remarks
* KM Start
* KM End
* Latitude
* Longitude
* Google Maps link
* Attachment links

The notification is sent automatically using the Google Apps Script Gmail service.

---

# 🔐 Security & Configuration

Sensitive information should **not** be committed to GitHub.

The application uses Google Apps Script **Script Properties** for configuration.

Example properties:

```text
FOLDER_ID
RECIPIENTS
BCC
```

The actual values should be configured inside:

```text
Apps Script
   ↓
Project Settings
   ↓
Script Properties
```

The repository should only contain an example configuration file.

### Never commit:

* Google Drive folder IDs used by production systems
* Company email addresses
* API keys
* Passwords
* OAuth credentials
* Production spreadsheet data
* Customer/vendor information
* Employee information
* GPS data
* Private Drive links

---

# ⚙️ Setup & Deployment

## 1. Create Google Sheet

Create a Google Sheet with the required columns.

Example:

```text
Date
Employee Email
Place
Customer/Vendor
Purpose
KM Start
KM End
Latitude
Longitude
Map Link
Attachments
Remarks
Submitted At
```

---

## 2. Create Google Drive Folder

Create a dedicated Google Drive folder where submitted attachments will be stored.

Copy the folder ID.

Do not publish the actual folder ID in the GitHub repository.

---

## 3. Create Apps Script Project

Open the Google Sheet and create an Apps Script project.

Add the following files:

```text
Code.gs
Index.html
JavaScript.html
Style.html
```

Copy the corresponding source code into each file.

---

## 4. Configure Script Properties

Go to:

```text
Apps Script
→ Project Settings
→ Script Properties
```

Add:

```text
FOLDER_ID    = <your Google Drive folder ID>
RECIPIENTS   = <notification email addresses>
BCC          = <optional BCC address>
```

---

## 5. Configure Google Sheet

Make sure the sheet name matches the configured value in `Code.gs`.

Example:

```javascript
SHEET_NAME: "Customer Visit"
```

---

## 6. Deploy as Web App

In Apps Script:

```text
Deploy
→ New deployment
→ Select type: Web app
```

Configure the required access settings according to your organization's Google Workspace policies.

Then deploy the application.

---

# 🖥 User Workflow

The employee follows these steps:

```text
1. Open Vendor Visit Web App
        ↓
2. Employee email is automatically populated
        ↓
3. Select visit date
        ↓
4. Enter place
        ↓
5. Enter vendor/customer
        ↓
6. Enter purpose
        ↓
7. Enter KM Start and KM End
        ↓
8. Upload supporting documents
        ↓
9. Capture GPS location
        ↓
10. Add remarks
        ↓
11. Submit
        ↓
12. Visit record saved
        ↓
13. Attachments stored in Drive
        ↓
14. Email notification generated
```

---

# 📸 Screenshots

## Main Form

![Main Form](screenshots/form.png)

## Attachment Upload

![Attachment Upload](screenshots/attachment-upload.png)

## GPS Location Capture

![Location Capture](screenshots/location-capture.png)

## Successful Submission

![Successful Submission](screenshots/successful-submission.png)

## Google Sheets Record

![Google Sheet](screenshots/google-sheet.png)

## Email Notification

![Email Notification](screenshots/email-notification.png)

> Screenshots included in the public repository should contain only dummy/sample data.

---

# 🧪 Validation

The application performs client-side validation before submission.

Required fields include:

* Place of Visit
* Vendor/Customer
* Purpose
* KM Start
* KM End
* GPS Location

The application also prevents submission while the request is being processed to reduce the possibility of duplicate submissions.

---

# 🔄 Error Handling

The application provides user feedback for:

* Missing required fields
* GPS permission issues
* Invalid travel readings
* Submission failures
* Attachment processing failures

The submit button is disabled while the request is being processed and restored if an error occurs.

---

# 💡 Business Impact

This type of automation can help organizations:

* Standardize field visit reporting
* Reduce manual data entry
* Centralize visit records
* Improve visibility of employee/vendor visits
* Maintain supporting documents
* Capture location information
* Reduce manual email communication
* Create structured data for future reporting and dashboards

The structured Google Sheets data can also be connected to reporting tools such as **Looker Studio or Power BI** for visit analysis.

---

# 📈 Potential Dashboard Metrics

The collected data can support dashboards such as:

### Visit Analytics

* Total visits
* Visits by employee
* Visits by vendor/customer
* Visits by location
* Visits by date/month
* Visits by purpose

### Travel Analytics

* Total kilometers travelled
* Average distance per visit
* Distance by employee
* Monthly travel trends

### Operational Analytics

* Visits by department
* Frequently visited vendors
* Visit frequency
* Supporting document availability

---

# 🔮 Future Improvements

Potential enhancements include:

* [ ] Multiple vendor/customer selection
* [ ] Automatic distance calculation using GPS coordinates
* [ ] Employee master validation
* [ ] Vendor/customer master integration
* [ ] Visit approval workflow
* [ ] Edit/correction workflow
* [ ] Duplicate visit detection
* [ ] Offline submission support
* [ ] Role-based access
* [ ] Visit history for employees
* [ ] Automated monthly visit reports
* [ ] Power BI / Looker Studio dashboard
* [ ] Google Calendar integration
* [ ] Automated reminder for incomplete visits
* [ ] Better mobile-first interface
* [ ] File size and file type validation

---

# 🎯 Skills Demonstrated

This project demonstrates practical experience in:

### Frontend Development

* HTML
* CSS
* JavaScript
* DOM manipulation
* Browser APIs
* File handling

### Backend & Automation

* Google Apps Script
* Server-side JavaScript
* `google.script.run`
* Google Workspace automation

### Data Management

* Google Sheets as a structured data store
* Data validation
* Record creation
* Timestamping
* File-reference management

### Cloud Storage

* Google Drive integration
* Programmatic file creation
* Attachment URL management

### Communication Automation

* Automated Gmail notifications
* Dynamic email generation

### Location Services

* Browser Geolocation API
* Latitude/longitude handling
* Google Maps integration

### Business Process Automation

* Digitizing manual workflows
* Centralized record management
* Automated notifications
* Document management
* Field data collection

---

# 🧠 What I Learned

Through this project, I worked with the complete flow of a small business automation application:

```text
User Interface
      ↓
Client-side Processing
      ↓
Server-side Processing
      ↓
Data Storage
      ↓
Document Storage
      ↓
Email Automation
```

The project also provided practical experience in handling browser permissions, file uploads, asynchronous JavaScript operations, Google Apps Script services, and integration between multiple Google Workspace components.

---

# ⚠️ Limitations

This project uses Google Sheets and Google Drive as the backend/storage layer, making it suitable for lightweight internal business applications.

For larger-scale applications, a dedicated database and backend architecture may be more appropriate.

The browser's GPS accuracy can also vary depending on:

* Device
* Browser
* Network availability
* GPS signal
* User permission settings

---

# 📄 License

This project is provided for educational and portfolio demonstration purposes.

If you adapt this project for an organization, review the organization's security, privacy, data-retention and access-control requirements before deployment.

---

# 👤 Author

**Santanu Basak**

Data Analyst | Business Automation | Data & Process Optimization

Interested in building practical solutions using:

```text
SQL
Power BI
Python
Google Apps Script
Google Workspace Automation
Business Process Automation
Data Analytics
```

---

## ⭐ Project Highlights

> **A practical business automation project demonstrating how a manual field-visit reporting process can be converted into a structured digital workflow using Google Workspace technologies.**

**Core workflow:**

```text
Employee
   ↓
Web Form
   ↓
Validation + GPS + Attachments
   ↓
Google Apps Script
   ↓
┌──────────────┬──────────────┬──────────────┐
│ Google Sheet │ Google Drive │    Gmail     │
│ Visit Data   │ Attachments  │ Notification │
└──────────────┴──────────────┴──────────────┘
```

