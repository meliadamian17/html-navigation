import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(
    vscode.commands.registerCommand('extension.jumpToNextAttribute', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const position = editor.selection.active;

        // Debug log
        console.log('Jump to Next Attribute command triggered');

        const text = document.getText(new vscode.Range(position, document.lineAt(position.line).range.end));
        const match = text.match(/(\s+\w+=)/);
        if (match) {
          const newPosition = position.translate(0, match.index! + match[0].length);
          editor.selection = new vscode.Selection(newPosition, newPosition);
          editor.revealRange(new vscode.Range(newPosition, newPosition));
        } else {
          console.log('No attribute found on this line.');
        }
      } else {
        console.log('No active editor found.');
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('extension.jumpToContent', () => {
      const editor = vscode.window.activeTextEditor;
      if (editor) {
        const document = editor.document;
        const position = editor.selection.active;

        // Debug log
        console.log('Jump to Content command triggered');

        const text = document.getText(new vscode.Range(position, document.lineAt(position.line).range.end));
        const match = text.match(/>/);
        if (match) {
          const newPosition = position.translate(0, match.index! + 1);
          editor.selection = new vscode.Selection(newPosition, newPosition);
          editor.revealRange(new vscode.Range(newPosition, newPosition));
        } else {
          console.log('No closing tag found on this line.');
        }
      } else {
        console.log('No active editor found.');
      }
    })
  );
}

export function deactivate() {}
