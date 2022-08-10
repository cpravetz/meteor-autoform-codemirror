import { javascript } from "@codemirror/lang-javascript";
import {keymap, highlightSpecialChars, drawSelection, highlightActiveLine, dropCursor,
        rectangularSelection, crosshairCursor,
        lineNumbers, highlightActiveLineGutter, EditorView } from "@codemirror/view";
import {Extension, EditorState} from "@codemirror/state";
import {defaultHighlightStyle, syntaxHighlighting, indentOnInput, bracketMatching,
        foldGutter, foldKeymap} from "@codemirror/language";
import {defaultKeymap, history, historyKeymap} from "@codemirror/commands";
import {searchKeymap} from "@codemirror/search";
import {autocompletion, completionKeymap, closeBrackets, closeBracketsKeymap} from "@codemirror/autocomplete";
import {lintKeymap} from "@codemirror/lint";

const defaultConfig =  [lineNumbers(),
                        highlightActiveLineGutter(),
                        highlightSpecialChars(),
                        history(),
                        foldGutter(),
                        drawSelection(),
                        dropCursor(),
                        EditorState.allowMultipleSelections.of(true),
                        indentOnInput(),
                        syntaxHighlighting(defaultHighlightStyle, { fallback: true }),
                        bracketMatching(),
                        closeBrackets(),
                        autocompletion(),
                        rectangularSelection(),
                        crosshairCursor(),
                        highlightActiveLine(),
                        javascript(),
                        keymap.of([
                            ...closeBracketsKeymap,
                            ...defaultKeymap,
                            ...searchKeymap,
                            ...historyKeymap,
                            ...foldKeymap,
                            ...completionKeymap,
                            ...lintKeymap
                        ])];


Template.afMirror.onRendered(function() {
    var self = this;
    var extensions = self.data.atts.extensions || defaultConfig;
    Template.currentData().value = Template.currentData().value || '';
    var parent;
    if (this.divId) {
        parent = document.getElementById("group-"+this.divId)
    } else {
        parent = document.body
    }
    if (self.editor === undefined) {
        self.editor = new EditorView({doc: Template.currentData().value, extensions: extensions, parent: parent });
    }
    this.autorun(function() {
        self.editor.dispatch({changes: {from: 0, to: self.editor.state.doc.length, insert: Template.currentData().value}});
    });

});

Template.afMirror.helpers({
    id: function() {
        Template.instance().divId = Template.instance().divId || Math.random().toString(36).substring(7);
        return Template.instance().divId;
    }
});


AutoForm.addInputType("code", {
    template: "afMirror",
    valueOut: function() {
        return document.getElementById(this.divId).value;
    }
});
