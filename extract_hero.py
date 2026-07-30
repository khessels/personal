from PIL import Image, ImageFilter, ImageEnhance
import sys

IN = 'kees-hessels-as-brand.png'
OUT = 'hero-portrait.png'
OUT2 = 'hero-portrait-enhanced.png'

im = Image.open(IN)
w, h = im.size
print('Source size:', w, 'x', h)

# Choose a crop anchored to the right third/half of the image
crop_w = min(900, max(400, w // 3))
crop_h = min(h, int(crop_w * 1.15))
left = max(0, w - crop_w - 20)
top = max(0, (h - crop_h) // 2)
right = min(w, left + crop_w)
bottom = min(h, top + crop_h)
print('Crop box:', left, top, right, bottom)

crop = im.crop((left, top, right, bottom))
# resize to a taller portrait
crop = crop.resize((900, int(900 * crop_h / crop_w)), Image.LANCZOS)

# mild sharpening and contrast
crop.save(OUT, quality=90)

enh = crop.filter(ImageFilter.UnsharpMask(radius=2, percent=150, threshold=3))
enh = ImageEnhance.Color(enh).enhance(1.06)
enh = ImageEnhance.Contrast(enh).enhance(1.08)
enh = ImageEnhance.Sharpness(enh).enhance(1.12)
enh.save(OUT2, quality=92)

print('Saved', OUT, 'and', OUT2)
