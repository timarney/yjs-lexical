import { Hono } from "hono";
import { renderer } from "./renderer";
import { Todos } from "./Todos";

const app = new Hono();

app.use(renderer);

app.get("/", (c) => {
  return c.render(<Todos />);
});

export default app;
