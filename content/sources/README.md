# Oak provenance

One file per lesson: `content/sources/<lesson-slug>.json`.

```json
{
  "programme": "maths-primary-year-2",
  "units": [{ "slug": "fractions", "title": "Fractions", "url": "https://www.thenational.academy/..." }],
  "lessons": [{ "slug": "halves-and-quarters", "title": "Halves and quarters", "url": "https://www.thenational.academy/..." }],
  "keywords_used": ["half", "quarter"],
  "misconceptions": [{ "text": "Parts of a fraction can be different sizes", "question_refs": ["q13"] }],
  "retrieved_at": "2026-11-06"
}
```

For a topic with no Oak unit (for example AI topics), use `"no_oak_unit": "Oak has no primary AI unit"` instead of `units`.

Content is adapted, never copied. It must not use Oak branding or imply Oak made or approved it. The licence line goes on the parent credits page:
"Contains public sector information licensed under the Open Government Licence v3.0."
