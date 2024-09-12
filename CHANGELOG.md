# 0.10.0

- Port to TypeScript and split into multiple files.
- Includes models for date and time intervals and dictionary inputs.
- Add pre-commit build pipeline to run eslint and prettier, compile TypeScript, run tests, and add compiled JS and type definitions to commit.
  - Has to be enabled locally by setting `hooksPath = ./githooks` in your local `.git/config` [core] section and possibly setting `githooks/pre-commit` to executable.
- Add a webpacked version of distributable for standalone use or environments that do not work well with es modules like jest.
- Fix weeks not being used in timedelta decontruction.
- Fix timedelta string representation when longer than one day and add tests.
- Fix a test that would fail in some daylight savings time countries due to extra hour.

# 0.9.1

- fix incorrect repo url in package.json

# 0.9.0

- switch from requires to import for the d3.timeFormat dependency; bumping
  version just in the off-chance this causes explodes

# 0.8.4

- when converting a UTC datetime to string, respect the utc setting
  (previously ended up with local timezone)

# 0.8.3

- add .toJSON functions to all datetime objects so that JSON.stringify would
  convert respective datetime/date/time/timedelta to its string representation
  rather than an object. preferable as is more standard that a deserialized
  object

# 0.8.0

Reckon this one needs some sort of changelog entry.
When datetime is in UTC the strftime now returns the correct UTC representation
instead of reverting back to local timezone.
If your code relies on the previous interpretation, you can just wrap the utc
date in a new datetime object and lose the utc flag, like this:

```
- utc_dt.strftime
+ dt.datetime(utc_dt).strtfime
```
