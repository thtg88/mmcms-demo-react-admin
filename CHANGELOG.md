# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/) (or at least it tries to).

## [Unreleased]
### Added
- Error Boundary
- Google ReCaptcha for user registration
- React Toastify to provide notification capabilities
- Sentry for error tracking
- Terms and conditions of use
- Yup schema validation for form validation
### Changed
- CRUD components to container of Vanilla components, providing props about fields and paths
### Fixed
- Redirect to login if unauthenticated
### Removed
- Cards as messages (replace with toaster notification)

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
