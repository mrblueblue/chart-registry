import tape from "tape";
import createContext from "../src";

tape("Chart Registry", assert => {
  assert.plan(1);
  const context = createContext();
  assert.equal(typeof context.registry, "object");
});
