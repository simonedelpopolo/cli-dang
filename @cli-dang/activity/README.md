# @cli-dang/activity

___

###### Module activity wraps and extends [ process.exit, process.stderr.write, console.trace ]

___

## Index of Contents

___

- [Description](#description)
- [Installation](#installation)
- [API](#api)
  - [@cli-dang/activity](#cli-dangactivity-1)
    - [@cli-dang/activity.trace()](#cli-dangactivitytrace--)
- [JetBrains OSS Licence](#jetbrains-oss-license)

___

## Description

___

**_@cli-dang/activity_** is a module wrapper for:

- `process.stderr.write()`
- `process.exit()`
- `console.trace()`

It gives to these methods new functionalities.  
Basically, its main usage is to print on the console, errors,
inspect variables and exit the process passing some useful info before printing to stderr the error

___

## Installation

___

```shell
npm install @cli-dang/activity
```

___

## API

### @cli-dang/activity
___

#### @cli-dang/activity.trace()

`exports`

> **_@cli-dang/activity.trace_options_** ➡ _sets the trace function behaviour_.

```javascript
import { trace_options, trace } from '@cli-dang/activity'
/* we shut down console.trace and we return a node:util.inspect Object */

trace_options.mute = true
console.log(await trace([data, {...'string'}]))
```

> **_@cli-dang/activity.trace()_** ➡ AsyncFunction<prints **|** string>

```javascript
import { trace } from '@cli-dang/activity'

await trace([data, {...'string'}])
```

___

## JetBrains OSS License

___

I want to thank JetBrains to grant me the Open Source Software license for all their products. This opportunity gives me
strength to keep on going with my studies and personal project.  
To learn more about this opportunity, have a look
at [Licenses for Open Source Development - Community Support](https://www.jetbrains.com/community/opensource/).

_Thank you_