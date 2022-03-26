// index.d.ts
declare namespace Client {
  interface User {
    id: string;
    name: string;
  }

  type Reaction = "thumbsUp" | "hooray" | "heart" | "rocket" | "eyes";

  interface Post {
    id: string;
    date: string;
    title: string;
    content: string;
    user: string;
    reactions: Record<Reaction, number>;
  }

  interface InitialPost {
    title: string;
    content: string;
    user: string;
  }
}
