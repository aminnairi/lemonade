# :lemon: lemonade

Node.js implementation of some monads found in Elm.

## :package: Requirements

- [Node.js](https://nodejs.org/en/)

## :arrow_down: Installation

```console
$ npm install aminnairi/lemonade
```

## :sparkles: Examples

### :thinking: Maybe

```javascript
const { Maybe: { Nothing, Just } } = require("@aminnairi/lemonade");

const divide = (a, b) => b === 0 ? Nothing() : Just(a / b);

const goodDivision = divide(1, 2)
    .map(x => x + 1)
    .andThen(x => divide(x, 2))
    .map(x => x + 1)
    .withDefault(0);

const badDivision = divide(1, 0)
    .map(x => x + 1)
    .andThen(x => divide(x, 2))
    .map(x => x + 1)
    .withDefault(0);

const anotherBadDivision = divide(1, 2)
    .map(x => x + 1)
    .andThen(x => divide(x, 0))
    .map(x => x + 1)
    .withDefault(0);

console.log(goodDivision);          // 1.75
console.log(badDivision);           // 0
console.log(anotherBadDivision);    // 0
```

### :ok_hand: Result

```javascript
const { Result: { Ok, Err } } = require("@aminnairi/lemonade");

const divide = (a, b) => b === 0 ? Err("division by zero") : Ok(a / b);

divide(1, 2)
    .map(x => x + 1)
    .andThen(x => divide(x, 2))
    .map(x => x + 1)
    .when({ Ok: console.log, Err: console.error })
    // 1.75

divide(1, 2)
    .map(x => x + 1)
    .andThen(x => divide(x, 0))
    .map(x => x + 1)
    .when({ Ok: console.log, Err: console.error })
    // division by zero

divide(1, 0)
    .map(x => x + 1)
    .andThen(x => divide(x, 0))
    .map(x => x + 1)
    .when({ Ok: console.log, Err: console.error })
    // division by zero

divide(1, 0)
    .map(x => x + 1)
    .andThen(x => divide(x, 0))
    .map(x => x + 1)
    .withDefault(-1);
    // -1
```

### :construction_worker: Task

```javascript
const { Task: { Task } } = require("@aminnairi/lemonade");

Task(() => fetch("https://jsonplaceholder.typicode.com/users/1"))
    .map(response => response.json())
    .andThen(({ id }) => Task(() => fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)))
    .map(response => response.json())
    .map(([ post ]) => post.title)
    .when({ Ok: console.log, Err: console.error })
    // sunt aut facere repellat provident occaecati excepturi optio reprehenderit

Task(() => "Hello")
    .map(string => string + " world")
    .andThen((string) => Task(() => string + "!"))
    .when({ Ok: console.log, Err: console.error });
    // "Hello world!"

Task(() => "Hello")
    .map(string => string + " world")
    .andThen(string => Task(() => string + "!"))
    .perform();
    // Promise { <pending> }

Task(() => 1)
    .fork([
        task => task.map(x => x + 1).when({Err: console.error, Ok: console.log}),
        task => task.map(x => x + 2).when({Err: console.error, Ok: console.log})
    ])
    .when({Err: console.error, Ok: console.log});
```
