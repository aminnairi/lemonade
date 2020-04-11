"use strict";

const Just = a => ({
    map: f => Just(f(a)),
    andThen: f => f(a),
    withDefault: () => a
});

const Nothing = () => ({
    map: () => Nothing(),
    andThen: () => Nothing(),
    withDefault: a => a
});

const Ok = a => ({
    map: f => Ok(f(a)),
    andThen: f => f(a),
    when: ({ Ok }) => Ok(a),
    withDefault: () => a
});

const Err = a => ({
    map: () => Err(a),
    andThen: () => Err(a),
    when: ({ Err }) => Err(a),
    withDefault: a => a
});

const Task = (a) => ({
    map: f => Task(() => Promise.resolve(a()).then(f)),
    andThen: b => Task(() => Promise.resolve(a()).then(a => b(a).perform())),
    perform: () => Promise.resolve(a()),
    when: ({ Ok, Err }) => Promise.resolve(a()).then(Ok).catch(Err)
});

module.exports = {
    Task: { Task },
    Maybe: { Just, Nothing },
    Result: { Err, Ok }
};
