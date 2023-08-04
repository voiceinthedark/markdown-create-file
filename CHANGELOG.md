# Change Log

All notable changes to the "markdown-create-file" extension will be documented in this file.

## [Unreleased]

- Initial release

## [0.5.0] 2023-08-04
- Added Yaml front-matter config file parsing
The extension will search for a file called `markdown-blog.yaml` and will parse the front-matter from it. The file needs to be in a correct yaml format.
  
### [0.5.1] 2023-08-04
- Fixed issue with userinput containing spaces
- Fixed issue with user input not ending with a `.md`

### [0.5.2] 2023-08-04
- Fixed datetime formatting

### [0.5.3] 2023-08-04
- Changed user prompt to be more explanatory

### [0.6.0] 2023-08-04
- Added auto update field feature
    Any markdown file that contains a Yaml front-matter field `updated_at` 
    will be automatically updated on save.

### [0.6.1] 2023-08-04
- Code cleanup
- Changed and optimized autoupdater to work only on the first occurence of `updated_at`

