# Jack's Donuts — Card & Hero Images

**Source:** Donut images for hero and product cards. Put images in the project **`Donut/`** folder (project root), then run:

```bash
cd DEMO/jacks-donuts-muskogee && bash scripts/copy-donut-assets.sh ../../Donut
```

Or run with no args (script uses project `Donut/` by default):  
`bash scripts/copy-donut-assets.sh`

**Expected files here (WebP):**
- `hero.webp` — Hero (1st image)
- `fritter.webp` — Tiger Tail card (2nd)
- `sausage_roll.webp` — Caramel Iced Nut Roll card (3rd)
- `bear_claw.webp` — Applesauce Cake Donut card (4th)

Script maps the first 4 images (alphabetically) and converts PNG/JPG to WebP if `magick` is available.
