# A little structure

A responsive, buildless semester dashboard with Today, Week, German studio, and Reflections views.

## Manual events and notes

Use **Add event** in Today or Week to create an event with a title, category, date and times. Open any event to rename, reschedule, or remove it. Undo the latest removal immediately or restore removed events from Data & settings. New events can explicitly allow overlap when needed.

The **Notes** section supports separate notes containing paragraphs, bullets, numbered lists, to-do checkboxes, and pasted/uploaded images. Enter continues list items; Shift+Enter inserts a line break. Images are resized to fit browser storage. Notes can be archived and restored. All note content, custom events, removals and progress are included in backup export/import; older backups remain supported.

## Hosting

In this repository, open **Settings → Pages → Build and deployment**. Select **Deploy from a branch**, branch **main**, folder **/docs**, and save. The site is served at `https://maitri01.github.io/dashboard/` after GitHub finishes deploying.

The public files are in `docs/`. No installation or build is needed. To preview a checkout: `python -m http.server 8765 --directory docs`.

## Data

Progress, notes, and moved sessions are saved only in the browser's local storage. GitHub does not receive those records. Use Data & settings → Export backup / Import backup to transfer between devices. Import replaces existing local data after confirmation. There is no automatic cloud sync, Notion sync, or embedded AI voice service. Voice prompts can be copied into an AI voice app.

## German

48 lesson-topic mappings plus 16 module checkpoints cover Menschen A1.1, A1.2, A2.1 and A2.2. Lesson order follows official Hueber contents, linked within the app. Practice instructions are original; textbook exercises, scans and audio are not redistributed. Use your own coursebook/workbook and official publisher media. Edition page layouts may differ. Completion advances the course queue independently of calendar dates. The course is not a promise to finish A2 by November.

## Schedule

19 October–30 November 2026, interpreted in Europe/Berlin. Generic work labels are used; no home address, precise workplace location, or private Notion links are included. Travel slots are estimates. Moving a session checks for overlaps and affects only that session.

## Checks

`node --check docs/app.js` and `node --check docs/data.js` validate JavaScript syntax. The local source includes a smoke test for schedule totals, dates, course coverage, rendering and local progress.
