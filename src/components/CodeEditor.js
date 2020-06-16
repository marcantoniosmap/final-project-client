// import React, { useState, useEffect, useRef } from 'react';
// import MonacoEditor from 'react-monaco-editor';

// import ReconnectingWebSocket from 'reconnecting-websocket';
// import sharedb from 'sharedb/lib/client';

// const socket = new ReconnectingWebSocket('ws://localhost:9001');
// const connection = new sharedb.Connection(socket);

// const CodeEditor = ({ sandpack,project_id }) => {
//   // not sure if this is how to do it properly
//   const { files, openedPath } = sandpack;
//   // const [rdoc,setRdoc]=useState(null);
//   const editorRef = useRef();

//   // read more about react states
//   const languages = {
//     "html": "html",
//     "css": "css",
//     "js": "javascript",
//     "ts": "typescript",
//     "tsx": "typescript",
//     "json": "json",
//   };

//   const fileLanguage = (openedPath) => {
//     const file = (openedPath.replace('/', '').split('.').pop());
//     return languages[file];
//   };
//   const onChange = (newValue, e) => {
//     const pathFile = sandpack.openedPath;

//     // console.log(e.changes[0].range); contains columns and rows
//     const newText = e.changes[0].text;
//     const offset = e.changes[0].rangeOffset;
//     const length = e.changes[0].rangeLength;

//     // console.log(e);

//     var ops = null;

//     if (newText !== '') {
//       ops = [{ p: ['code', offset], si: newText }];
//     } else {
//       var deleted = files[openedPath].code.substring(offset, offset + length);
//       // ops = [{ p: [pathFile,'code', offset], sd: deleted }];
//       ops = [{ p: ['code', offset], sd: deleted }];
//     }

//     const doc = connection.get(project_id, openedPath);

//     doc.fetch(function(err){
//       if (err) throw err;
//     });

//     // submit change

//     doc.submitOp(ops, function(err) {
//       if (err) throw err;
//     });;

//     sandpack.updateFiles({
//       ...sandpack.files,
//       [pathFile]: {
//         code: newValue,
//       },
//     });
//   };

//   const editorDidMount = (editor, monaco) => {

//   };

//   const fileOpened = (files) => {
//     return files[openedPath].code;
//   };

//   useEffect(() => {
//     const doc = connection.get(project_id, openedPath);
//     console.log('BBB');
//     doc.subscribe();
//     doc.on('load', update);
//     doc.on('op', update);

//     function update() {
//       sandpack.updateFiles({
//         ...sandpack.files,
//         [doc.data.filename]: {
//           code: doc.data.code,
//         }
//       });
//     }
//   }, [openedPath]);


//   return (
//     <MonacoEditor
//       width="800"
//       height="100%"
//       language={fileLanguage(openedPath)}
//       theme="vs-dark"
//       value={fileOpened(files)}
//       onChange={onChange}
//       editorDidMount={editorDidMount}
//     />
//   );
// };

// export default CodeEditor;