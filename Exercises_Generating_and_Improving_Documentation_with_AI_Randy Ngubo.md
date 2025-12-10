**Generating and Improving Documentation with AI\
Exercise: Code Documentation**

**\
**

**1. Code Selected**

For this exercise, I chose the **TaskTextParser** class from
taskmanager.util, which parses free-form text into a Task object,
extracting title, priority, due date, and tags. Part of the code snippet
below

![](media/image1.png){width="6.268055555555556in"
height="2.9118055555555555in"}

**2. Documentation Using Prompt for TaskTextParser**

Parses a free-form text string to create a Task object with title,
priority, due date, and tags.

\@param text (String) The input string describing the task. Supports:

\* - Basic title text

\* - Tags with @ (e.g., \@shopping)

\* - Priority with !N (1-4) or !low/medium/high/urgent

\* - Due dates with \# (e.g., #today, #tomorrow, #monday, #2025-12-10)

\@return Task object populated with:

\* - title: trimmed task title

\* - priority: parsed TaskPriority (default MEDIUM)

\* - dueDate: parsed LocalDateTime or null if none

\* - tags: list of parsed tags

Example usage:

Task task = TaskTextParser.parseTaskFromText(\"Buy milk \@shopping !2
#tomorrow\");

Notes:

\* - Input can contain multiple tags and dates; only the first valid
date is used.

\* - Priority markers are case-insensitive.

\* - Removes tags, priority markers, and dates from the task title.

\* - Throws no exceptions for invalid text; unrecognized dates are
ignored.

**3. Insights & Improvements Using Prompt 2 (Intent and Logic
Explanation)**

**Intent:**

-   Transform free-form user input into a structured Task object.

-   Extract priority, due date, and tags from inline markers.

**Logic Breakdown:**

1.  Default task properties are set: title, priority (MEDIUM), dueDate
    (null), tags (empty).

2.  Extract priority markers (!N or !name) and update priority.

3.  Extract tags using \@tag syntax and remove them from title.

4.  Extract date markers using #date syntax; parse as today/tomorrow,
    weekday names, next week, or YYYY-MM-DD.

5.  Remove markers from title and trim extra whitespace.

6.  Construct a new Task object with extracted properties.

**Assumptions / Edge Cases:**

-   Multiple dates: only the first valid date is applied.

-   Unrecognized dates are ignored.

-   Priority defaults to MEDIUM if none specified.

-   Tags, priority markers, and dates are stripped from title.

**Potential Improvements:**

-   Handle null or empty input.

-   Support multiple due dates or recurring tasks.

-   Provide warnings for unrecognized dates.

**TaskTextParser: Final Combined Documentation**

**Description:**\
Converts a free-form text string into a structured Task object. Extracts
the task title, priority, due date, and tags from user input.

**Functionality:**

-   **Title:** The main task description, with all markers removed and
    whitespace normalized.

-   **Priority:** Set using !1-4 or named markers (!low, !medium, !high,
    !urgent). Defaults to MEDIUM.

-   **Tags:** Any \@tag markers are extracted into a list of strings.

-   **Due Date:** Specified using #today, #tomorrow, weekday names
    (mon--sun), #next_week, or ISO format dates (YYYY-MM-DD). Only the
    first valid date is applied.

**Behaviour and Edge Cases:**

-   Multiple tags are collected; multiple dates only use the first valid
    one.

-   Invalid or unrecognized priority or date markers are ignored
    silently.

-   Markers (tags, priority, date) are removed from the task title.

-   Whitespace is normalized to a single space.

-   Does not throw exceptions for invalid input but may skip
    unrecognized elements.

**Parameters:**

-   text (String): Free-form description of the task, including optional
    tags, priority, and due date.

**Returns:**

-   Task object with:

    -   title (String): Cleaned task description

    -   priority (TaskPriority): Enum value representing priority

    -   dueDate (LocalDateTime): First recognized due date or null if
        none

    -   tags (List\<String\>): List of extracted tags

**Developer Notes / Recommendations:**

-   Only the first valid date marker is applied; subsequent dates are
    ignored.

-   Priority markers are case-insensitive.

-   Future improvements could include:

    -   Supporting multiple due dates or recurring tasks

    -   Adding input validation for empty or null strings

    -   Logging or notifying when unrecognized markers are ignored

**Reflection**

**Challenging Parts for AI:**

-   Explaining complex date parsing logic

-   Handling multiple edge cases

-   Describing marker removal and title normalization clearly

**\
Additional Information Needed in Prompts:**

-   Specify desired documentation style (Javadoc vs clean reference)

-   Clarify which edge cases to include

-   Indicate examples and notes for developers

**Using This Approach in Projects:**

-   To quickly generate clear, maintainable documentation for legacy or
    undocumented code

-   To combine AI-generated docs with manual refinement for accuracy

-   To use as a baseline to create consistent coding standards and team
    references

**Exercise: API Documentation**

**1. Chosen API Endpoint Code: Product API Endpoint**

**Endpoint:** Lists products with filtering, sorting, and pagination.

**2. Prompt 1:Comprehensive Endpoint Documentation**

**Description:** Retrieves a paginated list of products with optional
filtering and sorting.

**Query Parameters:**

  ---------------------------------------------------------------------------------
  **Parameter**   **Type**   **Required**   **Description**
  --------------- ---------- -------------- ---------------------------------------
  category        string     No             Filter by product category

  minPrice        number     No             Minimum product price

  maxPrice        number     No             Maximum product price

  sort            string     No             Field to sort by (default: createdAt)

  order           string     No             Sort direction: asc or desc (default:
                                            desc)

  page            number     No             Page number (default: 1)

  limit           number     No             Number of items per page (default: 20)

  inStock         boolean    No             Show only products with stock \> 0
  ---------------------------------------------------------------------------------

**Responses:**

-   **200 OK:** Returns products array and pagination info.

-   **500 Server Error:** Failed to fetch products.

**Example Request**: GET /api/products?category=electronics&minPrice=50

**Example Response:**

{

\"products\": \[

{
\"\_id\":\"123\",\"name\":\"Headphones\",\"price\":89.99,\"category\":\"electronics\",\"stockQuantity\":45
}

\],

\"pagination\": { \"total\":1,\"page\":1,\"limit\":20,\"pages\":1 }

}

**Authentication:** None required.

**Notes:** Supports flexible filtering, sorting, and pagination. Maximum
limit per page: 100.

**3. Prompt 2: Converted OpenAPI Documentation**

openapi: 3.0.0

info:

title: Products API

version: 1.0.0

paths:

/api/products:

get:

summary: List products

description: Get products with filtering, sorting, and pagination

parameters:

\- in: query

name: category

schema: { type: string }

\- in: query

name: minPrice

schema: { type: number }

\- in: query

name: maxPrice

schema: { type: number }

\- in: query

name: sort

schema: { type: string, default: createdAt }

\- in: query

name: order

schema: { type: string, enum: \[asc, desc\], default: desc }

\- in: query

name: page

schema: { type: integer, default: 1 }

\- in: query

name: limit

schema: { type: integer, default: 20, maximum: 100 }

\- in: query

name: inStock

schema: { type: boolean }

responses:

\'200\':

description: Successful response

\'500\':

description: Server error

**4. Prompt 3: Developer Usage Guide**

**How to use the endpoint:**

-   No authentication needed.

-   Use query parameters to filter, sort, and paginate results.

-   Check the response for products and pagination.

**Handling errors:**

-   **500:** Server error -- retry or check server logs.

**Example JS usage:**

fetch(\'https://api.example.com/api/products?category=electronics&limit=10\')

.then(res =\> res.json())

.then(data =\> console.log(data.products, data.pagination))

.catch(err =\> console.error(err));

**Best practices:**

-   Use limit and page for large datasets.

-   Apply filters to reduce returned data and improve performance.

**Reflection**

**Challenging parts:**

-   Explaining filtering, sorting, and pagination logic clearly.

-   Providing example responses with realistic data.

**Prompt adjustments:**

-   Specified output format (Markdown, OpenAPI, or usage guide)

-   Included default values and optional parameters

**Most effective format:**

-   OpenAPI/Swagger is best for integration and tooling.

-   Markdown is easy for quick reference or documentation sites.

**Future use:**

-   Automate API documentation from code using AI prompts but explicitly
    define ideal formatting and structure based on documentation goals.

-   Maintain consistency and developer-friendliness across endpoints

**Exercise: README and User Guide Documentation**

1\. Chosen information to document : **Task Management CLI Tool**

![A screenshot of a computer program AI-generated content may be
incorrect.](media/image2.png){width="6.14669072615923in"
height="4.594390857392826in"}**\
\
2.** **Comprehensive README you generated using Prompt 1\
**\
**TaskCLI\
**A CLI task manager for developers to create, organize, and track
tasks, projects, and GitHub issues entirely from the terminal.

**Features**

-   Create, update, view, and complete tasks

-   Organize tasks into projects and tags

-   Set priorities and due dates

-   Daily summary email notifications

-   GitHub issue integration

-   Time tracking and reporting

**Technologies**

-   Node.js, Commander.js, Inquirer.js, SQLite

**Installation**

**Prerequisites**

-   Node.js ≥ 10

-   npm

**Install Globally**

npm install -g task-cli

taskcli \--version

**Manual**

git clone https://github.com/yourusername/task-cli.git

cd task-cli

npm install

npm link

**Configuration**

taskcli config set email your.email@example.com

taskcli config set githubToken your-github-token

Options include email, githubToken, defaultProject (default: inbox),
reminderTime (default: 08:00), dateFormat (default: YYYY-MM-DD).

**Usage**

taskcli add \"New task\" \# Add task

taskcli list \# List tasks

taskcli complete 42 \# Complete task

taskcli project add \"Website\" \# Add project

taskcli tag 42 \--add urgent \# Add tag

taskcli timer start 42 \# Start timer

taskcli timer stop \# Stop timer

**Troubleshooting**

-   Command not found → Ensure npm global bin is in PATH

-   GitHub auth errors → Check token permissions

-   Database issues → taskcli db:reset

**Contributing**

Fork \> Branch \> Commit \> Push \> Pull Request

**License**

MIT -- see [[LICENSE]{.underline}](LICENSE)

**Code Structure**

/bin \# CLI entry

/commands \# Command implementations

/models \# Data models

/utils \# Utilities

/db \# Database handlers

/services \# External integrations

/config \# Configuration files

**3. Step-by-step guide created using Prompt 2**\
\
**TaskCLI: GitHub Integration Setup**

This guide walks you through linking TaskCLI to GitHub, allowing you to
manage tasks from GitHub issues.

**User Level:** Beginner/Intermediate

**Prerequisites**

-   TaskCLI installed (v2.0+)

-   GitHub account

-   Repository access for the projects you want to integrate

**Step 1: Create a GitHub Personal Access Token**

1.  Log in to GitHub.

2.  Go to **Settings \> Developer settings \> Personal access tokens**.

3.  Click **Generate new token**.

4.  Name the token (e.g., TaskCLI Integration).

5.  Select scopes:

    -   repo (Full control of private repositories)

    -   read:user (Read user info)

6.  Click **Generate token**.

7.  **Copy the token immediately** -- GitHub will only show it once.

**Step 2: Configure TaskCLI with Your Token**

taskcli config set githubToken your-token

Verify:

taskcli config list

You should see your token (partially masked).

**Step 3: Link a GitHub Repository**

1.  Create or select a TaskCLI project:

taskcli project add \"Website Frontend\"

2.  Link the project to a GitHub repository:

taskcli project link \"Website Frontend\" \--repo
\"username/repository\"

3.  Confirm the link:

taskcli project show \"Website Frontend\"

**Step 4: Link Tasks to GitHub Issues**

**Option A: Create a task from an existing issue**

taskcli github import \--repo \"username/repository\" \--issue 42

**Option B: Link a new task to an issue**

taskcli add \"Fix navigation bug\" \--github-issue 42

**Option C: Link an existing task**

taskcli link 24 \--github-issue 42

**Step 5: Sync and Update Tasks**

-   Pull updates from GitHub:

taskcli github sync

-   Push updates to GitHub:

taskcli complete 24 \--push-github

-   View GitHub info for a task:

taskcli show 24 \--github-details

**Troubleshooting**

**Token Authentication Failed**

-   Ensure the token is valid and has correct scopes

-   Regenerate token if needed

**Repository Not Found**

-   Check repository name (username/repository)

-   Verify access permissions

**Changes Not Syncing**

-   Force sync:

taskcli github sync \--force

-   Check network connection

-   Check logs:

taskcli log show

**Notes**

-   All commands assume TaskCLI v2.0+

-   Use placeholders for screenshots if sharing documentation with
    visuals

-   This guide can be expanded with automated cron sync or webhooks for
    advanced usage

**4.** **The FAQ document you created using Prompt 3\
\
Description:** Command-line task management tool for developers **\
Target audience:** Developers who prefer terminal-based task tracking\
**Focus areas:** Getting started, task/project management, GitHub
integration, troubleshooting\
\
**Getting Started**\
**Q:** What is TaskCLI?\
**A:** A CLI tool to create, manage, and track tasks without leaving the
terminal.\
\
**Q:** How do I install it?\
**A:** npm install -g task-cli\
\
**Q:** What are the system requirements?\
**A:** Node.js 10+ and npm. Works on Windows, macOS, and Linux.\
\
\
\
**Q:** How do I start after installation?\
**A:** Run:

taskcli init

taskcli add \"My first task\"

**\
Features & Functionality**\
**Q:** How do I create a task?\
**A:**taskcli add \"Task description\"\
\
**Q:** How do I mark a task complete?\
**A:** taskcli complete \<taskID\>

**Q:** How do I manage projects?\
**A:**

taskcli project add \"Project Name\"

taskcli add \"Task\" \--project \"Project Name\"

**Q:** How do I use tags?\
**A:**

taskcli tag \<taskID\> \--add urgent backend

taskcli list \--tags urgent

**Q:** How do I track time?\
**A:**

taskcli timer start \<taskID\>

taskcli timer stop

taskcli report time \--from 2023-01-01 \--to 2023-01-31

**GitHub Integration\
Q:** How do I link TaskCLI to GitHub?\
**A:**

taskcli config set githubToken \<your-token\>

taskcli project link \"Project\" \--repo \"username/repository\"

**Q:** Can I create tasks from GitHub issues?\
**A:**

taskcli github import \--repo \"username/repository\" \--issue 42

**Q:** Do changes sync with GitHub?\
**A:** Complete tasks with:

taskcli complete \<taskID\> \--push-github

**Troubleshooting\
Q:** TaskCLI command not found **\
A:** Ensure npm global bin directory is in PATH:

npm bin -g

**Q:** Database errors or corruption **\
A:**

taskcli db:reset

**Q:** Email notifications not working **\
A:** Verify config:

taskcli config list

taskcli email:test

**Q:** How to uninstall completely **\
A:**

npm uninstall -g task-cli

rm -rf \~/.taskcli/

**\
Reflection:**

-   **Challenges:** Documenting CLI commands and configuration options
    clearly.

-   **Prompt adjustments:** Specified concise output, included code
    blocks, emphasized user perspective.

-   **Learnings:** Clear headings, stepwise guides, and modular
    structure improve readability.

-   **Workflow use:** I'll use prompt-driven documentation for
    consistent, maintainable READMEs, guides, and FAQs in future
    projects.
