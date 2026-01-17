export interface BlogPost {
    id: string;        // used in URL: /blogs/[id]
    title: string;     // blog title
    date: string;      // publish date
    tags: string[]; // Filter blogs
    excerpt: string;   // short description for blog list
    content: string;   // full content for the dynamic page
}

const BLOGS: BlogPost[] = [
    {
        id: "grokking-dnc-algorithms",
        title: "Learning Divide & Conquer Algorithms",
        date: "2025-08-27",
        tags: ["algorithms", "data-structures"],
        excerpt: "Understanding divide-and-conquer through Grokking Algorithms and hands-on coding.",
        content: `
### Introduction

Recently, I dove into **divide-and-conquer algorithms**, inspired by *Grokking Algorithms*. I wanted to understand not just how they work, but why they work and how to implement them efficiently.

Divide-and-conquer is all about breaking a problem into smaller subproblems, solving those recursively, and then combining the results. It’s elegant and incredibly powerful once you get the hang of it.

> **Tip:** Visualize the array and indices on paper. It makes recursion and partitioning much easier to grasp.

### Understanding Binary Search

Binary search was my first real “aha” moment. The idea is simple: split a sorted array in half, check the middle, and decide which half to search next. It felt like magic when I saw how quickly it narrowed down the search space.

\`\`\`ts
function binarySearch(arr: number[], target: number): number {
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  return -1;
}
\`\`\`

At first, I struggled with **pointers** — keeping track of \`left\` \`right\` \`mid\` Once I visualized it on paper, I realized the elegance: each comparison halves the search space. Super efficient!

### Diving into Quicksort

Quicksort was more challenging but fun. The pivot, partitioning, and recursion made me think differently about arrays. Initially, I had to slow down and really **feel the recursion**.

\`\`\`ts
function quicksort(arr: number[]): number[] {
  if (arr.length <= 1) return arr;

  const pivot = arr[arr.length - 1];
  const left: number[] = [];
  const right: number[] = [];

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] < pivot) left.push(arr[i]);
    else right.push(arr[i]);
  }

  return [...quicksort(left), pivot, ...quicksort(right)];
}
\`\`\`

Implementing it by hand helped me **see each step unfold**. Picking a pivot, partitioning the array, and combining results recursively felt like watching the algorithm in slow motion.

> **Pro tip:** Understanding the indices and pointers \`i\` \`left\` \`right\` is key. Drawing them out really clarifies what’s happening.

### My Takeaways

- **Visualization helps:** drawing the array and pivot movement clarified recursion.
- **Divide and conquer isn’t scary:** it’s just systematic problem breaking.
- **Code first, then optimize:** once I wrote a working solution, I could experiment with pivot strategies and in-place partitioning.

This experience made me more confident tackling not only sorting problems, but also **any problem that can be broken into subproblems**, which is a huge portion of algorithms in interviews and real-world coding.

I can now confidently approach problems like merge sort, quicksort, and binary search trees, and I understand the thought process behind why divide-and-conquer works so well.
        `,
    },
    {
        id: "express-prisma-postgres-setup",
        title: "Connecting Express to Prisma & Postgres",
        date: "2025-11-01",
        tags: ["backend", "express", "database"],
        excerpt: "How I structured my Express backend, set up Prisma with Postgres, and built clean services, controllers, and routes.",
        content: `
### Introduction

Recently, I built a backend using **Express**, **Postgres**, and **Prisma ORM** — and honestly, it was one of the most satisfying parts of my full-stack journey so far.

I always heard people say "just use Prisma, it's easy," but the magic clicked only when I actually connected everything myself. Creating the file structure, wiring controllers → services → Prisma, and watching real data flow from the database felt amazing.

This blog is my process, what I learned, and how I structured everything.

---

### Setting Up Prisma & the Project

I started with a simple Express project:

\`\`\`bash
npm init -y
npm install express prisma @prisma/client
npx prisma init
\`\`\`

Prisma created a \`schema.prisma\` file where I defined my first model:

\`\`\`prisma
model User {
    id        Int      @id @default(autoincrement())
    name      String
    email     String   @unique
    createdAt DateTime @default(now())
}
\`\`\`

Then I pushed it to my database:

\`\`\`bash
npx prisma migrate dev --name init
\`\`\`

At this point, Postgres had real tables, and Prisma generated a fully typed client. That part felt like magic — everything was suddenly strongly typed and auto-suggested in VS Code.

---

### Structuring My Express Backend

I decided on a clean structure early on:

\`\`\`
src/
    controllers/
    services/
    routes/
    prisma/
    index.ts
\`\`\`

This made everything feel modular instead of dumping all logic in one file.

- **Controllers** → handle requests & responses  
- **Services** → talk to Prisma and contain business logic  
- **Routes** → map HTTP endpoints  
- **Prisma client** → a single instance shared across the project  

My \`prisma.ts\` file looked like this:

\`\`\`ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
export default prisma;
\`\`\`

---

### Creating the Service Layer

The service layer was the first moment things "clicked."  
It felt clean, reusable, and easy to test.

\`\`\`ts
// services/userService.ts
import prisma from "../prisma/prisma";

export const getAllUsers = () => {
    return prisma.user.findMany();
};

export const createUser = (data: { name: string; email: string }) => {
    return prisma.user.create({ data });
};
\`\`\`

This file is where the real work happens — Prisma queries, validation, transformations, etc.

---

### Writing Controllers

Controllers sit between Express and the service layer:

\`\`\`ts
// controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getUsers = async (req: Request, res: Response) => {
    const users = await userService.getAllUsers();
    res.json(users);
};

export const addUser = async (req: Request, res: Response) => {
    const newUser = await userService.createUser(req.body);
    res.status(201).json(newUser);
};
\`\`\`

I liked this separation — controllers don't care *how* things work, just what they return.

---

### Connecting Routes

Finally, I created routes that map endpoints to controllers:

\`\`\`ts
// routes/userRoutes.ts
import { Router } from "express";
import { getUsers, addUser } from "../controllers/userController";

const router = Router();

router.get("/", getUsers);
router.post("/", addUser);

export default router;
\`\`\`

Then wired them up in \`index.ts\`:

\`\`\`ts
import express from "express";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
\`\`\`

---

### Seeing Data Flow

The moment I hit:

\`\`\`bash
curl http://localhost:3000/users
\`\`\`

…and saw Postgres data appear in the terminal?  
Peak developer joy.

Same with creating a new user:

\`\`\`bash
curl -X POST -H "Content-Type: application/json" \\
    -d '{"name":"Satoshi","email":"satoshi@example.com"}' \\
    http://localhost:3000/users
\`\`\`

It worked on the first try — which almost never happens.

---

### My Takeaways

- **Prisma makes the database feel approachable** — the type-safety and auto-complete are game-changing.  
- **File structure matters** — controllers/services/routes keep things clean and scalable.  
- **Small wins matter** — seeing your first query run successfully is incredibly motivating.  
- **Express + Prisma is a perfect starter backend** — simple, fast, and understandable.

Setting all this up helped me understand the *bigger picture* of backend architecture and made me feel more confident moving deeper into full-stack development.

And honestly? I can't wait to build more with it.
        `,
    },
    {
        id: "mastering-express-with-typescript",
        title: "How I Learned to Love Express, With TypeScript",
        date: "2025-11-30",
        tags: ["backend", "express", "typescript"],
        excerpt: "Breakdown of Express fundamentals, TypeScript integration, clean architecture, and how it seamlessly supports any React or Next.js app.",
        content: `
### Introduction

So lately, I’ve been going *deeper* into **Express**, and honestly?  
I started appreciating it way more once I stripped away all the extras — no Prisma, no Postgres, no noise.  
Just Express, TypeScript, and intentional structure.

It felt like learning the **language of the backend** for real.

I stopped thinking of Express as “just a simple server” and started seeing it as a flexible little engine that powers pretty much any front-end I throw at it — React, Next.js, mobile apps, whatever.

---

### Why TypeScript + Express Just Makes Sense

At first, I thought mixing TypeScript with Express would slow me down.  
But then it clicked:

\`Request\` and \`Response\` types help prevent dumb mistakes  
- autocompletion becomes your best friend  
- controller/service boundaries become *cleaner* because types move with your data  

It’s like Express grows up a bit when TypeScript enters the room.

So I made a simple project:

\`\`\`bash
npm init -y
npm install express cors
npm install -D typescript ts-node-dev @types/node @types/express
npx tsc --init
\`\`\`

Then I flipped the switch:

\`\`\`json
{
    "compilerOptions": {
    "target": "ES2020",
    "module": "CommonJS",
    "outDir": "dist",
    "rootDir": "src",
    "strict": true,
    "esModuleInterop": true
    }
}
\`\`\`

Instantly, everything felt *structured*.

---

### The Backend Structure That Just Works

I kept coming back to this layout because it scales without becoming a mess:

\`\`\`
src/
    controllers/
    services/
    routes/
    middleware/
    types/
    index.ts
\`\`\`

It’s simple but disciplined.

- **controllers** → entry point of your app logic  
- **services** → reusable business logic  
- **routes** → HTTP endpoints  
- **middleware** → auth, logs, etc  
- **types** → custom TS interfaces for your data  

This structure prevents everything ending up in \`index.ts\` like a doomed spaghetti experiment.

---

### Controllers: Where I Stopped Mixing Logic With Responses

A controller should *answer a request*, nothing more.

\`\`\`ts
// controllers/userController.ts
import { Request, Response } from "express";
import * as userService from "../services/userService";

export const getAllUsers = async (req: Request, res: Response) => {
    const users = await userService.fetchUsers();
    res.json(users);
};
\`\`\`

No database code, no validation logic.  
Just a simple bridge between Express and your service layer.

---

### Services: My Favorite Layer

Once I separated services, everything felt cleaner.

\`\`\`ts
// services/userService.ts
export const fetchUsers = async () => {
    return [
        { id: 1, name: "Satoshi" },
        { id: 2, name: "Ada" }
    ];
};
\`\`\`

The service layer is where the “thinking” happens.  
Validation, transformations, DB calls — all here.

---

### Routes: The Map of My API

\`\`\`ts
// routes/userRoutes.ts
import { Router } from "express";
import { getAllUsers } from "../controllers/userController";

const router = Router();

router.get("/", getAllUsers);

export default router;
\`\`\`

Simple. Readable. Scalable.

---

### The Index File: Where the Magic Starts

This is where I fixed the classic mistakes:

- forgetting \`express.json()\`  
- not configuring CORS  
- letting all routes live in \`index.ts\`  

\`\`\`ts
// index.ts
import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/users", userRoutes);

app.listen(3000, () => console.log("Server running on port 3000"));
\`\`\`

Adding \`express.json()\` feels like unlocking a secret door — suddenly your API accepts JSON like a civilized human.

---

### Why This Fits Perfectly With React or Next.js

React and Next love predictable, well-structured APIs.

When Express is modular and typed:

- fetching becomes dead simple  
- endpoints are obvious  
- refactoring doesn’t break everything  
- you get a clean division of responsibility  

React/Next asks → Express answers.  
Life is good.

---

### Common Mistakes I Stopped Making

- ❌ putting all logic in one file  
- ❌ forgetting \`express.json()\`  
- ❌ ignoring CORS  
- ❌ mixing DB logic in controllers  
- ❌ not typing request bodies  
- ❌ not using async/await everywhere  

Once I stopped doing these, everything felt cleaner.

---

### Tips I Wish Someone Told Me Earlier

- Middleware is your best friend  
- Type your request bodies  
- Group routes by domain  
- Let controllers stay simple  
- Put the complexity in services  
- Name your files clearly  
- Small files are good files  

---

### Final Thoughts

This Express + TypeScript phase felt like a real leveling-up moment.

It wasn’t flashy.  
It wasn’t trendy.  
Just clean architecture, clear boundaries, and this peaceful sense that everything is finally “in its place.”

Now Express feels like a quiet, dependable foundation under all my React and Next apps.

Honestly?  
That’s when you really *get* Express —  
when it disappears and simply supports your whole stack without getting in the way.
        `
    },
    {
        id: "learning-hash-tables",
        title: "Diving Into Hash Tables",
        date: "2025-12-01",
        tags: ["algorithms", "data-structures"],
        excerpt: "Understanding hash tables, how they work under the hood, and why they're so powerful in coding problems.",
        content: `
### Introduction

Today, I tackled **hash tables** after reading Chapter 5 of *Grokking Algorithms*. Honestly, I underestimated them at first. I thought I understood "key-value pairs," but seeing how they actually work in memory, with hashing functions and collision handling, was eye-opening.

Hash tables felt like the bridge between **thinking abstractly about data** and actually **building efficient solutions in code**.

> **Tip:** When learning hash tables, visualize both the keys and their hashed indices. It makes collisions and lookups way more concrete.

---

### Why Hash Tables Are Magic

Hash tables give us something almost unbelievable: **constant-time lookups** (O(1)) for many operations.  

In JavaScript, objects or \`Map\` are hash tables under the hood. When you do:

\`\`\`ts
const map = new Map();
map.set("name", "Satoshi");
map.get("name"); // "Satoshi"
\`\`\`

…you're really leveraging a clever hashing algorithm that maps \`"name"\` to a specific spot in memory. The key insight is that, instead of scanning a whole array, the hash function computes exactly where to go.

---

### My First Mental Hurdle: Collisions

A collision happens when two keys hash to the same index. At first, I thought: *"How is this even possible?"*  

Grokking explains **chaining** and **open addressing**. In JS terms:

- **Chaining:** store multiple values in an array at the same index  
- **Open addressing:** find the next free slot if a collision occurs  

Visualizing a small table on paper helped me **see collisions happen and get resolved**. It made hash tables less mysterious and more like a puzzle.

---

### Implementing a Simple Hash Table (Conceptually)

I tried coding a simple conceptual hash table in JS:

\`\`\`ts
class HashTable {
    buckets: Array<[string, any][]>;

    constructor(size = 50) {
        this.buckets = Array.from({ length: size }, () => []);
    }

    _hash(key: string) {
        let hash = 0;
        for (let char of key) {
            hash += char.charCodeAt(0);
        }
        return hash % this.buckets.length;
    }

    set(key: string, value: any) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let i = 0; i < bucket.length; i++) {
            if (bucket[i][0] === key) {
                bucket[i][1] = value;
                return;
            }
        }

        bucket.push([key, value]);
    }

    get(key: string) {
        const index = this._hash(key);
        const bucket = this.buckets[index];

        for (let [k, v] of bucket) {
            if (k === key) return v;
        }

        return undefined;
    }
}

const ht = new HashTable();
ht.set("name", "Satoshi");
ht.get("name"); // "Satoshi"
\`\`\`

It was humbling to **build something I usually just take for granted** in JS. Seeing collisions handled manually made me appreciate what JS does behind the scenes.

---

### Key Takeaways

- **Hashing is everywhere:** even simple objects in JS are using this.  
- **Collisions are real:** and handling them correctly is crucial for performance.  
- **Thinking in memory helps:** imagining indices and buckets is better than abstract definitions.  
- **Hash tables solve problems fast:** lookups, inserts, and deletions can all be near O(1).  

I also realized why many interview questions use hash tables: they let you solve problems like "two sum" or "first recurring character" efficiently without brute-force loops.

---

### Personal Reflection

Before today, I felt comfortable using \`Map\` and object literals.  
After today, I **understand the engine under the hood**. I know why it's fast, where collisions happen, and why hash functions matter.  

It's a small shift, but it changes the way I approach problems. I'm starting to think: *"Can I transform this problem into key-value lookups?"* It's empowering.

Hash tables aren't just data structures — they're a mindset shift for solving problems efficiently.

> Next step: explore sets, caching problems, and hash table interview questions to solidify this understanding.
        `,
    },
    {
        id: "my-project-workflow",
        title: "Starting and Maintaining Projects",
        date: "2025-12-04",
        tags: ["productivity", "workflow", "fullstack"],
        excerpt: "How I tackle new projects from idea to long-term maintenance, with tips from my own experiences.",
        content: `
### Introduction

Starting a new project is always this weird mix of excitement and terror. You have ideas bouncing around in your head, but where do you even begin? Over time, I have developed a little workflow that keeps me sane and actually makes building things fun.

It goes something like this: idea to stack to architecture to implementation to maintenance. Simple on paper, but each step has its own quirks and lessons.

---

### Step 1: Start With the Idea

Everything starts with a question I ask myself over and over: What problems do I want to solve? What can I build that I will actually want to maintain?

Here is the reality: a simple calculator website or a landing page for a company? Cool, sure. But I probably will not care about improving it after a week. There is no stretch, no what else can I do with this?

Now, something like a real-time chat system? That is different. I actually want to polish it, tweak it, make it look nice. Something I can imagine myself coming back to, month after month. You can check one of my deployed chat projects here: My Chatroom Website at https://trevs-portfolio.vercel.app/projects/1.

Pro tip: Pick ideas that make you excited to return. Your future self will thank you.

---

### Step 2: Pick Your Stack

Once the idea is locked, it is time to pick the stack. My choices usually come down to what I want to optimize:

- Fullstack apps: I lean towards Next.js with an Express backend.
- Frontend-heavy apps: Sometimes I go React plus Vite, especially if I want hot reloads and faster iteration.

Honestly, the stack is not the biggest deal. You can achieve the same results in multiple ways. What matters is what you are comfortable with. If you know it well, you move faster, hit fewer walls, and have more fun.

---

### Step 3: Architecture (Do Not Skip This)

Architecture is that boring-but-crucial step that separates a joyful project from a spaghetti nightmare.

- Backend: I love Domain-Driven Design, or simple layered structures like routes to services to controllers. Keeps things modular and testable.
- Frontend: DRY and SOLID principles are my lifelines. I try to atomize every component, making everything reusable. React really shines when you do this right.

Trust me: Spend time here. Nothing sucks more than returning to your project after a week only to find your clean code has turned into spaghetti.

---

### Step 4: Implementation (Time to Play)

This is the fun part. I usually swap between frontend and backend as I go:

- Build an API endpoint and immediately test it with Postman or the frontend.
- Let the frontend be the live tester for the backend. Instant feedback, instant gratification.
- Seeing a request hit your server and return the right data? Nothing beats that.

I also learned something important: do not be afraid to scrap things. If something is not fun or it is frustrating to build, tear it down and start fresh. I used to stubbornly stick to a plan just because I had begun it. Now I see that ditching bad code is a feature, not a bug.

---

### Step 5: Maintenance and Growth

Here is the part most people overlook: your project is not really done when it is working. It is only done when it is maintainable and fun to evolve.

Here is how I handle it:

1. Refactor as you go: Every time I open a project, I look for things that could be cleaner or more reusable. Tiny improvements stack up fast.
2. Incremental features: I add one thing at a time, polish it, then move on. Keeps the project manageable.
3. Document lightly: Even small comments or a mini-README save future me from headaches.
4. Motivation check: If I am not enjoying it, I pause or pivot. Life is too short for dead-end projects. Abandoning something does not mean failure. It means I am learning what excites me.
5. Test and monitor: Especially for APIs. I try to keep sanity checks or small automated tests in place so that as things grow, I do not accidentally break everything.

Pro tip: Treat maintenance as part of the journey, not an afterthought. The projects that last are the ones that are easy to return to and expand on.

---

### Final Thoughts

Starting a project is not just coding. It is a whole mindset:

- Pick ideas that excite you
- Choose a stack you are comfortable with
- Architect thoughtfully
- Implement iteratively, swapping between frontend and backend
- Maintain, polish, and evolve

I have found that when I follow this workflow, projects do not just work. They become things I genuinely enjoy coming back to.

Building projects is kind of like a long-term relationship with your code: invest care, iterate often, and it will grow into something really satisfying.
    `
    },
    {
        id: "using-data-structures-in-backend-apis",
        title: "Using Data Structures to Optimize Real Backend APIs",
        date: "2025-12-23",
        tags: ["backend", "algorithms", "data-structures", "express"],
        excerpt: "How classic data structures like hash tables show up in real Express APIs, and how thinking about them intentionally can make your backend faster and cleaner.",
        content: `
### Introduction

For a long time, I treated **data structures** as “interview-only knowledge.”

Hash tables? Cool for LeetCode.  
Big-O? Sure, important… somewhere else.

But while building backend APIs with **Express**, something clicked:  
I was already using data structures every day — I just wasn’t thinking about them *intentionally*.

This post is about that realization: how classic data structures (especially **hash tables**) show up in real backend APIs, and how using them *on purpose* can make your code faster, cleaner, and way more scalable.

---

### The Naive API (Where I Started)

Let’s say you have a simple Express endpoint:

\`\`\`ts
app.get("/users/:id", async (req, res) => {
    const users = await getAllUsersFromDB();
    const user = users.find(u => u.id === req.params.id);
    res.json(user);
});
\`\`\`

This works.  
It’s readable.  
And honestly? I wrote code like this *all the time* early on.

But look closely:
- Every request fetches **all users**
- Every request does a **linear search**
- Performance quietly gets worse as data grows

This is where data structures sneak in.

---

### Hash Tables Are Already Here (You Just Don’t Notice)

In JavaScript, objects and \`Map\` are **hash tables**.

That means this:

\`\`\`ts
const userMap = new Map<string, User>();
\`\`\`

isn’t some academic thing — it’s a **constant-time lookup machine**.

Instead of scanning arrays, you can do this:

\`\`\`ts
const userMap = new Map(users.map(user => [user.id, user]));
const user = userMap.get(req.params.id);
\`\`\`

Boom.  
O(1) lookups.

Same data.  
Different mindset.

---

### Real Example: Simple In-Memory Caching

This was my “ohhh” moment.

Imagine an expensive DB query:

\`\`\`ts
const cache = new Map<string, any>();

app.get("/users/:id", async (req, res) => {
    const id = req.params.id;

    if (cache.has(id)) {
        return res.json(cache.get(id));
    }

    const user = await prisma.user.findUnique({ where: { id } });
    cache.set(id, user);

    res.json(user);
});
\`\`\`

What’s happening here?

- \`Map\` = hash table
- Key = user ID
- Value = user data
- Lookup = **constant time**

Suddenly:
- Fewer DB hits
- Faster responses
- Less load overall

This is not theory — this is production behavior.

---

### Another One: Rate Limiting With a Map

Rate limiting used to sound scary to me.  
Turns out, it’s just… a hash table.

\`\`\`ts
const requests = new Map<string, number>();

app.use((req, res, next) => {
    const ip = req.ip;
    const count = requests.get(ip) || 0;

    if (count > 100) {
        return res.status(429).send("Too many requests");
    }

    requests.set(ip, count + 1);
    next();
});
\`\`\`

Again:
- Key → IP address
- Value → request count
- Fast lookups
- Simple logic

This is a classic interview problem — but it’s also very real backend code.

---

### Where Algorithms Actually Matter in APIs

Here’s what changed my thinking:

Algorithms aren’t about showing off.  
They’re about **avoiding unnecessary work**.

Some real examples:
- Hash tables → caching, deduplication, auth tokens
- Binary search → pagination, sorted queries
- Sets → uniqueness checks
- Queues → background jobs
- Divide & conquer → batching and chunking

You don’t need to force them.  
You just need to recognize when your code is *doing more work than necessary*.

---

### When NOT to Overthink It

Important lesson I learned the hard way:

> Don’t optimize before it hurts.

Sometimes:
- An array is fine
- A loop is fine
- Readability matters more

But once something runs:
- on every request
- inside middleware
- under load

That’s when data structures stop being “academic” and start being **tools**.

---

### My Biggest Takeaways

- **Hash tables are everywhere** in backend code  
- JavaScript already gives you powerful tools (\`Map\`, \`Set\`)  
- Performance problems often come from unnecessary repetition  
- Algorithms help you *remove work*, not add complexity  
- Thinking in data structures changes how you design APIs  

The biggest shift wasn’t learning new syntax — it was learning to ask:  
> “What am I repeatedly doing that I don’t need to?”

---

### Final Thoughts

Learning algorithms used to feel disconnected from real-world coding.

Now, every time I write an API, I catch myself thinking:
- Can I cache this?
- Can I avoid looping?
- Can I turn this into a lookup?

That’s when it all started to feel unified —  
CS fundamentals, backend architecture, and real applications all clicking together.

And honestly?  
That’s when coding started feeling *powerful*.
        `,
    },
    {
        id: "structuring-express-after-breaking-it",
        title: "How I Structure Express Apps After Breaking Them 3 Times",
        date: "2025-12-30",
        tags: ["backend", "express", "architecture"],
        excerpt: "After breaking my Express apps more times than I’d like to admit, this is the structure I finally landed on — and why it works.",
        content: `
### Introduction

I didn’t arrive at my Express project structure because I planned it perfectly.

I arrived there because I **broke my backend three different times**.

Each time, the app technically worked — until it didn’t.  
Adding features felt risky.  
Refactoring felt like pulling on a loose thread and hoping the sweater didn’t unravel.

This post is about what failed, what finally clicked, and the structure I now use that makes Express feel calm instead of fragile.

---

### The First Break: Everything in One File

My earliest Express apps looked like this:

\`\`\`ts
// index.ts
app.get("/users", async (req, res) => {
    // logic
});

app.post("/users", async (req, res) => {
    // more logic
});
\`\`\`

At first, this felt fast.  
No folders. No decisions. Just code.

But very quickly:
- the file grew
- logic duplicated
- scrolling replaced thinking
- changing one thing broke another

It worked — but only in the short term.

**Lesson:**  
Express lets you do this, but it doesn’t mean it’s sustainable.

---

### The Second Break: Fat Routes Everywhere

So I split things up.

\`\`\`
src/
    routes/
        users.ts
        posts.ts
\`\`\`

Better… but still messy.

\`\`\`ts
router.post("/", async (req, res) => {
    // validation
    // business logic
    // database calls
    // response formatting
});
\`\`\`

Routes started doing *everything*.

Soon:
- logic was hard to reuse
- testing was painful
- routes became mini-apps

**Lesson:**  
Routes should describe *where* requests go — not *how* things work.

---

### The Third Break: Controllers That Tried to Do Too Much

Next evolution: controllers.

Progress — but I still made them too powerful.

\`\`\`ts
export const createUser = async (req, res) => {
    // validation
    // rules
    // prisma queries
    // formatting
};
\`\`\`

Controllers became bloated.  
Refactoring hurt again.  
Everything felt tightly coupled.

**Lesson:**  
Controllers are not the brain of your app — they’re the bridge.

---

### The Structure I Finally Landed On

After breaking things enough times, this structure stuck:

\`\`\`
src/
    routes/
    controllers/
    services/
    middleware/
    prisma/
    types/
    index.ts
\`\`\`

Simple.  
Predictable.  
Scales without stress.

Each layer has **one responsibility**.

---

### Routes: Just the Map

Routes define *what exists*, nothing more.

\`\`\`ts
// routes/userRoutes.ts
router.get("/", getUsers);
router.post("/", createUser);
\`\`\`

No logic.  
No thinking.  
Just mapping URLs to controllers.

---

### Controllers: Request In, Response Out

Controllers are intentionally thin.

\`\`\`ts
// controllers/userController.ts
export const createUser = async (req: Request, res: Response) => {
    const user = await userService.createUser(req.body);
    res.status(201).json(user);
};
\`\`\`

They:
- read input
- call a service
- send output

If a controller feels complex, something is off.

---

### Services: Where the Thinking Lives

This is where everything clicked.

\`\`\`ts
// services/userService.ts
export const createUser = async (data: CreateUserDTO) => {
    if (!data.email) {
        throw new Error("Email is required");
    }

    return prisma.user.create({ data });
};
\`\`\`

Services:
- hold business logic
- talk to the database
- are reusable
- are testable

This is where complexity *belongs*.

---

### Middleware: Cross-Cutting Concerns

Auth.  
Logging.  
Rate limiting.  
Validation.

\`\`\`ts
app.use(authMiddleware);
\`\`\`

Middleware keeps this logic **out of your core app**, which massively improves clarity.

---

### Types: Quietly Saving Me From Myself

Adding a \`types/\` folder was a turning point.

\`\`\`ts
export interface CreateUserDTO {
    name: string;
    email: string;
}
\`\`\`

Types:
- move cleanly between layers
- document intent
- reduce runtime bugs
- make refactors safer

---

### Why This Structure Actually Scales

The biggest win wasn’t performance.

It was **confidence**.

I always know:
- where new code goes
- where bugs probably live
- what files I don’t need to touch

Adding features stopped feeling risky.

---

### Mistakes I No Longer Make

- ❌ business logic in routes  
- ❌ database calls in controllers  
- ❌ giant god files  
- ❌ duplicated logic  
- ❌ unclear responsibilities  

Each one cost me time before I learned the pattern.

---

### What I’d Tell My Past Self

- Structure early, refactor often  
- Thin controllers are a good sign  
- Services are worth the extra files  
- Small files beat clever abstractions  
- If it feels messy, it probably is  

---

### Final Thoughts

I used to think backend structure was overengineering.

Now I see it as friction removal.

Express didn’t change.  
I did.

Once I stopped fighting structure and started embracing it, Express stopped feeling fragile and started feeling dependable.

And honestly?  
That’s when building backends started feeling *fun* again.
        `,
    },
    {
        id: "nextjs-vs-express-backend",
        title: "Next.js vs Express: Where Backend Complexity Actually Belongs",
        date: "2026-1-14",
        tags: ["backend", "nextjs", "express", "architecture"],
        excerpt: "I used both Next.js and Express as backends — and learned they solve very different problems once your app starts growing.",
        content: `
### Introduction

At some point, every full-stack developer asks this question:

**“Should I use Next.js as my backend… or just build an Express API?”**

I’ve used both.  
I’ve shipped apps with both.  
And I’ve been confused by both — for very different reasons.

This post isn’t about which one is “better”.  
It’s about *what problem each one actually solves*, and why choosing the wrong one can quietly slow you down.

---

### When Next.js *Feels* Like the Obvious Choice

Next.js makes backend code feel effortless.

\`\`\`ts
// app/api/users/route.ts
export async function GET() {
    return Response.json({ users: [] });
}
\`\`\`

No server setup.  
No routing library.  
No boilerplate.

You already have:
- API routes
- middleware
- auth helpers
- environment config
- deployment handled

For small apps, this feels magical.

**Lesson:**  
Next.js lowers the barrier to shipping.

---

### Where That Magic Starts to Crack

The problems didn’t show up immediately.

They showed up when:
- logic grew
- endpoints multiplied
- features overlapped
- reuse became necessary

Suddenly:
- API routes duplicated logic
- business rules leaked into route files
- folders grew deep and unclear
- testing felt awkward

\`\`\`ts
// app/api/orders/route.ts
// validation
// business rules
// db access
// response formatting
\`\`\`

This felt familiar.

**Lesson:**  
Convenience scales until complexity arrives — then structure matters.

---

### Express Feels Slower… At First

Express never felt magical.

It felt manual.

\`\`\`ts
const app = express();
app.use(express.json());
app.use("/users", userRoutes);
\`\`\`

More files.  
More decisions.  
More setup.

But something interesting happened as the app grew.

Nothing fought me.

---

### Express Forces You to Be Honest About Architecture

Express doesn’t pretend to be your backend.

It *is* your backend.

You decide:
- where logic lives
- how layers communicate
- how things scale
- what gets reused

And because of that, patterns emerge naturally:

\`\`\`
routes → controllers → services → database
\`\`\`

No hidden magic.  
No framework opinions leaking into business logic.

**Lesson:**  
Express trades speed for clarity — and clarity compounds.

---

### Testing Was the Turning Point

Testing in Next.js backend routes always felt… off.

Mocking requests.  
Mocking responses.  
Mocking framework behavior.

In Express:
- services are pure logic
- controllers are thin
- routes are irrelevant to tests

\`\`\`ts
test("creates user", async () => {
    const user = await userService.createUser(data);
    expect(user.email).toBe(data.email);
});
\`\`\`

This changed how confident I felt shipping changes.

---

### Deployment Isn’t the Same Problem Anymore

This used to be a big argument *for* Next.js.

But today:
- Docker exists
- serverless exists
- managed hosts exist

Express isn’t hard to deploy anymore.

**Lesson:**  
Deployment convenience matters less than long-term maintainability.

---

### When I Choose Next.js as a Backend

I still use it, intentionally.

- small products
- MVPs
- internal tools
- apps with minimal business logic
- when frontend and backend are tightly coupled

If speed matters more than structure, Next.js wins.

---

### When I Choose Express

Express is my default when:
- the backend is its own product
- logic is complex
- multiple clients consume the API
- testing matters
- scaling is expected

It’s boring, in the best way.

---

### The Real Difference No One Mentions

This isn’t about frameworks.

It’s about **where complexity lives**.

Next.js hides it, until it doesn’t.  
Express exposes it, so you deal with it early.

---

### What I’d Tell My Past Self

- Don’t pick Next.js just because it’s convenient  
- Don’t avoid Express because it feels “old”  
- Backend clarity beats frontend convenience  
- Framework magic has a shelf life  
- Structure is not overengineering  

---

### Final Thoughts

Next.js is an incredible *product framework*.  
Express is a dependable *backend foundation*.

Once I stopped treating them as interchangeable, my apps got simpler — not more complex.

Choose the tool based on **where your complexity will live**, not how fast you can ship today.

That one decision saves months later.
        `,
    },

];

export default BLOGS;
