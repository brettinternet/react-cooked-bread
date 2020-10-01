# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.6.0](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.5.0...react-cooked-bread@0.6.0) (2020-10-01)


### Bug Fixes

* incorrect behavior when `maxToasts` <= 0 ([0bf73cb](https://github.com/brettinternet/react-cooked-bread/commit/0bf73cb94942e8cdb72f53675f80653980507b7f))


### Features

* combine useRef and useEffect to safely access `toasts` without causing infinite renders ([ab21063](https://github.com/brettinternet/react-cooked-bread/commit/ab21063fa6199912a5240a861cf59d35ac6fbe71))
* wrap functions in useCallback and use function `setState` to prevent including toasts in deps ([4444f80](https://github.com/brettinternet/react-cooked-bread/commit/4444f80be085beef4a1181dca87e2ac7b6c80a6e))





# [0.5.0](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.4.0...react-cooked-bread@0.5.0) (2020-09-30)


### Bug Fixes

* incorrect behavior when `maxToasts` <= 0 ([0bf73cb](https://github.com/brettinternet/react-cooked-bread/commit/0bf73cb94942e8cdb72f53675f80653980507b7f))


### Features

* wrap functions in useCallback and use function `setState` to prevent including toasts in deps ([4444f80](https://github.com/brettinternet/react-cooked-bread/commit/4444f80be085beef4a1181dca87e2ac7b6c80a6e))





# [0.4.0](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.3.2...react-cooked-bread@0.4.0) (2020-08-12)


### Bug Fixes

* minor css improvements, export new components ([6a7fa83](https://github.com/brettinternet/react-cooked-bread/commit/6a7fa83f313ae720c92acfa9926e8d19f23b0026))
* missing classnames and styler spreads, improve code style ([04d741b](https://github.com/brettinternet/react-cooked-bread/commit/04d741b2ca302083067fbafb150720d58479a060))
* mobile styles for toast content widths ([caf01b4](https://github.com/brettinternet/react-cooked-bread/commit/caf01b4794002cb1702697434228384f640bee61))
* remove overflow hidden on toast root components ([0d66e29](https://github.com/brettinternet/react-cooked-bread/commit/0d66e2920825b395d3b39edafb1594b9908d91f3))


### Features

* add new toast content for similar feel to docs site ([ce281d4](https://github.com/brettinternet/react-cooked-bread/commit/ce281d4a054821a4abd5cc59bd8df8a6fde1661c))
* add new toast root slide-slide ([3aeb8aa](https://github.com/brettinternet/react-cooked-bread/commit/3aeb8aa6f04fd9cdbae0e7440c3d2cd5a5a96427))
* pass index, reverse-column, item hover state and toasts down to toast components ([8561a18](https://github.com/brettinternet/react-cooked-bread/commit/8561a1871dfdee92cd511598837cc4b963fbca6a))
* **zeit.tsx:** add new toast content component ([8272f50](https://github.com/brettinternet/react-cooked-bread/commit/8272f50060c5f591c1c7111c1514e4a0f04bfb2f))
* provide container hover status to toast components ([eff9da3](https://github.com/brettinternet/react-cooked-bread/commit/eff9da3d88df7b6a97d4336848397537c7d80f06))





## [0.3.2](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.3.1...react-cooked-bread@0.3.2) (2020-08-11)


### Bug Fixes

* **types:** change context prop method types to interface to allow declaration merging ([d692dc7](https://github.com/brettinternet/react-cooked-bread/commit/d692dc7a1b1282ecc506f31720707a82458b2e84))





## [0.3.1](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.3.0...react-cooked-bread@0.3.1) (2020-08-11)


### Bug Fixes

* only set proptypes on library components when node env is not production ([b1d86ea](https://github.com/brettinternet/react-cooked-bread/commit/b1d86ea71b1afde3bff652cdd5930ee4f2f22250))





# [0.3.0](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.2.0...react-cooked-bread@0.3.0) (2020-08-06)


### Bug Fixes

* hoc component display name and static hoisting, add error handling for dev mode ([ac5f4a1](https://github.com/brettinternet/react-cooked-bread/commit/ac5f4a18d7b1c2fe96317d636d665285a91ca78e))
* scroll bar appearing for bottom center toasts ([62df51a](https://github.com/brettinternet/react-cooked-bread/commit/62df51a0d0ff3992b630bcc383d4efc529c652c5))


### Features

* add fade toast root option, add self-contained styles for components, clean up code style ([2977785](https://github.com/brettinternet/react-cooked-bread/commit/2977785e1ba0fdfe35c140709862a89027f70701))
* add maxToasts, pauseOnFocusLoss, reverseColumn ([e278bcb](https://github.com/brettinternet/react-cooked-bread/commit/e278bcb6a1bf36aeb010f938a7c0e3849859cb18))
* add new dependencies ([d5ea7e3](https://github.com/brettinternet/react-cooked-bread/commit/d5ea7e3f1a3ca4d84186568372d42261b9f04b32))
* add timer update method, transition duration helper, display name helper ([ac5e05d](https://github.com/brettinternet/react-cooked-bread/commit/ac5e05dab5821494fe957877f68272e2507d7c6f))
* add unique toast content components based on separate styles and presentation ([e16e217](https://github.com/brettinternet/react-cooked-bread/commit/e16e2171f6ced27df70ce6a843b42126c8dca113))
* update exports with recent changes, add toast types for toast content and root improvements ([85223dc](https://github.com/brettinternet/react-cooked-bread/commit/85223dcb1f61e12686db62b4fcb9036081fd6394))
* update toast fn can now update the toast timeout as long as it is unique ([2724f4d](https://github.com/brettinternet/react-cooked-bread/commit/2724f4dad9e4f4a9e1a7d2c7acc9eb585f3e7e46))


### BREAKING CHANGES

* There is no longer a DefaultToastRoot because we have now name
* Default props applied to toasts and passed to the provider have been renamed to
match the prop option provided to toast context props. Toast root and content styles have been
separated into two separate props passed to the provider component. `addToast` now returns a string
that is always defined. Toast options for toast creation and updates have properties that have been
renamed and some props have been added to support some custom toast content components.
`TransitionDuration` has been added as a toast option to override the Transition Group timeout prop.





# [0.2.0](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.1.15...react-cooked-bread@0.2.0) (2020-07-31)

### Bug Fixes

- add roles and aria-labels for accessibility improvements ([ea30b68](https://github.com/brettinternet/react-cooked-bread/commit/ea30b68e833eeded8b74fd17217bfdfd41ef8bde))

### Features

- add recursion so the id cannot be undefined in the addToast return ([3ebd0a1](https://github.com/brettinternet/react-cooked-bread/commit/3ebd0a1ccaabc3316fe8969ae976310e8924a859))
- **context:** create props for higher-order component consumer ([e52c610](https://github.com/brettinternet/react-cooked-bread/commit/e52c61072647450c45cb80c824f34f77614adf4c))

## [0.1.15](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.1.13...react-cooked-bread@0.1.15) (2020-07-28)

**Note:** Version bump only for package react-cooked-bread

## [0.1.14](https://github.com/brettinternet/react-cooked-bread/compare/react-cooked-bread@0.1.13...react-cooked-bread@0.1.14) (2020-07-28)

### Bug Fixes

- make react, react-dom and prop-types peer dependencies where hooks are supported ([d650613](https://github.com/brettinternet/react-cooked-bread/commit/d650613138eff0dff7662ed262a7aa8bc0c6c10c))
- versioning and CI enhancements
