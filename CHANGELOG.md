# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/) (or at least it tries to).

## [Unreleased]
### Added
- Terms and conditions of use
### Fixed
- Selection of role for user

## [0.26.0] - 2020-05-21
### Added
- Ability to set whether or not a model can be restored via schema
- Ability to set whether or not a model can be updated via schema
- Dynamic `PivotTabComponent`
### Changed
- General improvements
### Fixed
- `value` setting on Edit HOCs when `select` type
### Removed
- Unused redux state

## [0.25.0] - 2020-05-10
### Added
- Recovery resource for all entities

## [0.24.2] - 2020-05-10
### Changed
- Improved boolean handling in forms

## [0.24.1] - 2020-05-10
### Fixed
- `getFormResourceValues` general improvements

## [0.24.0] - 2020-05-08
### Added
- Content Fields scaffold
### Fixed
- Fixed `base_route` label in `contentModels` schema

## [0.23.0] - 2020-04-25
### Added
- Content Models scaffold

## [0.22.0] - 2020-04-20
### Added
- Content Types scaffold

## [0.21.1] - 2020-04-20
### Removed
- PHPloy configuration

## [0.21.0] - 2020-04-19
### Added
- Content Migration Methods scaffold

## [0.20.1] - 2020-04-19
### Added
- Ability to lazy load additional reducers and sagas in HOCs

## [0.20.0] - 2020-04-19
### Changed
- General bug fixes and improvements

## [0.19.1] - 2019-08-14
### Added
- Usage of React Redux's useSelector hook in certain components
### Changed
- Dependencies Major version upgrades

## [0.19.0] - 2019-08-11
### Added
- CKEditor ImageBrowser support
- New Toast notifications support
- URL helpers
- withUpdateFormSchema HOC unifies common functionality of withCreateResource and withEditResource HOCs
### Changed
- Decreased number of props passed directly to Resources components
- Dependencies major versions upgrade
- General improvements
- Improved Helmet support
- Moved API messages helpers to dedicated module
- Moved mostly Redux handling to base handlers
- Re-structured Redux handlers
### Fixed
- General bug fixes
- Header dropdown styling
### Removed
- HMR from index

## [0.18.1] - 2019-03-16
### Fixed
- pageSize import in Edit components

## [0.18.0] - 2019-03-16
### Changed
- Folder re-structure

## [0.17.4] - 2019-02-10
- General code improvements

## [0.17.3] - 2019-01-20
### Changed
- Style improvements

## [0.17.2] - 2019-01-20
### Fixed
- Profile form

## [0.17.1] - 2019-01-20
### Changed
- General improvements to edit resource HOC
- General improvements to list resource HOC

## [0.17.0] - 2019-01-19
### Added
- Netlify redirects config
### Changed
- General bug fixes and improvements
### Removed
- Bitbucket pipeline config

## [0.16.0] - 2018-11-29
## Added
- Redux-saga code splitting - async sagas loading

## [0.15.5] - 2018-11-29
### Added
- Top logo link component

## [0.15.4] - 2018-11-27
### Removed
- Unusued redux-saga

## [0.15.3] - 2018-11-25
### Removed
- Unused icons set import

## [0.15.2] - 2018-11-25
### Changed
- General bug fixes and improvements

## [0.15.1] - 2018-11-25
### Changed
- Guest component is now functional
- Restricted component is now functional
### Fixed
- Guest component behaviour
- Restricted component behaviour

## [0.15.0] - 2018-11-25
### Added
- Redux code splitting - async reducer loading

## [0.14.1] - 2018-11-22
### Fixed
- Test issues

## [0.14.0] - 2018-11-18
### Added
- Route-based code splitting with React lazy and Suspense
### Removed
- React Loadable dependency

## [0.13.2] - 2018-11-18
### Changed
- Lifecycle methods of CRUD resources are now dealt by HOCs

## [0.13.1] - 2018-11-10
### Added
- Bitbucket pipeline setup

## [0.13.0] - 2018-11-02
### Added
- Disable ability of deletion of resource via props

## [0.12.2] - 2018-10-22
### Fixed
- Class title conflicting with existing CoreUI's
- Spinner not disappearing on edit resource form if error occurred

## [0.12.1] - 2018-10-18
### Changed
- Profile update to new layout

## [0.12.0] - 2018-10-18
### Added
- Animated background loading state with placeholder shimmer (Facebook style) for CRUD resources

## [0.11.1] - 2018-10-18
### Fixed
- CRUD module title on small screens
- List layout on small screens

## [0.11.0] - 2018-10-17
### Added
- Responsive layout for resources index

## [0.10.0] - 2018-10-16
### Added
- Yup schema validation for CRUD form validation

## [0.9.1] - 2018-10-15
### Changed
- Search is handled from props so it can appear in URL query

## [0.9.0] - 2018-10-14
### Changed
- CRUD components to container of Vanilla functional components

## [0.8.4] - 2018-10-14
### Changed
- Additional re-factoring of Redux code

## [0.8.3] - 2018-10-14
### Changed
- Re-factoring of Redux code

## [0.8.2] - 2018-10-14
### Changed
- react-scripts to version 2
- scripts in composer.json to match SCSS transpiling out of the box with new react-scripts and node-sass
- SCSS structure to match SCSS transpiling out of the box with new react-scripts and node-sass
- Service Worker configuration

## [0.8.1] - 2018-10-13
### Fixed
- Tests of Redux connected components

## [0.8.0] - 2018-10-13
### Added
- React Toastify to provide notification capabilities
### Removed
- Cards as messages (replace with toaster notification) for API resource CRUD success

## [0.7.6] - 2018-10-03
### Fixed
- Fetch after creation of resource

## [0.7.5] - 2018-10-03
### Changed
- Apply logged out state to profile when unauthenticated message is returned from API
- Reload profile if page is refreshed

## [0.7.4] - 2018-10-03
### Changed
- After resource gets updated, update resources variable if in store so that there's no data inconsistency

## [0.7.3] - 2018-10-03
### Fixed
- Various bug fixes

## [0.7.2] - 2018-10-01
### Changed
- Google ReCaptcha to be optional
- Sentry integration to be optional

## [0.7.1] - 2018-10-01
### Added
- .htaccess to enable gzip compression

## [0.7.0] - 2018-10-01
### Added
- Sentry for error tracking
### Removed
- Errors introduced purposely to test Error Boundary in production

## [0.6.0] - 2018-10-01
### Added
- Error Boundary
- Errors to Register and Profile component to demonstrate Error Boundary in production

## [0.5.2] - 2018-10-01
### Fixed
- Google ReCaptcha styling

## [0.5.1] - 2018-09-30
### Fixed
- Alert cleared throwing an error for after deletion
- Roles search does not need to be submitted twice anymore

## [0.5.0] - 2018-09-30
### Added
- Google ReCaptcha for user registration
### Changed
- Login form now has Sign up link

## [0.4.1] - 2018-09-30
## Changed
- Redirect to login if unauthenticated
- When unmounting list of resources that have been searched, clear resources in global store so that a re-fetch is needed next time I visit the component
### Fixed
- Search roles now stop redirecting to users screen

## [0.4.0] - 2018-09-26
### Added
- PropTypes for functional components
- README

## [0.3.1] - 2018-09-26
### Fixed
- Pagination on multiples of 10 resources
- Downgraded query-string package to version 5.1.1 to support compilation of package code to ES5

## [0.3.0] - 2018-09-26
### Added
- Module search functionality

## [0.2.0] - 2018-09-25
### Added
- Destroy resources

## [0.1.0] - 2018-09-23
### Added
- First release of mmCMS admin frontend. Can login, register, logout, update profile, CRU users and roles.
