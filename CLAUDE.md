# CLAUDE.md — Project Configuration

## Project: ROI Calculator Kit
A reusable, client-facing ROI calculator that helps prospects quickly understand the revenue impact of missed leads, slow response time, and poor conversion handling.

---

## Project Goal

Build a simple, fast, demo-ready ROI calculator that:

- Helps prospects quantify lost revenue
- Makes the business case for AI Receptionist / lead capture systems
- Can be reused across industries with small input changes
- Is easy to show on calls, landing pages, or as a lead magnet

This project is not just a calculator.
It is a sales asset.

---

## Project Success Criteria

This build should be:

- Simple to understand within seconds
- Visually clean and mobile-friendly
- Fast to deploy
- Easy to customise by niche
- Commercially useful in real sales conversations

The calculator must help answer:
- How many leads are being lost?
- What is that worth in revenue?
- What could be recovered with a better system?

---

## Project Operating Instructions

In this project, prioritise:

- speed over perfection
- clarity over complexity
- business usefulness over technical elegance
- reusability over one-off custom logic

When making decisions, default to the simplest version that is:
- usable
- accurate enough
- easy to demo
- easy to adapt later

Before adding complexity, ask:
“Does this improve the calculator’s sales value or conversion value?”

If not, do not add it.

---

## What Claude Should Help With

Claude should help with:

- calculator structure
- logic and formulas
- UX flow
- copy and messaging
- page layout
- lead capture integration planning
- niche adaptation
- turning the build into a reusable kit/template

Claude should not over-focus on:
- fancy engineering
- edge cases too early
- unnecessary dependencies
- advanced architecture unless clearly needed

---

## Build Priorities

### 1. Core User Experience
The calculator should feel:

- instant
- clear
- credible
- commercially relevant

Users should be able to enter a few inputs and quickly see:
- missed opportunity
- revenue loss
- potential gain

### 2. Simplicity of Inputs
Prefer a small number of strong inputs such as:

- leads per month
- missed lead percentage
- average conversion rate
- average job / client value
- estimated improvement rate

Do not overload the first version with too many fields.

### 3. Output Design
Outputs should be easy to understand and sales-friendly.

Prioritise outputs such as:
- estimated missed leads
- estimated lost revenue
- potential recovered revenue
- annual upside

If useful, include a simple visual summary.

### 4. Commercial Framing
The calculator should support the sale of:
- AI Receptionist
- faster lead response systems
- qualification and booking automation
- CRM process improvement

---

## File Structure

```text
/CLAUDE.md                 - Project instructions
/app or /src               - Main application files
/components                - Reusable UI components
/lib                       - Calculation logic, helpers, config
/public                    - Static assets
/templates                 - Reusable niche versions, copy blocks, formulas
/outputs                   - Exported mockups, screenshots, packaged variants
/.tmp                      - Temporary working files
/.env                      - Environment variables (never committed)
/.env.example              - Placeholder variables only