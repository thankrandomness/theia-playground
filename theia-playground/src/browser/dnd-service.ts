import { injectable, postConstruct, inject } from 'inversify';
import { FrontendApplicationContribution } from '@theia/core/lib/browser';
import { EditorManager, EditorWidget } from '@theia/editor/lib/browser'
import { DisposableCollection, Disposable } from '@theia/core';
import { MonacoEditor } from '@theia/monaco/lib/browser/monaco-editor';

@injectable()
export class DnDService implements FrontendApplicationContribution {

    @inject(EditorManager)
    protected editorManager: EditorManager;

    @postConstruct()
    protected init() {
    }

    onStart() {
        this.editorManager.onActiveEditorChanged(e => this.handleActiveEditorChanged(e))
    }

    protected lastDroptTargetPosition: monaco.Position | undefined;
    protected activeEditorDisposable = new DisposableCollection();
    protected handleActiveEditorChanged(editorWidget: EditorWidget | undefined) {
        if (editorWidget) {
            this.activeEditorDisposable.dispose();
        }
        const monacoEditor = MonacoEditor.get(editorWidget);
        if (monacoEditor) {
            const node = monacoEditor.getControl().getDomNode();
            const _ondragover = node.ondragover;
            node.ondragover = event => {
                event.preventDefault();
                const target = monacoEditor.getControl().getTargetAtClientPoint(event.clientX, event.clientY);
                if (target) {
                    const position = target.position;
                    // test with previous position
                    // update drop target decorations
                    this.lastDroptTargetPosition = position;
                }
            };
            const _ondrop = node.ondrop;
            node.ondrop = event => {
                event.preventDefault();
                const position = this.lastDroptTargetPosition;
                if (!position) {
                    return;
                }
                const range = new monaco.Range(position.lineNumber, position.column, position.lineNumber, position.column);
                const text = this.getText();
                if (!text) {
                    return;
                }
                monacoEditor.getControl().getModel().applyEdits([{ text, range }])
            };
            this.activeEditorDisposable.push(Disposable.create(() => {
                this.lastDroptTargetPosition = undefined;
            }));
            this.activeEditorDisposable.push(Disposable.create(() => {
                node.ondrop = _ondrop;
                node.ondragover = _ondragover;
            }));
            monacoEditor.onDispose(() => this.activeEditorDisposable.dispose());
        }
    }

    protected id: string | undefined;
    dragStart(id: string) {
        this.id = id;
    }

    dragEnd(id: string) {
        // todo: clear decorations
    }

    protected getText() {
        // todo: compute text to be inserted based on id of the selection (draggable)
        return this.id;
    }

}