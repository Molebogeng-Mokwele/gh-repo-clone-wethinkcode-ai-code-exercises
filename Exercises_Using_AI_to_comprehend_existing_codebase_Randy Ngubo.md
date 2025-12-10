**Using AI to comprehend existing codebase\
Exercise: Knowing where to start**

**Task Manager Project: Learning and Reflection\
**

**1. Initial vs. Final Understanding of the Task Manager Codebase**

**Initial Understanding:**

-   The project is a **task management system** (to-do list) with
    functionality to create, update, and manage tasks.

-   Built using **Java** and managed with **Gradle**.

-   Folder structure seemed modular: model, service, etc., but exact
    naming conventions were unclear.

**Final Understanding:**

-   The project follows a **modular Java structure**:

za.co.wethinkcode.taskmanager

app Core business logic and services

cli Command-line interface classes

model Data models (Task, TaskStatus, TaskPriority)

storage Handles persistence of tasks

util Utility classes (parsing, merging, exporting)

test Unit and integration tests

build.gradle Project build and dependencies

**Technologies/Libraries:**

-   Apache Commons CLI - Command-line parsing

-   Gson - JSON serialization/deserialization

-   JUnit 5 & Mockito - Testing framework

-   AssertJ - Fluent assertions

**\
Application Entry Point:** TaskManagerCli.java in cli folder. This is
where execution begins.\
\
**Domain Model:**

-   Task as the core entity, with TaskStatus and TaskPriority.

-   TaskStorage handles persistence; util classes support parsing,
    merging, and transforming task data.

**2. Most Valuable Insights from Each Prompt**

**Exercise 1 -- Project Structure:**

-   Clarified how modules interact (CLI - app - storage).

-   Identified key libraries and tools used for parsing, serialization,
    and testing.

-   Helped formulate questions for the team about storage backends and
    architectural conventions.

**Exercise 2 -- Feature Implementation (CSV Export):**

-   Learned how to locate or create new features within the project.

-   Realized the util package is ideal for reusable helpers like
    TaskCsvExporter.

-   Understood how CLI commands, storage, and utility classes coordinate
    to implement features.

**Exercise 3 -- Domain Model:**

-   Mapped how tasks relate to status and priority.

-   Understood merging is for handling duplicates, parsing is for
    loading tasks.

-   Recognized how business logic (status, priority) directly impacts
    user-facing features like sorting/filtering.

**Exercise 4 -- Practical Application (Overdue Tasks):**

-   Learned to identify which files to modify for new business rules
    (Task, TaskService, TaskStorage, CLI/scheduler).

-   Formulated logic for marking overdue tasks as abandoned, except
    high-priority tasks.

-   Reflected on uncertainty areas like scheduling automated checks and
    notifications.

**3. Approach to Implementing the New Business Rule**

**Scenario:** Automatically mark tasks overdue for more than 7 days as
ABANDONED unless high-priority.

**Planned Changes:**

1.  **Task Model:** Add ABANDONED status and ensure dueDate exists.

2.  **TaskService:** Implement markOverdueTasksAbandoned() method:

    -   Loop through tasks, check due date and priority.

    -   Update status and save task.

3.  **TaskStorage:** Ensure changes persist.

4.  **CLI/Scheduler:** Trigger check automatically or via a command
    (check-overdue).

**Key Questions for Team:**

-   Should this be automated or manual?

-   How are high-priority tasks defined?

-   Should users be notified when tasks are abandoned?

**Next Steps:**

-   Trace task loading/saving logic.

-   Explore TaskService methods for integration points.

-   Write small tests to verify overdue task behavior.

**4. Strategies for Approaching Unfamiliar Code**

1.  **Start with Structure:** Understand the main folders, entry points,
    and domain model.

2.  **Trace a Simple Flow:** Pick a basic feature (e.g., create task)
    and follow it through all layers . CLI - app - storage.

3.  **Use Keywords:** Search for relevant terms (export, save, merge) to
    locate features.

4.  **Leverage AI Prompts:** To map relationships, find feature
    locations, and understand domain logic.

5.  **Ask Targeted Questions:** Clarify unclear areas like storage type,
    conventions, and priorities before coding.

6.  **Test Incrementally:** Add small print/log statements or unit tests
    to confirm understanding of behaviour.

**Reflection:**\
Using AI prompts systematically transformed my understanding from
general assumptions to a detailed view of the codebase. I now see how
CLI, service, storage, and utility layers interact and how business
rules like task abandonment can be safely implemented. This approach
gives me confidence to navigate and enhance unfamiliar projects in the
future.
