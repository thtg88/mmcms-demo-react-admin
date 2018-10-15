# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/) (or at least it tries to).

## [Unreleased]
### Added
- Responsive layout for resources index
- Terms and conditions of use
- Yup schema validation for form validation
### Changed
- Upgrade to FontAwesome Icons v5

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
