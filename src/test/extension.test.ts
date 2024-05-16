import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
  vscode.window.showInformationMessage('Start all tests.');

  test('Jump to Next Attribute Command', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div class="test" id="test-id"></div>',
      language: 'html',
    });
    await vscode.window.showTextDocument(document);

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = new vscode.Position(0, 5); // Position after <div
      editor.selection = new vscode.Selection(position, position);
      console.log('Initial position for Jump to Next Attribute:', editor.selection.active.character);

      await vscode.commands.executeCommand('extension.jumpToNextAttribute');
      const newPosition = editor.selection.active;
      console.log('New position for Jump to Next Attribute:', newPosition.character);

      assert.strictEqual(newPosition.character, 12); // Expected position after class=
    }
  });

  test('Jump to Content Command', async () => {
    const document = await vscode.workspace.openTextDocument({
      content: '<div class="test" id="test-id"></div>',
      language: 'html',
    });
    await vscode.window.showTextDocument(document);

    const editor = vscode.window.activeTextEditor;
    if (editor) {
      const position = new vscode.Position(0, 28); // Position after id=
      editor.selection = new vscode.Selection(position, position);
      console.log('Initial position for Jump to Content:', editor.selection.active.character);

      await vscode.commands.executeCommand('extension.jumpToContent');
      const newPosition = editor.selection.active;
      console.log('New position for Jump to Content:', newPosition.character);

      assert.strictEqual(newPosition.character, 30); // Expected position inside <div>
    }
  });
});
