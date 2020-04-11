"use strict";

const Just = a => ({
    andThen: f => f(a),
    map: f => Just(f(a)),
    withDefault: () => a
});

const Nothing = () => ({
    andThen: () => Nothing(),
    map: () => Nothing(),
    withDefault: a => a
});

const Ok = a => ({
    andThen: f => f(a),
    map: f => Ok(f(a)),
    when: ({Ok: success}) => success(a),
    withDefault: () => a
});

const Err = a => ({
    andThen: () => Err(a),
    map: () => Err(a),
    when: ({Err: error}) => error(a),
    withDefault: b => b
});

const Task = a => ({
    andThen: b => Task(() => Promise.resolve(a()).then(c => b(c).perform())),
    map: f => Task(() => Promise.resolve(a()).then(f)),
    perform: () => Promise.resolve(a()),
    when: ({Ok: success, Err: error}) => Promise.resolve(a()).then(success)["catch"](error)
});

module.exports = {
    Maybe: {Just, Nothing},
    Result: {Err, Ok},
    Task: {Task}
};
