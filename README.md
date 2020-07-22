# react-cooked-bread <sup>toasts!</sup>

> I f\*ing love toast, what absolute genius took a bite of bread and was like "cook it again", unreal - [Josh](https://twitter.com/LoserCrew/status/1039294149667770368?s=20)

Cooked bread <sup>(...toast)</sup> is a notification popup. Use our styles, customize yours, or bring your own custom components. We'll toast it for you.

[Demo]()

## Install

```sh
npm i --save react-cooked-bread
```

## Customize

> Small notification windows slide upward into view, [like toast popping out of a toaster](https://en.wikipedia.org/wiki/Pop-up_notification)

Add toppings the way you like it!

### API

This is a brief overview. See the demo for more examples.

1. Add your `ToastProvider` to a toplevel position in your app component tree. Pass props or use the defaults.
1. Create toasts with the `useToasts` hook, the `ToastConsumer`, or the `withToastContext` HOC.

#### Setup

##### `ToastProvider` Props

These props may be passed to `ToastProvider` to customize the library.

##### `Toast` Props

If you create your own custom `<Toast />` component, here are the props provided to your component:

#### Create toasts

##### `useToasts` Hook (recommended)

```js
const { addToast } = useToasts()

useEffect(() => {
  if (error) {
    addToast(error.message, {
      type: 'error',
    })
  }
}, [error, addToast])
```

##### `ToastConsumer` Functional Component or `withToastContext` Higher-Order Component

### Extend

Perhaps most commonly, you'll want to use your own component.

```js
<ToastProvider container={MySpecialOverlay} toast={MyCustomMessageBox}>
```

### Custom styles

You may also choose to use the default components and modify the default styles.

#### Classes

There are only two components rendered to the DOM. The first is the container that holds all the toasts in an absolute position over the viewport. Next is the toast component which is made up of just a few elements. Here they are:

```
.react-cooked-bread__container
  .react-cooked-bread__toast__root
    .react-cooked-bread__toast__icon-wrapper
      .react-cooked-bread__toast__countdown
      .react-cooked-bread__toast__icon
    .react-cooked-bread__toast__content
    .react-cooked-bread__toast__dismiss-button
```

#### Stylers (recommended)

This library uses [Emotion](https://github.com/emotion-js/emotion) CSS-in-JS. We can assign styles in two ways: (a) with style objects, or (b) with functions that return style objects. The functions have arguments with values relevant to the component.

##### (a) Style object

With a `React.CSSProperties` style object:

```js
<ToastProvider
  containerStyles={{
    padding: '1rem'
  }}
  toastStyles={{
    rootOuter: {
      backgroundColor: 'hotpink'
    },
    content: {
      color: 'dodgerblue'
    }
  }}
>
```

##### (b) Style function

Or a function that receives an argument with props for that components, that returns a `React.CSSProperties` style object:

```js
<ToastProvider
  containerStyles={({ hasToasts }) => ({
    backgroundColor: hasToasts ? 'hotpink' : 'transparent'
  })}
  toastStyles={{
    rootOuter: ({ type }) => ({
      backgroundColor: type === 'error' ? 'tomato' : 'mediumseagreen'
    }),
    content: {
      color: 'dodgerblue'
    }
  }}
>
```

Then, `Emotion` creates those styles into a CSS class assigned to the element.

## Develop

```sh
npm install
```

## Contributors

Forked from `react-toast-notifications`. Contributions are welcome.
