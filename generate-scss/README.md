# generate-scss README

This extension allows you to take classes named in BEM format in any HTML/Vue/whatever file and creates the nested classes inside the specified SASS file

## Features

- Generate SCSS markup from any file with BEM format naming conventions
- BEM format is as follos
  - Block Element Modifier
    - BLOCK - Standalone component that is meaningful on its own (.block)
    - ELEMENT - Part of a block that has no standalone meaning (.block\_\_element)
    - MODIFIER - A different version of a block or an element (.block\_\_element—modifier)

For example if your file has the following format:

```
<div class="card">
  <h1 class="card__title">Some Title</h1>
  <p class="card__text">Some Text</p>
  <a href="#" class="card__link">Some Link</a>
  <ul class="card__list">
    <li class="card__list--item">Some Item</li>
  </ul>
</div>
```

The generated SCSS would be

```
.card {
  &__title {
    // TODO: Add styles
  }
  &__text {
    // TODO: Add styles
  }
  &__link {
    // TODO: Add styles
  }
  &__list {
    // TODO: Add styles
    &--item {
      // TODO: Add styles
    }
  }
}
```

To use simply press CMD/CTRL + Shift + P and use `Generate SCSS`, I will be adding command option soon

<!-- \!\[feature X\]\(images/feature-x.png\) -->

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

None that I'm aware of

## Extension Settings

None yet

## Known Issues

File picker pops up rather than a small dialog

## Release Notes

### 1.0.0

Initial release of extension

<!-- ### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z. -->

**Enjoy!**
