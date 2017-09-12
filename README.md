# react-testing-fundamentals

Bugs that make it into production cost 10x more to resolve than if they were caught in development, thats why if you are developing a any kind of serious app it is essential to create a robust, stable and timely test suite. A well written test suite can also double as feature documentation and [B|T|R]?DD helps establish deliverables before embarking on the development journey.

When starting out with testing there can be a lot of confusion about the “right” way to test your components. What parts of my component should I test? What is the best way to test async calls? Should you test props? State? Styles/Layout? are all questions that have plagued me at some point.

The amount of benefit I've seen by moving to a faster test suite is one of the most important productivity benefits you can earn, simply because it impacts iteration feedback cycles, time to deploy, developer happiness, and inertia. Throw money at the problem: servers are cheap, developers are not.

We can make good tests run fast but we can't make fast tests be good.

## Testing React Components

When you test React components, it is good to think about it from an outsider’s perspective, is this detail important, or is it only an internal concern? Can the effect of this internal detail be described using only the component’s public API?

Elements that contribute to a components contract:

- What it renders (which may be nothing)
- Conditional Props
- State / updating state
- Test user events
- Test the response to those events
- Make sure the right things render at the right time
- Component behavior when the user interacts with it (via clicking, dragging, keyboard input, etc)
- What the component does when you call methods on its instance (public ref interface)
- Side effects that occur as part of the component life cycle (componentDidMount, componentWillUnmount, etc)

## Types of testing

A strong test suite is made up of multiple layers. Each layer should be able to be executed independently and deliver useful feedback when failure occurs.

- **Unit tests** ensure that individual components of the app work as expected. Assertions test the component API. (Real-time Developer Feedback)
  - Shallow mount with enzyme
  - Snapshot testing (Golden Master Testing)
- **Integration (module) tests** ensure that component collaborations work as expected. Assertions may test component API, UI, or side-effects (such as async I/O, logging, etc…)
  - Mount with enzyme
- **Functional tests** ensure that the app works as expected from the user’s perspective. Assertions primarily test the user interface.
  - Nightwatch
- **Visual regression** compare images to prevent visual regression and validate layout
  - Happo
  - Phantom CSS

## Creating a test plan

The first step to TDD is understanding a component’s contract. A contract defines the expected behavior of your component and what assumptions are reasonable to have about its usage this arguably is the most important part of testing.

A common pattern when using mocha is to place the component path in the initial describe block and then often every thing is lumped in the initial describe for the component with no further separation.

Utilising describe blocks can help to make you test more organised and act as better documentation. A simple definition is “describes” are meant to explain conditions, where “it” is used to explain the expected output.

What we also do is to group the main “describes” by some sort of context, which usually looks something like this:
- **describe('life-cycle')** - contains tests related to react life cycle functions
- **describe('callbacks')** - contains everything related to callback functions and interactions
- **describe('rendering')** - contains everything related to rendered output

For example, the main describe “Core::Buttons::LinkButton” might be useful to “uniquely” identify this specific test in the test runner output. Fortunately with Jest (and probably with other test runners as well) this is not necessary anymore. Jest groups all tests by their filenames. If a test fails you will then get the “path” to the failed assertion, as well as a lot of useful information. That’s one of the things I love the most about Jest, they really did an amazing job.

When writing an test case be as specific as possible in the description ensure to capture the business logic so the spec documents the features

## What’s in a good unit test

Focus on writing test that matter and capture the essence of the component. That is write tests that validate behaviors and business requirements rather than testing markup and rendering of generic elements.

Testing is more important than linting and static analysis and a strong test suite can drastically reduce the cost of delivering new features allowing developers to move fast without introducing bugs.

All good test cases should adhere to the following rules, tests should be:

- **Isolated** - all interactions with external services are mocked and should not rely on pre conditions within the test environment
- **Specific** - a small change in functionality should return a specific failure message (single assert per case)
- **Focused on intent** - A test should describe what the system does not how so that you can easily refactor

### Questions that a good test should answer

- What were you testing?
- What should it do?
- What was the output (actual behavior)?
- What was the expected output (expected behavior)?
- Asserting `equal()`, by nature answers the two most important questions every unit test must answer (expected and actual)

````javascript
/**
  * Poor test case
  *
  * The following example is not specific and is likely to return false positives
  * as it asserting is too generic and does not out line the behavior of the component
  * rather make assumptions about markup / implementation.
  *
  */

it("should render two links", () => {
  const { cart } = setup();
  expect(cart.find(Link)).to.have.length(2);
});

/**
  * Improved test cases
  *
  * The following example focus on documenting specific behaviors of a component with
  * splitting the assertion across multiple test cases helps provided targeted failure
  * messages when functionality is changed.
  *
  * Asserting with equal will be more informative on failure as it will provide details on the
  * actual and expected values that are relevant to the scenario rather than being abstracted to
  * a length
  *
  */

it("should link to the checkout page", () => {
  const { checkoutLink } = setup();
  expect(checkoutLink.getAttribute("href")).to.equal("/checkout");
});

it("should link to the buy more page", () => {
  const { buyMoreLink } = setup();
  expect(buyMoreLink.getAttribute("href")).to.equal("/buy-more");
});
````

### What makes a bad test case

- Duplicating exactly the application code? This will make it brittle.
- Assertions in the test duplicate any behavior that is already covered by (and the responsibility of) library code?

## Snapshot testing

### The Good

- Snapshot Dumb components
- Snapshot redux standard actions
- Excellent for testing legacy code (stable code that you don't want to change)

### The bad

- No TDD,
- Merge Conflicts (High Failure Rate)
- Overuse
- Human Intervention required to validate (anti-pattern known as Guru Checks Output)

Tip with snapshots: You can force the snapshot order yourself if you need to by numbering them, this can make them easier to browse;

## Functional Testing

...

## Code Coverage Metrics

- Don't be fooled 100% Coverage !== 0% Bugs
- Visual Code coverage helps you Identify areas of code that haven’t been tested
- If you mount a component (especially one higher up the tree) Coverage will look great but chances are it will be misleading

## Tips

- Make abstractions for common assertions but don't make them flexible keep it simple
- Isolate your selectors from classes that are used for styling use a data tag instead
- Keep you selectors dry and use a test factory / page object to return elements

```
const setup = (propOverrides = {}) => {
  const props = {
    ...{ someProp: true},
    ...propOverrides
  };

  const wrapper = shallow(<YourComponent {...props}>);

  return {
    props,
    wrapper,
    someElement: () => wrapper.find("[data-id='someElement']")
  }
}

it("test case", () => {
	const { wrapper, someElement } = setup({ anotherProp: 10 })
});
```

## Utils

- Jest
- Mocha
- Enzyme
- Sinon
- Nock

Unit -> shallow()
Module -> mount()

## References

- https://medium.com/selleo/testing-react-components-best-practices-2f77ac302d12
- https://medium.com/javascript-scene/what-every-unit-test-needs-f6cd34d9836d
- https://www.sitepoint.com/javascript-testing-unit-functional-integration/
- http://tom.preston-werner.com/2010/08/23/readme-driven-development.html
- http://wiki.c2.com/?GuruChecksOutput
- https://www.youtube.com/watch?v=sCbGfi40IWk
