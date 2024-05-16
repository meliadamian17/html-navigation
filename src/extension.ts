import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  console.log('HTML Navigation Extension activated');

  const jumpToNextAttribute = vscode.commands.registerCommand('extension.jumpToNextAttribute', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const position = editor.selection.active;

      console.log('Jump to Next Attribute command triggered at position:', position.character);

      const text = document.getText(new vscode.Range(position, document.lineAt(position.line).range.end));
      const match = text.match(/(\s+\w+=)/);
      if (match) {
        const newPosition = position.translate(0, match.index! + match[0].length);
        console.log('Calculated new position for Next Attribute:', newPosition.character);
        editor.selection = new vscode.Selection(newPosition, newPosition);
        editor.revealRange(new vscode.Range(newPosition, newPosition));
      } else {
        console.log('No attribute found on this line.');
      }
    } else {
      console.log('No active editor found.');
    }
  });

  const jumpToContent = vscode.commands.registerCommand('extension.jumpToContent', () => {
    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const document = editor.document;
      const position = editor.selection.active;

      console.log('Jump to Content command triggered at position:', position.character);

      const text = document.getText(new vscode.Range(position, document.lineAt(position.line).range.end));
      const match = text.match(/>/);
      if (match) {
        const newPosition = position.translate(0, match.index! + 1);
        console.log('Calculated new position for Content:', newPosition.character);
        editor.selection = new vscode.Selection(newPosition, newPosition);
        editor.revealRange(new vscode.Range(newPosition, newPosition));
      } else {
        console.log('No closing tag found on this line.');
      }
    } else {
      console.log('No active editor found.');
    }
  });

  context.subscriptions.push(jumpToNextAttribute);
  context.subscriptions.push(jumpToContent);
}

export function deactivate() {
  console.log('HTML Navigation Extension deactivated');
}
