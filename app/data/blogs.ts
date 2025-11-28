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
        date: "2025-11-27",
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
        date: "2025-11-27",
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
    }

];

export default BLOGS;
