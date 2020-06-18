import React, { useState, useEffect, useRef } from 'react';
import MonacoEditor from 'react-monaco-editor';

import ReconnectingWebSocket from 'reconnecting-websocket';
import sharedb from 'sharedb/lib/client';

const socket = new ReconnectingWebSocket('wss://collab.cogether.me');
const connection = new sharedb.Connection(socket);

const CodeEditor = ({ sandpack, project_id }) => {
  // not sure if this is how to do it properly
  const { files, openedPath } = sandpack;
  const my_editor = connection.get('cogether', project_id);
  // my_editor.subscribe()

  // read more about react states
  const languages = {
    "html": "html",
    "css": "css",
    "js": "javascript",
    "ts": "typescript",
    "tsx": "typescript",
    "json": "json",
    "vue": "vue",
  };

  const fileLanguage = (openedPath) => {
    const file = (openedPath.replace('/', '').split('.').pop());
    return languages[file];
  };
  const onChange = (newValue, e) => {
    const newText = e.changes[0].text;
    const offset = e.changes[0].rangeOffset;
    const length = e.changes[0].rangeLength;


    // console.log(e);
    var ops = null;

    // find openedPath index
    var file_idx = -1;
    for (var i = 0; i < my_editor.data[0]['file_idx'].length; i++) {
      if (openedPath === my_editor.data[0]['file_idx'][i]) {
        file_idx = i;
        break;
      }
    }
    console.log('FILE INDEX CHANGED', file_idx);

    if (newText !== '') {
      ops = [{ p: [ 0, 'code', file_idx, offset], si: newText }];
    } else {
      var deleted = files[openedPath].code.substring(offset, offset + length);
      // ops = [{ p: [pathFile,'code', offset], sd: deleted }];
      ops = [{ p: [ 0, 'code', file_idx, offset], sd: deleted }];
    }

    // SUBMIT CHANGES
    my_editor.submitOp(ops, function(err) {
      if (err) throw err;
    });

    sandpack.updateFiles({
      ...sandpack.files,
      [openedPath]: {
        code: newValue,
      },
    });
  };

  const editorDidMount = (editor, monaco) => {
    my_editor.subscribe();
    console.log(my_editor);
    my_editor.on('load', update);
    my_editor.on('op', update);
  };

  function update() {
    console.log(my_editor.data);
    var new_data = transformJson(my_editor.data);
    console.log(new_data);
    sandpack.updateFiles({
      ...new_data,
    });
    function transformJson(content) {
      var dic = {};
      for (var i = 0; i < content[0]['file_idx'].length; i++) {
        dic[content[0]['file_idx'][i]] = { "code": content[0]['code'][i] };
      }
      return dic;
    }
  };

  const fileOpened = (files) => {
    return files[openedPath].code;
  };

  useEffect(() => {
  });


  return (
    <MonacoEditor
      width="800"
      height="100%"
      language={fileLanguage(openedPath)}
      theme="vs-dark"
      value={fileOpened(files)}
      onChange={onChange}
      editorDidMount={editorDidMount}
    />
  );
};

export default CodeEditor;