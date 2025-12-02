export interface BlogPost {
    id: string;        // used in URL: /blogs/[id]
    title: string;     // blog title
    date: string;      // publish date
    excerpt: string;   // short description for blog list
    content: string;   // full content for the dynamic page
}

const BLOGS: BlogPost[] = [
    {
        id: "grokking-dnc-algorithms",
        title: "Learning Divide & Conquer Algorithms",
        date: "2025-08-27",
        excerpt: "My journey understanding divide-and-conquer through Grokking Algorithms and hands-on coding.",
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
        excerpt: "My personal breakdown of Express fundamentals, TypeScript integration, clean architecture, and how it seamlessly supports any React or Next.js app.",
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
        excerpt: "My journey understanding hash tables, how they work under the hood, and why they're so powerful in coding problems.",
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
    }
];

export default BLOGS;
