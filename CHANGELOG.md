# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## Unreleased

### Added
- Add configurable deterministic auto-mode for survival, defence, eating, and restricted hunting (experimental)
- Add chat actions to enable, disable, and report auto-mode status

### Changed
- Massive refactoring of actions and skills for design consistency
- Extract domain logic incorrectly scattered in action into skills
- Move actions and messages mapping to conf/respond-to-message.json

### Fixed
- Fix player identity propagation to ChatGPT replies
- Pass the renamed reply confidence option to mineflayer-chatgpt

## 0.10.0 - 2026-08-23
### Added
- Initial version
