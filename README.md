# Notifier for React

![GitHub](https://img.shields.io/cirrus/github/dage459/notifier/master)
![Version](https://img.shields.io/github/package-json/v/dage459/notifier)
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
import App from "./components/App";
import Notifier from "./notifier/Notifier";

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

// test the notifier
export default () => {
  // initialize hook
  const notifier = useNotification();
  const [inputVal, setInputVal] = React.useState(""); // only needet for testing

  const handleNewNotifier = () => {
    notifier({
      type: "INFO",
      message: inputVal,
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
  - No problem! Just do this.

---

## Support

Reach out to me at one of the following places!

- Website at <a href="https://github.com/dage459/notifier.git" target="_blank">`dave-db.com`</a>

---

## License

![LICENCE](https://img.shields.io/github/license/davedb459/davedb-app)

- **[Apache license](http://www.apache.org/licenses/LICENSE-2.0)**
- Copyright 2020 © <a href="https://github.com/dage459/notifier.git" target="_blank">@dage</a>.
