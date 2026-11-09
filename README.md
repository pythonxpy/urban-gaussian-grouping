# Global–Local Gaussian Grouping

Research project website for urban Gaussian instance grouping and downstream semantic risk navigation. The title is descriptive; author information and publication details have not yet been finalized.

## Website

Intended URL: https://pythonxpy.github.io/urban-gaussian-grouping/

A buildless static website: `index.html`, `style.css`, `app.js`, `data.js`, and `assets/`. No server-side account, training runtime, or AutoDL connection is needed. Local preview: `python -m http.server 8080`, then open http://localhost:8080/.

## Contents

- All 48 frozen annotated views from three MatrixCity blocks, with eight original comparison panels each.
- Accessible comparison slider, scene/frame/method selectors, full-panel gallery and image lightbox.
- Segmentation results, controlled ablations and the OpenCLIP semantic assignment branch.
- Block4 navigation paths, model-coordinate height profiles and map layers.
- Aggregate CSV, evaluation protocol and asset provenance in `downloads/`.

Images are extracted from saved experiment panels, not generated. WebP compression is for web delivery; no prediction filtering, relabeling or smoothing was performed. Instance colors are not aligned across methods. Raw Trace3D panels are not semantic predictions.

## Scientific scope

Evaluation uses seen/development views, not an independent held-out benchmark. Main global/local experiments use three seeds; GaGa and Trace3D use one. Baselines have engineering adaptations and different training budgets. Trace3D includes automatic prototype extraction and OpenCLIP, with native 2D Gaussian geometry; it is not the official GT-query evaluation. Navigation is a model-based development demonstration, not certified physical flight safety.

This repository contains the project page and presentation assets, not the full training implementation or model checkpoints. Underlying dataset and method assets remain subject to their original licenses. No blanket redistribution license for third-party research data is asserted here.

## GitHub Pages

Enable Pages under Settings → Pages using **Deploy from a branch**, branch **main**, folder **/(root)**. `.nojekyll` enables static delivery. No build dependencies are required.

## Acknowledgment

Academic page structure and presentation pacing inspired by [GradSplat](https://jingong-chen.github.io/GradSplat/). Website code is independently written; GradSplat research imagery, authorship and results are not reused.
