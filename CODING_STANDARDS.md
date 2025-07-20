# Coding Standards

## Assertions
- **Always use AssertJ** for all assertions in tests.
    - Use `assertThat(...)` and other AssertJ fluent assertions.
    - Do **not** use `kotlin.test.assertEquals`, `assertTrue`, `assertFalse`, or JUnit's `Assertions.assertEquals`, etc.

**Examples:**
```kotlin
import org.assertj.core.api.Assertions.assertThat

assertThat(result).isEqualTo(expected)
assertThat(list).hasSize(3)
assertThat(value).isBetween(0.0, 1.0)
```

## Logging and Output
- **Never use `println`** for output, debugging, or logging.
- **Always use a logger** (e.g., SLF4J, Logback) for all output, including in tests.
    - Use appropriate log levels: `logger.info`, `logger.warn`, `logger.error`, etc.

**Examples:**
```kotlin
import org.slf4j.LoggerFactory

private val logger = LoggerFactory.getLogger(MyClass::class.java)
logger.info("Informational message")
logger.error("Error message: {}", exception.message)
```

## Test Imports
- Always use static imports for AssertJ assertions for clarity and brevity.

**Example:**
```kotlin
import org.assertj.core.api.Assertions.assertThat
```

## Imports
- **Never use star imports** (e.g., `import x.y.z.*`). Always import only what you use.
- **Always use imports for variables and types** rather than using full package paths in code.
    - Use `import articles.scraping.Article` and then reference as `Article` in code.
    - Do **not** use `articles.scraping.Article` directly in variable declarations or method signatures.

**Examples:**
```kotlin
// Good - use imports
import articles.scraping.Article
import articles.embedding.EmbeddingService

fun processArticle(article: Article, embeddingService: EmbeddingService) {
    // ...
}

// Bad - using full package paths
fun processArticle(article: articles.scraping.Article, embeddingService: articles.embedding.EmbeddingService) {
    // ...
}
```

## Development Process
- **Take things slowly and work step by step.**
- **Explain every change and its purpose before making it.**
- **Avoid making multiple unrelated changes at once.**
- **Seek confirmation before proceeding to the next step, especially for significant or breaking changes.**

## Additional Coding Standards

- **Put public methods before private ones**: Order your methods so that public methods appear before private ones in classes and objects.
- **Always use imports instead of inlining them**: Import types, classes, and functions at the top of the file rather than using fully qualified names inline.
- **Always remove unused imports**: Keep your import section clean by removing any imports that are not used in the file.
- **Use AssertJ for assertions in tests**: Prefer AssertJ's fluent assertions (e.g., `assertThat(...)`) for all test assertions.
- **Use ktlint to format Kotlin code**: Run ktlint to ensure consistent code formatting for all Kotlin files.
- **Keep methods small and give them names that describe them well**: Write small, focused methods with descriptive names that clearly state their purpose.
- **Make small changes and ask for approval and advance step by step**: When collaborating, break work into small, reviewable steps and seek approval before proceeding to the next step. 