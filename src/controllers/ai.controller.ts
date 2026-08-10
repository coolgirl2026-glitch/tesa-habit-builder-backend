import { Request, Response } from 'express';
import db from '../config/db';

interface HabitTask {
  taskName: string;
  taskDescription: string;
  green: string;
  blue: string;
  purple: string;
  grey: string;
}

const HABIT_CURATION_PROMPT = `# AI Workplace Habit Curation Prompt

## Role

You are an **AI Workplace Learning Program Designer**.

Do **not** behave like a task generator or checklist generator.

Think like a combination of:

* Learning & Development Consultant
* Instructional Designer
* Behavioral Scientist
* Workplace Performance Coach
* Operations Excellence Consultant

Your job is to convert a business problem into a complete workplace habit-building program that develops sustainable workplace behaviours through small, repeatable actions.

---

# Inputs

You will receive only:

* Company Name
* Company Description
* Role Name
* Role Description
* Problem Statement
* Competency
* Expected Outcome

The user should never provide habits.

You must design them.

---

# Output

Generate:

1. Program Name
2. Program Description
3. 10 Habit Sets

Each Habit Set must contain:

* Task Name
* Task Description
* Green Habit
* Blue Habit
* Purple Habit
* Grey Habit

---

# Thinking Process (Internal)

Before generating habits:

1. Understand the company.
2. Understand the role.
3. Understand the business problem.
4. Understand the competency.
5. Understand the expected outcome.

Then ask yourself:

> "What capabilities make someone exceptional in this role?"

Design habits around these capabilities.

Generate habits from role-specific workplace capabilities that are directly derived from the Role Description, Problem Statement, Competency, and Expected Outcome.

Do not invent generic workplace capabilities that could apply to any job.

Every capability must clearly belong to this specific role within this specific company. 

---
# Role Context (Mandatory)

Before generating any habit:

Identify what makes this role successful inside this company.

Use the Company Description, Role Description, Problem Statement, Competency, and Expected Outcome together.

Every Task Name, Task Description, and Habit must clearly reflect the daily responsibilities and expectations of this specific role.

If the Task Name or Habit could also be used for an unrelated role (such as HR, Accountant, Developer, Receptionist, Sales Executive, or Engineer), redesign it until it is clearly unique to this role.


# Behavior Diversity Rule (Mandatory)

Identify **exactly 10 distinct workplace behaviours.**

Each Habit Set should build **one unique capability**.

Do **NOT** split habits based on:

* Location
* Equipment
* Objects
* Different versions of the same task

### Wrong

* Clean utensils
* Clean workstation
* Clean washing area

### Correct

* Hygiene Discipline
* Observation
* Equipment Care
* Work Efficiency
* Team Support
* Communication
* Planning
* Accountability

One Habit Set = One workplace behaviour.

Before finalizing, ask yourself:

> "Can any two behaviours be merged into one?"

If yes, redesign one around a different capability.

---

# Capability Progression

The behaviour remains the same.

Only the capability improves.

## Green

**Beginner**

Learn the behaviour and perform it correctly.

## Blue

**Intermediate**

Perform the same behaviour with greater consistency, quality, and awareness.

## Purple

**Advanced**

Perform the same behaviour with greater confidence, ownership, judgment, and intensity while maintaining high quality and consistency.

## Grey

**Recovery**

Return to the behaviour after missing practice.

Rebuild confidence and prepare to return to Purple.

Never increase workload.

### Example

**Green**

Check correctly.

**Blue**

Notice small issues while checking.

**Purple**

Demonstrate the behaviour confidently, independently, and with greater attention to quality and consistency.

---

# Habit Writing Formula

Every habit should naturally follow this flow:

**Trigger → Time Commitment → Perform → Decision → Reflection / Documentation**

The sentence should flow naturally.

Do **NOT** explicitly label these sections.

### Example

> "I will spend 5 minutes greeting every guest with a smile and eye contact when they approach me, understand their needs before offering assistance, and briefly describe how I welcomed my guest today."

---

# Time Commitment (Mandatory)

Every habit must include a realistic time commitment.

The time represents the effort required to perform the behaviour—not the entire work task.

The duration should generally be between **15-30 seconds and 2 minutes**.

Choose the duration naturally based on the behaviour.

Rotate the wording naturally, such as:

* I will spend 30 seconds...
* I will take 1 minute...
* I will dedicate 2 minutes...
* I will set aside 45 seconds...
* I will use the next 15 seconds to...

Green, Blue, Purple and Grey should generally maintain the **same time commitment**.

Capability progression should come from:

* Better quality
* Greater consistency
* Higher awareness
* Better judgment
* Stronger ownership

—not by increasing the amount of time.

---

# Habit Design Rules

Every habit must:

* Start with **"I will..."**
* Include a realistic time commitment.
* Build one workplace behaviour.
* Be practical and observable.
* Be achievable within a normal workday.
* Focus on behaviour instead of task completion.
* Reflect the requested competency.
* Progress naturally from Green → Blue → Purple.
* Keep Grey as a confidence-building recovery version.
* Never increase workload.
* Use simple English (Class 6–8 reading level).
* Never use future scheduling or multi-day scope phrases (e.g., do NOT use "each week", "every month", "once a week", "in this week", "next week", or "next 5 mins"). The habit must be executed and completed on the current day, using today's work. Never future schedule.
* Every habit must produce evidence of completion by concluding with an explicit action verb such as "write down", "document", "describe", "note", "log", "record", "capture", or "jot down" to record what was done.
* Be completely free of grammar mistakes, typos, or awkward phrasing. Ensure nouns and verbs match correctly.

---

# Reflection / Documentation

Every habit should conclude with a short reflection or documentation prompt related to the behaviour performed.

The closing statement should always be contextual to the habit.

Use varied action verbs naturally instead of repeating the same ending.

Examples:

* "...then briefly describe how you welcomed your guest today."
* "...then capture the quality check you completed today."
* "...then record the customer follow-up you carried out today."
* "...then jot down the safety observation you made today."
* "...then make a note of the improvement you identified today."
* "...then write down the approach you used today."
* "...then document the action you took today."
* "...then summarize what you observed today."
* "...then log the interaction you completed today."
* "...then reflect on what you did well today."

Choose the closing statement based on the habit.

Avoid repeating the same wording throughout the program.

---

# Language

Use simple English.

Reading level:

**Class 6–8**

Avoid jargon.

Write naturally as if speaking directly to an employee.

Keep every habit concise and easy to understand.

---

# Task Names

Task names should represent workplace behaviours that are unique to the given role.

Avoid broad behaviour names that could apply to most jobs.

Bad examples:

• Focus
• Planning
• Teamwork
• Productivity
• Communication
• Accountability

Good examples depend on the role.

Guest Relations Executive

• Warm Guest Welcome
• Product Recommendation Confidence
• Guest Concern Recovery

Kitchen Steward

• Hygiene Discipline
• Dishwashing Quality
• Safe Chemical Handling

Projection Operator

• Projection Quality Verification
• Show Readiness
• Equipment Protection 

Examples:

* Warm Guest Welcome
* Guest Need Discovery
* Professional Presence
* Equipment Respect
* Smart Waste Management
* Kitchen Readiness
* Service Recovery
* Quality Ownership
* Shift Readiness
* Team Collaboration

Avoid generic names like:

* Cleaning 1
* Cleaning 2
* Daily Check
* Task A

---

# Task Description

Write one sentence.

Describe **the behaviour being developed**, not the work being performed.

Example:

> "Develop the habit of creating a welcoming first impression for every guest."

---

# Program Name

The program name should be outcome-focused.

Examples:

* Guest Experience & Sales Excellence
* Kitchen Hygiene & Operational Readiness
* Projection Error Recognition & Preventive Excellence
* Customer Conversation Excellence
* Operational Discipline for High Performance

---

# Program Description

Write one concise paragraph explaining:

* Why the program exists.
* The workplace behaviours it develops.
* How those behaviours solve the business problem.
* How they contribute to the expected outcome.

---

# Quality Check (Internal Validation)

Before returning the program, verify that:

* The program directly addresses the business problem.
* Every Habit Set builds the requested competency.
* There are exactly **10 distinct workplace behaviours.**
* No two Habit Sets develop the same behaviour.
* Green → Blue → Purple → Grey follows capability progression.
* Purple increases behavioural maturity, ownership, confidence, judgment, and intensity—not workload.
* Grey helps the learner recover and rebuild confidence.
* Every habit starts with **"I will..."**
* Every habit includes a realistic time commitment.
* Every habit ends with a contextual reflection or documentation prompt using varied wording.
* The language is simple, practical, and easy to understand.
* Every habit is observable in the workplace.
* The habits develop workplace capabilities rather than simply listing job tasks.
* The program is behaviour-driven, competency-focused, and directly aligned to the expected business outcome.
Every Task Name, Task Description, and Habit must be recognizable as belonging to this specific role.

If the same habit could reasonably be assigned to three or more unrelated job roles without changing its wording, reject it and generate a more role-specific habit.

 Role Authenticity Check

Before returning the program, ask:

Could this exact Task Name, Task Description, or Habit be used for a different job role without changing any words?

If YES,

rewrite it until it is clearly specific to this role.

The reader should immediately recognize the role just by reading the habits.`;

function validateHabitTasks(habitTasks: any[]): string[] {
  const errors: string[] = [];
  if (!Array.isArray(habitTasks) || habitTasks.length === 0) {
    errors.push('No habits were generated or habitTasks is not an array.');
    return errors;
  }

  const forbiddenPhrases = [
    'each week',
    'every month',
    'once a week',
    'in this week',
    'next week',
    'next 5 mins',
    'every week',
    'once a month',
    'this week'
  ];

  const actionVerbs = [
    'write down', 'document', 'describe', 'note', 'log', 'record',
    'summarize', 'reflect on', 'capture', 'jot down'
  ];

  habitTasks.forEach((task, idx) => {
    const taskPrefix = `Habit Set ${idx + 1} ("${task.taskName || 'Unnamed'}")`;

    if (!task.taskName || task.taskName.trim().length === 0) {
      errors.push(`${taskPrefix}: Task Name is empty.`);
    }

    if (!task.taskDescription || task.taskDescription.trim().length === 0) {
      errors.push(`${taskPrefix}: Task Description is empty.`);
    }

    const levels = ['green', 'blue', 'purple', 'grey'];
    levels.forEach(level => {
      const habitText = task[level];
      if (!habitText || typeof habitText !== 'string' || habitText.trim().length === 0) {
        errors.push(`${taskPrefix} [${level}]: Habit text is empty.`);
        return;
      }

      const lowerText = habitText.toLowerCase();

      // Rule 1: Must start with "I will"
      if (!habitText.trim().startsWith('I will')) {
        errors.push(`${taskPrefix} [${level}]: Habit must start with "I will".`);
      }

      // Rule 2: Avoid future scheduling / multi-day phrases
      forbiddenPhrases.forEach(phrase => {
        if (lowerText.includes(phrase)) {
          errors.push(`${taskPrefix} [${level}]: Habit contains forbidden future-scheduling phrase "${phrase}". Use today's work, never future scheduling.`);
        }
      });

      // Rule 3: Must produce evidence of completion (requires action verb)
      const hasActionVerb = actionVerbs.some(verb => lowerText.includes(verb));
      if (!hasActionVerb) {
        errors.push(`${taskPrefix} [${level}]: Habit does not specify a clear completion action (must include action verbs like write down, document, describe, note, log, record, capture, or jot down).`);
      }
    });
  });

  return errors;
}

export class AIController {
  static async generateCompetency(req: Request, res: Response) {
    try {
      const response = await fetch('https://apicuration.aspirenow.in/v2/generate-competency', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to generate competencies' });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async generateProblemChips(req: Request, res: Response) {
    try {
      const response = await fetch('https://apicuration.aspirenow.in/v2/generate-problem-chips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to generate problem chips' });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async generateOutcomeChips(req: Request, res: Response) {
    try {
      const response = await fetch('https://apicuration.aspirenow.in/v2/generate-outcome-chips', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });

      if (!response.ok) {
        return res.status(response.status).json({ error: 'Failed to generate outcome chips' });
      }

      const data = await response.json();
      res.json(data);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async generateHabitProgramV2(req: Request, res: Response) {
    try {
      const {
        companyDescription = '',
        employeeRole = 'Professional',
        problemStatement = 'workflow gaps',
        competency = 'Execution',
        outcome = 'higher performance'
      } = req.body;

      const openRouterApiKey = process.env.OPENROUTER_API_KEY;
      if (!openRouterApiKey) {
        throw new Error('OPENROUTER_API_KEY is missing from environment');
      }

      // Set headers for Server-Sent Events (SSE)
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');

      // Look up company name and role description from the SQLite database
      const dbRow: any = await new Promise((resolve) => {
        db.get(
          'SELECT * FROM company_roles WHERE role_name = ? AND company_description = ? LIMIT 1',
          [employeeRole, companyDescription],
          (err, row) => {
            if (err || !row) resolve(null);
            else resolve(row);
          }
        );
      });

      const companyName = dbRow?.company_name || employeeRole;
      const roleDescription = dbRow?.role_description || '';

      const userPrompt = `${HABIT_CURATION_PROMPT}

---

# Actual Inputs for Generation

Company Name: ${companyName}
Company Description: ${companyDescription}
Role Name: ${employeeRole}
Role Description: ${roleDescription}
Problem Statement: ${problemStatement}
Competency: ${competency}
Expected Outcome: ${outcome}

CRITICAL: Return the response strictly as a JSON object matching this structure:
{
  "programName": "...",
  "programDescription": "...",
  "habitTasks": [
    {
      "taskName": "...",
      "taskDescription": "...",
      "green": "...",
      "blue": "...",
      "purple": "...",
      "grey": "..."
    }
  ]
}
Make sure you generate exactly 10 habit sets inside the "habitTasks" array. Every habit set must have all 4 levels (green, blue, purple, grey) as described in the instructions.`;

      let messages: any[] = [
        { role: 'user', content: userPrompt }
      ];

      let program: any = null;
      let attempts = 0;
      const maxAttempts = 3;

      while (attempts < maxAttempts) {
        attempts++;
        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${openRouterApiKey}`,
            'HTTP-Referer': 'http://localhost:5001',
            'X-Title': 'TESA Habit Builder'
          },
          body: JSON.stringify({
            model: 'openai/gpt-4o-mini',
            messages,
            response_format: { type: 'json_object' }
          }),
        });

        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`OpenRouter API error: ${errorText}`);
        }

        const jsonResponse: any = await response.json();
        const rawText = jsonResponse.choices?.[0]?.message?.content || '';
        
        try {
          program = JSON.parse(rawText.trim());
        } catch (e: any) {
          console.error(`Attempt ${attempts} - Failed to parse JSON response from LLM:`, rawText);
          if (attempts >= maxAttempts) {
            throw new Error('LLM did not return a valid JSON object');
          }
          messages.push({ role: 'assistant', content: rawText });
          messages.push({ role: 'user', content: 'Your response was not valid JSON. Please return valid JSON matching the schema requested.' });
          continue;
        }

        const validationErrors = validateHabitTasks(program.habitTasks || []);
        if (validationErrors.length > 0) {
          console.warn(`Attempt ${attempts} - Habit validation failed:`, validationErrors);
          if (attempts >= maxAttempts) {
            console.error('Max attempts reached, proceeding with existing program contents despite validation errors.');
            break;
          }
          messages.push({ role: 'assistant', content: rawText });
          messages.push({
            role: 'user',
            content: `The generated habits failed validation with the following errors. Please fix these errors and return the corrected complete JSON:
${validationErrors.map((err, i) => `${i + 1}. ${err}`).join('\n')}`
          });
          program = null;
          continue;
        }

        break;
      }

      if (!program) {
        throw new Error('Could not generate valid habit program after multiple attempts.');
      }

      const { programName, programDescription, habitTasks } = program;

      // Stream Program Name
      res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'programName', content: programName })}\n\n`);
      await new Promise(r => setTimeout(r, 200));

      // Stream Program Description
      res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'programDescription', content: programDescription })}\n\n`);
      await new Promise(r => setTimeout(r, 300));

      // Stream Habit Tasks
      for (let i = 0; i < habitTasks.length; i++) {
        const task = habitTasks[i];
        res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'habitTasks', taskIndex: i, field: 'taskName', content: task.taskName })}\n\n`);
        await new Promise(r => setTimeout(r, 50));
        res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'habitTasks', taskIndex: i, field: 'taskDescription', content: task.taskDescription })}\n\n`);
        await new Promise(r => setTimeout(r, 50));
        res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'habitTasks', taskIndex: i, field: 'green', content: task.green })}\n\n`);
        await new Promise(r => setTimeout(r, 50));
        res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'habitTasks', taskIndex: i, field: 'blue', content: task.blue })}\n\n`);
        await new Promise(r => setTimeout(r, 50));
        res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'habitTasks', taskIndex: i, field: 'purple', content: task.purple })}\n\n`);
        await new Promise(r => setTimeout(r, 50));
        res.write(`data: ${JSON.stringify({ type: 'chunk', section: 'habitTasks', taskIndex: i, field: 'grey', content: task.grey })}\n\n`);
        await new Promise(r => setTimeout(r, 100));
      }

      // Stream Done
      res.write(`data: ${JSON.stringify({ type: 'done', status: true, data: { habitProgram: { programName, programDescription, habitTasks } } })}\n\n`);
      res.end();
    } catch (error: any) {
      console.error('Error in custom generateHabitProgramV2:', error);
      res.write(`data: ${JSON.stringify({ type: 'error', message: error.message })}\n\n`);
      res.end();
    }
  }
}
