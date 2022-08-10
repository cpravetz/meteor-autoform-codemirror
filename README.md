autoform-codemirror
========

A text editor for autoform using CodeMirror


Usage
-----

Add a custom template in your Schema

```
Schemas.myCode = new SimpleSchema({
  title: {
    type: String
  },
  functionText: {
    type: String,
    autoform: {
      type: 'code'
	  
    }
  }
});
```
