import * as vscode from "vscode";
import { parse, HTMLElement } from "node-html-parser";
import * as fs from "fs";
import * as path from "path";

const getChildrenClassNames = (
  element: HTMLElement,
  baseClassName: string
): string[] => {
  const children = element.querySelectorAll("*");
  const classNames = children.flatMap((child) => {
    const classAttribute = child.getAttribute("class");
    if (!classAttribute) {
      return [];
    }

    return classAttribute
      .split(" ")
      .filter((className) => className.startsWith(baseClassName));
  });

  return Array.from(new Set(classNames));
};

const generateScss = (classNames: string[], baseClassName: string): string => {
  const lines = [`.${baseClassName} {`];
  const directChildren = classNames.filter(
    (className) => !className.includes("--") && className.includes("__")
  );
  console.log(`directChildren: ${directChildren}`);

  directChildren.forEach((childClassName) => {
    const childName = childClassName.slice(baseClassName.length);
    lines.push(`  &${childName} {`);
    lines.push("    // TODO: Add styles");
    console.log(`childClassName: ${childClassName}`);
    const grandChildren = classNames.filter((className) =>
      className.startsWith(`${childClassName}--`)
    );

    console.log(grandChildren.length);
    grandChildren.forEach((grandChildClassName) => {
      const grandChildName = grandChildClassName.slice(childClassName.length);
      lines.push(`    &${grandChildName} {`);
      lines.push("      // TODO: Add styles");
      lines.push("    }");
    });

    lines.push("  }");
  });

  lines.push("}");
  return lines.join("\n");
};

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand(
    "extension.generate-scss",
    async () => {
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showErrorMessage("No active editor found");
        return;
      }

      const document = editor.document;
      const baseClassName = await vscode.window.showInputBox({
        prompt: "Enter base class name for SCSS Generation",
        placeHolder: "someBaseClass",
      });

      if (!baseClassName) {
        vscode.window.showErrorMessage("No base class name provided");
        return;
      }

      const html = document.getText();
      const root = parse(html);
      const classNames = getChildrenClassNames(root, baseClassName);
      const scss = generateScss(classNames, baseClassName);

      const fileURI = await vscode.window.showOpenDialog({
        canSelectMany: false,
        openLabel: "Select SCSS file",
        filters: {
          scssFiles: ["scss"],
        },
      });

      if (!fileURI) {
        vscode.window.showErrorMessage("No SCSS file selected");
        return;
      }

      const filePath = fileURI[0].fsPath;
      fs.appendFileSync(filePath, `\n\n${scss}`);

      vscode.window.showInformationMessage(
        "SCSS generated and appended to selected file"
      );
    }
  );

  context.subscriptions.push(disposable);
}

export function deactivate() {}
