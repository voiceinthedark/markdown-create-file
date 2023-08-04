# Markdown Blog Companion Extension

A markdown extension which is a companion to my [markdown-blog](https://github.com/voiceinthedark/markdown-blog). 
A new markdown file will be created in the current directory with the required Yaml front-matter required to display the blog's articles.
It can be used with my blog application or as a standalone extension to quickly create a markdown article with the Front matter already preconfigured.

## Usage

`ctrl + shift + p` to open vscode command palette and search for `Markdown Blog: Create File`
Or inside the active text editor press `ctrl + shift + c`

> user prompt accepts a file name of markdown type. If no extension is provided it will be assumed to be markdown and added automatically.
> Prefered file name format is `a-title-of-your-article.md` or `a-title-of-your-article`, if filename is not sluggified it will be sluggified automatically.
> As an example a filename of `a new article` will become `a-new-article.md` automatically.

### (optional) using external yaml configuration
In order to use an external yaml configuration file, you can add a **`markdown-blog.yaml`** file to the root of your project and then use the following command:
`Markdown Blog: Create File`.

#### Yaml front-matter config example

The markdown-blog.yaml file should look like this:
```yaml
title: How To Send data from a Vue Page to a persistent Layout
published_at: 2023-07-30T00:39:00+03:00
updated_at: 2023-08-02T22:56:00+03:00
type: article
description: How to send data from a vue page to a persistent layout in Laravel + inertiajs
link: /2023/2023-07-30-how-to-send-data-from-page-to-layout
image: /images/2023-07-31-04-22-45.png
tags: [vue, inertia, laravel, php, blog, layout]
```
The `published_at` and `updated_at` fields can be left empty since they will be automatically generated.
The title and link will also be automatically generated according to user input.

## Installation
To install an extension, run the following command:
`code --install-extension markdown-blog-extension-0.4.0.vsix`
or download from Visual studio marketplace: [Marketplace](https://marketplace.visualstudio.com/items?itemName=voiceinthedark.markdown-blog-extension)

## Release Notes
### 0.4.0

Initial release of the extension

### 0.5.0
- Added Yaml front-matter config file parsing.
    The extension will search for a file called `markdown-blog.yaml` and will parse the front-matter from it. The file needs to be in a correct yaml format.

### 0.5.1
- Fixed issue with userinput containing spaces
- Fixed issue with user input not ending with a `.md`

### 0.5.2
- Fixed date time formatting


## Future plans

- [x] Add external yaml configuration
- [ ] Update Yaml front-matter on save

---
## For more information

- [GitHub repo](https://github.com/voiceinthedark/markdown-blog-extension)
- [Markdown Blog](https://github.com/voiceinthedark/markdown-blog)


**Enjoy!**
