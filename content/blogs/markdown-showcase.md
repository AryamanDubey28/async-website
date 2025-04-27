---
title: "Markdown Showcase - All Features"
date: "2024-07-29"
summary: "A comprehensive showcase of all Markdown features and how they render in our blog."
slug: "markdown-showcase"
author: "Documentation Team"
---

# Heading Level 1
## Heading Level 2
### Heading Level 3
#### Heading Level 4
##### Heading Level 5
###### Heading Level 6

## Basic Text Formatting

Normal text looks like this.

**This text is bold**

*This text is italicized*

***This text is bold and italicized***

~~This text is strikethrough~~

This is a <mark>highlighted</mark> text (using HTML).

## Links

[This is a link to Google](https://www.google.com)

[This is a link with a title](https://www.example.com "Example Website")

## Lists

### Unordered Lists

* Item 1
* Item 2
  * Nested Item 2.1
  * Nested Item 2.2
* Item 3

### Ordered Lists

1. First item
2. Second item
   1. Nested item 2.1
   2. Nested item 2.2
3. Third item

### Task Lists

- [x] Completed task
- [ ] Incomplete task
- [x] Another completed task

## Blockquotes

> This is a blockquote.
> 
> It can span multiple lines.

> Nested blockquotes are also possible.
>> Like this one.

## Code

Inline code: `const greeting = "Hello, world!";`

Code block with syntax highlighting:

```javascript
function greet(name) {
  return `Hello, ${name}!`;
}

// Call the function
const message = greet('World');
console.log(message);  // Output: Hello, World!
```

```python
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a

# Print the first 10 Fibonacci numbers
for i in range(10):
    print(fibonacci(i))
```

```css
.markdown-content {
  font-family: 'Inter', sans-serif;
  line-height: 1.6;
  color: #333;
}

.markdown-content h1 {
  color: #2a6496;
  border-bottom: 1px solid #eee;
}
```

## Tables

| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
| Cell 7   | Cell 8   | Cell 9   |

### Aligned Tables

| Left-aligned | Center-aligned | Right-aligned |
|:-------------|:--------------:|---------------:|
| Left         | Center         | Right          |
| Text         | Text           | Text           |

## Horizontal Rule

---

## Images

![Alt text for the image](https://via.placeholder.com/600x300 "Optional title")

## Footnotes

Here's a sentence with a footnote. [^1]

[^1]: This is the footnote content.

## Definition Lists

<dl>
  <dt>Definition Term</dt>
  <dd>Definition Description: This is the explanation of the term above.</dd>
  
  <dt>Markdown</dt>
  <dd>A lightweight markup language with plain text formatting syntax.</dd>
</dl>

## Alerts and Callouts

> **Note**
> This is a note callout.

> **Warning**
> This is a warning callout.

> **Tip**
> This is a tip callout.

## Emoji (if supported)

:smile: :heart: :thumbsup: :rocket:

## Mathematics (if supported)

Inline math: $E=mc^2$

Block math:

$$
\frac{d}{dx}(e^x) = e^x
$$

## Diagrams (if supported by your Markdown processor)

```mermaid
graph TD;
    A-->B;
    A-->C;
    B-->D;
    C-->D;
```

## HTML Embedded in Markdown

<div style="padding: 15px; background-color: #f0f0f0; border-radius: 5px;">
  <h3>This is a custom HTML block</h3>
  <p>You can use HTML when Markdown doesn't provide the formatting you need.</p>
</div>

## Collapsible Content

<details>
  <summary>Click to expand</summary>
  
  This content is hidden by default but can be expanded by clicking.
  
  You can include any markdown content here:
  - Lists
  - **Bold text**
  - `Code`
  - Etc.
</details>

## Additional Resources

This showcase demonstrates most Markdown features. For more information about Markdown syntax, check out:

* [Markdown Guide](https://www.markdownguide.org/)
* [GitHub Markdown](https://guides.github.com/features/mastering-markdown/) 