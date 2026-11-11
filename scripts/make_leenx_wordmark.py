"""Render transparent leenX wordmark matching logo.svg (Georgia + Arial Black)."""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

OUT = Path(r"C:\Users\qusai\files\circle\WEAD\waed 2\site\public\img\leen-x\wordmark.png")
W, H = 900, 420
img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Prefer system fonts that match logo.svg families
candidates_leen = [
    r"C:\Windows\Fonts\georgia.ttf",
    r"C:\Windows\Fonts\Georgia.ttf",
]
candidates_x = [
    r"C:\Windows\Fonts\ariblk.ttf",
    r"C:\Windows\Fonts\Arial Black.ttf",
    r"C:\Windows\Fonts\arialbd.ttf",
]

def load(cands, size):
    for p in cands:
        if Path(p).exists():
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

font_leen = load(candidates_leen, 120)
font_x = load(candidates_x, 260)

leen = "leen"
x = "X"
# Layout: leen right-aligned into center, X left of center — matching logo.svg
cx = 430
baseline = 280

leen_bbox = draw.textbbox((0, 0), leen, font=font_leen)
leen_w = leen_bbox[2] - leen_bbox[0]
leen_h = leen_bbox[3] - leen_bbox[1]
x_bbox = draw.textbbox((0, 0), x, font=font_x)
x_w = x_bbox[2] - x_bbox[0]
x_h = x_bbox[3] - x_bbox[1]

# Gap between leen and X
gap = 6
leen_x = cx - leen_w - gap // 2
x_x = cx + gap // 2

# Vertically align baselines roughly
draw.text((leen_x, baseline - leen_h), leen, font=font_leen, fill=(124, 184, 154, 255))  # #7CB89A
draw.text((x_x, baseline - int(x_h * 0.92)), x, font=font_x, fill=(126, 184, 232, 255))  # #7EB8E8

# Crop to content
bbox = img.getbbox()
if bbox:
    img = img.crop(bbox)
img.save(OUT)
print("wrote", OUT, img.size)
