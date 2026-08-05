---
# REQUIRED. Shown in the listing, the browser tab and social cards.
title: How I Cut Our ECS Deploy Time in Half

# REQUIRED. Unquoted YYYY-MM-DD. Without it the post renders but never appears
# in /posts, the RSS feed or the sitemap.
date: 2026-08-05

# Strongly recommended: becomes the meta description, the social card summary
# and the blurb AI crawlers read from llms.txt.
description: A walkthrough of the CDK pipeline changes that took our ECS deploys from 12 minutes to 5.

# Optional. `en` (default) or `ta`. Omit for English.
# Tamil posts get a தமிழ் badge in the listing and their own feed at
# /feed.ta.xml, and still appear in the main /feed.xml.
lang: en

# Optional. `blog` (default) puts it on /posts, `note` puts it on /notes.
# `blog+note` puts it on both.
type: blog

# Optional. Shown under the title, and a nice signal for readers.
duration: 8min

# Optional. Social card for this post; defaults to the site-wide og.png.
# Root-relative or absolute both work — it is absolutised for og:image.
image: /og.png

# Optional. Set while writing: renders a draft banner, and keeps the post out
# of the listing, the sitemap, the feeds and the search index.
draft: true

# Optional. Set when meaningfully revising an already-published post.
# updated: 2026-09-01
---

Opening paragraph. This is what the reader sees first — lead with the result,
not the setup.

## A heading

Body copy. Images use absolute-from-root paths so they work in feed readers:

![Architecture diagram](/images/ecs-pipeline.png)

```ts
// Code blocks get syntax highlighting via Shiki.
export const stack = new PipelineStack(app, 'Deploy')
```

> Delete `draft: true` when you're ready to publish.
