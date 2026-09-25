# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## 1.0.0 - 2026-09-25
### Added
- Add configurable deterministic auto-mode for survival, defence, eating, and restricted hunting (experimental)
- Add chat actions to enable, disable, and report auto-mode status
- Add `chatgpt_minimum_jailbreak_confidence_score` configuration property

### Changed
- Massive refactoring of actions and skills for design consistency
- Extract domain logic incorrectly scattered in action into skills
- Move actions and messages mapping to conf/respond-to-message.json
- Rename `chatgpt_minimum_confidence_score` to `chatgpt_minimum_reply_confidence_score`

### Fixed
- Fix player identity propagation to ChatGPT replies
- Pass the renamed reply confidence option to mineflayer-chatgpt

## 0.10.0 - 2026-08-23
### Added
- Initial version
