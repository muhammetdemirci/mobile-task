# Pelago - Mobile Engineering Task

Welcome, and thank you for your interest in joining the mobile team at **Pelago**!

This task is designed to evaluate your ability to work with animation libraries, gesture interactions, and creatively repurpose existing components.

## Development

To install JS packages: `yarn install`

To install Ruby deps: `bundle install`

To install pods: `yarn pod:install`

To run on the device: `yarn ios` or `yarn android`

---

## 🎯 Task Overview

Your goal is to implement a `TopSheet` component (`src/TopSheet.tsx`) that behaves like a **top sheet**, sliding down from the top of the screen — essentially the opposite of a traditional bottom sheet.

However, instead of building it from scratch, we ask you to creatively **repurpose** the `@gorhom/bottom-sheet` component and **tweak its API** to make it behave like a top sheet.

---

## 📁 File Structure

You will be working in the following file:

```sh
src/
└── TopSheet.tsx ← Your implementation goes here
```

Feel free to create additional files or components under `src/` if needed.

---

## 📚 Tech Stack

You **must** use the following:

- [`@gorhom/bottom-sheet`](https://github.com/gorhom/react-native-bottom-sheet)
- [`react-native-reanimated`](https://docs.swmansion.com/react-native-reanimated/)

You can assume the project is already configured to support both libraries.

---

## 🛠 Requirements

- The `TopSheet` should behave similarly to `BottomSheet`, but it **slides in from the top**.
- It should support imperative methods:
  - `expand()`
  - `collapse()`
  - `close()`
- Provide a way to render custom content inside the sheet.
- Animate smoothly and handle gestures correctly.
- Provide a way to dismiss the TopSheet by swiping **up** (opposite of bottom sheet).

---

## 🧠 Tips

- You can manipulate the transform of the `BottomSheet` to appear from the top.
- Consider rotating or translating the sheet container.
- You may need to adjust the gesture direction and animations.
- Don’t worry about edge cases like keyboard handling unless you want to go the extra mile.

---

## 🚀 Submission

Please provide:

- A GitHub repo or a zip file with your code.

---

## 🕒 Time Expectation

This task is expected to take **2–4 hours**, depending on your experience. Please do not spend more than 6 hours on it.

---

We’re looking for clean, thoughtful code and creativity. Feel free to reach out if you have any questions. Good luck, and have fun!

– Pelago Team
