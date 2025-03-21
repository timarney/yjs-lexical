import { Hono } from "hono";
import { renderer } from "./renderer";
import { TodoList } from "./client";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<TodoList />);
});

export default app;
