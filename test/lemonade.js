"use strict";

const {describe, it} = require("mocha");
const {expect} = require("chai");
const {Maybe: {Just, Nothing}, Result: {Err, Ok}, Task: {Task}} = require("../lemonade.js");

describe("lemonade.js", () => {
    describe("Maybe", () => {
        describe("Just", () => {
            it("should map the function correctly", done => {
                Just(1).map(() => done()).withDefault(0);
            });

            it("should map the Just correctly", done => {
                Just(1).andThen(() => Just(done())).withDefault(0);
            });

            it("should return the value correctly", () => {
                expect(Just(1).withDefault(0)).to.equal(1);
            });
        });

        describe("Nothing", () => {
            it("should return the default value correctly", () => {
                expect(Nothing().map(x => x + 1).andThen(x => Just(x + 1)).withDefault(0)).to.equal(0);
            });
        });
    });

    describe("Result", () => {
        describe("Ok", () => {
            it("should map the function correctly", done => {
                Ok(1).map(() => done());
            });

            it("should map the Ok function correctly", done => {
                Ok(1).andThen(() => Ok(done()));
            });

            it("should return the value", () => {
                expect(Ok(1).withDefault(0)).to.equal(1);
            });

            it("should call the Ok function correctly", done => {
                Ok(1).when({Err: x => x, Ok: () => done()});
            });
        });

        describe("Err", () => {
            it("should return the default value", () => {
                expect(Err("error").map(x => x + 1).andThen(x => Ok(x + 1)).withDefault("default")).to.equal("default");
            });

            it("should call the Err function correctly", done => {
                Err("error").when({Err: () => done(), Ok: x => x});
            });
        });
    });

    describe("Task", () => {
        it("should map the function correctly", done => {
            Task(() => 1).map(() => done()).perform();
        });

        it("should map the Task correctly", done => {
            Task(() => 1).andThen(() => Task(() => done())).perform();
        });

        it("should call the Ok function correctly", done => {
            Task(() => 1).when({Err: x => x, Ok: () => done()});
        });

        it("should call the Err function correctly", done => {
            Task(() => Promise.reject(new Error("incorrect"))).when({Err: () => done(), Ok: x => x});
        });

        it("should fork the task", done => {
            Task(() => 1).fork([task => task.map(x => x + 1).when({Err: x => x, Ok: () => done()})]);
        });
    });
});
