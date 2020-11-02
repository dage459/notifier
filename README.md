# Notifier for React

![Size](https://img.shields.io/github/repo-size/dage459/notifier)
![Activity](https://img.shields.io/github/release-date/dage459/notifier)
![Activity](https://img.shields.io/github/last-commit/dage459/notifier)
![Downloads](https://img.shields.io/github/downloads/dage459/notifier/total)

> Simple Notifier for React

## Usage

> First: install uuid

```javascript
npm install uuid
```

> Second: rap your React "App" Component with the notifier Provider in index.js

```javascript
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import Notifier from "./components/notifier/Notifier";

ReactDOM.render(
  <Notifier>
    <App />
  </Notifier>,
  document.getElementById("root")
);
```

> Third: Import notifier Hook where ever u will use it

```javascript
import React from "react";
import { useNotifier } from "../notifier/Notifier";

// test the notifier in a component
export default () => {
  const notifier = useNotifier(); // initialize the notifier hook
  const [inputVal, setInputVal] = React.useState(""); // only needet for testing

  const handleNewNotifier = () => {
    notifier({
      type: "INFO", // Available types => "INFO", "SUCCESS", "WARNING", "ERROR", "DARK", "DEFAULT"
      message: inputVal, // changeable to any value you will use
    });
  };

  return (
    <div>
      <input
        type="text"
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
      <button onClick={handleNewNotifier}>Add Notification</button>
    </div>
  );
};
```

> Possible notifier "types"

| Severity | Color    | type    |
| -------- | -------- | ------- |
| default  | white    | ----    |
| info     | blue     | INFO    |
| success  | green    | SUCCESS |
| warning  | orange   | WARNING |
| error    | red      | ERROR   |
| dark     | darkgrey | DARK    |

> The durration time is changeable in "Notifier.js" at "handleStartNotifier" funcion

```javascript
const handleStartNotifier = () => {
  const id = setInterval(() => {
    setWidth((prev) => {
      if (prev < 100) {
        return prev + 0.5;
      }
      clearInterval(id);
      return prev;
    });
  }, 22); // <-- Durationtime for Display the Notifier
  setIntervalID(id);
};
```

## FAQ

- **How do I do _specifically_ so and so?**
  - No problem! Just play with it.

---

## License

![LICENCE](https://img.shields.io/github/license/dave459/notifier)

- **[Apache license](http://www.apache.org/licenses/LICENSE-2.0)**
- Copyright 2020 © <a href="https://github.com/dage459/notifier.git" target="_blank">@dage</a>.
