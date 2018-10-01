# React Admin Dashboard - mmCMS Demo
React Admin Dashboard - mmCMS Demo, is a ReactJS admin app built on top of an [mmCMS demo API project](https://github.com/thtg88/mmcms-demo-api).
This project was bootstrapped with [CoreUI React](https://github.com/coreui/coreui-free-react-admin-template) on top of [Create React App](https://github.com/facebook/create-react-app).
You can find the app in action [here](https://mmcms.marco-marassi.com).

## Table of Contents

* [Installation](#installation)
* [Basic Usage](#basic-usage)
* [Build](#build)
* [Technologies Used](#technologies-used)
* [Versioning](#versioning)
* [License](#license)

## Installation

``` bash
# clone the repo
$ git clone https://github.com/thtg88/mmcms-demo-react-admin.git my-project

# go into app's directory
$ cd my-project

# install app's dependencies
$ npm install
```
In order for your mmCMS REST API to work you have to create a .env file containing a variable pointing to the base URL of your API e.g. ```REACT_APP_API_BASE_URL=https://api.domain.com/v1```


## Basic usage

``` bash
# dev server with hot module replacement at http://localhost:3000
$ npm start
```

Navigate to [http://localhost:3000](http://localhost:3000). The app will automatically reload if you change any of the source files.

mmCMS Admin supports saving the Redux state on local storage. To enable that, add the following to your .env file ```REACT_APP_STATE_DRIVER=localStorage```

## Build

Run `build` to build the project. The build artifacts will be stored in the `build/` directory.

```bash
# build for production with minification
$ npm run build
```

## Technologies Used
- mmCMS Demo API
- ES6+
- [Bootstrap](https://getbootstrap.com/)
- [FontAwesome Icons](https://fontawesome.com/v4.7.0/icons/)
- [Google ReCaptcha v2](https://www.google.com/recaptcha) with [react-google-recaptcha](https://github.com/dozoisch/react-google-recaptcha)
- JSX
- [React](https://reactjs.org/)
    - [Core UI Free React Admin Template](https://coreui.io/react/)
    - [Create React App](https://github.com/facebook/create-react-app)
    - [Error Boundaries](https://reactjs.org/docs/error-boundaries.html)
    - [PropTypes](https://www.npmjs.com/package/prop-types)
    - [React Router](https://www.npmjs.com/package/react-router)
- [Redux](https://redux.js.org/)
    - [Redux-Saga](https://redux-saga.js.org/)
- [Sentry](https://sentry.io)
- [Webpack Hot Module Replacement](https://webpack.js.org/concepts/hot-module-replacement/)

## Versioning

mmCMS Admin is maintained under [the Semantic Versioning guidelines](http://semver.org/).

See the [change-log](https://github.com/thtg88/mmcms-admin/blob/master/CHANGELOG.md) of the project for changelogs for each release version.

## License

Code released under [the MIT license](LICENSE).
