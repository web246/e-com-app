from pathlib import Path
from PIL import Image

root = Path(__file__).resolve().parents[1]
source = root / 'src' / 'assets' / 'logo.png'
if not source.exists():
    raise FileNotFoundError(f'Missing source image: {source}')

public_assets = root / 'public' / 'assets'
public_assets.mkdir(parents=True, exist_ok=True)


def make_square(image: Image.Image, size: int) -> Image.Image:
    width, height = image.size
    side = max(width, height)
    square = Image.new('RGBA', (side, side), (255, 255, 255, 0))
    offset = ((side - width) // 2, (side - height) // 2)
    square.paste(image, offset, image)
    return square.resize((size, size), Image.LANCZOS)


img = Image.open(source).convert('RGBA')
for name, size in [('app-icon-192.png', 192), ('app-icon-512.png', 512), ('favicon.png', 64)]:
    make_square(img, size).save(public_assets / name)

android_res = root / 'android' / 'app' / 'src' / 'main' / 'res'
for density_name, size in [('mipmap-mdpi', 48), ('mipmap-hdpi', 72), ('mipmap-xhdpi', 96), ('mipmap-xxhdpi', 144), ('mipmap-xxxhdpi', 192)]:
    target_dir = android_res / density_name
    target_dir.mkdir(parents=True, exist_ok=True)
    icon = make_square(img, size)
    icon.save(target_dir / 'ic_launcher.png')
    icon.save(target_dir / 'ic_launcher_round.png')
    icon.save(target_dir / 'ic_launcher_foreground.png')

print('Generated app icons from src/assets/logo.png')
