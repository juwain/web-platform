import { App } from "./index";
import * as espree from "espree";

const ast = espree.parse(App, { ecmaVersion: 6, sourceType: "module" });

describe("Задание 1", () => {
  test("Создана функция App", () => {
    expect(ast.type).toBe("Program");
    expect(ast.body[0].type).toBe("FunctionDeclaration");
    expect(ast.body[0].id.name).toBe("App");
  });

  test("Объявлена переменная result со значением 'test'", () => {
    expect(ast.body[0].body.body[0].type).toBe("VariableDeclaration");
    expect(ast.body[0].body.body[0].declarations[0].id.name).toBe("result");
    expect(ast.body[0].body.body[0].declarations[0].init.value).toBe("test");
  });

  test("Функция возвращает переменную result", () => {
    expect(ast.body[0].body.body[1].type).toBe("ReturnStatement");
    expect(ast.body[0].body.body[1].argument.name).toBe("result");
  });
});
