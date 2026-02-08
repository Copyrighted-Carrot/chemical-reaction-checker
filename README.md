Chemical Reaction Safety Checker:
The Chemical Reaction Safety Checker is a website-based, rule-driven application that checks the basic safety of mixing two chemicals.
The system is intended for educational and household safety awareness purposes only and does not simulate real chemical reactions.
This project allows users to enter two chemical names, formulas, or common aliases and receive feedback on whether mixing them is safe or potentially dangerous.
The system relies on predefined rules rather than real-time chemical calculations, making it simple, fast, and easy to understand.

Objectives:
To provide basic safety awareness for chemical mixing
To handle human input variability such as names, formulas, and aliases
To demonstrate rule-based decision making
To apply fundamental web development and software design principles

System Architecture:
The application follows a modular architecture:
Frontend (HTML, CSS, JavaScript)
Chemical Normalization API
Reaction Rule Engine
Result Display Module
This separation improves scalability, maintainability, and clarity of the system design.

How It Works:
The user enters two chemicals through the web interface.
Inputs are normalized (case handling, trimming, alias resolution).
The Chemical Normalization API converts formulas and aliases into standardized chemical names.
The reaction engine checks the standardized inputs against predefined safety rules.
The system displays the reaction type, explanation, and safety recommendation.
If no matching rule is found, the system returns “Not recommended – No data available.”

Reaction Categories:
The system classifies reactions into the following categories:
Safe
Mild Reaction
Exothermic
Dangerous
Very Dangerous
Each category is visually distinguished in the user interface using color coding.

Features:
Supports chemical names, formulas, and common aliases
Order-independent input handling (A + B is treated the same as B + A)
Color-coded safety output
Session-based reaction history
Graceful handling of unknown or invalid inputs
Mobile-friendly web interface

Technologies Used:
HTML
CSS
JavaScript
API Layer: Node.js / Python Flask (rule-based)

Disclaimer:
This project is intended strictly for educational and household safety awareness purposes.
It must not be used for laboratory, industrial, or professional chemical decision-making.

Contributors:
Belindo Samson S
Kousik J R
